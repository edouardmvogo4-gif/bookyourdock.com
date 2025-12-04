import { useState, useRef, useEffect } from 'react';
import { AppointmentBooking } from './components/AppointmentBooking';
import { AppointmentsList } from './components/AppointmentsList';
import { DocumentUpload } from './components/DocumentUpload';
import { OperationsTracking } from './components/OperationsTracking';
import { QuickActions } from './components/QuickActions';
import TimeTracking from './components/TimeTracking';
import { useLanguage } from './contexts/LanguageContext';
import { Calendar, FileText, Truck, LayoutDashboard, List, ChevronDown, Clock, Languages } from 'lucide-react';

type Tab = 'appointments' | 'appointmentsList' | 'documents' | 'operations' | 'dashboard' | 'timeTracking';

function App() {
  const { language, setLanguage, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [refreshKey, setRefreshKey] = useState(0);
  const [isAppointmentsMenuOpen, setIsAppointmentsMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const appointmentsMenuRef = useRef<HTMLDivElement>(null);
  const languageMenuRef = useRef<HTMLDivElement>(null);

  function handleOperationCreated() {
    setRefreshKey(prev => prev + 1);
  }

  function handleAppointmentTabClick(tab: Tab) {
    setActiveTab(tab);
    setIsAppointmentsMenuOpen(false);
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (appointmentsMenuRef.current && !appointmentsMenuRef.current.contains(event.target as Node)) {
        setIsAppointmentsMenuOpen(false);
      }
      if (languageMenuRef.current && !languageMenuRef.current.contains(event.target as Node)) {
        setIsLanguageMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200">
      <header className="bg-blue-700 shadow-sm border-b border-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                <Truck className="w-8 h-8 text-yellow-300" />
                {t('appTitle')}
              </h1>
              <p className="text-blue-100 mt-1">
                {t('appSubtitle')}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative" ref={languageMenuRef}>
                <button
                  onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
                >
                  <Languages className="w-5 h-5" />
                  <span className="uppercase font-medium">{language}</span>
                </button>
                {isLanguageMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 w-40 bg-white rounded-lg shadow-2xl border border-gray-200 py-2 z-[9999]">
                    <button
                      onClick={() => {
                        setLanguage('fr');
                        setIsLanguageMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                        language === 'fr'
                          ? 'bg-blue-50 text-blue-700 font-semibold'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {t('french')}
                    </button>
                    <button
                      onClick={() => {
                        setLanguage('en');
                        setIsLanguageMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                        language === 'en'
                          ? 'bg-blue-50 text-blue-700 font-semibold'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {t('english')}
                    </button>
                  </div>
                )}
              </div>
              <div className="relative" ref={appointmentsMenuRef}>
              <button
                onClick={() => setIsAppointmentsMenuOpen(!isAppointmentsMenuOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-blue-900 font-semibold rounded-lg hover:bg-yellow-300 transition-colors shadow-md"
              >
                <Calendar className="w-5 h-5" />
                {t('appointments')}
                <ChevronDown className={`w-4 h-4 transition-transform ${isAppointmentsMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              {isAppointmentsMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-lg shadow-2xl border border-gray-200 py-2 z-[9999]">
                  <button
                    onClick={() => handleAppointmentTabClick('appointments')}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                      activeTab === 'appointments'
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Calendar className="w-4 h-4" />
                    {t('takeAppointment')}
                  </button>
                  <button
                    onClick={() => handleAppointmentTabClick('appointmentsList')}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                      activeTab === 'appointmentsList'
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <List className="w-4 h-4" />
                    {t('appointmentsList')}
                  </button>
                </div>
              )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <nav className="bg-white border-b border-blue-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 overflow-x-auto">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-2 px-6 py-4 font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'dashboard'
                  ? 'border-blue-600 text-blue-700'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              {t('dashboard')}
            </button>
            <button
              onClick={() => setActiveTab('operations')}
              className={`flex items-center gap-2 px-6 py-4 font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'operations'
                  ? 'border-blue-600 text-blue-700'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              <Truck className="w-5 h-5" />
              {t('operationsTracking')}
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className={`flex items-center gap-2 px-6 py-4 font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'documents'
                  ? 'border-blue-600 text-blue-700'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              <FileText className="w-5 h-5" />
              {t('documents')}
            </button>
            <button
              onClick={() => setActiveTab('timeTracking')}
              className={`flex items-center gap-2 px-6 py-4 font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'timeTracking'
                  ? 'border-blue-600 text-blue-700'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              <Clock className="w-5 h-5" />
              {t('timeReports')}
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <QuickActions onOperationCreated={handleOperationCreated} />
            <OperationsTracking key={refreshKey} />
          </div>
        )}
        {activeTab === 'operations' && <OperationsTracking key={refreshKey} />}
        {activeTab === 'appointments' && <AppointmentBooking />}
        {activeTab === 'appointmentsList' && <AppointmentsList />}
        {activeTab === 'documents' && <DocumentUpload />}
        {activeTab === 'timeTracking' && <TimeTracking />}
      </main>

      <footer className="bg-blue-700 border-t border-blue-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-blue-100 text-sm">
            {t('footer')}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
