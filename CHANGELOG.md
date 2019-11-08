# Changelog

Changelog for the Common Coordinate Framework (CCF) - Exploration User Interface (EUI).

## 0.6.0 - 2019-11-08

## Added in 0.6.0

* The [CCF API](https://github.com/hubmapconsortium/ccf-api) project was started with an initial OpenAPI Schema, [documentation](http://smart-api.info/ui/d1f33c1a75e9dcda984194e4d8cea7d8), and code for spinning up a mock data server. This codifies the [CCF data and metadata standards](https://docs.google.com/document/d/1Qgx4mNutE1V3CfQ7y8Lg3rxQy5nhiOSKCSv5MJkPRMc/edit) defined by MC-IU and will be used by the CCF EUI and RUI.
* In preparation for future developments, we added a hidden, alpha-level 3d organ viewer. You can toggle this on and off in the organ view, by typing 3d with your keyboard.
* Updated navigation to directly jump to the tissue browser when a user selects an item from the search box
* Upgraded dependencies, including upgrades to Angular 8
* Testing and bug fixes
* Minor UI updates
  * Changed download icon color
  * Changed the background color for the search
  * Moved the Technologies filter above ontology
  * Additional styles for details button

## 0.5.0 - 2019-05-24

## Added in 0.5.0

* Display of the CCF ontology, integrated with search
* Semantic search by ontology, results are presented at all levels
* Tissue overlays showing regions of interest
* Data download links to direct users to <https://sampledata.hubmapconsortium.org>
* Data documentation (95% coverage) and testing (85% coverage)

## 0.2.0 - 2019-05-03

### Added in 0.2.0

* Sprint 2 release of the CCF-UI!
* A search interface was added to query data by age, gender, technology and TMC. Ontological search will be implemented in the next sprint.
* Body, Organ, and Tissue views now respond to updates to the search on the fly
* Appropriate metadata is now displayed in the Body, Organ, Tissue, and Cell views

## 0.1.0 - 2019-04-12

### Added in 0.1.0

* Sprint 1 release of the CCF-UI!
* Setup the base project scaffolding
* Added a sample database that includes initial data provided by VU
* Added Visual browsing of tissue samples and metadata at the whole body, organ, tissue, and cell level
* Stay tuned! More features coming in Sprint 2 (starts next week!) and Sprint 3
