import { useState } from 'react';
import { Phone, Mail, ChevronDown } from 'lucide-react';
import type { Language } from './LanguageContext';

interface ContactDropdownProps {
  language?: Language;
}

export function ContactDropdown({ language = 'fr' }: ContactDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const content = {
    fr: {
      contact: 'Nous contacter',
      phone: 'Téléphone',
      email: 'Email'
    },
    en: {
      contact: 'Contact us',
      phone: 'Phone',
      email: 'Email'
    }
  };

  const t = content[language];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-5 py-2.5 rounded-lg text-sm font-bold text-white bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 transition-all flex items-center gap-1.5 shadow-md hover:shadow-lg hover:scale-105 transform"
      >
        {t.contact}
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-lg shadow-2xl border border-gray-200 py-2 z-20">
            <a
              href="tel:0979152675"
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 transition-colors"
            >
              <div className="bg-blue-100 p-2 rounded-lg">
                <Phone className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-semibold">{t.phone}</p>
                <p className="font-semibold text-gray-900">09 79 15 26 75</p>
              </div>
            </a>
            <a
              href="mailto:contact@bookyourdock.com"
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 transition-colors"
            >
              <div className="bg-green-100 p-2 rounded-lg">
                <Mail className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-semibold">{t.email}</p>
                <p className="font-semibold text-gray-900 text-sm">contact@bookyourdock.com</p>
              </div>
            </a>
          </div>
        </>
      )}
    </div>
  );
}
