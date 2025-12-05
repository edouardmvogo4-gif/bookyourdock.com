import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';
import { LanguageSelector } from './LanguageSelector';
import type { Language } from './LanguageContext';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  showNavigation?: boolean;
  featuresMenu?: React.ReactNode;
}

export function Header({ language, onLanguageChange, showNavigation = true, featuresMenu }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const content = {
    fr: {
      features: 'Fonctionnalités',
      contactUs: 'Nous contacter',
      requestDemo: 'Demander une présentation'
    },
    en: {
      features: 'Features',
      contactUs: 'Contact us',
      requestDemo: 'Request a demo'
    },
    de: {
      features: 'Funktionen',
      contactUs: 'Kontaktieren Sie uns',
      requestDemo: 'Demo anfordern'
    },
    it: {
      features: 'Caratteristiche',
      contactUs: 'Contattaci',
      requestDemo: 'Richiedi una demo'
    },
    lb: {
      features: 'Funktionalitéiten',
      contactUs: 'Kontaktéiert eis',
      requestDemo: 'Presentatioun ufroen'
    },
    pl: {
      features: 'Funkcje',
      contactUs: 'Skontaktuj się z nami',
      requestDemo: 'Poproś o demo'
    }
  };

  const t = content[language];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-4">
            <a href="/" className="hover:opacity-80 transition-opacity">
              <Logo size="medium" />
            </a>
            <LanguageSelector
              currentLanguage={language}
              onLanguageChange={onLanguageChange}
            />
          </div>

          {showNavigation && (
            <>
              <div className="hidden md:flex items-center gap-2">
                {featuresMenu}
              </div>

              <button
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </>
          )}
        </div>

        {mobileMenuOpen && showNavigation && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-4">
              <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">
                {t.features}
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
