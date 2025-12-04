import { useState, useEffect } from 'react';
import { Calendar, Clock, Truck, Package, ChevronDown, ChevronUp } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../contexts/LanguageContext';

interface Carrier {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface Appointment {
  id: string;
  carrier_id: string;
  license_plate: string;
  appointment_date: string;
  time_slot: string;
  status: string;
  notes: string;
  created_at: string;
  carriers: Carrier;
}

interface AppointmentsByDate {
  [date: string]: Appointment[];
}

export function AppointmentsList() {
  const { t, language } = useLanguage();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedDates, setExpandedDates] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchAppointments();
  }, []);

  async function fetchAppointments() {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select(`
          *,
          carriers (
            id,
            name,
            email,
            phone
          )
        `)
        .order('appointment_date', { ascending: true })
        .order('time_slot', { ascending: true });

      if (error) throw error;
      setAppointments(data || []);
    } catch (error) {
      console.error('Error loading appointments:', error);
    } finally {
      setLoading(false);
    }
  }

  function groupAppointmentsByDate(appointments: Appointment[]): AppointmentsByDate {
    return appointments.reduce((acc, appointment) => {
      const date = appointment.appointment_date;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(appointment);
      return acc;
    }, {} as AppointmentsByDate);
  }

  function toggleDate(date: string) {
    const newExpanded = new Set(expandedDates);
    if (newExpanded.has(date)) {
      newExpanded.delete(date);
    } else {
      newExpanded.add(date);
    }
    setExpandedDates(newExpanded);
  }

  function formatDate(dateString: string): string {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  function getStatusColor(status: string): string {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'completed':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  }

  function getStatusLabel(status: string): string {
    switch (status) {
      case 'scheduled':
        return t('scheduled');
      case 'confirmed':
        return t('confirmed');
      case 'pending':
        return t('pending');
      case 'cancelled':
        return t('cancelled');
      case 'completed':
        return t('completed');
      default:
        return status;
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">{t('loadingAppointments')}</span>
        </div>
      </div>
    );
  }

  const appointmentsByDate = groupAppointmentsByDate(appointments);
  const dates = Object.keys(appointmentsByDate).sort();

  if (dates.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="text-center">
          <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600">{t('noAppointments')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{t('appointmentsListTitle')}</h2>
        <span className="text-sm text-gray-500">
          {appointments.length} {t('totalAppointments')}
        </span>
      </div>

      {dates.map(date => {
        const dateAppointments = appointmentsByDate[date];
        const isExpanded = expandedDates.has(date);

        return (
          <div key={date} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <button
              onClick={() => toggleDate(date)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-blue-700" />
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900 capitalize">
                    {formatDate(date)}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {dateAppointments.length} {t('appointmentsOn')}
                  </p>
                </div>
              </div>
              {isExpanded ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </button>

            {isExpanded && (
              <div className="border-t border-gray-200 divide-y divide-gray-200">
                {dateAppointments.map(appointment => (
                  <div key={appointment.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="font-medium text-gray-900">{appointment.time_slot}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(appointment.status)}`}>
                            {getStatusLabel(appointment.status)}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-gray-700">
                          <Truck className="w-4 h-4 text-gray-400" />
                          <span className="font-medium">{appointment.carriers.name}</span>
                        </div>

                        <div className="flex items-center gap-2 text-gray-600">
                          <Package className="w-4 h-4 text-gray-400" />
                          <span>{t('plate')}: {appointment.license_plate}</span>
                        </div>

                        {appointment.notes && (
                          <div className="text-sm text-gray-600 bg-gray-50 rounded p-3 mt-2">
                            <span className="font-medium">{t('notesLabel')}: </span>
                            {appointment.notes}
                          </div>
                        )}

                        <div className="text-xs text-gray-500 pt-2 border-t border-gray-100">
                          <div>{t('email')}: {appointment.carriers.email}</div>
                          <div>{t('phone')}: {appointment.carriers.phone}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
