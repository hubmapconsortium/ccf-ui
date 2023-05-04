/** Constants used to create entity accessors. */
export declare const PREFIXES: {
    base: string;
    ccf: string;
    fma: string;
    obo: string;
    uberon: string;
    cl: string;
    lmha: string;
    rdf: string;
    rdfs: string;
    dc: string;
    dcterms: string;
};
/** Prefix factory. */
export declare const prefixer: (prefix: string) => import("n3").PrefixedToIri;
export declare const rdf: {
    x: import("n3").PrefixedToIri;
    type: import("n3").NamedNode<string>;
};
export declare const rdfs: {
    x: import("n3").PrefixedToIri;
    label: import("n3").NamedNode<string>;
    comment: import("n3").NamedNode<string>;
    isDefinedBy: import("n3").NamedNode<string>;
    seeAlso: import("n3").NamedNode<string>;
};
/** Common entity ids. */
export declare const entity: {
    id: import("n3").NamedNode<string>;
    label: import("n3").NamedNode<string>;
    description: import("n3").NamedNode<string>;
    link: import("n3").NamedNode<string>;
    sex: import("n3").NamedNode<string>;
    age: import("n3").NamedNode<string>;
    bmi: import("n3").NamedNode<string>;
    Male: import("n3").Literal;
    Female: import("n3").Literal;
    consortiumName: import("n3").NamedNode<string>;
    providerName: import("n3").NamedNode<string>;
    providerUUID: import("n3").NamedNode<string>;
    donor: import("n3").NamedNode<string>;
    sections: import("n3").NamedNode<string>;
    datasets: import("n3").NamedNode<string>;
    sampleType: import("n3").NamedNode<string>;
    TissueBlock: import("n3").Literal;
    TissueSection: import("n3").Literal;
    NonStandard: import("n3").Literal;
    sectionCount: import("n3").NamedNode<string>;
    sectionSize: import("n3").NamedNode<string>;
    sectionUnits: import("n3").NamedNode<string>;
    sectionNumber: import("n3").NamedNode<string>;
    spatialEntity: import("n3").NamedNode<string>;
    ontologyTerms: import("n3").NamedNode<string>;
    cellTypeTerms: import("n3").NamedNode<string>;
    technology: import("n3").NamedNode<string>;
    thumbnail: import("n3").NamedNode<string>;
};
/** CCF specific ids. */
export declare const ccf: {
    x: import("n3").PrefixedToIri;
    base: import("n3").PrefixedToIri;
    ontologyNode: {
        label: import("n3").NamedNode<string>;
        parent: import("n3").NamedNode<string>;
        children: import("n3").NamedNode<string>;
        rui_rank: import("n3").NamedNode<string>;
        synonymLabels: import("n3").NamedNode<"http://www.geneontology.org/formats/oboInOwl#hasExactSynonym">;
    };
    asctb: {
        part_of: import("n3").NamedNode<string>;
        ct_is_a: import("n3").NamedNode<string>;
        located_in: import("n3").NamedNode<string>;
        characterizes: import("n3").NamedNode<string>;
    };
    spatial: {
        Female: import("n3").NamedNode<string>;
        Male: import("n3").NamedNode<string>;
        BothSexes: import("n3").NamedNode<string>;
        FemaleOrgans: import("n3").NamedNode<string>;
        MaleOrgans: import("n3").NamedNode<string>;
    };
    SpatialObjectReference: import("n3").NamedNode<string>;
    SpatialEntity: import("n3").NamedNode<string>;
    SpatialPlacement: import("n3").NamedNode<string>;
    spatialObjectReference: {
        file: import("n3").NamedNode<string>;
        file_format: import("n3").NamedNode<string>;
        file_subpath: import("n3").NamedNode<string>;
    };
    extractionSet: {
        label: import("n3").NamedNode<string>;
        rui_rank: import("n3").NamedNode<string>;
    };
    spatialEntity: {
        label: import("n3").NamedNode<string>;
        description: import("n3").NamedNode<string>;
        creator: import("n3").NamedNode<string>;
        creator_first_name: import("n3").NamedNode<string>;
        creator_last_name: import("n3").NamedNode<string>;
        creator_orcid: import("n3").NamedNode<string>;
        creation_date: import("n3").NamedNode<string>;
        updated_date: import("n3").NamedNode<string>;
        ccf_annotations: import("n3").NamedNode<string>;
        representation_of: import("n3").NamedNode<string>;
        reference_organ: import("n3").NamedNode<string>;
        extraction_set_for: import("n3").NamedNode<string>;
        extraction_set: import("n3").NamedNode<string>;
        sex: import("n3").NamedNode<string>;
        side: import("n3").NamedNode<string>;
        rui_rank: import("n3").NamedNode<string>;
        slice_thickness: import("n3").NamedNode<string>;
        slice_count: import("n3").NamedNode<string>;
        x_dimension: import("n3").NamedNode<string>;
        y_dimension: import("n3").NamedNode<string>;
        z_dimension: import("n3").NamedNode<string>;
        dimension_units: import("n3").NamedNode<string>;
        object: import("n3").NamedNode<string>;
    };
    spatialPlacement: {
        source: import("n3").NamedNode<string>;
        target: import("n3").NamedNode<string>;
        placement_date: import("n3").NamedNode<string>;
        x_scaling: import("n3").NamedNode<string>;
        y_scaling: import("n3").NamedNode<string>;
        z_scaling: import("n3").NamedNode<string>;
        scaling_units: import("n3").NamedNode<string>;
        x_rotation: import("n3").NamedNode<string>;
        y_rotation: import("n3").NamedNode<string>;
        z_rotation: import("n3").NamedNode<string>;
        w_rotation: import("n3").NamedNode<string>;
        rotation_order: import("n3").NamedNode<string>;
        rotation_units: import("n3").NamedNode<string>;
        x_translation: import("n3").NamedNode<string>;
        y_translation: import("n3").NamedNode<string>;
        z_translation: import("n3").NamedNode<string>;
        translation_units: import("n3").NamedNode<string>;
    };
};
/** Uberon specific ids. */
export declare const uberon: {
    x: import("n3").PrefixedToIri;
    body: import("n3").NamedNode<string>;
};
/** CL specific ids. */
export declare const cl: {
    x: import("n3").PrefixedToIri;
    cell: import("n3").NamedNode<string>;
};
/** FMA specific ids. */
export declare const fma: {
    x: import("n3").PrefixedToIri;
};
/** LMHA specific ids. */
export declare const lmha: {
    x: import("n3").PrefixedToIri;
};
/** RUI accessors. */
export declare const rui: {
    body: import("n3").NamedNode<string>;
    cell: import("n3").NamedNode<string>;
    respiratory_system: import("n3").NamedNode<string>;
    colon: import("n3").NamedNode<string>;
    left_lung: import("n3").NamedNode<string>;
    right_lung: import("n3").NamedNode<string>;
    left_bronchus: import("n3").NamedNode<string>;
    right_bronchus: import("n3").NamedNode<string>;
    kidney: import("n3").NamedNode<string>;
    ureter: import("n3").NamedNode<string>;
    eye: import("n3").NamedNode<string>;
    fallopian_tube: import("n3").NamedNode<string>;
    knee: import("n3").NamedNode<string>;
    ovary: import("n3").NamedNode<string>;
    trachea: import("n3").NamedNode<string>;
    aorta: import("n3").NamedNode<string>;
    blood: import("n3").NamedNode<string>;
    bone_marrow: import("n3").NamedNode<string>;
    male_reproductive_system: import("n3").NamedNode<string>;
    lymph_node: import("n3").NamedNode<string>;
    blood_vasculature: import("n3").NamedNode<string>;
    brain: import("n3").NamedNode<string>;
    eye_left: import("n3").NamedNode<string>;
    eye_right: import("n3").NamedNode<string>;
    fallopian_tube_left: import("n3").NamedNode<string>;
    fallopian_tube_right: import("n3").NamedNode<string>;
    heart: import("n3").NamedNode<string>;
    kidney_left: import("n3").NamedNode<string>;
    kidney_right: import("n3").NamedNode<string>;
    knee_left: import("n3").NamedNode<string>;
    knee_right: import("n3").NamedNode<string>;
    large_intestine: import("n3").NamedNode<string>;
    liver: import("n3").NamedNode<string>;
    lungs: import("n3").NamedNode<string>;
    mesenteric_lymph_node: import("n3").NamedNode<string>;
    ovary_left: import("n3").NamedNode<string>;
    ovary_right: import("n3").NamedNode<string>;
    pancreas: import("n3").NamedNode<string>;
    pelvis: import("n3").NamedNode<string>;
    prostate_gland: import("n3").NamedNode<string>;
    skin: import("n3").NamedNode<string>;
    small_intestine: import("n3").NamedNode<string>;
    spleen: import("n3").NamedNode<string>;
    thymus: import("n3").NamedNode<string>;
    ureter_left: import("n3").NamedNode<string>;
    ureter_right: import("n3").NamedNode<string>;
    urinary_bladder: import("n3").NamedNode<string>;
    uterus: import("n3").NamedNode<string>;
};
