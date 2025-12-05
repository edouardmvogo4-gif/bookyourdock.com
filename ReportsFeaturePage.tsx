import { BarChart3, TrendingUp, PieChart, Download, Calendar, FileText } from 'lucide-react';
import { FeaturePageNav } from './FeaturePageNav';
import { Footer } from './Footer';
import { featurePageTranslations } from './featurePageTranslations';
import { useLanguage } from './LanguageContext';

export function ReportsFeaturePage() {
  const { language, setLanguage } = useLanguage();
  const t = featurePageTranslations[language].reports;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <FeaturePageNav currentPage="reports" language={language} onLanguageChange={setLanguage} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-block bg-gradient-to-r from-purple-600 to-blue-700 p-4 md:p-6 rounded-2xl shadow-2xl mb-4 md:mb-6">
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
            <div className="flex-shrink-0 w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg mx-auto md:mx-0">
              <BarChart3 className="w-10 h-10 md:w-14 md:h-14 text-white" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">{t.bi}</h3>
              <p className="text-gray-700">
                {t.biDesc}
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="p-6 bg-purple-50 rounded-xl border-2 border-purple-200 hover:border-purple-400 transition-all hover:shadow-lg">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-7 h-7 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">{t.feature1Title}</h4>
              <p className="text-gray-700">
                {t.feature1Desc}
              </p>
            </div>
            <div className="p-6 bg-blue-50 rounded-xl border-2 border-blue-200 hover:border-blue-400 transition-all hover:shadow-lg">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">{t.feature2Title}</h4>
              <p className="text-gray-700">
                {t.feature2Desc}
              </p>
            </div>
            <div className="p-6 bg-green-50 rounded-xl border-2 border-green-200 hover:border-green-400 transition-all hover:shadow-lg">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                <Download className="w-7 h-7 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">{t.feature3Title}</h4>
              <p className="text-gray-700">
                {t.feature3Desc}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 lg:p-12 mb-8 md:mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">{t.metrics}</h3>

          <div className="space-y-6 md:space-y-8">
            <div className="border-l-4 border-blue-600 pl-4 md:pl-8 group step-item step-connector text-blue-600">
              <div className="flex flex-col sm:flex-row items-start gap-3 md:gap-4 mb-4">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform flex-shrink-0 relative z-10 mx-auto sm:mx-0">
                  <TrendingUp className="w-7 h-7 md:w-9 md:h-9 text-white" />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-2">{t.performance}</h4>
                  <p className="text-sm md:text-base text-gray-600">
                    {t.performanceDesc}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-green-600 pl-4 md:pl-8 group step-item text-green-600">
              <div className="flex flex-col sm:flex-row items-start gap-3 md:gap-4 mb-4">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform flex-shrink-0 relative z-10 mx-auto sm:mx-0">
                  <PieChart className="w-7 h-7 md:w-9 md:h-9 text-white" />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-2">{t.statistics}</h4>
                  <p className="text-sm md:text-base text-gray-600">
                    {t.statisticsDesc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl shadow-xl p-6 md:p-8 lg:p-12 text-white mb-8 md:mb-12">
          <h3 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">{t.reportTypes}</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white bg-opacity-20 rounded-xl p-6 backdrop-blur-sm">
              <Calendar className="w-12 h-12 mb-4" />
              <h4 className="text-xl font-bold mb-2">{t.dailyReports}</h4>
              <p className="text-purple-100 text-sm mb-4">
                {t.dailyDesc}
              </p>
              <ul className="space-y-1 text-xs text-purple-100">
                <li>{t.daily1}</li>
                <li>{t.daily2}</li>
                <li>{t.daily3}</li>
                <li>{t.daily4}</li>
              </ul>
            </div>

            <div className="bg-white bg-opacity-20 rounded-xl p-6 backdrop-blur-sm">
              <BarChart3 className="w-12 h-12 mb-4" />
              <h4 className="text-xl font-bold mb-2">{t.weeklyReports}</h4>
              <p className="text-purple-100 text-sm mb-4">
                {t.weeklyDesc}
              </p>
              <ul className="space-y-1 text-xs text-purple-100">
                <li>{t.weekly1}</li>
                <li>{t.weekly2}</li>
                <li>{t.weekly3}</li>
                <li>{t.weekly4}</li>
              </ul>
            </div>

            <div className="bg-white bg-opacity-20 rounded-xl p-6 backdrop-blur-sm">
              <TrendingUp className="w-12 h-12 mb-4" />
              <h4 className="text-xl font-bold mb-2">{t.monthlyReports}</h4>
              <p className="text-purple-100 text-sm mb-4">
                {t.monthlyDesc}
              </p>
              <ul className="space-y-1 text-xs text-purple-100">
                <li>{t.monthly1}</li>
                <li>{t.monthly2}</li>
                <li>{t.monthly3}</li>
                <li>{t.monthly4}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <Download className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{t.dataExport}</h3>
            <p className="text-gray-700 mb-4">
              {t.dataExportDesc}
            </p>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg flex items-center justify-between">
                <span className="text-gray-700 font-semibold">{t.excelCsv}</span>
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div className="p-3 bg-green-50 rounded-lg flex items-center justify-between">
                <span className="text-gray-700 font-semibold">{t.pdfReports}</span>
                <FileText className="w-5 h-5 text-green-600" />
              </div>
              <div className="p-3 bg-purple-50 rounded-lg flex items-center justify-between">
                <span className="text-gray-700 font-semibold">{t.jsonApi}</span>
                <FileText className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <Calendar className="w-12 h-12 text-green-600 mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{t.customPeriods}</h3>
            <p className="text-gray-700 mb-4">
              {t.customPeriodsDesc}
            </p>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">{t.today}</p>
                <p className="text-xl font-bold text-gray-900">{t.todayDesc}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">{t.thisWeek}</p>
                <p className="text-xl font-bold text-gray-900">{t.thisWeekDesc}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">{t.custom}</p>
                <p className="text-xl font-bold text-gray-900">{t.customDesc}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-8">{t.exampleMetrics}</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <p className="text-4xl font-bold text-blue-600 mb-2">156</p>
              <p className="text-gray-700 font-semibold">{t.opsThisMonth}</p>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-xl">
              <p className="text-4xl font-bold text-green-600 mb-2">38 min</p>
              <p className="text-gray-700 font-semibold">{t.avgTimeLabel}</p>
            </div>
            <div className="text-center p-6 bg-orange-50 rounded-xl">
              <p className="text-4xl font-bold text-orange-600 mb-2">92%</p>
              <p className="text-gray-700 font-semibold">{t.satisfactionRate}</p>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-xl">
              <p className="text-4xl font-bold text-purple-600 mb-2">14:00</p>
              <p className="text-gray-700 font-semibold">{t.peakActivity}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-3xl font-bold text-gray-900 mb-6">{t.usages}</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border-l-4 border-blue-600 pl-6">
              <h4 className="text-xl font-bold text-gray-900 mb-2">{t.usage1Title}</h4>
              <p className="text-gray-700">
                {t.usage1Desc}
              </p>
            </div>
            <div className="border-l-4 border-green-600 pl-6">
              <h4 className="text-xl font-bold text-gray-900 mb-2">{t.usage2Title}</h4>
              <p className="text-gray-700">
                {t.usage2Desc}
              </p>
            </div>
            <div className="border-l-4 border-orange-600 pl-6">
              <h4 className="text-xl font-bold text-gray-900 mb-2">{t.usage3Title}</h4>
              <p className="text-gray-700">
                {t.usage3Desc}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer language={language} />
    </div>
  );
}
