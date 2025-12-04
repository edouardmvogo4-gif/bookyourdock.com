import { useState } from 'react';
import {
  Truck,
  Calendar,
  FileText,
  Clock,
  BarChart3,
  Shield,
  CheckCircle,
  Menu,
  X,
  ChevronDown
} from 'lucide-react';
import { ContactForm } from '../components/ContactForm';
import { ContactDropdown } from '../components/ContactDropdown';
import { Footer } from '../components/Footer';
import { Logo } from '../components/Logo';
import { LanguageSelector } from '../components/LanguageSelector';
import { landingTranslations } from '../lib/landingTranslations';
import { landingContentTranslations } from '../lib/landingContentTranslations';
import { useLanguage } from '../contexts/LanguageContext';

type Tab = 'overview' | 'operations' | 'appointments' | 'documents' | 'tracking' | 'reports';

export function LandingPage() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [featuresMenuOpen, setFeaturesMenuOpen] = useState(false);
  const [contactFormOpen, setContactFormOpen] = useState(false);
  const { language, setLanguage } = useLanguage();

  const t = landingTranslations[language];

  const tabs = [
    { id: 'overview' as Tab, label: t.features.overview, icon: Truck },
    { id: 'operations' as Tab, label: t.features.operations, icon: BarChart3 },
    { id: 'appointments' as Tab, label: t.features.appointments, icon: Calendar },
    { id: 'documents' as Tab, label: t.features.documents, icon: FileText },
    { id: 'tracking' as Tab, label: t.features.tracking, icon: Clock },
    { id: 'reports' as Tab, label: t.features.reports, icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-4">
              <Logo size="medium" />
              <LanguageSelector
                currentLanguage={language}
                onLanguageChange={setLanguage}
              />
            </div>

            <div className="hidden md:flex items-center gap-3">
              <div className="relative">
                <button
                  onClick={() => setFeaturesMenuOpen(!featuresMenuOpen)}
                  onMouseEnter={() => setFeaturesMenuOpen(true)}
                  className="px-5 py-2.5 rounded-lg text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all flex items-center gap-1.5 shadow-md hover:shadow-lg hover:scale-105 transform"
                >
                  {t.nav.features}
                  <ChevronDown className={`w-4 h-4 transition-transform ${featuresMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                {featuresMenuOpen && (
                  <div
                    className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-2xl border border-gray-200 py-2 z-50"
                    onMouseLeave={() => setFeaturesMenuOpen(false)}
                  >
                    <a
                      href="/features/operations"
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      <BarChart3 className="w-5 h-5" />
                      {t.features.operations}
                    </a>
                    <a
                      href="/features/appointments"
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      <Calendar className="w-5 h-5" />
                      {t.features.appointments}
                    </a>
                    <a
                      href="/features/documents"
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      <FileText className="w-5 h-5" />
                      {t.features.documents}
                    </a>
                    <a
                      href="/features/tracking"
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      <Clock className="w-5 h-5" />
                      {t.features.tracking}
                    </a>
                    <a
                      href="/features/reports"
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      <Shield className="w-5 h-5" />
                      {t.features.reports}
                    </a>
                  </div>
                )}
              </div>
              <ContactDropdown language={language} />
              <button
                onClick={() => setContactFormOpen(true)}
                className="px-5 py-2.5 rounded-lg text-sm font-bold bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg hover:scale-105 transform"
              >
                {t.nav.requestDemo}
              </button>
            </div>

            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <div className="flex flex-col gap-4">
                <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">
                  {t.nav.features}
                </a>
                <button
                  onClick={() => setContactFormOpen(true)}
                  className="text-gray-700 hover:text-blue-600 transition-colors font-semibold text-left"
                >
                  {t.nav.requestDemo}
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      <section className="relative py-32 px-4 overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1427107/pexels-photo-1427107.jpeg?auto=compress&cs=tinysrgb&w=1920)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/80 to-slate-900/70"></div>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            {t.hero.title}
            <span className="block text-blue-400 mt-2">{t.hero.titleHighlight}</span>
          </h1>
          <p className="text-lg text-gray-100 mb-8 max-w-3xl mx-auto drop-shadow-md">
            {t.hero.description}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setContactFormOpen(true)}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-base font-semibold border-2 border-white hover:bg-blue-50 transition-all shadow-xl"
            >
              {t.hero.requestDemo}
            </button>
          </div>
        </div>
      </section>

      <section id="features" className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            {t.features.title}
          </h2>

          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              const handleClick = () => {
                if (tab.id === 'overview') {
                  setActiveTab(tab.id);
                } else {
                  window.history.pushState({}, '', `/features/${tab.id}`);
                  window.dispatchEvent(new PopStateEvent('popstate'));
                }
              };

              return (
                <button
                  key={tab.id}
                  onClick={handleClick}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-2xl p-8 md:p-12 shadow-xl">
            {activeTab === 'overview' && <OverviewContent language={language} />}
            {activeTab === 'operations' && <OperationsContent language={language} />}
            {activeTab === 'appointments' && <AppointmentsContent language={language} />}
            {activeTab === 'documents' && <DocumentsContent language={language} />}
            {activeTab === 'tracking' && <TrackingContent language={language} />}
            {activeTab === 'reports' && <ReportsContent language={language} />}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            {language === 'fr' ? 'Pourquoi choisir BookYourDock ?' : 'Why choose BookYourDock?'}
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="group bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-blue-200 hover:border-blue-400 hover:scale-105 hover:-translate-y-2">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-blue-400/50 group-hover:scale-110 transition-all duration-300">
                  <Truck className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                {language === 'fr' ? 'Gestion Logistique Tout-en-Un' : 'All-in-One Logistics Management'}
              </h3>
              <p className="text-gray-700 text-center leading-relaxed">
                {language === 'fr'
                  ? 'De la réservation de dock au suivi des opérations, en passant par la gestion documentaire et les rapports analytics. Un TMS complet pour centraliser toutes vos informations clients et chauffeurs, coordonner vos opérations et optimiser la planification de vos quais.'
                  : 'From dock booking to operations tracking, including document management and analytics reports. A complete TMS to centralize all your customer and driver information, coordinate your operations and optimize dock scheduling.'}
              </p>
            </div>
            <div className="group bg-gradient-to-br from-green-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-green-200 hover:border-green-400 hover:scale-105 hover:-translate-y-2">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-green-400/50 group-hover:scale-110 transition-all duration-300">
                  <Shield className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                {language === 'fr' ? 'Système d\'Information Chauffeur' : 'Driver Information System'}
              </h3>
              <p className="text-gray-700 text-center leading-relaxed">
                {language === 'fr'
                  ? 'Système d\'information chauffeurs intégré (SMS et email) combiné à un système de bipeur pour chauffeurs fourni par LEAN&CO. Communiquez rapidement et efficacement avec vos chauffeurs, centralisez toutes leurs informations et simplifiez leur parcours sur votre site logistique avec un suivi en temps réel.'
                  : 'Integrated driver information system (SMS and email) combined with a driver pager system provided by LEAN&CO. Communicate quickly and efficiently with your drivers, centralize all their information and simplify their journey at your logistics site with real-time tracking.'}
              </p>
            </div>
            <div className="group bg-gradient-to-br from-orange-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-orange-200 hover:border-orange-400 hover:scale-105 hover:-translate-y-2">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-orange-400/50 group-hover:scale-110 transition-all duration-300">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                {language === 'fr' ? 'Solution Moderne de Smart Booking' : 'Modern Smart Booking Solution'}
              </h3>
              <p className="text-gray-700 text-center leading-relaxed">
                {language === 'fr'
                  ? 'Une plateforme complète de smart booking pensée pour être moderne, intuitive et performante. Notre logiciel de gestion logistique coordonne la planification de vos quais, gère les informations clients et optimise le parcours des chauffeurs sur votre site avec une interface utilisateur simplifiée.'
                  : 'A complete smart booking platform designed to be modern, intuitive and efficient. Our logistics management software coordinates your dock scheduling, manages customer information and optimizes driver journeys at your site with a simplified user interface.'}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              {language === 'fr' ? 'Fonctionnalités Clés du Logiciel' : 'Key Software Features'}
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <p className="text-gray-700">
                  <strong>{language === 'fr' ? 'Smart Booking' : 'Smart Booking'}</strong> - {language === 'fr' ? 'Réservation intelligente des créneaux de quai' : 'Intelligent dock slot booking'}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <p className="text-gray-700">
                  <strong>{language === 'fr' ? 'Bipeur Chauffeur' : 'Driver Pager'}</strong> - {language === 'fr' ? 'Système d\'alerte et notification instantanée' : 'Instant alert and notification system'}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <p className="text-gray-700">
                  <strong>{language === 'fr' ? 'Informations Chauffeurs' : 'Driver Information'}</strong> - {language === 'fr' ? 'Base de données complète et actualisée' : 'Complete and updated database'}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <p className="text-gray-700">
                  <strong>{language === 'fr' ? 'TMS Intégré' : 'Integrated TMS'}</strong> - {language === 'fr' ? 'Transport Management System complet' : 'Complete Transport Management System'}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <p className="text-gray-700">
                  <strong>Yard Management</strong> - {language === 'fr' ? 'Gestion complète de votre cour de chargement' : 'Complete loading yard management'}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <p className="text-gray-700">
                  <strong>{language === 'fr' ? 'Suivi Temps Réel' : 'Real-Time Tracking'}</strong> - {language === 'fr' ? 'Visibilité instantanée sur toutes les opérations' : 'Instant visibility on all operations'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactForm isOpen={contactFormOpen} onClose={() => setContactFormOpen(false)} language={language} />

      <Footer language={language} />
    </div>
  );
}

function OverviewContent({ language }: { language: Language }) {
  const t = landingTranslations[language];
  const features = [
    { icon: Clock, title: t.features.tracking, description: language === 'fr' ? 'TMS pour visualiser toutes vos opérations en cours' : language === 'en' ? 'TMS to visualize all your ongoing operations' : language === 'de' ? 'TMS zur Visualisierung aller laufenden Operationen' : language === 'it' ? 'TMS per visualizzare tutte le operazioni in corso' : language === 'lb' ? 'TMS fir all Är laufend Operatiounen ze visualiséieren' : 'TMS do wizualizacji wszystkich trwających operacji' },
    { icon: Calendar, title: t.features.appointments, description: language === 'fr' ? 'Planifiez et organisez les arrivées avec le TMS' : language === 'en' ? 'Plan and organize arrivals with the TMS' : language === 'de' ? 'Planen und organisieren Sie Ankünfte mit dem TMS' : language === 'it' ? 'Pianifica e organizza gli arrivi con il TMS' : language === 'lb' ? 'Plant an organiséiert Arrivéeë mam TMS' : 'Planuj i organizuj przyjazdy za pomocą TMS' },
    { icon: FileText, title: t.features.documents, description: language === 'fr' ? 'TMS avec tous vos documents au même endroit' : language === 'en' ? 'TMS with all your documents in one place' : language === 'de' ? 'TMS mit allen Dokumenten an einem Ort' : language === 'it' ? 'TMS con tutti i documenti in un unico posto' : language === 'lb' ? 'TMS mat all Ären Dokumenter op enger Plaz' : 'TMS ze wszystkimi dokumentami w jednym miejscu' },
    { icon: BarChart3, title: t.features.reports, description: language === 'fr' ? 'Analysez vos performances avec le TMS' : language === 'en' ? 'Analyze your performance with the TMS' : language === 'de' ? 'Analysieren Sie Ihre Leistung mit dem TMS' : language === 'it' ? 'Analizza le tue prestazioni con il TMS' : language === 'lb' ? 'Analyséiert Är Leeschtung mam TMS' : 'Analizuj swoją wydajność za pomocą TMS' },
  ];

  return (
    <div>
      <h3 className="text-3xl font-bold text-gray-900 mb-6">
        {language === 'fr' ? 'TMS - BookYourDock - Logiciel Complet de Gestion Logistique' : language === 'en' ? 'TMS - BookYourDock - Complete Logistics Management Software' : language === 'de' ? 'TMS - BookYourDock - Vollständige Logistikverwaltungssoftware' : language === 'it' ? 'TMS - BookYourDock - Software Completo di Gestione Logistica' : language === 'lb' ? 'TMS - BookYourDock - Komplett Logistik Verwaltungssoftware' : 'TMS - BookYourDock - Kompletne Oprogramowanie do Zarządzania Logistyką'}
      </h3>
      <p className="text-lg text-gray-700 mb-8">
        {language === 'fr' ? 'BookYourDock est un TMS (Transport Management System) moderne qui centralise toutes les fonctionnalités nécessaires pour gérer efficacement votre site logistique. Notre solution TMS de Smart Booking optimise la gestion des informations de vos clients, simplifie le parcours des chauffeurs sur votre site et coordonne la planification de vos quais. Avec un système d\'information chauffeurs intégré (SMS et email) et en appui un système de bipeur pour chauffeurs fourni par LEAN&CO, communiquez rapidement et efficacement avec les chauffeurs.' : language === 'en' ? 'BookYourDock is a modern TMS (Transport Management System) that centralizes all the features needed to efficiently manage your logistics site. Our Smart Booking TMS solution optimizes customer information management, simplifies driver journeys at your site and coordinates dock scheduling. With an integrated driver information system (SMS and email) and a driver pager system provided by LEAN&CO, communicate quickly and effectively with drivers.' : language === 'de' ? 'BookYourDock ist ein modernes TMS (Transport Management System), das alle Funktionen zentralisiert, die für eine effiziente Verwaltung Ihres Logistikstandorts erforderlich sind. Unsere Smart Booking TMS-Lösung optimiert die Verwaltung von Kundeninformationen, vereinfacht die Fahrerreisen an Ihrem Standort und koordiniert die Dock-Planung. Mit einem integrierten Fahrerinformationssystem (SMS und E-Mail) und einem von LEAN&CO bereitgestellten Fahrer-Pager-System kommunizieren Sie schnell und effektiv mit Fahrern.' : language === 'it' ? 'BookYourDock è un TMS (Transport Management System) moderno che centralizza tutte le funzionalità necessarie per gestire efficacemente il vostro sito logistico. La nostra soluzione TMS Smart Booking ottimizza la gestione delle informazioni dei clienti, semplifica i percorsi dei conducenti presso il vostro sito e coordina la pianificazione delle banchine. Con un sistema di informazioni per conducenti integrato (SMS ed email) e un sistema di cercapersone per conducenti fornito da LEAN&CO, comunicate rapidamente ed efficacemente con i conducenti.' : language === 'lb' ? 'BookYourDock ass e modernt TMS (Transport Management System) dat all Funktiounen zentraliséiert déi néideg sinn fir Ären Logistiksit effektiv ze verwalten. Eis Smart Booking TMS Léisung optimiséiert d\'Verwaltung vu Clientsinformatiounen, vereinfacht d\'Chauffeurrees um Ären Site a koordinéiert d\'Dock Planung. Mat engem integréierten Chauffeurinformatiounssystem (SMS an Email) an engem Chauffeur-Pager System geliwwert vu LEAN&CO, kommunizéiert séier an effektiv mat Chauffeuren.' : 'BookYourDock to nowoczesny TMS (Transport Management System), który centralizuje wszystkie funkcje potrzebne do efektywnego zarządzania Twoim obiektem logistycznym. Nasze rozwiązanie TMS Smart Booking optymalizuje zarządzanie informacjami o klientach, upraszcza podróże kierowców w Twoim obiekcie i koordynuje planowanie ramp. Dzięki zintegrowanemu systemowi informacji dla kierowców (SMS i email) oraz systemowi pagerów dla kierowców dostarczanemu przez LEAN&CO, komunikuj się szybko i skutecznie z kierowcami.'}
      </p>
      <div className="grid md:grid-cols-2 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <Icon className="w-12 h-12 text-blue-600 mb-4" />
              <h4 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h4>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function OperationsContent({ language }: { language: Language }) {
  const t = landingContentTranslations[language]?.operations || landingContentTranslations['fr'].operations;

  return (
    <div>
      <h4 className="text-3xl font-bold text-gray-900 mb-6">
        {t.title}
      </h4>
      <p className="text-lg text-gray-700 mb-8">
        {t.description}
      </p>
      <div className="space-y-4">
        {t.stages.map((stage, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-md flex items-start gap-4 hover:shadow-lg transition-shadow">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
              {index + 1}
            </div>
            <div>
              <h5 className="text-xl font-bold text-gray-900 mb-2">{stage.title}</h5>
              <p className="text-gray-600">{stage.description}</p>
            </div>
            <CheckCircle className="flex-shrink-0 w-6 h-6 text-green-500 ml-auto" />
          </div>
        ))}
      </div>
      <div className="mt-8 bg-blue-100 border-l-4 border-blue-600 p-6 rounded-r-xl">
        <p className="text-gray-800">
          <strong>{t.advantage}</strong> {t.advantageText}
        </p>
      </div>
    </div>
  );
}

function AppointmentsContent({ language }: { language: Language }) {
  const t = landingContentTranslations[language]?.appointments || landingContentTranslations['fr'].appointments;

  return (
    <div>
      <h4 className="text-3xl font-bold text-gray-900 mb-6">
        {t.title}
      </h4>
      <p className="text-lg text-gray-700 mb-8">
        {t.description}
      </p>
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {t.features.map((feature, index) => (
          <div key={index} className="bg-white rounded-xl p-4 shadow-md flex items-center gap-3 hover:shadow-lg transition-shadow">
            <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
            <p className="text-gray-700">{feature}</p>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl p-8 shadow-lg">
        <h5 className="text-2xl font-bold text-gray-900 mb-4">{t.flexibleSlots}</h5>
        <p className="text-gray-700 mb-4">
          {t.flexibleSlotsDesc}
        </p>
        <div className="flex flex-wrap gap-2">
          {['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'].map((time) => (
            <span key={time} className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-semibold">
              {time}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function DocumentsContent({ language }: { language: Language }) {
  const t = landingContentTranslations[language]?.documents || landingContentTranslations['fr'].documents;

  return (
    <div>
      <h4 className="text-3xl font-bold text-gray-900 mb-6">
        {t.title}
      </h4>
      <p className="text-lg text-gray-700 mb-8">
        {t.description}
      </p>
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {t.features.map((feature, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <FileText className="w-10 h-10 text-blue-600 mb-4" />
            <h5 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h5>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 text-white shadow-lg">
        <h5 className="text-2xl font-bold mb-4">{t.smartArchiving}</h5>
        <p className="text-blue-100 mb-4">
          {t.smartArchivingDesc}
        </p>
        <div className="flex items-center gap-2 text-blue-100">
          <Shield className="w-6 h-6" />
          <span>{t.secureStorage}</span>
        </div>
      </div>
    </div>
  );
}

function TrackingContent({ language }: { language: Language }) {
  const t = landingContentTranslations[language]?.tracking || landingContentTranslations['fr'].tracking;

  return (
    <div>
      <h4 className="text-3xl font-bold text-gray-900 mb-6">
        {t.title}
      </h4>
      <p className="text-lg text-gray-700 mb-8">
        {t.description}
      </p>
      <div className="bg-white rounded-xl p-8 shadow-lg mb-6">
        <h5 className="text-2xl font-bold text-gray-900 mb-6">{t.liveDashboard}</h5>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-green-50 border-l-4 border-green-500 rounded">
            <div>
              <p className="font-semibold text-gray-900">{t.carrier1}</p>
              <p className="text-sm text-gray-600">{t.plate} AB-123-CD</p>
              <p className="text-xs text-blue-600 font-semibold">{t.mission} MISS-20241202-0001</p>
            </div>
            <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
              {t.statusLoading}
            </span>
          </div>
          <div className="flex items-center justify-between p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded">
            <div>
              <p className="font-semibold text-gray-900">{t.carrier2}</p>
              <p className="text-sm text-gray-600">{t.plate} EF-456-GH</p>
              <p className="text-xs text-blue-600 font-semibold">{t.mission} MISS-20241202-0002</p>
            </div>
            <span className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
              {t.statusWaiting}
            </span>
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-md">
          <Clock className="w-10 h-10 text-blue-600 mb-4" />
          <h5 className="text-xl font-bold text-gray-900 mb-2">{t.preciseTimestamp}</h5>
          <p className="text-gray-600">
            {t.preciseTimestampDesc}
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-md">
          <BarChart3 className="w-10 h-10 text-blue-600 mb-4" />
          <h5 className="text-xl font-bold text-gray-900 mb-2">{t.liveMetrics}</h5>
          <p className="text-gray-600">
            {t.liveMetricsDesc}
          </p>
        </div>
      </div>
    </div>
  );
}

function ReportsContent({ language }: { language: Language }) {
  const t = landingContentTranslations[language]?.reports || landingContentTranslations['fr'].reports;

  return (
    <div>
      <h4 className="text-3xl font-bold text-gray-900 mb-6">
        {t.title}
      </h4>
      <p className="text-lg text-gray-700 mb-8">
        {t.description}
      </p>
      <div className="bg-white rounded-xl p-8 shadow-lg mb-6">
        <h5 className="text-2xl font-bold text-gray-900 mb-6">{t.availableMetrics}</h5>
        <div className="grid md:grid-cols-2 gap-4">
          {t.metrics.map((metric, index) => (
            <div key={index} className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
              <BarChart3 className="w-6 h-6 text-blue-600 flex-shrink-0" />
              <p className="text-gray-700">{metric}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white shadow-lg">
          <h5 className="text-xl font-bold mb-4">{t.completeHistory}</h5>
          <p className="text-blue-100 mb-4">
            {t.completeHistoryDesc}
          </p>
          <CheckCircle className="w-8 h-8" />
        </div>
        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 text-white shadow-lg">
          <h5 className="text-xl font-bold mb-4">{t.dataExport}</h5>
          <p className="text-green-100 mb-4">
            {t.dataExportDesc}
          </p>
          <FileText className="w-8 h-8" />
        </div>
      </div>
    </div>
  );
}
