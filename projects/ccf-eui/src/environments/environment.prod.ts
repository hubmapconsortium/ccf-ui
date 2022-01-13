/** Production environment configuration. */
export const environment = {
  production: true,
  disableDbWorker: true,
  acceptableViewerDomains: [
    'https://portal.hubmapconsortium.org',
    'https://portal.test.hubmapconsortium.org'
  ],
  organNodes: [
    'http://purl.obolibrary.org/obo/UBERON_0000955', // Brain
    'http://purl.obolibrary.org/obo/UBERON_0000029', // Lymph Node
    // 'http://purl.obolibrary.org/obo/UBERON_0002509', // Mesenteric Lymph Node
    'http://purl.obolibrary.org/obo/UBERON_0000970', // Eye
    // 'http://purl.obolibrary.org/obo/UBERON_0004548', // Eye, L
    // 'http://purl.obolibrary.org/obo/FMA_54449', // Eye, R
    'http://purl.obolibrary.org/obo/UBERON_0003889', // Fallopian Tube
    // 'http://purl.obolibrary.org/obo/UBERON_0001303', // Fallopian Tube, L
    // 'http://purl.obolibrary.org/obo/UBERON_0001302', // Fallopian Tube, R
    'http://purl.obolibrary.org/obo/UBERON_0000948', // Heart
    'http://purl.obolibrary.org/obo/UBERON_0002113', // Kidney
    // 'http://purl.obolibrary.org/obo/UBERON_0004538', // Kidney, L
    // 'http://purl.obolibrary.org/obo/UBERON_0004539', // Kidney, R
    'http://purl.obolibrary.org/obo/UBERON_0001465', // Knee
    // 'http://purl.obolibrary.org/obo/FMA_24978', // Knee, L
    // 'http://purl.obolibrary.org/obo/FMA_24977', // Knee, R
    'http://purl.obolibrary.org/obo/UBERON_0002107', // Liver
    'http://purl.obolibrary.org/obo/UBERON_0002048', // Lungs
    'http://purl.obolibrary.org/obo/UBERON_0000992', // Ovary
    // 'http://purl.obolibrary.org/obo/FMA_7214', // Ovary, L
    // 'http://purl.obolibrary.org/obo/FMA_7213', // Ovary, R
    'http://purl.obolibrary.org/obo/UBERON_0001264', // Pancreas
    'http://purl.obolibrary.org/obo/UBERON_0001270', // Pelvis
    'http://purl.obolibrary.org/obo/UBERON_0002367', // Prostate
    'http://purl.obolibrary.org/obo/UBERON_0002097', // Skin
    'http://purl.obolibrary.org/obo/UBERON_0002108', // Small Intestine
    'http://purl.obolibrary.org/obo/UBERON_0000059', // Large Intestine
    'http://purl.obolibrary.org/obo/UBERON_0002106', // Spleen
    'http://purl.obolibrary.org/obo/UBERON_0002370', // Thymus
    'http://purl.obolibrary.org/obo/UBERON_0000056', // Ureter
    // 'http://purl.obolibrary.org/obo/UBERON_0001223', // Ureter, L
    // 'http://purl.obolibrary.org/obo/UBERON_0001222', // Ureter, R
    'http://purl.obolibrary.org/obo/UBERON_0001255', // Bladder
    'http://purl.obolibrary.org/obo/UBERON_0000995', // Uterus
    'http://purl.obolibrary.org/obo/UBERON_0004537' // Blood Vasculature
  ],
  dbOptions: {
    ccfOwlUrl: 'assets/ccf.owl.n3store.json',
    ccfContextUrl: 'https://hubmapconsortium.github.io/hubmap-ontology/ccf-context.jsonld',
    dataSources: [
      'assets/kpmp/data/rui_locations.jsonld',
      'assets/sparc/data/rui_locations.jsonld',
      'assets/gtex/data/rui_locations.jsonld'
    ],
    hubmapDataService: 'search-api',
    hubmapPortalUrl: 'https://portal.hubmapconsortium.org/',
    hubmapDataUrl: 'https://search.api.hubmapconsortium.org/entities/search',
    hubmapAssetsUrl: 'https://assets.hubmapconsortium.org',
    hubmapToken: localStorage.getItem('HUBMAP_TOKEN') ?? '',

    useRemoteApi: true,
    remoteApiEndpoint: 'https://ccf-api.hubmapconsortium.org/v1'
  },
  googleAnalyticsToken: window.location.hostname === 'portal.hubmapconsortium.org' ? 'G-1WRJHN9FM6' : 'G-J9HWV9QPJ4'
};
