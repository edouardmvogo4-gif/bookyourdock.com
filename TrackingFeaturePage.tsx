import { Clock, Activity, TrendingUp, BarChart3, Zap } from 'lucide-react';
import { FeaturePageNav } from './FeaturePageNav';
import { Footer } from './Footer';
import { featurePageTranslations } from './featurePageTranslations';
import { useLanguage } from './LanguageContext';

export function TrackingFeaturePage() {
  const { language, setLanguage } = useLanguage();
  const t = featurePageTranslations[language].tracking;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <FeaturePageNav currentPage="tracking" language={language} onLanguageChange={setLanguage} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-block bg-gradient-to-r from-green-600 to-teal-600 p-4 md:p-6 rounded-2xl shadow-2xl mb-4 md:mb-6">
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
            <div className="flex-shrink-0 w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg mx-auto md:mx-0">
              <Activity className="w-10 h-10 md:w-14 md:h-14 text-white" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">{t.liveMonitoring}</h3>
              <p className="text-gray-700">
                {t.liveMonitoringDesc}
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="p-6 bg-green-50 rounded-xl border-2 border-green-200 hover:border-green-400 transition-all hover:shadow-lg">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                <Activity className="w-7 h-7 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">{t.feature1Title}</h4>
              <p className="text-gray-700">
                {t.feature1Desc}
              </p>
            </div>
            <div className="p-6 bg-blue-50 rounded-xl border-2 border-blue-200 hover:border-blue-400 transition-all hover:shadow-lg">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-7 h-7 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">{t.feature2Title}</h4>
              <p className="text-gray-700">
                {t.feature2Desc}
              </p>
            </div>
            <div className="p-6 bg-purple-50 rounded-xl border-2 border-purple-200 hover:border-purple-400 transition-all hover:shadow-lg">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">{t.feature3Title}</h4>
              <p className="text-gray-700">
                {t.feature3Desc}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 lg:p-12 mb-8 md:mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">{t.features}</h3>

          <div className="space-y-6 md:space-y-8">
            <div className="border-l-4 border-blue-600 pl-4 md:pl-8 group step-item step-connector text-blue-600">
              <div className="flex flex-col sm:flex-row items-start gap-3 md:gap-4 mb-4">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform flex-shrink-0 relative z-10 mx-auto sm:mx-0">
                  <Clock className="w-7 h-7 md:w-9 md:h-9 text-white" />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-2">{t.timestamping}</h4>
                  <p className="text-sm md:text-base text-gray-600">
                    {t.timestampingDesc}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-purple-600 pl-4 md:pl-8 group step-item text-purple-600">
              <div className="flex flex-col sm:flex-row items-start gap-3 md:gap-4 mb-4">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform flex-shrink-0 relative z-10 mx-auto sm:mx-0">
                  <Zap className="w-7 h-7 md:w-9 md:h-9 text-white" />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-2">{t.multiUser}</h4>
                  <p className="text-sm md:text-base text-gray-600">
                    {t.multiUserDesc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl shadow-xl p-6 md:p-8 lg:p-12 text-white mb-8 md:mb-12">
          <h3 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">{t.dashboardExample}</h3>
          <div className="space-y-4">
            <div className="bg-white bg-opacity-20 rounded-xl p-6 backdrop-blur-sm flex items-center justify-between">
              <div>
                <p className="font-semibold text-lg">{t.carrier1}</p>
                <p className="text-sm text-green-100">{t.plate} AB-123-CD</p>
                <p className="text-xs text-green-200 font-semibold">{t.mission} MISS-20241202-0001</p>
              </div>
              <div className="text-right">
                <span className="px-4 py-2 bg-green-500 rounded-full text-sm font-semibold">
                  {t.statusLoading}
                </span>
                <p className="text-xs text-green-100 mt-2">{t.elapsedTime} 45 min</p>
              </div>
            </div>

            <div className="bg-white bg-opacity-20 rounded-xl p-6 backdrop-blur-sm flex items-center justify-between">
              <div>
                <p className="font-semibold text-lg">{t.carrier2}</p>
                <p className="text-sm text-green-100">{t.plate} EF-456-GH</p>
                <p className="text-xs text-green-200 font-semibold">{t.mission} MISS-20241202-0002</p>
              </div>
              <div className="text-right">
                <span className="px-4 py-2 bg-yellow-500 rounded-full text-sm font-semibold">
                  {t.statusWaiting}
                </span>
                <p className="text-xs text-green-100 mt-2">{t.waitTime} 12 min</p>
              </div>
            </div>

            <div className="bg-white bg-opacity-20 rounded-xl p-6 backdrop-blur-sm flex items-center justify-between">
              <div>
                <p className="font-semibold text-lg">{t.carrier3}</p>
                <p className="text-sm text-green-100">{t.plate} IJ-789-KL</p>
                <p className="text-xs text-green-200 font-semibold">{t.mission} MISS-20241202-0003</p>
              </div>
              <div className="text-right">
                <span className="px-4 py-2 bg-orange-500 rounded-full text-sm font-semibold">
                  {t.statusUnloading}
                </span>
                <p className="text-xs text-green-100 mt-2">{t.elapsedTime} 28 min</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <BarChart3 className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{t.liveMetrics}</h3>
            <p className="text-gray-700 mb-4">
              {t.liveMetricsDesc}
            </p>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600">{t.operationsInProgress}</p>
                <p className="text-2xl font-bold text-blue-600">8</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600">{t.avgTime}</p>
                <p className="text-2xl font-bold text-green-600">42 min</p>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg">
                <p className="text-sm text-gray-600">{t.waiting}</p>
                <p className="text-2xl font-bold text-orange-600">3</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <TrendingUp className="w-12 h-12 text-green-600 mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{t.trends}</h3>
            <p className="text-gray-700 mb-4">
              {t.trendsDesc}
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                {t.trend1}
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                {t.trend2}
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                {t.trend3}
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                {t.trend4}
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <Activity className="w-12 h-12 text-purple-600 mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{t.alerts}</h3>
            <p className="text-gray-700 mb-4">
              {t.alertsDesc}
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                {t.alert1}
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                {t.alert2}
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                {t.alert3}
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                {t.alert4}
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-3xl font-bold text-gray-900 mb-6">{t.benefits}</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-l-4 border-blue-600 pl-6">
              <h4 className="text-xl font-bold text-gray-900 mb-2">{t.benefit1Title}</h4>
              <p className="text-gray-700">
                {t.benefit1Desc}
              </p>
            </div>
            <div className="border-l-4 border-green-600 pl-6">
              <h4 className="text-xl font-bold text-gray-900 mb-2">{t.benefit2Title}</h4>
              <p className="text-gray-700">
                {t.benefit2Desc}
              </p>
            </div>
            <div className="border-l-4 border-orange-600 pl-6">
              <h4 className="text-xl font-bold text-gray-900 mb-2">{t.benefit3Title}</h4>
              <p className="text-gray-700">
                {t.benefit3Desc}
              </p>
            </div>
            <div className="border-l-4 border-purple-600 pl-6">
              <h4 className="text-xl font-bold text-gray-900 mb-2">{t.benefit4Title}</h4>
              <p className="text-gray-700">
                {t.benefit4Desc}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer language={language} />
    </div>
  );
}
