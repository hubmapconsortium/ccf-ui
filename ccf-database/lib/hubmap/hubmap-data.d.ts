import { JsonLd, JsonLdObj } from 'jsonld/jsonld-spec';
declare type JsonDict = Record<string, unknown>;
export declare const DR1_VU_THUMBS: Set<string>;
export declare const UFL_THUMBS: {
    'HBM558.SRZG.629': string;
    'HBM562.NTMH.548': string;
    'HBM685.KHRQ.684': string;
    'HBM278.SFQW.627': string;
    'HBM427.SMGB.866': string;
    'HBM432.LLCF.677': string;
    'HBM586.ZSVS.996': string;
    'HBM285.XMBT.542': string;
    'HBM289.BWJW.663': string;
    'HBM255.SRPR.985': string;
    'HBM799.WXHD.535': string;
    'HBM294.RZFN.624': string;
    'HBM383.TRQG.424': string;
    'HBM647.MFQB.496': string;
    'HBM237.GGPR.739': string;
    'HBM288.TPBD.654': string;
    'HBM974.NDXT.675': string;
    'HBM589.SLVV.423': string;
    'HBM794.RLFN.358': string;
    'HBM372.BQSR.778': string;
    'HBM499.TKDW.458': string;
    'HBM342.PRQB.739': string;
    'HBM633.CLVN.674': string;
    'HBM343.JQKM.578': string;
    'HBM987.XGTH.368': string;
    'HBM964.CWCP.788': string;
    'HBM244.TJLK.223': string;
    'HBM646.FSBQ.966': string;
    'HBM572.GXSB.234': string;
    'HBM772.TKGJ.794': string;
    'HBM239.CBWR.263': string;
    'HBM992.NRTT.383': string;
    'HBM283.DQXD.546': string;
    'HBM795.JHND.856': string;
    'HBM267.BZKT.867': string;
    'HBM838.DLMJ.782': string;
    'HBM337.FSXL.564': string;
    'HBM355.JDLK.244': string;
    'HBM599.PSZG.737': string;
};
/**
 * Converts a hubmap response object into JsonLd.
 *
 * @param data The hubmap data.
 * @returns The converted data.
 */
export declare function hubmapResponseAsJsonLd(data: unknown, assetsApi?: string, portalUrl?: string, serviceToken?: string, debug?: boolean): JsonLd;
export declare class HuBMAPTissueBlock {
    data: JsonDict;
    bad: boolean;
    donor: JsonLdObj;
    '@id': string;
    '@type': string;
    label: string;
    description: string;
    link: string;
    sample_type: string;
    section_count: number;
    section_size: number;
    section_units: string;
    rui_location: JsonLdObj;
    sections: JsonLdObj[];
    datasets: JsonLdObj[];
    constructor(data: JsonDict, assetsApi?: string, portalUrl?: string, serviceToken?: string);
    getSection(section: JsonDict, data: JsonDict, portalUrl: string): JsonLdObj;
    getDataset(dataset: JsonDict, assetsApi?: string, portalUrl?: string, serviceToken?: string): JsonLdObj;
    getDatasetThumbnail(dataset: JsonDict, assetsApi: string, serviceToken?: string): string | undefined;
    getDonor(donor: JsonDict, portalUrl: string): JsonLdObj;
    getRuiLocation(data: JsonDict, donor: JsonLdObj): JsonLdObj | undefined;
    getTissueBlock(): JsonLdObj;
    toJsonLd(): JsonLdObj;
}
export {};
