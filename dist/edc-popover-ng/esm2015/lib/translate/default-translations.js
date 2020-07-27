const LABELS_EN = {
    articles: 'Need more...',
    links: 'Related topics',
    iconAlt: 'Help',
    comingSoon: 'Contextual help is coming soon.',
    errors: {
        failedData: 'An error occurred when fetching data !\\nCheck the brick keys provided to the EdcHelp component.'
    },
    content: null,
    url: '',
    exportId: ''
};
const LABELS_FR = {
    articles: 'Plus d\'info...',
    links: 'Sujets associés',
    iconAlt: 'Aide',
    comingSoon: 'Aide contextuelle à venir.',
    errors: {
        failedData: 'Une erreur est survenue lors de la récupération des données !' +
            '\\nVérifiez les clés de la brique fournies au composant EdcHelp.'
    },
    content: null,
    url: '',
    exportId: ''
};
export const DEFAULT_LABELS = new Map()
    .set('en', LABELS_EN)
    .set('fr', LABELS_FR);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC10cmFuc2xhdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9lZGMtcG9wb3Zlci1uZy9zcmMvbGliL3RyYW5zbGF0ZS9kZWZhdWx0LXRyYW5zbGF0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxNQUFNLFNBQVMsR0FBaUI7SUFDOUIsUUFBUSxFQUFFLGNBQWM7SUFDeEIsS0FBSyxFQUFFLGdCQUFnQjtJQUN2QixPQUFPLEVBQUUsTUFBTTtJQUNmLFVBQVUsRUFBRSxpQ0FBaUM7SUFDN0MsTUFBTSxFQUFFO1FBQ04sVUFBVSxFQUFFLGtHQUFrRztLQUMvRztJQUNELE9BQU8sRUFBRSxJQUFJO0lBQ2IsR0FBRyxFQUFFLEVBQUU7SUFDUCxRQUFRLEVBQUUsRUFBRTtDQUNiLENBQUM7QUFDRixNQUFNLFNBQVMsR0FBaUI7SUFDOUIsUUFBUSxFQUFFLGlCQUFpQjtJQUMzQixLQUFLLEVBQUUsaUJBQWlCO0lBQ3hCLE9BQU8sRUFBRSxNQUFNO0lBQ2YsVUFBVSxFQUFFLDRCQUE0QjtJQUN4QyxNQUFNLEVBQUU7UUFDTixVQUFVLEVBQUUsK0RBQStEO1lBQ3pFLGtFQUFrRTtLQUNyRTtJQUNELE9BQU8sRUFBRSxJQUFJO0lBQ2IsR0FBRyxFQUFFLEVBQUU7SUFDUCxRQUFRLEVBQUUsRUFBRTtDQUNiLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxjQUFjLEdBQUcsSUFBSSxHQUFHLEVBQXdCO0tBQzFELEdBQUcsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDO0tBQ3BCLEdBQUcsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQb3BvdmVyTGFiZWwgfSBmcm9tICdlZGMtY2xpZW50LWpzJztcblxuY29uc3QgTEFCRUxTX0VOOiBQb3BvdmVyTGFiZWwgPSB7XG4gIGFydGljbGVzOiAnTmVlZCBtb3JlLi4uJyxcbiAgbGlua3M6ICdSZWxhdGVkIHRvcGljcycsXG4gIGljb25BbHQ6ICdIZWxwJyxcbiAgY29taW5nU29vbjogJ0NvbnRleHR1YWwgaGVscCBpcyBjb21pbmcgc29vbi4nLFxuICBlcnJvcnM6IHtcbiAgICBmYWlsZWREYXRhOiAnQW4gZXJyb3Igb2NjdXJyZWQgd2hlbiBmZXRjaGluZyBkYXRhICFcXFxcbkNoZWNrIHRoZSBicmljayBrZXlzIHByb3ZpZGVkIHRvIHRoZSBFZGNIZWxwIGNvbXBvbmVudC4nXG4gIH0sXG4gIGNvbnRlbnQ6IG51bGwsXG4gIHVybDogJycsXG4gIGV4cG9ydElkOiAnJ1xufTtcbmNvbnN0IExBQkVMU19GUjogUG9wb3ZlckxhYmVsID0ge1xuICBhcnRpY2xlczogJ1BsdXMgZFxcJ2luZm8uLi4nLFxuICBsaW5rczogJ1N1amV0cyBhc3NvY2nDqXMnLFxuICBpY29uQWx0OiAnQWlkZScsXG4gIGNvbWluZ1Nvb246ICdBaWRlIGNvbnRleHR1ZWxsZSDDoCB2ZW5pci4nLFxuICBlcnJvcnM6IHtcbiAgICBmYWlsZWREYXRhOiAnVW5lIGVycmV1ciBlc3Qgc3VydmVudWUgbG9ycyBkZSBsYSByw6ljdXDDqXJhdGlvbiBkZXMgZG9ubsOpZXMgIScgK1xuICAgICAgJ1xcXFxuVsOpcmlmaWV6IGxlcyBjbMOpcyBkZSBsYSBicmlxdWUgZm91cm5pZXMgYXUgY29tcG9zYW50IEVkY0hlbHAuJ1xuICB9LFxuICBjb250ZW50OiBudWxsLFxuICB1cmw6ICcnLFxuICBleHBvcnRJZDogJydcbn07XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX0xBQkVMUyA9IG5ldyBNYXA8c3RyaW5nLCBQb3BvdmVyTGFiZWw+KClcbiAgLnNldCgnZW4nLCBMQUJFTFNfRU4pXG4gIC5zZXQoJ2ZyJywgTEFCRUxTX0ZSKTtcbiJdfQ==