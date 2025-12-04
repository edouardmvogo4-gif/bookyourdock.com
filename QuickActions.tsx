import { useState } from 'react';
import { PlusCircle, Search } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../contexts/LanguageContext';

type Props = {
  onOperationCreated: () => void;
};

export function QuickActions({ onOperationCreated }: Props) {
  const { t } = useLanguage();
  const [licensePlate, setLicensePlate] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  async function handleCreateOperation(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const plateUpper = licensePlate.toUpperCase();

      const { data: appointment } = await supabase
        .from('appointments')
        .select('*, carriers(*)')
        .eq('license_plate', plateUpper)
        .eq('status', 'scheduled')
        .order('appointment_date', { ascending: true })
        .maybeSingle();

      if (!appointment) {
        setMessage({
          type: 'error',
          text: t('noAppointmentFound')
        });
        setLoading(false);
        return;
      }

      const { error } = await supabase
        .from('operations')
        .insert([{
          appointment_id: appointment.id,
          carrier_id: appointment.carrier_id,
          license_plate: plateUpper,
          status: 'acces_au_site',
          entered_site_at: new Date().toISOString()
        }]);

      if (error) throw error;

      setMessage({
        type: 'success',
        text: `${t('operationCreatedSuccess')} ${appointment.carriers.name}`
      });
      setLicensePlate('');
      onOperationCreated();
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-gradient-to-r from-blue-700 to-blue-800 rounded-lg shadow-lg p-6 text-white">
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        <PlusCircle className="w-6 h-6" />
        {t('createOperation')}
      </h3>

      <form onSubmit={handleCreateOperation} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-blue-50">
            {t('searchByPlate')}
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={licensePlate}
                onChange={(e) => setLicensePlate(e.target.value)}
                placeholder="AB-123-CD"
                required
                className="w-full pl-10 pr-4 py-3 border-2 border-blue-500 rounded-lg focus:ring-2 focus:ring-yellow-300 focus:border-yellow-300 text-gray-900 placeholder-gray-400 uppercase"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-yellow-400 text-blue-900 font-semibold rounded-lg hover:bg-yellow-300 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? t('creating') : t('create')}
            </button>
          </div>
        </div>

        {message && (
          <div
            className={`p-3 rounded-lg ${
              message.type === 'success'
                ? 'bg-green-600 text-white'
                : 'bg-red-600 text-white'
            }`}
          >
            {message.text}
          </div>
        )}

        <p className="text-sm text-blue-100">
          {t('operationCreatedStatus')}
        </p>
      </form>
    </div>
  );
}
