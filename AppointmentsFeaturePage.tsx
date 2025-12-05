import { Calendar, Clock, CheckCircle, Truck, Bell } from 'lucide-react';
import { FeaturePageNav } from '../../components/FeaturePageNav';
import { Footer } from '../../components/Footer';
import { featurePageTranslations } from '../../lib/featurePageTranslations';
import { useLanguage } from '../../contexts/LanguageContext';

export function AppointmentsFeaturePage() {
  const { language, setLanguage } = useLanguage();
  const t = featurePageTranslations[language].appointments;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <FeaturePageNav currentPage="appointments" language={language} onLanguageChange={setLanguage} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 p-4 md:p-6 rounded-2xl shadow-2xl mb-4 md:mb-6">
            <h2 className="page-title text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-0">
              {t.title}
            </h2>
          </div>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-4">
            {t.description}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 lg:p-12 mb-8 md:mb-12">
          <div className="flex flex-col md:flex-row items-start gap-4 md:gap-8 mb-6">
            <div className="flex-shrink-0 w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center shadow-lg mx-auto md:mx-0">
              <Calendar className="w-10 h-10 md:w-14 md:h-14 text-white" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">{t.smartPlanning}</h3>
              <p className="text-gray-700">
                {t.smartPlanningDesc}
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="p-6 bg-blue-50 rounded-xl border-2 border-blue-200 hover:border-blue-400 transition-all hover:shadow-lg">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="w-7 h-7 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">{t.feature1Title}</h4>
              <p className="text-gray-700">
                {t.feature1Desc}
              </p>
            </div>
            <div className="p-6 bg-green-50 rounded-xl border-2 border-green-200 hover:border-green-400 transition-all hover:shadow-lg">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-7 h-7 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">{t.feature2Title}</h4>
              <p className="text-gray-700">
                {t.feature2Desc}
              </p>
            </div>
            <div className="p-6 bg-purple-50 rounded-xl border-2 border-purple-200 hover:border-purple-400 transition-all hover:shadow-lg">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
                <Truck className="w-7 h-7 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">{t.feature3Title}</h4>
              <p className="text-gray-700">
                {t.feature3Desc}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 lg:p-12 mb-8 md:mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">{t.detailedFeatures}</h3>

          <div className="space-y-6 md:space-y-8">
            <div className="border-l-4 border-green-600 pl-4 md:pl-8 group step-item step-connector text-green-600">
              <div className="flex flex-col sm:flex-row items-start gap-3 md:gap-4 mb-4">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform flex-shrink-0 relative z-10 mx-auto sm:mx-0">
                  <Clock className="w-7 h-7 md:w-9 md:h-9 text-white" />
                </div>
                <div className="text-center sm:text-left flex-1">
                  <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-2">{t.flexibleSlots}</h4>
                  <p className="text-sm md:text-base text-gray-600">
                    {t.flexibleSlotsDesc}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-blue-600 pl-4 md:pl-8 group step-item step-connector text-blue-600">
              <div className="flex flex-col sm:flex-row items-start gap-3 md:gap-4 mb-4">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform flex-shrink-0 relative z-10 mx-auto sm:mx-0">
                  <Truck className="w-7 h-7 md:w-9 md:h-9 text-white" />
                </div>
                <div className="text-center sm:text-left flex-1">
                  <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-2">{t.carrierManagement}</h4>
                  <p className="text-sm md:text-base text-gray-600">
                    {t.carrierManagementDesc}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-purple-600 pl-4 md:pl-8 group step-item text-purple-600">
              <div className="flex flex-col sm:flex-row items-start gap-3 md:gap-4 mb-4">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform flex-shrink-0 relative z-10 mx-auto sm:mx-0">
                  <Bell className="w-7 h-7 md:w-9 md:h-9 text-white" />
                </div>
                <div className="text-center sm:text-left flex-1">
                  <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-2">{t.notifications}</h4>
                  <p className="text-sm md:text-base text-gray-600">
                    {t.notificationsDesc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-6 md:p-8 lg:p-12 text-white mb-8 md:mb-12">
          <h3 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">{t.statusTitle}</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white bg-opacity-20 rounded-xl p-6 backdrop-blur-sm">
              <Calendar className="w-12 h-12 mb-4" />
              <h4 className="text-xl font-bold mb-2">{t.status1}</h4>
              <p className="text-blue-100">{t.status1Desc}</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-xl p-6 backdrop-blur-sm">
              <CheckCircle className="w-12 h-12 mb-4" />
              <h4 className="text-xl font-bold mb-2">{t.status2}</h4>
              <p className="text-blue-100">{t.status2Desc}</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-xl p-6 backdrop-blur-sm">
              <Clock className="w-12 h-12 mb-4" />
              <h4 className="text-xl font-bold mb-2">{t.status3}</h4>
              <p className="text-blue-100">{t.status3Desc}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-3xl font-bold text-gray-900 mb-6">{t.completeFeatures}</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {[t.feature1, t.feature2, t.feature3, t.feature4, t.feature5, t.feature6, t.feature7, t.feature8].map((feature, index) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                <p className="text-gray-700">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer language={language} />
    </div>
  );
}
