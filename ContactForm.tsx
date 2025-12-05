import { useState } from 'react';
import { X, Building2, Phone, Mail, User, Send } from 'lucide-react';
import type { Language } from './LanguageContext';

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
  language?: Language;
}

export function ContactForm({ isOpen, onClose, language = 'fr' }: ContactFormProps) {
  const [formData, setFormData] = useState({
    companyName: '',
    phone: '',
    email: '',
    contactName: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const content = {
    fr: {
      title: 'Demander une présentation',
      subtitle: 'Remplissez ce formulaire et nous vous contacterons rapidement',
      companyName: 'Nom de la société',
      contactName: 'Nom du contact',
      phone: 'Numéro de téléphone',
      email: 'Email',
      submit: 'Envoyer ma demande',
      success: 'Demande envoyée !',
      successMsg: 'Nous vous contacterons très prochainement',
      placeholderCompany: 'Votre société',
      placeholderContact: 'Prénom et nom',
      placeholderPhone: '06 12 34 56 78',
      placeholderEmail: 'contact@exemple.com'
    },
    en: {
      title: 'Request a demo',
      subtitle: 'Fill out this form and we will contact you shortly',
      companyName: 'Company name',
      contactName: 'Contact name',
      phone: 'Phone number',
      email: 'Email',
      submit: 'Send my request',
      success: 'Request sent!',
      successMsg: 'We will contact you very soon',
      placeholderCompany: 'Your company',
      placeholderContact: 'First and last name',
      placeholderPhone: '06 12 34 56 78',
      placeholderEmail: 'contact@example.com'
    }
  };

  const t = content[language];

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      const response = await fetch(`${supabaseUrl}/functions/v1/send-contact-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseAnonKey}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        console.error('Failed to send email:', result.error);
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
      setFormData({ companyName: '', phone: '', email: '', contactName: '' });
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity"
        onClick={onClose}
      />
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} overflow-y-auto`}>
        <div className="p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

        {!isSubmitted ? (
          <>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {t.title}
            </h2>
            <p className="text-gray-600 mb-6">
              {t.subtitle}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Building2 className="w-4 h-4" />
                  {t.companyName}
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                  placeholder={t.placeholderCompany}
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <User className="w-4 h-4" />
                  {t.contactName}
                </label>
                <input
                  type="text"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                  placeholder={t.placeholderContact}
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Phone className="w-4 h-4" />
                  {t.phone}
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                  placeholder={t.placeholderPhone}
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Mail className="w-4 h-4" />
                  {t.email}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                  placeholder={t.placeholderEmail}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 mt-6"
              >
                <Send className="w-5 h-5" />
                {t.submit}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {t.success}
            </h3>
            <p className="text-gray-600">
              {t.successMsg}
            </p>
          </div>
        )}
        </div>
      </div>
    </>
  );
}
