import { useState, useEffect } from 'react';
import { Calendar, Clock, Truck, User } from 'lucide-react';
import { supabase, type Carrier } from '../lib/supabase';
import { useLanguage } from '../contexts/LanguageContext';

export function AppointmentBooking() {
  const { t } = useLanguage();
  const [carriers, setCarriers] = useState<Carrier[]>([]);
  const [selectedCarrierId, setSelectedCarrierId] = useState('');
  const [newCarrierName, setNewCarrierName] = useState('');
  const [phone, setPhone] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const timeSlots = generateTimeSlots();

  useEffect(() => {
    loadCarriers();
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      let carrierId = selectedCarrierId;

      if (!carrierId && newCarrierName) {
        const { data: newCarrier, error: carrierError } = await supabase
          .from('carriers')
          .insert([{ name: newCarrierName, phone }])
          .select()
          .single();

        if (carrierError) throw carrierError;
        carrierId = newCarrier.id;
        await loadCarriers();
      }

      if (!carrierId) {
        throw new Error(t('selectOrCreateCarrier'));
      }

      const { error } = await supabase
        .from('appointments')
        .insert([{
          carrier_id: carrierId,
          license_plate: licensePlate.toUpperCase(),
          appointment_date: appointmentDate,
          time_slot: timeSlot,
          status: 'scheduled',
          notes
        }]);

      if (error) throw error;

      setMessage({ type: 'success', text: t('appointmentCreated') });
      setSelectedCarrierId('');
      setNewCarrierName('');
      setPhone('');
      setLicensePlate('');
      setAppointmentDate('');
      setTimeSlot('');
      setNotes('');
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Calendar className="w-6 h-6 text-blue-700" />
        {t('appointmentBooking')}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <User className="w-4 h-4 inline mr-1" />
            {t('existingCarrier')}
          </label>
          <select
            value={selectedCarrierId}
            onChange={(e) => {
              setSelectedCarrierId(e.target.value);
              setNewCarrierName('');
            }}
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

        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-sm text-gray-500">{t('or')}</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('newCarrier')}
          </label>
          <input
            type="text"
            value={newCarrierName}
            onChange={(e) => {
              setNewCarrierName(e.target.value);
              setSelectedCarrierId('');
            }}
            placeholder={t('carrierName')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
        </div>

        {newCarrierName && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('phoneNumber')}
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+33 6 12 34 56 78"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>
        )}

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

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4 inline mr-1" />
              {t('dateLabel')}
            </label>
            <input
              type="date"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Clock className="w-4 h-4 inline mr-1" />
              {t('timeSlot')}
            </label>
            <select
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            >
              <option value="">{t('selectTimeSlot')}</option>
              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('notes')}
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            placeholder={t('additionalInfo')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
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
          {loading ? t('creatingAppointment') : t('createAppointment')}
        </button>
      </form>
    </div>
  );
}

function generateTimeSlots(): string[] {
  const slots: string[] = [];
  const start = 6.5;
  const end = 20;
  const interval = 0.5;

  for (let time = start; time <= end; time += interval) {
    const hours = Math.floor(time);
    const minutes = (time % 1) * 60;
    const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    slots.push(timeString);
  }

  return slots;
}
