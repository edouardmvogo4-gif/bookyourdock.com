import { useState, useEffect } from 'react';
import { Upload, FileText, Truck, User, X, Download, Archive } from 'lucide-react';
import { supabase, type Carrier, type Document } from '../lib/supabase';
import { useLanguage } from '../contexts/LanguageContext';

interface DocumentArchive {
  id: string;
  archive_date: string;
  license_plate: string;
  mission_name: string;
  archive_url: string;
  document_count: number;
  created_at: string;
}

export function DocumentUpload() {
  const { t, language } = useLanguage();
  const [carriers, setCarriers] = useState<Carrier[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [archives, setArchives] = useState<DocumentArchive[]>([]);
  const [selectedCarrierId, setSelectedCarrierId] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [missionName, setMissionName] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const documentTypes = [
    t('deliveryNote'),
    t('cmr'),
    t('invoice'),
    t('transportReceipt'),
    t('other')
  ];

  useEffect(() => {
    loadCarriers();
    loadDocuments();
    loadArchives();
  }, []);

  async function loadCarriers() {
    const { data, error } = await supabase
      .from('carriers')
      .select('*')
      .order('name');

    if (!error && data) {
      setCarriers(data);
    }
  }

  async function loadDocuments() {
    const { data, error } = await supabase
      .from('documents')
      .select('*, carriers(name)')
      .order('upload_date', { ascending: false });

    if (!error && data) {
      setDocuments(data as any);
    }
  }

  async function loadArchives() {
    const { data, error } = await supabase
      .from('document_archives')
      .select('*')
      .order('archive_date', { ascending: false })
      .limit(20);

    if (!error && data) {
      setArchives(data as DocumentArchive[]);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) {
      setMessage({ type: 'error', text: t('selectFile') });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${licensePlate.toUpperCase()}.${fileExt}`;
      const filePath = `documents/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('yard-documents')
        .upload(filePath, file);

      if (uploadError) {
        if (uploadError.message.includes('not found')) {
          const { error: bucketError } = await supabase.storage.createBucket('yard-documents', {
            public: true
          });

          if (!bucketError) {
            const { error: retryError } = await supabase.storage
              .from('yard-documents')
              .upload(filePath, file);

            if (retryError) throw retryError;
          } else {
            throw bucketError;
          }
        } else {
          throw uploadError;
        }
      }

      const { data: { publicUrl } } = supabase.storage
        .from('yard-documents')
        .getPublicUrl(filePath);

      const { error: dbError } = await supabase
        .from('documents')
        .insert([{
          carrier_id: selectedCarrierId,
          license_plate: licensePlate.toUpperCase(),
          mission_name: missionName || null,
          document_name: file.name,
          document_url: publicUrl,
          document_type: documentType
        }]);

      if (dbError) throw dbError;

      setMessage({ type: 'success', text: t('documentUploaded') });
      setSelectedCarrierId('');
      setLicensePlate('');
      setMissionName('');
      setDocumentType('');
      setFile(null);
      await loadDocuments();
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setLoading(false);
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Upload className="w-6 h-6 text-blue-700" />
          {t('uploadDocument')}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4 inline mr-1" />
              {t('carrier')}
            </label>
            <select
              value={selectedCarrierId}
              onChange={(e) => setSelectedCarrierId(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            >
              <option value="">{t('selectCarrier')}</option>
              {carriers.map((carrier) => (
                <option key={carrier.id} value={carrier.id}>
                  {carrier.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Truck className="w-4 h-4 inline mr-1" />
              {t('licensePlateLabel')}
            </label>
            <input
              type="text"
              value={licensePlate}
              onChange={(e) => setLicensePlate(e.target.value)}
              placeholder="AB-123-CD"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent uppercase"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FileText className="w-4 h-4 inline mr-1" />
              {t('missionName')}
            </label>
            <input
              type="text"
              value={missionName}
              onChange={(e) => setMissionName(e.target.value)}
              placeholder={t('missionName')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FileText className="w-4 h-4 inline mr-1" />
              {t('documentType')}
            </label>
            <select
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            >
              <option value="">{t('selectDocType')}</option>
              {documentTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('file')}
            </label>
            <div className="relative">
              <input
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-yellow-100 file:text-blue-900 hover:file:bg-yellow-200"
              />
              {file && (
                <button
                  type="button"
                  onClick={() => setFile(null)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            {file && (
              <p className="mt-2 text-sm text-gray-600">
                {t('fileSelected')}: {file.name} ({(file.size / 1024).toFixed(2)} KB)
              </p>
            )}
          </div>

          {message && (
            <div
              className={`p-4 rounded-lg ${
                message.type === 'success'
                  ? 'bg-green-50 text-green-800 border border-green-200'
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}
            >
              {message.text}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 text-blue-900 font-semibold py-3 px-6 rounded-lg hover:bg-yellow-300 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? t('uploadingDocument') : t('uploadButton')}
          </button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-gray-600" />
          {t('recentDocuments')}
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">{t('carrier')}</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">{t('plate')}</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">{t('mission')}</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">{t('type')}</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">{t('file')}</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">{t('date')}</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">{t('actions')}</th>
              </tr>
            </thead>
            <tbody>
              {documents.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-gray-500">
                    {t('noDocuments')}
                  </td>
                </tr>
              ) : (
                documents.slice(0, 10).map((doc: any) => (
                  <tr key={doc.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-700">{doc.carriers?.name}</td>
                    <td className="py-3 px-4 text-sm text-gray-700 font-mono">{doc.license_plate}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{doc.mission_name || '-'}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{doc.document_type}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{doc.document_name}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">
                      {new Date(doc.upload_date).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US')}
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <div className="flex gap-2">
                        <a
                          href={doc.document_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                        >
                          <FileText className="w-3 h-3" />
                          {t('view')}
                        </a>
                        <a
                          href={doc.document_url}
                          download={doc.document_name}
                          className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                        >
                          <Download className="w-3 h-3" />
                          {t('download')}
                        </a>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Archive className="w-5 h-5 text-gray-600" />
          {t('documentArchives')}
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">{t('archiveDate')}</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">{t('plate')}</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">{t('mission')}</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">{t('documentCount')}</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">{t('actions')}</th>
              </tr>
            </thead>
            <tbody>
              {archives.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-gray-500">
                    {t('noArchives')}
                  </td>
                </tr>
              ) : (
                archives.map((archive) => (
                  <tr key={archive.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-700">
                      {new Date(archive.archive_date).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US')}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-700 font-mono">{archive.license_plate}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{archive.mission_name}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{archive.document_count}</td>
                    <td className="py-3 px-4 text-sm">
                      <a
                        href={archive.archive_url}
                        download
                        className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        {t('download')}
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
