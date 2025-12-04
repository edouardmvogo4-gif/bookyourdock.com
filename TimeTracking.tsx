import { useState, useEffect } from 'react';
import { Clock, Calendar, TrendingUp, Download } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../contexts/LanguageContext';

interface TimeReport {
  date: string;
  license_plate: string;
  carrier_name: string;
  acces_au_site_time: number | null;
  attente_parking_time: number | null;
  quai_dechargement_time: number | null;
  quai_chargement_time: number | null;
  total_time: number | null;
}

export default function TimeTracking() {
  const { t } = useLanguage();
  const [reports, setReports] = useState<TimeReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const today = new Date();
    const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    setStartDate(thirtyDaysAgo.toISOString().split('T')[0]);
    setEndDate(today.toISOString().split('T')[0]);
  }, []);

  useEffect(() => {
    if (startDate && endDate) {
      fetchTimeReports();
    }
  }, [startDate, endDate]);

  const calculateMinutes = (start: string | null, end: string | null): number | null => {
    if (!start || !end) return null;
    const diff = new Date(end).getTime() - new Date(start).getTime();
    return Math.round(diff / 60000);
  };

  const fetchTimeReports = async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from('operations')
        .select(`
          id,
          license_plate,
          entered_site_at,
          parking_at,
          called_to_unloading_at,
          called_to_loading_at,
          operations_completed_at,
          created_at,
          carrier:carriers(name)
        `)
        .gte('created_at', `${startDate}T00:00:00`)
        .lte('created_at', `${endDate}T23:59:59`)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const processedReports: TimeReport[] = (data || []).map((op: any) => {
        const accesSiteTime = calculateMinutes(op.entered_site_at, op.parking_at);
        const attenteParkingTime = op.parking_at && op.called_to_unloading_at
          ? calculateMinutes(op.parking_at, op.called_to_unloading_at)
          : op.parking_at && op.called_to_loading_at
          ? calculateMinutes(op.parking_at, op.called_to_loading_at)
          : null;

        let quaiDechargementTime = null;
        if (op.called_to_unloading_at && op.called_to_loading_at) {
          quaiDechargementTime = calculateMinutes(op.called_to_unloading_at, op.called_to_loading_at);
        } else if (op.called_to_unloading_at && op.operations_completed_at) {
          quaiDechargementTime = calculateMinutes(op.called_to_unloading_at, op.operations_completed_at);
        }

        const quaiChargementTime = op.called_to_loading_at && op.operations_completed_at
          ? calculateMinutes(op.called_to_loading_at, op.operations_completed_at)
          : null;

        const totalTime = calculateMinutes(op.entered_site_at, op.operations_completed_at);

        return {
          date: new Date(op.created_at).toLocaleDateString('fr-FR'),
          license_plate: op.license_plate,
          carrier_name: op.carrier?.name || 'N/A',
          acces_au_site_time: accesSiteTime,
          attente_parking_time: attenteParkingTime,
          quai_dechargement_time: quaiDechargementTime,
          quai_chargement_time: quaiChargementTime,
          total_time: totalTime,
        };
      });

      setReports(processedReports);
    } catch (error) {
      console.error('Error fetching time reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (minutes: number | null): string => {
    if (minutes === null) return '-';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}min`;
    }
    return `${mins}min`;
  };

  const calculateAverages = () => {
    const validReports = reports.filter(r => r.total_time !== null);
    if (validReports.length === 0) return null;

    const sum = (field: keyof TimeReport) => {
      return reports.reduce((acc, r) => {
        const value = r[field];
        return acc + (typeof value === 'number' ? value : 0);
      }, 0);
    };

    const count = (field: keyof TimeReport) => {
      return reports.filter(r => r[field] !== null).length;
    };

    return {
      accesSite: count('acces_au_site_time') > 0 ? sum('acces_au_site_time') / count('acces_au_site_time') : 0,
      attenteParking: count('attente_parking_time') > 0 ? sum('attente_parking_time') / count('attente_parking_time') : 0,
      quaiDechargement: count('quai_dechargement_time') > 0 ? sum('quai_dechargement_time') / count('quai_dechargement_time') : 0,
      quaiChargement: count('quai_chargement_time') > 0 ? sum('quai_chargement_time') / count('quai_chargement_time') : 0,
      totalTime: count('total_time') > 0 ? sum('total_time') / count('total_time') : 0,
    };
  };

  const exportToCSV = () => {
    const headers = [t('date'), t('licensePlate'), t('carrier'), t('statusAccessSite'), t('statusWaitingParking'), t('statusUnloadingDock'), t('statusLoadingDock'), t('totalTime')];
    const rows = reports.map(r => [
      r.date,
      r.license_plate,
      r.carrier_name,
      formatDuration(r.acces_au_site_time),
      formatDuration(r.attente_parking_time),
      formatDuration(r.quai_dechargement_time),
      formatDuration(r.quai_chargement_time),
      formatDuration(r.total_time),
    ]);

    const csvContent = [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `rapport-temps-${startDate}-${endDate}.csv`;
    link.click();
  };

  const averages = calculateAverages();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Clock className="w-8 h-8 text-blue-700" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{t('timeReportTitle')}</h2>
              <p className="text-gray-600">{t('timeReportSubtitle')}</p>
            </div>
          </div>
          <button
            onClick={exportToCSV}
            className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-blue-900 font-semibold rounded-lg hover:bg-yellow-300 transition-colors"
            disabled={reports.length === 0}
          >
            <Download className="w-4 h-4" />
            {t('exportCSV')}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('startDate')}
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('endDate')}
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>
        </div>

        {averages && (
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-blue-700" />
              <h3 className="text-lg font-semibold text-gray-900">{t('averages')}</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <p className="text-xs text-gray-600 mb-1">{t('statusAccessSite')}</p>
                <p className="text-lg font-bold text-blue-700">{formatDuration(Math.round(averages.accesSite))}</p>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <p className="text-xs text-gray-600 mb-1">{t('statusWaitingParking')}</p>
                <p className="text-lg font-bold text-yellow-600">{formatDuration(Math.round(averages.attenteParking))}</p>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <p className="text-xs text-gray-600 mb-1">{t('statusUnloadingDock')}</p>
                <p className="text-lg font-bold text-orange-600">{formatDuration(Math.round(averages.quaiDechargement))}</p>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <p className="text-xs text-gray-600 mb-1">{t('statusLoadingDock')}</p>
                <p className="text-lg font-bold text-purple-600">{formatDuration(Math.round(averages.quaiChargement))}</p>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <p className="text-xs text-gray-600 mb-1">{t('totalTime')}</p>
                <p className="text-lg font-bold text-green-600">{formatDuration(Math.round(averages.totalTime))}</p>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">{t('loadingData')}</p>
          </div>
        ) : reports.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">{t('noDataForPeriod')}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('date')}</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('licensePlate')}</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('carrier')}</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('statusAccessSite')}</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('statusWaitingParking')}</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('statusUnloadingDock')}</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('statusLoadingDock')}</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('totalTime')}</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reports.map((report, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{report.date}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{report.license_plate}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{report.carrier_name}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-blue-700">{formatDuration(report.acces_au_site_time)}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-yellow-600">{formatDuration(report.attente_parking_time)}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-orange-600">{formatDuration(report.quai_dechargement_time)}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-purple-600">{formatDuration(report.quai_chargement_time)}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-green-600">{formatDuration(report.total_time)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
