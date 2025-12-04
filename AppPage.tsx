import { useState } from 'react';
import {
  Calendar,
  FileText,
  Clock,
  Menu,
  Home
} from 'lucide-react';
import { Logo } from '../components/Logo';
import { OperationsTracking } from '../components/OperationsTracking';
import { AppointmentBooking } from '../components/AppointmentBooking';
import { DocumentUpload } from '../components/DocumentUpload';
import TimeTracking from '../components/TimeTracking';
import { QuickActions } from '../components/QuickActions';
import { AppointmentsList } from '../components/AppointmentsList';
import { LanguageProvider, useLanguage } from '../contexts/LanguageContext';
import { Footer } from '../components/Footer';

type Tab = 'quick-actions' | 'operations' | 'appointments' | 'documents' | 'time-tracking';

function AppContent() {
  const { t, language, setLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState<Tab>('quick-actions');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const tabs = [
    { id: 'quick-actions' as Tab, label: t('quickActions'), icon: Home },
    { id: 'operations' as Tab, label: t('operations'), icon: Truck },
    { id: 'appointments' as Tab, label: t('appointments'), icon: Calendar },
    { id: 'documents' as Tab, label: t('documents'), icon: FileText },
    { id: 'time-tracking' as Tab, label: t('timeReports'), icon: Clock },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100">
      <div className="flex">
        <aside
          className={`${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 fixed md:static z-30 w-64 bg-white shadow-xl h-screen transition-transform duration-300 ease-in-out`}
        >
          <div className="p-6 border-b border-gray-200">
            <div className="mb-4">
              <Logo size="medium" />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setLanguage('fr')}
                className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  language === 'fr'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                FR
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  language === 'en'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                EN
              </button>
            </div>
          </div>

          <nav className="p-4">
            <ul className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <li key={tab.id}>
                    <button
                      onClick={() => {
                        setActiveTab(tab.id);
                        setIsSidebarOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        activeTab === tab.id
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'text-gray-700 hover:bg-blue-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
            <a
              href="/"
              className="flex items-center justify-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Home className="w-5 h-5" />
              <span className="text-sm font-medium">Retour à l'accueil</span>
            </a>
          </div>
        </aside>

        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <main className="flex-1 p-4 md:p-8">
          <div className="mb-6 md:hidden">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Menu className="w-5 h-5" />
              <span className="font-medium">Menu</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            {activeTab === 'quick-actions' && <QuickActions onOperationCreated={() => {}} />}
            {activeTab === 'operations' && <OperationsTracking />}
            {activeTab === 'appointments' && (
              <div className="space-y-8">
                <AppointmentBooking />
                <AppointmentsList />
              </div>
            )}
            {activeTab === 'documents' && <DocumentUpload />}
            {activeTab === 'time-tracking' && <TimeTracking />}
          </div>
        </main>
      </div>

      <Footer language={language} />
    </div>
  );
}

export function AppPage() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
