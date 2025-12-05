import { useState, useEffect } from 'react';
import { Truck, MapPin, Package, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { supabase, type Operation } from './supabase';
import { useLanguage } from './LanguageContext';

type OperationWithCarrier = Operation & {
  carriers: { name: string };
};

export function OperationsTracking() {
  const { t } = useLanguage();
  const [operations, setOperations] = useState<OperationWithCarrier[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    loadOperations();

    const subscription = supabase
      .channel('operations-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'operations' }, () => {
        loadOperations();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function loadOperations() {
    const { data, error } = await supabase
      .from('operations')
      .select('*, carriers(name)')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setOperations(data as OperationWithCarrier[]);
    }
  }

  async function updateOperationStatus(operationId: string, newStatus: Operation['status']) {
    setLoading(true);
    setMessage(null);

    try {
      const timestamp = new Date().toISOString();
      const updates: any = {
        status: newStatus,
        updated_at: timestamp
      };

      switch (newStatus) {
        case 'acces_au_site':
          updates.entered_site_at = timestamp;
          break;
        case 'attente_au_parking':
          updates.parking_at = timestamp;
          break;
        case 'quai_dechargement':
          updates.called_to_unloading_at = timestamp;
          break;
        case 'quai_chargement':
          updates.called_to_loading_at = timestamp;
          break;
        case 'fin_des_operations':
          updates.operations_completed_at = timestamp;
          break;
      }

      const { error } = await supabase
        .from('operations')
        .update(updates)
        .eq('id', operationId);

      if (error) throw error;

      const operation = operations.find(op => op.id === operationId);
      if (operation && operation.carrier_id) {
        await sendSMSNotification(operation.carrier_id, newStatus, operation.license_plate);
      }

      setMessage({ type: 'success', text: t('statusUpdated') });
      await loadOperations();
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setLoading(false);
    }
  }

  async function sendSMSNotification(carrierId: string, status: string, licensePlate: string) {
    try {
      const { data: carrier } = await supabase
        .from('carriers')
        .select('phone')
        .eq('id', carrierId)
        .maybeSingle();

      if (!carrier?.phone) return;

      const statusMessages: Record<string, string> = {
        acces_au_site: `Votre camion ${licensePlate} a accédé au site.`,
        attente_au_parking: `Votre camion ${licensePlate} est en attente au parking.`,
        quai_dechargement: `Votre camion ${licensePlate} est appelé au quai de déchargement.`,
        quai_chargement: `Votre camion ${licensePlate} est appelé au quai de chargement.`,
        fin_des_operations: `Les opérations pour votre camion ${licensePlate} sont terminées.`
      };

      const message = statusMessages[status] || `Mise à jour de statut pour ${licensePlate}`;

      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-sms`;
      await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          carrier_id: carrierId,
          phone: carrier.phone,
          message
        })
      });
    } catch (error) {
      console.error('Failed to send SMS:', error);
    }
  }

  function getStatusInfo(status: Operation['status']) {
    const statusConfig = {
      acces_au_site: {
        label: t('statusAccessSite'),
        icon: MapPin,
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200'
      },
      attente_au_parking: {
        label: t('statusWaitingParking'),
        icon: Clock,
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-200'
      },
      quai_dechargement: {
        label: t('statusUnloadingDock'),
        icon: Package,
        color: 'text-orange-600',
        bgColor: 'bg-orange-50',
        borderColor: 'border-orange-200'
      },
      quai_chargement: {
        label: t('statusLoadingDock'),
        icon: Package,
        color: 'text-purple-600',
        bgColor: 'bg-purple-50',
        borderColor: 'border-purple-200'
      },
      fin_des_operations: {
        label: t('statusCompleted'),
        icon: CheckCircle,
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200'
      }
    };

    return statusConfig[status];
  }

  function getNextActions(status: Operation['status']): Array<{ status: Operation['status']; label: string }> {
    const actions: Record<Operation['status'], Array<{ status: Operation['status']; label: string }>> = {
      acces_au_site: [
        { status: 'attente_au_parking', label: t('actionWaitingParking') }
      ],
      attente_au_parking: [
        { status: 'quai_dechargement', label: t('actionCallUnloading') },
        { status: 'quai_chargement', label: t('actionCallLoading') }
      ],
      quai_dechargement: [
        { status: 'quai_chargement', label: t('actionCallLoading') },
        { status: 'fin_des_operations', label: t('actionComplete') }
      ],
      quai_chargement: [
        { status: 'fin_des_operations', label: t('actionComplete') }
      ],
      fin_des_operations: []
    };

    return actions[status] || [];
  }

  const activeOperations = operations.filter(op => op.status !== 'fin_des_operations');
  const completedOperations = operations.filter(op => op.status === 'fin_des_operations').slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Truck className="w-6 h-6 text-orange-600" />
          {t('operationsInProgress')}
        </h2>

        {message && (
          <div
            className={`mb-4 p-4 rounded-lg ${
              message.type === 'success'
                ? 'bg-green-50 text-green-800 border border-green-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            {message.text}
          </div>
        )}

        {activeOperations.length === 0 ? (
          <div className="text-center py-12">
            <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">{t('noOperations')}</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {activeOperations.map((operation) => {
              const statusInfo = getStatusInfo(operation.status);
              const Icon = statusInfo.icon;
              const nextActions = getNextActions(operation.status);

              return (
                <div
                  key={operation.id}
                  className={`border-2 ${statusInfo.borderColor} ${statusInfo.bgColor} rounded-lg p-5`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Icon className={`w-8 h-8 ${statusInfo.color}`} />
                      <div>
                        <h3 className="font-bold text-lg text-gray-800">
                          {operation.carriers.name}
                        </h3>
                        <p className="text-gray-600 font-mono text-sm">
                          {operation.license_plate}
                        </p>
                        <p className="text-blue-600 font-semibold text-xs mt-1">
                          {t('missionNumber')}: {operation.mission_number}
                        </p>
                      </div>
                    </div>
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold ${statusInfo.color} ${statusInfo.bgColor} border ${statusInfo.borderColor}`}>
                      {statusInfo.label}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 text-sm">
                    {operation.entered_site_at && (
                      <div>
                        <p className="text-gray-500">{t('siteEntry')}</p>
                        <p className="font-semibold text-gray-800">
                          {new Date(operation.entered_site_at).toLocaleTimeString('fr-FR', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    )}
                    {operation.called_to_unloading_at && (
                      <div>
                        <p className="text-gray-500">{t('unloading')}</p>
                        <p className="font-semibold text-gray-800">
                          {new Date(operation.called_to_unloading_at).toLocaleTimeString('fr-FR', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    )}
                    {operation.called_to_loading_at && (
                      <div>
                        <p className="text-gray-500">{t('loading')}</p>
                        <p className="font-semibold text-gray-800">
                          {new Date(operation.called_to_loading_at).toLocaleTimeString('fr-FR', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    )}
                    <div>
                      <p className="text-gray-500">{t('elapsedTime')}</p>
                      <p className="font-semibold text-gray-800 flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {calculateElapsedTime(operation.entered_site_at || operation.created_at)}
                      </p>
                    </div>
                  </div>

                  {nextActions.length > 0 && (
                    <div className="flex gap-2">
                      {nextActions.map((action) => (
                        <button
                          key={action.status}
                          onClick={() => updateOperationStatus(operation.id, action.status)}
                          disabled={loading}
                          className="flex-1 bg-white border-2 border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 hover:border-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {completedOperations.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            {t('recentCompleted')}
          </h3>

          <div className="space-y-2">
            {completedOperations.map((operation) => (
              <div
                key={operation.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div>
                  <p className="font-semibold text-gray-800">{operation.carriers.name}</p>
                  <p className="text-sm text-gray-600 font-mono">{operation.license_plate}</p>
                  <p className="text-xs text-blue-600 font-semibold mt-1">
                    {t('missionNumber')}: {operation.mission_number}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">{t('completedAt')}</p>
                  <p className="font-semibold text-gray-800">
                    {operation.operations_completed_at &&
                      new Date(operation.operations_completed_at).toLocaleTimeString('fr-FR', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function calculateElapsedTime(startTime: string): string {
  const start = new Date(startTime);
  const now = new Date();
  const diffMs = now.getTime() - start.getTime();
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 60) {
    return `${diffMins} min`;
  }

  const hours = Math.floor(diffMins / 60);
  const mins = diffMins % 60;
  return `${hours}h ${mins}min`;
}
