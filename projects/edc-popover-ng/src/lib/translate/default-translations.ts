import { PopoverLabel } from 'edc-client-js';

const LABELS_EN: PopoverLabel = {
  articles: 'Need more...',
  links: 'Related topics',
  iconAlt: 'Help',
  comingSoon: 'Contextual help is coming soon.',
  errorTitle:  'Error',
  errors: {
    failedData: 'An error occurred when fetching data !\nCheck the brick keys provided to the EdcHelp component.'
  },
  content: null,
  url: '',
  exportId: ''
};
const LABELS_FR: PopoverLabel = {
  articles: 'Plus d\'info...',
  links: 'Sujets associés',
  iconAlt: 'Aide',
  comingSoon: 'Aide contextuelle à venir.',
  errorTitle:  'Erreur',
  errors: {
    failedData: 'Une erreur est survenue lors de la récupération des données !' +
      '\nVérifiez les clés de la brique fournies au composant EdcHelp.'
  },
  content: null,
  url: '',
  exportId: ''
};

export const DEFAULT_LABELS: Map<string, PopoverLabel> = new Map<string, PopoverLabel>()
  .set('en', LABELS_EN)
  .set('fr', LABELS_FR);
