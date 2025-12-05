import { MapPin, Package, CheckCircle, Clock, Truck } from 'lucide-react';
import { FeaturePageNav } from './FeaturePageNav';
import { Footer } from './Footer';
import { featurePageTranslations } from './featurePageTranslations';
import { useLanguage } from './LanguageContext';

export function OperationsFeaturePage() {
  const { language, setLanguage } = useLanguage();
  const t = featurePageTranslations[language].operations;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <FeaturePageNav currentPage="operations" language={language} onLanguageChange={setLanguage} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-block bg-gradient-to-r from-blue-600 to-blue-800 p-4 md:p-6 rounded-2xl shadow-2xl mb-4 md:mb-6">
            <h2 className="page-title text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-0">
              {t.title}
            </h2>
          </div>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-4">
            {t.description}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 lg:p-12 mb-8 md:mb-12">
          <div className="flex flex-col md:flex-row items-start gap-4 md:gap-8">
            <div className="flex-shrink-0 w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg mx-auto md:mx-0">
              <svg className="w-10 h-10 md:w-14 md:h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
              </svg>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">{t.uniqueId}</h3>
              <p className="text-gray-700 mb-4">
                {t.uniqueIdDesc}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 lg:p-12 mb-8 md:mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">{t.processSteps}</h3>
          <div className="space-y-6 md:space-y-8">
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 group step-item step-connector text-green-600">
              <div className="bg-gradient-to-br from-green-400 to-green-600 p-3 md:p-4 rounded-xl flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform relative z-10 w-14 h-14 md:w-16 md:h-16 flex items-center justify-center mx-auto sm:mx-0">
                <MapPin className="w-8 h-8 md:w-12 md:h-12 text-white" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-2">{t.step1Title}</h4>
                <p className="text-sm md:text-base text-gray-600">
                  {t.step1Desc}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 group step-item step-connector text-yellow-600">
              <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 p-3 md:p-4 rounded-xl flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform relative z-10 w-14 h-14 md:w-16 md:h-16 flex items-center justify-center mx-auto sm:mx-0">
                <Clock className="w-8 h-8 md:w-12 md:h-12 text-white" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-2">{t.step2Title}</h4>
                <p className="text-sm md:text-base text-gray-600">
                  {t.step2Desc}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 group step-item step-connector text-orange-600">
              <div className="bg-gradient-to-br from-orange-400 to-orange-600 p-3 md:p-4 rounded-xl flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform relative z-10 w-14 h-14 md:w-16 md:h-16 flex items-center justify-center mx-auto sm:mx-0">
                <Package className="w-8 h-8 md:w-12 md:h-12 text-white" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-2">{t.step3Title}</h4>
                <p className="text-sm md:text-base text-gray-600">
                  {t.step3Desc}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 group step-item step-connector text-blue-600">
              <div className="bg-gradient-to-br from-blue-400 to-blue-600 p-3 md:p-4 rounded-xl flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform relative z-10 w-14 h-14 md:w-16 md:h-16 flex items-center justify-center mx-auto sm:mx-0">
                <Truck className="w-8 h-8 md:w-12 md:h-12 text-white" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-2">{t.step4Title}</h4>
                <p className="text-sm md:text-base text-gray-600">
                  {t.step4Desc}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 group step-item text-green-600">
              <div className="bg-gradient-to-br from-green-500 to-green-700 p-3 md:p-4 rounded-xl flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform relative z-10 w-14 h-14 md:w-16 md:h-16 flex items-center justify-center mx-auto sm:mx-0">
                <CheckCircle className="w-8 h-8 md:w-12 md:h-12 text-white" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-2">{t.step5Title}</h4>
                <p className="text-sm md:text-base text-gray-600">
                  {t.step5Desc}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl shadow-xl p-6 md:p-8 lg:p-12 text-white mb-8 md:mb-12">
          <h3 className="text-2xl md:text-3xl font-bold mb-6">{t.processTitle}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
            {[
              { icon: MapPin, title: t.stage1, color: 'bg-green-500' },
              { icon: Clock, title: t.stage2, color: 'bg-yellow-500' },
              { icon: Package, title: t.stage3, color: 'bg-orange-500' },
              { icon: Truck, title: t.stage4, color: 'bg-blue-500' },
              { icon: CheckCircle, title: t.stage5, color: 'bg-green-600' },
            ].map((stage, index) => {
              const Icon = stage.icon;
              return (
                <div key={index} className="text-center">
                  <div className={`${stage.color} w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3`}>
                    <Icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                  <p className="text-xs md:text-sm font-semibold">{stage.title}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">{t.keyBenefits}</h3>
          <div className="grid md:grid-cols-3 gap-6">
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
          </div>
        </div>
      </div>

      <Footer language={language} />
    </div>
  );
}
