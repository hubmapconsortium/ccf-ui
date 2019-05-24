/* Interface definitions for data exposed by the backend */

/**
 * Data which has been marked up with simple metadata (generally for display)
 */
export interface Annotated {
  /**
   * A unique identifier for this item.
   */
  id: string;

  /**
   * Additional data to display in popovers, etc.
   */
  metadata: { [label: string]: string };
}

/**
 * A person who has donated tissues
 */
export interface Patient extends Annotated {
  /**
   * The organization that excised the donor's tissue
   */
  provider: 'TMC-Vanderbilt' | 'TMC-UCSD' | 'TMC-Stanford' | 'TMC-Florida' | 'TMC-CalTech' | string;

  /**
   * Age of the donor (in years) at the time of death
   */
  age: number;

  /**
   * Gender of the patient
   */
  gender: 'male' | 'female' | 'undefined';

  /**
   * Anatomical Locations that were excised from the donor. Use either common labels or
   * the corresponding UBERON or HuBMAP id (UBERON_XXXX or HUBMAP_YYYY).
   */
  anatomicalLocations: string[];

  // Internal fields
  /**
   * Identifiers of containing ontology nodes and their parent chains.
   * Used to speed up inclusion checks.
   */
  ontologyNodeIds: string[];
}

/**
 * A tissue sample excised from a donor
 */
export interface TissueSample extends Annotated {
  /**
   * The patient from whom the tissue was excised
   */
  patient: Patient;

  /**
   * An URL to the svg overlay
   */
  overlayUrl: string;
}

/**
 * A slice of a tissue sample
 */
export interface TissueSlice extends Annotated {
  /**
   * The tissue sample from which a slice was extracted
   */
  sample: TissueSample;
}

/**
 * An image of a tissue slice
 */
export interface TissueImage extends Annotated {
  /**
   * The tissue slice from which an image was extracted
   */
  slice: TissueSlice;

  /**
   * The technology used to extract the image
   */
  technology: 'IHC' | 'PAS' | 'IMS' | 'MxIF' | 'AF' | string;

  /**
   * A URL to download the source image
   */
  sourceUrl: string;

  /**
   * A URL to a small-sized version of the image. Should be a .png, .jpg, or .gif.
   */
  thumbnailUrl: string;

  /**
   * Additional data to display in popovers, etc. for the thumbnail
   */
  thumbnailMetadata: { [label: string]: string };

  /**
   * A URL to a tiled version of the image
   */
  tileUrl: string;

  /**
   * The type of tiles at the URL
   */
  tileType: 'deep-zoom' | 'google-maps' | string;

  /**
   * The number of pixels per meter for the image
   */
  pixelsPerMeter: number;
}

/**
 * An overlay that can be placed atop a TissueImage
 */
export interface TissueOverlay extends Annotated {
  /**
   * The tissue image this overlay can be placed atop
   */
  image: TissueImage;

  /**
   * The label for the overlay.
   */
  label: string;

  /**
   * Anatomical location for the overlay.
   */
  anatomicalLocations: string[];


  /**
   * An URL for the SVG overlay.
   */
  overlayUrl: string;

}

/**
 * A tissue cell that was extracted/discovered from a tissue slice
 */
export interface TissueCell extends TissueOverlay {
  /**
   * The tissue slice from which an image was extracted/discovered
   */
  slice: TissueSlice;

  /**
   * The type of cell discovered
   */
  cellType: string;
}

/**
 * A local database of patients, samples, slices, images, etc.
 *
 * NOTE: A remote database will be the norm, so do not reference this
 * unless you are working with the local database implementation directly.
 */
export interface LocalDatabase {
  /** Patients/donors in the database */
  patients: Patient[];
  /** Tissue samples in the database */
  samples: TissueSample[];
  /** Tissue slices in the database */
  slices: TissueSlice[];
  /** Tissue images in the database */
  images: TissueImage[];
  /** Tissue image overlays in the database */
  overlays: TissueOverlay[];
  /** Tissue cells in the database */
  cells: TissueCell[];
}
