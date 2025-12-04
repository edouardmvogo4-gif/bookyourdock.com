export const landingContentTranslations = {
  fr: {
    operations: {
      title: 'Suivi des Opérations en Temps Réel',
      description: 'Notre TMS vous permet de suivre chaque camion à travers toutes les étapes de son passage dans votre cour. Chaque opération est identifiée par un numéro de mission unique au format MISS-YYYYMMDD-XXXX.',
      stages: [
        { title: 'Accès au site', description: 'Enregistrement automatique de l\'heure d\'arrivée' },
        { title: 'Attente au parking', description: 'Gestion de la file d\'attente' },
        { title: 'Quai de déchargement', description: 'Affectation automatique aux quais disponibles' },
        { title: 'Quai de chargement', description: 'Suivi du chargement en temps réel' },
        { title: 'Fin des opérations', description: 'Enregistrement automatique de l\'heure de départ' }
      ],
      advantage: 'Avantage :',
      advantageText: 'Visualisez instantanément où se trouve chaque camion et optimisez le flux de votre cour.'
    },
    appointments: {
      title: 'Gestion des Rendez-vous',
      description: 'Planifiez et organisez toutes les arrivées de camions avec notre TMS. Système de rendez-vous simple et efficace pour réduire les temps d\'attente et optimiser l\'utilisation de vos quais.',
      features: [
        'Création de rendez-vous avec créneaux horaires',
        'Gestion des transporteurs et leurs informations',
        'Association automatique aux plaques d\'immatriculation',
        'Notifications et rappels automatiques',
        'Vue calendrier pour une planification optimale',
        'Statuts de rendez-vous (Planifié, Complété, Annulé)'
      ],
      flexibleSlots: 'Créneaux horaires flexibles',
      flexibleSlotsDesc: 'Définissez vos créneaux horaires selon vos besoins opérationnels. Notre TMS suggère automatiquement les plages disponibles et évite les conflits de planification.'
    },
    documents: {
      title: 'Gestion Documentaire Complète',
      description: 'Notre TMS centralise tous vos documents liés aux opérations de chargement. Bons de livraison, documents douaniers, preuves de chargement... tout est accessible en un clic dans le TMS.',
      features: [
        { title: 'Upload sécurisé', description: 'Téléchargez vos documents en toute sécurité' },
        { title: 'Multi-formats', description: 'PDF, Word, Excel, images et plus' },
        { title: 'Archivage automatique', description: 'Archivage quotidien des documents traités' },
        { title: 'Recherche rapide', description: 'Retrouvez vos documents par mission ou plaque' },
        { title: 'Téléchargement direct', description: 'Accès instantané à tous vos fichiers' },
        { title: 'Historique complet', description: 'Consultez l\'historique de tous vos documents' }
      ],
      smartArchiving: 'Archivage intelligent',
      smartArchivingDesc: 'Le TMS archive automatiquement les documents des opérations terminées. Téléchargez des archives complètes pour vos audits et analyses.',
      secureStorage: 'Stockage sécurisé avec bucket dédié'
    },
    tracking: {
      title: 'Suivi Temps Réel',
      description: 'Notre TMS visualise en temps réel tous les mouvements dans votre cour. Chaque changement de statut est enregistré avec horodatage précis pour une traçabilité complète.',
      liveDashboard: 'Tableau de bord en direct',
      carrier1: 'Transporteur ABC',
      carrier2: 'Transporteur XYZ',
      plate: 'Plaque:',
      mission: 'Mission:',
      statusLoading: 'Quai de chargement',
      statusWaiting: 'Attente au parking',
      preciseTimestamp: 'Horodatage précis',
      preciseTimestampDesc: 'Le TMS enregistre chaque étape avec l\'heure exacte pour calculer les temps de passage',
      liveMetrics: 'Métriques en temps réel',
      liveMetricsDesc: 'Le TMS affiche le nombre d\'opérations en cours, temps moyen de traitement, taux d\'occupation des quais'
    },
    reports: {
      title: 'Rapports et Analyses',
      description: 'Notre TMS vous donne accès à des rapports détaillés pour analyser vos performances et identifier les axes d\'amélioration. Toutes les données du TMS sont exportables pour vos propres analyses.',
      availableMetrics: 'Métriques disponibles',
      metrics: [
        'Temps moyen de traitement par opération',
        'Nombre d\'opérations par jour/semaine/mois',
        'Taux d\'occupation des quais',
        'Performance par transporteur',
        'Temps d\'attente moyens',
        'Analyse des créneaux les plus demandés'
      ],
      completeHistory: 'Historique complet',
      completeHistoryDesc: 'Consultez dans le TMS l\'historique de toutes les opérations avec filtres avancés',
      dataExport: 'Export de données',
      dataExportDesc: 'Exportez vos données du TMS pour analyses approfondies et audits'
    }
  },
  en: {
    operations: {
      title: 'Real-Time Operations Tracking',
      description: 'Our TMS allows you to track every truck through all stages of its passage in your yard. Each operation is identified by a unique mission number in the format MISS-YYYYMMDD-XXXX.',
      stages: [
        { title: 'Site access', description: 'Automatic arrival time recording' },
        { title: 'Parking wait', description: 'Queue management' },
        { title: 'Unloading dock', description: 'Automatic assignment to available docks' },
        { title: 'Loading dock', description: 'Real-time loading tracking' },
        { title: 'Operations completed', description: 'Automatic departure time recording' }
      ],
      advantage: 'Advantage:',
      advantageText: 'Instantly visualize where each truck is located and optimize your yard flow.'
    },
    appointments: {
      title: 'Appointment Management',
      description: 'Plan and organize all truck arrivals with our TMS. Simple and efficient appointment system to reduce waiting times and optimize dock usage.',
      features: [
        'Create appointments with time slots',
        'Carrier management and information',
        'Automatic license plate association',
        'Automatic notifications and reminders',
        'Calendar view for optimal planning',
        'Appointment statuses (Scheduled, Completed, Cancelled)'
      ],
      flexibleSlots: 'Flexible time slots',
      flexibleSlotsDesc: 'Define your time slots according to your operational needs. Our TMS automatically suggests available slots and avoids scheduling conflicts.'
    },
    documents: {
      title: 'Complete Document Management',
      description: 'Our TMS centralizes all documents related to loading operations. Delivery notes, customs documents, loading proofs... everything is accessible in one click in the TMS.',
      features: [
        { title: 'Secure upload', description: 'Upload your documents securely' },
        { title: 'Multi-format', description: 'PDF, Word, Excel, images and more' },
        { title: 'Automatic archiving', description: 'Daily archiving of processed documents' },
        { title: 'Quick search', description: 'Find your documents by mission or plate' },
        { title: 'Direct download', description: 'Instant access to all your files' },
        { title: 'Complete history', description: 'View history of all your documents' }
      ],
      smartArchiving: 'Smart archiving',
      smartArchivingDesc: 'The TMS automatically archives documents from completed operations. Download complete archives for your audits and analysis.',
      secureStorage: 'Secure storage with dedicated bucket'
    },
    tracking: {
      title: 'Real-Time Tracking',
      description: 'Our TMS visualizes all movements in your yard in real time. Each status change is recorded with precise timestamp for complete traceability.',
      liveDashboard: 'Live dashboard',
      carrier1: 'Carrier ABC',
      carrier2: 'Carrier XYZ',
      plate: 'Plate:',
      mission: 'Mission:',
      statusLoading: 'Loading dock',
      statusWaiting: 'Waiting at parking',
      preciseTimestamp: 'Precise timestamp',
      preciseTimestampDesc: 'The TMS records each step with exact time to calculate passage times',
      liveMetrics: 'Live metrics',
      liveMetricsDesc: 'The TMS displays the number of operations in progress, average processing time, dock occupancy rate'
    },
    reports: {
      title: 'Reports and Analytics',
      description: 'Our TMS gives you access to detailed reports to analyze your performance and identify improvement areas. All TMS data is exportable for your own analysis.',
      availableMetrics: 'Available metrics',
      metrics: [
        'Average processing time per operation',
        'Number of operations per day/week/month',
        'Dock occupancy rate',
        'Performance by carrier',
        'Average waiting times',
        'Analysis of most requested time slots'
      ],
      completeHistory: 'Complete history',
      completeHistoryDesc: 'View in the TMS the history of all operations with advanced filters',
      dataExport: 'Data export',
      dataExportDesc: 'Export your TMS data for in-depth analysis and audits'
    }
  }
};
