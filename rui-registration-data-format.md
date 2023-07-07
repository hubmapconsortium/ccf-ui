# RUI "registration-data.json" Format

The CCF Registration User Interface (RUI) exports RUI registration data in the 'RUI location' JSON-LD format. It is a JSON-formatted file with Linked Data semantics as defined in the [CCF Ontology](https://bioportal.bioontology.org/ontologies/CCF). Below you will find an annotated example of a RUI location.

## Example registration-data.json

```javascript
{
  // The JSON-LD context which defines the semantic meaning of each property in this file
  "@context": "https://hubmapconsortium.github.io/ccf-ontology/ccf-context.jsonld",
  // A unique IRI for the RUI registration (the RUI generates random UUIDs for this purpose)
  "@id": "http://purl.org/ccf/1.5/a3488448-9745-48e3-a3b2-ed39a722910e",
  // A RUI registration is a SpatialEntity in the CCF Ontology
  "@type": "SpatialEntity",
  // The creator of this RUI registration
  "creator": "Bruce Herr",
  // The creator's first name
  "creator_first_name": "Bruce",
  // The creator's last name
  "creator_last_name": "Herr",
  // Creation date for this RUI registration
  "creation_date": "2022-04-26",
  // Anatomical structures that collided with the RUI registration or were added by the user in the RUI
  "ccf_annotations": [
    "http://purl.obolibrary.org/obo/UBERON_0002015",
    "http://purl.obolibrary.org/obo/UBERON_0008716",
    "http://purl.obolibrary.org/obo/UBERON_0000362",
    "http://purl.obolibrary.org/obo/UBERON_0001228",
    "http://purl.obolibrary.org/obo/UBERON_0004200",
    "http://purl.obolibrary.org/obo/UBERON_0006517",
    "http://purl.obolibrary.org/obo/UBERON_0001226",
    "http://purl.obolibrary.org/obo/UBERON_0001227",
    "http://purl.obolibrary.org/obo/UBERON_0001225",
    "http://purl.obolibrary.org/obo/UBERON_0001284",
    "http://purl.obolibrary.org/obo/UBERON_0002189"
  ],
  // If this RUI registration has been sectioned, the thickness (in micrometers) of each section
  "slice_thickness": 12,
  // If this RUI registration has been sectioned, the number of sections that were extracted
  "slice_count": 10,
  // The size of the RUI registration in millimeters, x dimension
  "x_dimension": 10,
  // The size of the RUI registration in millimeters, y dimension
  "y_dimension": 20,
  // The size of the RUI registration in millimeters, z dimension
  "z_dimension": 13,
  // The dimension units to use (RUI always uses millimeter) for size
  "dimension_units": "millimeter",
  // A RUI registration placement defines where the RUI registration is placed relative to a reference organ
  "placement": {
    // The JSON-LD context which defines the semantic meaning of each property in this object
    "@context": "https://hubmapconsortium.github.io/ccf-ontology/ccf-context.jsonld",
    // A unique IRI for the RUI registration placement (the RUI generates random UUIDs for this purpose)
    "@id": "http://purl.org/ccf/1.5/a3488448-9745-48e3-a3b2-ed39a722910e_placement",
    // The RUI registration placement is a SpatialPlacement in the CCF Ontology
    "@type": "SpatialPlacement",
    // The target SpatialEntity (in this case, the Reference Organ) that this RUI registration has been placed relative to
    "target": "http://purl.org/ccf/latest/ccf.owl#VHMLeftKidney",
    // The date this RUI registration placement was created
    "placement_date": "2022-04-26",
    // When placing the RUI registration, what scaling factor to use to make it fit relative to the Reference Organ, x dimension (always 1 in the RUI)
    "x_scaling": 1,
    // When placing the RUI registration, what scaling factor to use to make it fit relative to the Reference Organ, y dimension (always 1 in the RUI)
    "y_scaling": 1,
    // When placing the RUI registration, what scaling factor to use to make it fit relative to the Reference Organ, z dimension (always 1 in the RUI)
    "z_scaling": 1,
    // When placing the RUI registration, what scaling factor units to use (always ratio in the RUI)
    "scaling_units": "ratio",
    // When placing the RUI registration, how many degrees to rotate it, x dimension
    "x_rotation": 7,
    // When placing the RUI registration, how many degrees to rotate it, y dimension
    "y_rotation": -59,
    // When placing the RUI registration, how many degrees to rotate it, z dimension
    "z_rotation": -23,
    // When placing the RUI registration, what rotation order to apply (always XYZ in the RUI)
    "rotation_order": "XYZ",
    // When placing the RUI registration, what rotation units to use (always degree in the RUI)
    "rotation_units": "degree",
    // When placing the RUI registration, how far to move it in millimeters, x dimension
    "x_translation": 36.69,
    // When placing the RUI registration, how far to move it in millimeters, y dimension
    "y_translation": 77.264,
    // When placing the RUI registration, how far to move it in millimeters, z dimension
    "z_translation": 41.215,
    // When placing the RUI registration, the units to use for translation (always millimeter in the RUI)
    "translation_units": "millimeter"
  }
}
```
