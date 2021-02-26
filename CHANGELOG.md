# Changelog

Changelog for the Common Coordinate Framework (CCF) User Interfaces - CCF Exploration User Interface (EUI) and CCF Registration User Interface (RUI)

## 1.3.5 - 2021-02-26

### Added in RUI 1.3.5

* Updated with a new round of [User Interface improvements](https://drive.google.com/file/d/1M0Pfu41Kv-RBOvIF9hB-mcNK9U4qsDIp/view)
* Added the ability to upload previous registrations created using the [standalone version](https://hubmapconsortium.github.io/ccf-ui/rui/) of the RUI tool
* Organs now have transparency applied automatically
* Solved a major memory leak and performance issue with the 3D reference organ interface. You should notice a sizable speed and reliability increase.
* RUI location numeric data is now rounded to 3 digits
* Switched to using GitHub Actions over TravisCI for our CI/CD workflows

### Added in EUI 1.3.5

* Removed CCF's internal image-viewer in favor of the image-viewer on the HuBMAP Data Portal

## EUI 1.2.0 / RUI 1.0 FINAL - 2020-10-30

### Added in EUI 1.2.0 / RUI 1.0 FINAL

* Bug fixes and improvements
* Updated embedding API in collaboration with the IEC
* Updated EUI codebase to be in sync with code changes made for the RUI
* Added KPMP data to the EUI

### Known Issues in EUI 1.2.0 / RUI 1.0 FINAL

* It is still possible that a 3d organ may fail to load. If this happens, just refresh and try again.
* EUI has not been updated with the latest organ set. This will be added in December with its scheduled refresh.

## RUI 1.0 BETA - 2020-10-16

### Added in RUI 1.0 BETA

* Created the first version of the RUI 1.0. This version is a BETA and works in standalone mode only. The next version will include full support and integration into the HuBMAP Ingestion Portal.
* 10 Reference Organs are available to choose from (a combination of 4 organs, 2 sexes, and one organ with 2 sides [kidney])
* Implemented automatic tagging of data via collisions with anatomical structures
* RUI Location data is in standard JSON-LD format linked via the CCF Ontology and related ontologies
* Implemented extraction sites display to help guide placement of tissues

### Known Issues in RUI 1.0 BETA

* While support for embedding is implemented, more testing and collaboration with IEC is required before it is made fully available. Initial embedding documentation is available [here](RUI_EMBEDDING.md).
* When adjusting transparency via the left-hand `Anatomical Structures` menu or `Show Previous Registrations` option, the transparency effect is not very good. This will be addressed before the RUI 1.0 production release.
* Sometimes the 3d organ fails to load when clicking through reference organs quickly (and other side cases). If this happens, just refresh and try again.

## 1.1.0 - 2020-07-31

### Added in 1.1.0

* Upgraded to latest Vitessce Image Viewer and started showing processed TIFF images coming directly from the HuBMAP infrastructure
* Processed CODEX and 10x datasets are shown in the HuBMAP Portal's visualization tool
* Added a limited set of TIFF image thumbnails, with more to come
* Added two qualitative color schemes for colorizing images in the image viewer
* Bug fixes/performance optimizations

## 1.0.0-rc.1 - 2020-06-22

> :warning: **WARNING:** This version is a release candidate. Some minor updates will likely happen between now and the official HuBMAP Data Release 1 in July.

### Added in 1.0.0-rc.1

* Body UI interactions
* Image Viewer Integration
* Partonomy linkage to search / Body UI
* Now fully integrated into the HuBMAP Portal

### Known Issues in 1.0.0-rc.1

* Image Viewer is using a placeholder .tiff until more .tiff images can be loaded from the IEC

## 1.0.0-alpha.3 - 2019-05-08

### Added in 1.0.0-alpha.3

* Hooked up the interface to real data (not shown online as the data is not public yet)
* Added the Tissue Browser on the right
* Added the initial (Tissue) Image Viewer popup. Currently shows metadata, but no images yet.
* Added an initial 3D Body. Tissues cuboids currently not displayed, but a test cuboid is shown.
* Documentation (>90%) and testing coverage improved further

## 1.0.0-alpha.2 - 2019-03-27

### Added in 1.0.0-alpha.2

* Increased documentation and testing coverage across the board
* Added fullscreen button
* Bug fixes and optimizations

## 1.0.0-alpha.1 - 2019-03-06

### Added in 1.0.0-alpha.1

* Started the process of implementing the 1.0.0 UI spec
  * [Spec Doc](https://iu.box.com/s/ip91f6x6t3ni1m6xntg7r72dfzc8c08c)
  * [User Stories](https://iu.box.com/s/i0n9rales8c5556xs05vxa43u633b3n3)
* Setup the base project scaffolding for the new version
* Added CCF Partonomy (CCF-P) search and tree display
* Added a filter for filter tissues

## 0.6.0 - 2019-11-08

### Added in 0.6.0

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

### Added in 0.5.0

* Display of the CCF ontology, integrated with search
* Semantic search by ontology, results are presented at all levels
* Tissue overlays showing regions of interest
* Data download links to direct users to <https://sampledata.hubmapconsortium.org>
* Data documentation (95% coverage) and testing (85% coverage)

## 0.2.0 - 2019-05-03

### Added in 0.2.0

* Sprint 2 release of the CCF-UI!
* A search interface was added to query data by age, sex, technology and TMC. Ontological search will be implemented in the next sprint.
* Body, Organ, and Tissue views now respond to updates to the search on the fly
* Appropriate metadata is now displayed in the Body, Organ, Tissue, and Cell views

## 0.1.0 - 2019-04-12

### Added in 0.1.0

* Sprint 1 release of the CCF-UI!
* Setup the base project scaffolding
* Added a sample database that includes initial data provided by VU
* Added Visual browsing of tissue samples and metadata at the whole body, organ, tissue, and cell level
* Stay tuned! More features coming in Sprint 2 (starts next week!) and Sprint 3
