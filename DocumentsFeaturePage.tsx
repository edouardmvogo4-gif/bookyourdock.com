import { FileText, Upload, Download, Archive, Search, Shield } from 'lucide-react';
import { FeaturePageNav } from './FeaturePageNav';
import { Footer } from './Footer';
import { featurePageTranslations } from './featurePageTranslations';
import { useLanguage } from './LanguageContext';

export function DocumentsFeaturePage() {
  const { language, setLanguage } = useLanguage();
  const t = featurePageTranslations[language].documents;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <FeaturePageNav currentPage="documents" language={language} onLanguageChange={setLanguage} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-block bg-gradient-to-r from-orange-600 to-red-600 p-4 md:p-6 rounded-2xl shadow-2xl mb-4 md:mb-6">
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
            <div className="flex-shrink-0 w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg mx-auto md:mx-0">
              <FileText className="w-10 h-10 md:w-14 md:h-14 text-white" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">{t.secureStorage}</h3>
              <p className="text-gray-700">
                {t.secureStorageDesc}
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="p-6 bg-orange-50 rounded-xl border-2 border-orange-200 hover:border-orange-400 transition-all hover:shadow-lg">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">{t.maxSecurity}</h4>
              <p className="text-gray-700 mb-4">
                {t.maxSecurityDesc}
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 font-bold">•</span>
                  <span>{t.security1}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 font-bold">•</span>
                  <span>{t.security2}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 font-bold">•</span>
                  <span>{t.security3}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 font-bold">•</span>
                  <span>{t.security4}</span>
                </li>
              </ul>
            </div>
            <div className="p-6 bg-blue-50 rounded-xl border-2 border-blue-200 hover:border-blue-400 transition-all hover:shadow-lg">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-7 h-7 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">{t.enrichedMetadata}</h4>
              <p className="text-gray-700 mb-4">
                {t.enrichedMetadataDesc}
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>{t.metadata1}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>{t.metadata2}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>{t.metadata3}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>{t.metadata4}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>{t.metadata5}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 lg:p-12 mb-8 md:mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">{t.lifecycle}</h3>

          <div className="space-y-6 md:space-y-8">
            <div className="border-l-4 border-blue-600 pl-4 md:pl-8 group step-item step-connector text-blue-600">
              <div className="flex flex-col sm:flex-row items-start gap-3 md:gap-4 mb-4">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform flex-shrink-0 relative z-10 mx-auto sm:mx-0">
                  <Upload className="w-7 h-7 md:w-9 md:h-9 text-white" />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-2">{t.step1Title}</h4>
                  <p className="text-sm md:text-base text-gray-600">
                    {t.step1Desc}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-purple-600 pl-4 md:pl-8 group step-item step-connector text-purple-600">
              <div className="flex flex-col sm:flex-row items-start gap-3 md:gap-4 mb-4">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform flex-shrink-0 relative z-10 mx-auto sm:mx-0">
                  <Search className="w-7 h-7 md:w-9 md:h-9 text-white" />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-2">{t.step2Title}</h4>
                  <p className="text-sm md:text-base text-gray-600">
                    {t.step2Desc}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-green-600 pl-4 md:pl-8 group step-item step-connector text-green-600">
              <div className="flex flex-col sm:flex-row items-start gap-3 md:gap-4 mb-4">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform flex-shrink-0 relative z-10 mx-auto sm:mx-0">
                  <Archive className="w-7 h-7 md:w-9 md:h-9 text-white" />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-2">{t.step3Title}</h4>
                  <p className="text-sm md:text-base text-gray-600">
                    {t.step3Desc}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-orange-600 pl-8 group step-item text-orange-600">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform flex-shrink-0 relative z-10">
                  <Download className="w-9 h-9 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{t.step4Title}</h4>
                  <p className="text-gray-600">
                    {t.step4Desc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl shadow-xl p-12 text-white mb-12">
          <h3 className="text-3xl font-bold mb-8">{t.supportedTypes}</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: FileText, title: t.type1Title, desc: t.type1Desc },
              { icon: Shield, title: t.type2Title, desc: t.type2Desc },
              { icon: FileText, title: t.type3Title, desc: t.type3Desc },
              { icon: Archive, title: t.type4Title, desc: t.type4Desc },
            ].map((type, index) => {
              const Icon = type.icon;
              return (
                <div key={index} className="bg-white bg-opacity-20 rounded-xl p-6 backdrop-blur-sm">
                  <Icon className="w-12 h-12 mb-4" />
                  <h4 className="text-lg font-bold mb-2">{type.title}</h4>
                  <p className="text-sm text-orange-100">{type.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <Download className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{t.directDownload}</h3>
            <p className="text-gray-700 mb-4">
              {t.directDownloadDesc}
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                {t.download1}
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                {t.download2}
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                {t.download3}
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <Shield className="w-12 h-12 text-green-600 mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{t.maxSecurityTitle}</h3>
            <p className="text-gray-700 mb-4">
              {t.maxSecurityDesc2}
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                {t.securityFeature1}
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                {t.securityFeature2}
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                {t.securityFeature3}
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-3xl font-bold text-gray-900 mb-6">{t.advancedFeatures}</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border-l-4 border-blue-600 pl-6">
              <h4 className="text-xl font-bold text-gray-900 mb-2">{t.advFeature1Title}</h4>
              <p className="text-gray-700">
                {t.advFeature1Desc}
              </p>
            </div>
            <div className="border-l-4 border-green-600 pl-6">
              <h4 className="text-xl font-bold text-gray-900 mb-2">{t.advFeature2Title}</h4>
              <p className="text-gray-700">
                {t.advFeature2Desc}
              </p>
            </div>
            <div className="border-l-4 border-orange-600 pl-6">
              <h4 className="text-xl font-bold text-gray-900 mb-2">{t.advFeature3Title}</h4>
              <p className="text-gray-700">
                {t.advFeature3Desc}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer language={language} />
    </div>
  );
}
