import { useState } from 'react';
import { ChevronDown, Calendar, FileText, Clock, BarChart3, Shield, ArrowLeft, Home } from 'lucide-react';
import { Logo } from './Logo';
import { LanguageSelector } from './LanguageSelector';
import type { Language } from '../contexts/LanguageContext';

interface FeaturePageNavProps {
  currentPage: string;
  language?: Language;
  onLanguageChange?: (lang: Language) => void;
}

export function FeaturePageNav({ currentPage, language = 'fr', onLanguageChange }: FeaturePageNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  const content = {
    fr: {
      operations: 'Suivi des Opérations',
      appointments: 'Rendez-vous',
      documents: 'Gestion Documentaire',
      tracking: 'Suivi Temps Réel',
      reports: 'Rapports & Analyses',
      backHome: 'Retour',
      home: 'Accueil'
    },
    en: {
      operations: 'Operations Tracking',
      appointments: 'Appointments',
      documents: 'Document Management',
      tracking: 'Real-Time Tracking',
      reports: 'Reports & Analytics',
      backHome: 'Back',
      home: 'Home'
    },
    de: {
      operations: 'Betriebsverfolgung',
      appointments: 'Termine',
      documents: 'Dokumentenverwaltung',
      tracking: 'Echtzeit-Tracking',
      reports: 'Berichte & Analysen',
      backHome: 'Zurück',
      home: 'Startseite'
    },
    it: {
      operations: 'Monitoraggio Operazioni',
      appointments: 'Appuntamenti',
      documents: 'Gestione Documenti',
      tracking: 'Monitoraggio in Tempo Reale',
      reports: 'Report & Analisi',
      backHome: 'Indietro',
      home: 'Home'
    },
    lb: {
      operations: 'Operatiounen Tracking',
      appointments: 'Rendez-vous',
      documents: 'Dokument Verwaltung',
      tracking: 'Echtzäit Tracking',
      reports: 'Rapporter & Analysen',
      backHome: 'Zréck',
      home: 'Startsäit'
    },
    pl: {
      operations: 'Śledzenie Operacji',
      appointments: 'Spotkania',
      documents: 'Zarządzanie Dokumentami',
      tracking: 'Śledzenie w Czasie Rzeczywistym',
      reports: 'Raporty i Analizy',
      backHome: 'Powrót',
      home: 'Strona główna'
    }
  };

  const t = content[language];

  const features = [
    { id: 'operations', label: t.operations, icon: BarChart3, path: '/features/operations' },
    { id: 'appointments', label: t.appointments, icon: Calendar, path: '/features/appointments' },
    { id: 'documents', label: t.documents, icon: FileText, path: '/features/documents' },
    { id: 'tracking', label: t.tracking, icon: Clock, path: '/features/tracking' },
    { id: 'reports', label: t.reports, icon: Shield, path: '/features/reports' },
  ];

  const currentFeature = features.find(f => f.id === currentPage);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-4">
            <a href="/" className="hover:opacity-80 transition-opacity">
              <Logo size="medium" />
            </a>
            {onLanguageChange && (
              <LanguageSelector
                currentLanguage={language}
                onLanguageChange={onLanguageChange}
              />
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="px-5 py-2.5 rounded-lg text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all flex items-center gap-1.5 shadow-md hover:shadow-lg hover:scale-105 transform"
              >
                {currentFeature && (
                  <>
                    {<currentFeature.icon className="w-4 h-4" />}
                    <span className="hidden sm:inline">{currentFeature.label}</span>
                  </>
                )}
                <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </button>

              {isOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsOpen(false)}
                  />
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-2xl border border-gray-200 py-2 z-50">
                    {features.map((feature) => {
                      const Icon = feature.icon;
                      const isActive = feature.id === currentPage;
                      return (
                        <a
                          key={feature.id}
                          href={feature.path}
                          className={`flex items-center gap-3 px-4 py-3 transition-colors ${
                            isActive
                              ? 'bg-blue-50 text-blue-600 font-semibold'
                              : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                          }`}
                          onClick={() => setIsOpen(false)}
                        >
                          <Icon className="w-5 h-5" />
                          {feature.label}
                        </a>
                      );
                    })}
                    <div className="border-t border-gray-200 my-2"></div>
                    <a
                      href="/"
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      <Home className="w-5 h-5" />
                      {t.home}
                    </a>
                  </div>
                </>
              )}
            </div>

            <button
              onClick={() => window.history.back()}
              className="px-5 py-2.5 rounded-lg text-sm font-bold bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:from-gray-700 hover:to-gray-800 transition-all shadow-md hover:shadow-lg hover:scale-105 transform flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">{t.backHome}</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
