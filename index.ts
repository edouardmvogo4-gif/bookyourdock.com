import { createClient } from 'npm:@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);
    
    const startOfDay = yesterday.toISOString();
    const endOfDay = new Date(yesterday);
    endOfDay.setHours(23, 59, 59, 999);
    const endOfDayStr = endOfDay.toISOString();

    const { data: documents, error: fetchError } = await supabase
      .from('documents')
      .select('*')
      .gte('upload_date', startOfDay)
      .lte('upload_date', endOfDayStr);

    if (fetchError) throw fetchError;

    if (!documents || documents.length === 0) {
      return new Response(
        JSON.stringify({ message: 'No documents to archive', archived: 0 }),
        {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const groupedDocs = documents.reduce((acc: any, doc: any) => {
      const key = `${doc.license_plate}_${doc.mission_name || 'default'}`;
      if (!acc[key]) {
        acc[key] = {
          license_plate: doc.license_plate,
          mission_name: doc.mission_name || 'default',
          documents: [],
        };
      }
      acc[key].documents.push(doc);
      return acc;
    }, {});

    const archives = [];

    for (const [key, group] of Object.entries(groupedDocs)) {
      const g = group as any;
      const archiveDate = yesterday.toISOString().split('T')[0];
      
      const archiveData = {
        date: archiveDate,
        license_plate: g.license_plate,
        mission_name: g.mission_name,
        documents: g.documents.map((d: any) => ({
          name: d.document_name,
          url: d.document_url,
          type: d.document_type,
          upload_date: d.upload_date,
        })),
      };

      const archiveJson = JSON.stringify(archiveData, null, 2);
      const archiveName = `${archiveDate}_${g.license_plate}_${g.mission_name}.json`;
      const archivePath = `archives/${archiveName}`;

      const { error: uploadError } = await supabase.storage
        .from('yard-documents')
        .upload(archivePath, new Blob([archiveJson], { type: 'application/json' }), {
          upsert: true,
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        continue;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('yard-documents')
        .getPublicUrl(archivePath);

      const { error: insertError } = await supabase
        .from('document_archives')
        .insert({
          archive_date: archiveDate,
          license_plate: g.license_plate,
          mission_name: g.mission_name,
          archive_url: publicUrl,
          document_count: g.documents.length,
        });

      if (!insertError) {
        archives.push({
          license_plate: g.license_plate,
          mission_name: g.mission_name,
          count: g.documents.length,
        });
      }
    }

    return new Response(
      JSON.stringify({
        message: 'Archives created successfully',
        archived: archives.length,
        details: archives,
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error: any) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});