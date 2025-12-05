import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { useState } from 'react';
import { Logo } from './Logo';
import type { Language } from './LanguageContext';

interface FooterProps {
  language?: Language;
}

export function Footer({ language = 'fr' }: FooterProps) {
  const [showLegal, setShowLegal] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const content = {
    fr: {
      rights: 'Tous droits réservés',
      legal: 'Mentions légales',
      privacy: 'Politique de confidentialité',
      terms: 'Conditions générales',
      contact: 'Contact',
      about: 'À propos',
      aboutText: 'BookYourDock est une solution de gestion de cour développée et éditée par ESMATECH.',
      company: 'ESMATECH',
      address: 'Adresse',
      links: 'Liens utiles',
      followUs: 'Suivez-nous',
      esmatechRights: 'BookYourDock est une propriété de ESMATECH'
    },
    en: {
      rights: 'All rights reserved',
      legal: 'Legal notice',
      privacy: 'Privacy policy',
      terms: 'Terms and conditions',
      contact: 'Contact',
      about: 'About',
      aboutText: 'BookYourDock is a yard management solution developed and published by ESMATECH.',
      company: 'ESMATECH',
      address: 'Address',
      links: 'Useful links',
      followUs: 'Follow us',
      esmatechRights: 'BookYourDock is property of ESMATECH'
    },
    de: {
      rights: 'Alle Rechte vorbehalten',
      legal: 'Rechtliche Hinweise',
      privacy: 'Datenschutzrichtlinie',
      terms: 'Allgemeine Geschäftsbedingungen',
      contact: 'Kontakt',
      about: 'Über uns',
      aboutText: 'BookYourDock ist eine Hofverwaltungslösung, entwickelt und herausgegeben von ESMATECH.',
      company: 'ESMATECH',
      address: 'Adresse',
      links: 'Nützliche Links',
      followUs: 'Folgen Sie uns',
      esmatechRights: 'BookYourDock ist Eigentum von ESMATECH'
    },
    it: {
      rights: 'Tutti i diritti riservati',
      legal: 'Note legali',
      privacy: 'Informativa sulla privacy',
      terms: 'Termini e condizioni',
      contact: 'Contatto',
      about: 'Chi siamo',
      aboutText: 'BookYourDock è una soluzione di gestione cortile sviluppata e pubblicata da ESMATECH.',
      company: 'ESMATECH',
      address: 'Indirizzo',
      links: 'Link utili',
      followUs: 'Seguici',
      esmatechRights: 'BookYourDock è proprietà di ESMATECH'
    },
    lb: {
      rights: 'All Rechter reservéiert',
      legal: 'Rechtlech Hiwäiser',
      privacy: 'Dateschutzrichtlinn',
      terms: 'Allgemeng Geschäftsbedéngungen',
      contact: 'Kontakt',
      about: 'Iwwer eis',
      aboutText: 'BookYourDock ass eng Haff Verwaltungsléisung entwéckelt a publizéiert vun ESMATECH.',
      company: 'ESMATECH',
      address: 'Adress',
      links: 'Nëtzlech Linken',
      followUs: 'Follegt eis',
      esmatechRights: 'BookYourDock ass Eegedum vun ESMATECH'
    },
    pl: {
      rights: 'Wszelkie prawa zastrzeżone',
      legal: 'Informacje prawne',
      privacy: 'Polityka prywatności',
      terms: 'Warunki użytkowania',
      contact: 'Kontakt',
      about: 'O nas',
      aboutText: 'BookYourDock to rozwiązanie do zarządzania placem opracowane i wydane przez ESMATECH.',
      company: 'ESMATECH',
      address: 'Adres',
      links: 'Przydatne linki',
      followUs: 'Śledź nas',
      esmatechRights: 'BookYourDock jest własnością ESMATECH'
    }
  };

  const t = content[language] || content.fr;

  const closeLegalModals = () => {
    setShowLegal(false);
    setShowPrivacy(false);
    setShowTerms(false);
  };

  return (
    <>
      <footer className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-20 px-4 mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-blue-600/20 backdrop-blur-sm rounded-2xl p-6 border border-blue-400/30 hover:border-blue-400/60 transition-all shadow-xl">
              <div className="mb-4">
                <Logo size="medium" />
                <p className="text-xs text-blue-300 mt-2 ml-1">Powered by {t.company}</p>
              </div>
              <p className="text-sm text-gray-200 leading-relaxed">
                {t.aboutText}
              </p>
            </div>

            <div className="bg-gradient-to-br from-emerald-600/20 via-teal-600/20 to-emerald-600/20 backdrop-blur-sm rounded-2xl p-6 border border-emerald-400/30 hover:border-emerald-400/60 transition-all shadow-xl">
              <h4 className="font-bold mb-4 text-emerald-300 text-lg flex items-center gap-2">
                <Mail className="w-5 h-5" />
                {t.contact}
              </h4>
              <div className="space-y-3 text-sm text-gray-200">
                <a href="mailto:contact@bookyourdock.com" className="flex items-start gap-2 hover:text-emerald-300 transition-colors group">
                  <span className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center group-hover:bg-emerald-500/30 transition-colors flex-shrink-0">
                    <Mail className="w-4 h-4 text-emerald-400" />
                  </span>
                  <span className="break-all">contact@bookyourdock.com</span>
                </a>
                <a href="tel:0979152675" className="flex items-center gap-2 hover:text-emerald-300 transition-colors group">
                  <span className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center group-hover:bg-emerald-500/30 transition-colors">
                    <Phone className="w-4 h-4 text-emerald-400" />
                  </span>
                  <span>09 79 15 26 75</span>
                </a>
                <div className="flex items-center gap-2 group">
                  <span className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-emerald-400" />
                  </span>
                  <span>France</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-600/20 via-orange-600/20 to-amber-600/20 backdrop-blur-sm rounded-2xl p-6 border border-amber-400/30 hover:border-amber-400/60 transition-all shadow-xl">
              <h4 className="font-bold mb-4 text-amber-300 text-lg flex items-center gap-2">
                <Globe className="w-5 h-5" />
                {t.links}
              </h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <button
                    onClick={() => setShowLegal(true)}
                    className="w-full text-left px-3 py-2 bg-amber-500/10 hover:bg-amber-500/20 rounded-lg text-gray-200 hover:text-white transition-all border border-amber-400/20 hover:border-amber-400/40"
                  >
                    {t.legal}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setShowPrivacy(true)}
                    className="w-full text-left px-3 py-2 bg-amber-500/10 hover:bg-amber-500/20 rounded-lg text-gray-200 hover:text-white transition-all border border-amber-400/20 hover:border-amber-400/40"
                  >
                    {t.privacy}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setShowTerms(true)}
                    className="w-full text-left px-3 py-2 bg-amber-500/10 hover:bg-amber-500/20 rounded-lg text-gray-200 hover:text-white transition-all border border-amber-400/20 hover:border-amber-400/40"
                  >
                    {t.terms}
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
              <p className="text-gray-300">&copy; 2024 ESMATECH. {t.rights}.</p>
              <p className="font-semibold text-blue-300">{t.esmatechRights}</p>
            </div>
          </div>
        </div>
      </footer>

      {showLegal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={closeLegalModals}>
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b px-8 py-6 flex justify-between items-center">
              <h2 className="text-3xl font-bold text-gray-900">{t.legal}</h2>
              <button onClick={closeLegalModals} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
            </div>
            <div className="p-8 text-gray-700 space-y-6">
              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Éditeur du site</h3>
                <p className="mb-2"><strong>Raison sociale :</strong> ESMATECH</p>
                <p className="mb-2"><strong>Forme juridique :</strong> Société</p>
                <p className="mb-2"><strong>Siège social :</strong> France</p>
                <p className="mb-2"><strong>Email :</strong> contact@bookyourdock.com</p>
                <p className="mb-2"><strong>Téléphone :</strong> 09 79 15 26 75</p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Directeur de la publication</h3>
                <p>Le directeur de la publication est le représentant légal de ESMATECH.</p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Hébergement</h3>
                <p className="mb-2">Le site BookYourDock est hébergé par des services cloud professionnels garantissant la disponibilité et la sécurité des données.</p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Propriété intellectuelle</h3>
                <p className="mb-4">
                  L'ensemble du site BookYourDock, incluant mais ne se limitant pas à la structure générale,
                  les textes, images, sons, savoir-faire, dessins, graphismes, et tout autre élément composant le site,
                  est la propriété exclusive de ESMATECH.
                </p>
                <p className="mb-4">
                  Toute reproduction, représentation, modification, publication, transmission, dénaturation,
                  totale ou partielle du site ou de son contenu, par quelque procédé que ce soit, et sur quelque
                  support que ce soit est interdite sans l'autorisation écrite préalable de ESMATECH.
                </p>
                <p>
                  Le nom "BookYourDock", le logo et tous les signes distinctifs sont des marques déposées ou
                  en cours de dépôt par ESMATECH. Toute reproduction ou utilisation sans autorisation expresse
                  est strictement interdite.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Données personnelles</h3>
                <p>
                  Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit
                  d'accès, de rectification, de suppression et d'opposition aux données personnelles vous concernant.
                  Pour exercer ces droits, vous pouvez nous contacter à l'adresse : contact@bookyourdock.com
                </p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Limitation de responsabilité</h3>
                <p>
                  ESMATECH s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur ce site.
                  Toutefois, ESMATECH ne peut garantir l'exactitude, la précision ou l'exhaustivité des informations
                  mises à disposition sur ce site.
                </p>
              </section>
            </div>
          </div>
        </div>
      )}

      {showPrivacy && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={closeLegalModals}>
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b px-8 py-6 flex justify-between items-center">
              <h2 className="text-3xl font-bold text-gray-900">{t.privacy}</h2>
              <button onClick={closeLegalModals} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
            </div>
            <div className="p-8 text-gray-700 space-y-6">
              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Responsable du traitement</h3>
                <p>
                  ESMATECH, en tant qu'éditeur du site BookYourDock et de l'application associée, est responsable
                  du traitement de vos données personnelles.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Données collectées</h3>
                <p className="mb-4">Dans le cadre de l'utilisation de notre solution, nous sommes susceptibles de collecter :</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Informations d'identification (nom, prénom, email, téléphone)</li>
                  <li>Données de connexion et d'utilisation du service</li>
                  <li>Informations relatives aux opérations et aux transporteurs</li>
                  <li>Documents et fichiers téléchargés dans l'application</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Finalités du traitement</h3>
                <p className="mb-4">Vos données sont collectées pour :</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Fournir et améliorer nos services</li>
                  <li>Gérer votre compte utilisateur</li>
                  <li>Assurer le support technique et la maintenance</li>
                  <li>Respecter nos obligations légales et réglementaires</li>
                  <li>Établir des statistiques et analyses d'utilisation</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Sécurité des données</h3>
                <p>
                  ESMATECH met en œuvre toutes les mesures techniques et organisationnelles appropriées afin
                  de garantir la sécurité des données personnelles et notamment empêcher qu'elles soient
                  déformées, endommagées ou que des tiers non autorisés y aient accès.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Durée de conservation</h3>
                <p>
                  Les données personnelles sont conservées pendant la durée nécessaire aux finalités pour
                  lesquelles elles ont été collectées, conformément aux obligations légales applicables.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Vos droits</h3>
                <p className="mb-4">Conformément au RGPD, vous disposez des droits suivants :</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Droit d'accès à vos données personnelles</li>
                  <li>Droit de rectification de vos données</li>
                  <li>Droit à l'effacement de vos données</li>
                  <li>Droit à la limitation du traitement</li>
                  <li>Droit à la portabilité de vos données</li>
                  <li>Droit d'opposition au traitement</li>
                </ul>
                <p className="mt-4">
                  Pour exercer ces droits, contactez-nous à : contact@bookyourdock.com
                </p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Cookies</h3>
                <p>
                  Notre site peut utiliser des cookies pour améliorer votre expérience utilisateur.
                  Vous pouvez configurer votre navigateur pour refuser les cookies.
                </p>
              </section>
            </div>
          </div>
        </div>
      )}

      {showTerms && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={closeLegalModals}>
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b px-8 py-6 flex justify-between items-center">
              <h2 className="text-3xl font-bold text-gray-900">{t.terms}</h2>
              <button onClick={closeLegalModals} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
            </div>
            <div className="p-8 text-gray-700 space-y-6">
              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Objet</h3>
                <p>
                  Les présentes Conditions Générales d'Utilisation (CGU) définissent les conditions d'accès
                  et d'utilisation du service BookYourDock fourni par ESMATECH.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Acceptation des conditions</h3>
                <p>
                  L'utilisation du service BookYourDock implique l'acceptation pleine et entière des présentes CGU.
                  Si vous n'acceptez pas ces conditions, vous ne devez pas utiliser le service.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Description du service</h3>
                <p className="mb-4">
                  BookYourDock est une solution logicielle de gestion de cour permettant de :
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Gérer les rendez-vous et les arrivées de camions</li>
                  <li>Suivre les opérations en temps réel</li>
                  <li>Gérer les documents associés aux opérations</li>
                  <li>Générer des rapports et analyses</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Propriété intellectuelle</h3>
                <p className="mb-4">
                  <strong>BookYourDock est la propriété exclusive de ESMATECH.</strong> L'ensemble du service,
                  incluant son code source, son design, son interface, ses fonctionnalités et tous les éléments
                  qui le composent, est protégé par les droits de propriété intellectuelle.
                </p>
                <p className="mb-4">
                  Toute reproduction, représentation, modification, distribution ou exploitation, totale ou partielle,
                  du service ou de ses composants, par quelque procédé que ce soit et sur quelque support que ce soit,
                  sans l'autorisation écrite préalable de ESMATECH, est strictement interdite et constituerait une
                  contrefaçon sanctionnée par le Code de la propriété intellectuelle.
                </p>
                <p>
                  La concession d'une licence d'utilisation n'emporte aucune cession de droits de propriété
                  intellectuelle au profit du client.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Accès au service</h3>
                <p>
                  L'accès au service est soumis à la création d'un compte et, le cas échéant, à la souscription
                  d'un abonnement. Les identifiants de connexion sont strictement personnels et confidentiels.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Obligations de l'utilisateur</h3>
                <p className="mb-4">L'utilisateur s'engage à :</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Utiliser le service conformément à sa destination</li>
                  <li>Ne pas tenter de contourner les mesures de sécurité</li>
                  <li>Ne pas utiliser le service à des fins illégales</li>
                  <li>Ne pas reproduire, copier ou revendre le service</li>
                  <li>Maintenir la confidentialité de ses identifiants</li>
                  <li>Ne pas procéder à de la rétro-ingénierie du logiciel</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Disponibilité du service</h3>
                <p>
                  ESMATECH s'efforce d'assurer une disponibilité optimale du service. Toutefois, ESMATECH ne peut
                  garantir une disponibilité de 100% et se réserve le droit d'interrompre temporairement le service
                  pour des opérations de maintenance.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Limitation de responsabilité</h3>
                <p>
                  ESMATECH ne saurait être tenue responsable des dommages directs ou indirects résultant de
                  l'utilisation ou de l'impossibilité d'utiliser le service, sauf en cas de faute lourde ou de
                  manquement à une obligation essentielle.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Modification des CGU</h3>
                <p>
                  ESMATECH se réserve le droit de modifier les présentes CGU à tout moment. Les utilisateurs
                  seront informés de toute modification significative.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Droit applicable</h3>
                <p>
                  Les présentes CGU sont soumises au droit français. Tout litige relatif à leur interprétation
                  ou à leur exécution relève de la compétence des tribunaux français.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Contact</h3>
                <p>
                  Pour toute question relative aux présentes CGU, vous pouvez nous contacter à :
                  contact@bookyourdock.com
                </p>
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
