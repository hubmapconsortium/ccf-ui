# Changelog

Changelog for the Human Reference Atlas (HRA) User Interfaces

## 3.9.0 - 2023-12-15

## Added in 3.9.0

- Updated to the latest CCF.OWL as part of HRA v2.0!
- Finalized Biomarker support in the EUI and API analagous to Cell Type support
- EUI Quality of Life Improvements. See [milestone 6](https://github.com/hubmapconsortium/ccf-ui/milestone/6?closed=1)
- RUI Quality of Life Improvements. See [milestone 5](https://github.com/hubmapconsortium/ccf-ui/milestone/5?closed=1)

## 3.8.1 - 2023-11-17

## Added in 3.8.1

- Improved keyboard controls in the RUI

## 3.8.0 - 2023-11-16

## Added in 3.8.0

- EUI Quality of Life Improvements. See [milestone 6](https://github.com/hubmapconsortium/ccf-ui/milestone/6?closed=1)
- RUI Quality of Life Improvements. See [milestone 5](https://github.com/hubmapconsortium/ccf-ui/milestone/5?closed=1)
- A lot of minor UI and bug fixes in preparation for HRA 2.0
- Updated dependencies including, update to Angular 16

## 3.7.2 - 2023-07-12

## Added in 3.7.2

- Client side cache has been updated to be more sensitive to configuration changes. Fixes [hra-registrations#1](https://github.com/hubmapconsortium/hra-registrations/issues/1)

## 3.7.0 - 2023-06-15

### Added in 3.7.0

- Updated to CCF.OWL v2.2.0 which indexes the [Human Reference Atlas (HRA) 5th Release (v1.4)](https://hubmapconsortium.github.io/ccf-releases/v1.4/docs/index.html) for use in the CCF UIs and CCF-API.
- Added CCF-API usage notebooks for [python](ccf-api-usage.ipynb) and [javascript](https://observablehq.com/@cns-iu/ccf-api-documentation-javascript)

## 3.6.0 - 2022-10-15

### Added in 3.6.0.

- Updated to CCF.OWL v2.1.0 which indexes the [Human Reference Atlas (HRA) 4th Release (v1.3)](https://hubmapconsortium.github.io/ccf-releases/v1.3/docs/index.html) for use in the CCF UIs and CCF-API. _Note_ that some terms have changed in the ontology. As such, some SPARQL queries may need to be updated. All CCF-API calls have been updated to support the new terms.

## 3.5.0 - 2022-09-27

### Added in 3.5.0

- Update to CCF.OWL v1.9.4
- Update placement for KPMP rui locations
- Switch to HuBMAP v3 search-api
- Pick right organ when loading rui locations from a file in the RUI

## 3.4.0 - 2022-07-01

### Added in 3.4.0

- Major feature added: Spatial Search! This includes an expanded API plus a user interface for dynamically generating spatial searches.

### Known Issues in 3.4.0

- There are some minor visual descrepancies when viewing the spatial search 3D scene and the results. However, blocks which are highlighted _will_ be selected if the spatial search is added to your overall search filters.

## 3.3.0 - 2022-06-17

### Added in 3.3.0

- Added support for the latest CCF Ontology v1.9.0 which adds Placenta, Spinal Cord, new Landmarks for reference organs, and a host of data updates.
- Added a SPARQL route to the CCF-API for flexible querying of the Ontology and linked data. See the [/v1/sparql docs](https://apps.humanatlas.io/hra-api/#/operations/sparql) for more information.
- Clean up and bug fixes

## 3.2.0 - 2022-04-14

### Added in 3.2.0

- Major CCF Database speed improvements! 95% reduction in load times!
- Minor graphical fixes

## 3.1.1 - 2022-04-12

### Added in 3.1.1

- Expanded RUI web component options
- Added support for warming up the CCF database via the CCF-API so that the EUI can prevent timeouts

## 3.1.0 - 2022-04-07

### Added in 3.1.0

- Added support for the latest CCF Ontology v1.8.0 which adds cell types
- Added feature to search for tissue blocks by cell type
- Added API feature to dynamically generate GTEx rui_locations.jsonld
- Added logging of organ and block position changes to the RUI
- Added an expanded organ selector that makes selecting organs much easier with the larger number of reference organs we have now
- Now generating programming libraries for the CCF-API in Python, TypeScript, TypeScript (Angular), and JavaScript. We will be publishing them to appropriate package managers soon.
- Improved performance of the CCF-API
- New theming options and toggle for the CCF EUI/RUI
- Added new themes for SenNet, GTEx, and a default theme
- Added compodoc generated code documentation to production and staging builds
- Bug fixes and minor improvements

## 3.0.0 - 2022-01-27

### Added in 3.0.0

- Added support for the latest CCF Ontology v1.7.0
- Bug fixes and code cleanup

## 3.0.0 BETA - 2021-12-17

### Added in 3.0.0 BETA

- Added reference organs and ASCT+B tables from the v1.1 CCF Release
  - Links: [CCF Ontology v1.7 BETA](https://github.com/hubmapconsortium/hubmap-ontology/tree/gh-pages/beta), [CCF Release v1.1](https://hubmapconsortium.github.io/ccf-releases/v1.1/docs/index.html)

### Known issues in 3.0.0 BETA

- Previously registered tissues may appear slightly off. We are working to rectify this before making it a production release.

## 2.5.0 - 2021-12-17

### Added in 2.5.0

- CCF-API OpenAPI Spec and implementation. Next version will connect the EUI to this as it's backend.
- Added the CCF Body UI Web Component for integrating the 3D scene deeply in webpages (including the HuBMAP data portal).
- The organ-info Web Component can now take an option to highlight specific blocks in the scene. Currently only highlights by providers, but age, sex, and BMI will be added in the next version.
- Bug fixes and Quality of Life improvements

## 2.4.0 - 2021-12-10

### Added in 2.4.0

- RUI shows a confirmation dialog when a user attempts to leave without finishing registration
- Added GTEx data to EUI
- RUI Common Extraction Sites are now known as Landmarks
- Organ info now highlights the block selected on click
- Updated RUI YouTube Demo link
- Bug fixes and Quality of Life improvements

## 2.3.1 - 2021-09-13

### Added in 2.3.1

- Added support for paired organs to be refernced by their parent (ala Kidney + Left/Right Kidney)

## 2.3.0 - 2021-09-10

### Added in 2.3.0

- _Greatly_ improved CCF Database performance. This improves the performance in both organ-info and EUI.
- Improved styling of organ-info

## 2.2.0 - 2021-09-10

### Added in 2.2.0

- Added an organ-info web component for displaying reference organs and associated data in a simple panel display. The hubmap portal will be using this soon for organ pages.
- [EMBEDDING.md](EMBEDDING.md) instructions have been updated for organ-info embedding.

## 2.1.0 - 2021-07-30

### Added in EUI / RUI 2.1.0

- Better support for embedding EUI/RUI in different containers, see [EMBEDDING.md](EMBEDDING.md) for updated instructions.
- Configuration updates:
  - Configuration of EUI/RUI via webcomponent properties (vs globalConfig)
  - Optional use of ontology id to select reference organs in the RUI
  - Removed embedded and tutorial mode configurations from the RUI config
  - Ability to load data sources in the eui via external configuration
  - Added cancelRegistration callback to rui external configuration
- Set dark/light theme based on user/OS preferences
- Update HuBMAP search processing to conform to new field names
- Code cleanup, shared utilities, etc.
- Telemetry dialog box fixes to avoid unnecessary reloads
- RUI gizmo rotates in sync with the reference organ in 3D preview view
- RUI now uses an orthographic view when in registration views

## 2.0.0 - 2021-07-16

### Added in EUI / RUI 2.0.0

- RUI and EUI are now basic web-components, see [EMBEDDING.md](EMBEDDING.md)
- Added advanced google analytics tracking/telemetry
- Linked donor card and tissue block hovering
- Updated dependencies, including upgrading to Angular 12
- Minor UI and Bug fixes
- Updated demo video links
- Organ carousel will respond to container width and show only full icons
- EUI: clicking refresh and selecting body on partonomy resets the body view

### Breaking changes in EUI / RUI 2.0.0

- Embedding the EUI and RUI must now be done via web-components. The most significant change is the element is no longer called `ccf-root` but is instead called `ccf-eui` or `ccf-rui` depending on the UI being embedded.

## 1.7.0 - 2021-05-21

### Added in EUI / RUI 1.7.0

- Added a startup modal to the RUI which simplifies the initial setup for a new registration
- Added 8 new reference organs, bringing us to 13 Reference Organs!
- Added SPARC Registrations to the EUI
- Added a tissue section visualization to the results list in the EUI

## 1.6.0 - 2021-04-09

### Added in RUI 1.6.0

- Added SOP information to the About section

### Added in EUI 1.6.0

- Added color assignment/selection to both 3d scene and list results
- Bug fixes, code cleanup, and optimization

### Known issues in 1.6.0

- The 3d scene is a little slow. To be able to interact, unselect reference organs to reduce scene complexity.
- Tissue samples may be a little off in the 3D scene. This will be fixed in a future release. Data is still accurate.

## 1.5.0 - 2021-03-26

### Added in RUI 1.5.0

- Minor styling updates

### Added in EUI 1.5.0

NOTE: EUI will not be pushed to production during this cycle as there are some features not fully integrated. This should be resolved in the next release scheduled for April 9th. You can view the results of this sprint on [staging](https://hubmap-ccf-ui.netlify.app/).

- Updated styling to better fit the [user interface spec](https://drive.google.com/file/d/15mx__aHeNDCBBYBXM64ED6YAOeyp9Fcy/view)
- Added a new results pane which structures data into Donor->Tissue Blocks (+Datasets)->Tissue Samples (+Datasets)
- Added a link viewer that allows us to display donors, samples, and datasets in a frame within the application
- Added UFL thumbnails
- Updated and optimized the ccf-database for the new results structure and future integrations
- Tied organ carousel to the 3D scene. Turning off an organ removes the organ and related tissues from the 3D scene.
- Turned off anatomical structure opacity adjustment until it can be fully integrated

## 1.4.0 - 2021-03-12

### Added in RUI 1.4.0

- Updated library dependencies, including to Angular 11
- Updated styling to better fit the [user interface spec](https://drive.google.com/file/d/1M0Pfu41Kv-RBOvIF9hB-mcNK9U4qsDIp/view)

### Added in EUI 1.4.0

NOTE: EUI will not be pushed to production during this cycle as there are some features partly integrated. This should be resolved in the next release scheduled for March 26th. You can view the results of this sprint on [staging](https://hubmap-ccf-ui.netlify.app/).

- Updated library dependencies, including to Angular 11
- Updated styling to better fit the [user interface spec](https://drive.google.com/file/d/15mx__aHeNDCBBYBXM64ED6YAOeyp9Fcy/view) and match RUI styling
- Updated the Info Dialog to match the RUI look and feel
- Updated the data processing to improve efficiency and generate data in the form needed for the v1.5.0 spec
- Added a reference organ selector, also used in the RUI, to turn off/on reference organs on the stage. UI is implemented, but still needs hooked up to the 3d Stage.
- Added a technology filter
- Added a control to set Opacities of individual organs/anatomical structures on the stage. UI is implemented, but still needs hooked up to the 3d Stage.

## 1.3.5 - 2021-02-26

### Added in RUI 1.3.5

- Updated with a new round of [User Interface improvements](https://drive.google.com/file/d/1M0Pfu41Kv-RBOvIF9hB-mcNK9U4qsDIp/view)
- Added the ability to upload previous registrations created using the [standalone version](https://hubmapconsortium.github.io/ccf-ui/rui/) of the RUI tool
- Organs now have transparency applied automatically
- Solved a major memory leak and performance issue with the 3D reference organ interface. You should notice a sizable speed and reliability increase.
- RUI location numeric data is now rounded to 3 digits
- Switched to using GitHub Actions over TravisCI for our CI/CD workflows

### Added in EUI 1.3.5

- Removed CCF's internal image-viewer in favor of the image-viewer on the HuBMAP Data Portal

## EUI 1.2.0 / RUI 1.0 FINAL - 2020-10-30

### Added in EUI 1.2.0 / RUI 1.0 FINAL

- Bug fixes and improvements
- Updated embedding API in collaboration with the IEC
- Updated EUI codebase to be in sync with code changes made for the RUI
- Added KPMP data to the EUI

### Known Issues in EUI 1.2.0 / RUI 1.0 FINAL

- It is still possible that a 3d organ may fail to load. If this happens, just refresh and try again.
- EUI has not been updated with the latest organ set. This will be added in December with its scheduled refresh.

## RUI 1.0 BETA - 2020-10-16

### Added in RUI 1.0 BETA

- Created the first version of the RUI 1.0. This version is a BETA and works in standalone mode only. The next version will include full support and integration into the HuBMAP Ingestion Portal.
- 10 Reference Organs are available to choose from (a combination of 4 organs, 2 sexes, and one organ with 2 sides [kidney])
- Implemented automatic tagging of data via collisions with anatomical structures
- RUI Location data is in standard JSON-LD format linked via the CCF Ontology and related ontologies
- Implemented extraction sites display to help guide placement of tissues

### Known Issues in RUI 1.0 BETA

- While support for embedding is implemented, more testing and collaboration with IEC is required before it is made fully available. Initial embedding documentation is available [here](EMBEDDING.md).
- When adjusting transparency via the left-hand `Anatomical Structures` menu or `Show Previous Registrations` option, the transparency effect is not very good. This will be addressed before the RUI 1.0 production release.
- Sometimes the 3d organ fails to load when clicking through reference organs quickly (and other side cases). If this happens, just refresh and try again.

## 1.1.0 - 2020-07-31

### Added in 1.1.0

- Upgraded to latest Vitessce Image Viewer and started showing processed TIFF images coming directly from the HuBMAP infrastructure
- Processed CODEX and 10x datasets are shown in the HuBMAP Portal's visualization tool
- Added a limited set of TIFF image thumbnails, with more to come
- Added two qualitative color schemes for colorizing images in the image viewer
- Bug fixes/performance optimizations

## 1.0.0-rc.1 - 2020-06-22

> :warning: **WARNING:** This version is a release candidate. Some minor updates will likely happen between now and the official HuBMAP Data Release 1 in July.

### Added in 1.0.0-rc.1

- Body UI interactions
- Image Viewer Integration
- Partonomy linkage to search / Body UI
- Now fully integrated into the HuBMAP Portal

### Known Issues in 1.0.0-rc.1

- Image Viewer is using a placeholder .tiff until more .tiff images can be loaded from the IEC

## 1.0.0-alpha.3 - 2019-05-08

### Added in 1.0.0-alpha.3

- Hooked up the interface to real data (not shown online as the data is not public yet)
- Added the Tissue Browser on the right
- Added the initial (Tissue) Image Viewer popup. Currently shows metadata, but no images yet.
- Added an initial 3D Body. Tissues cuboids currently not displayed, but a test cuboid is shown.
- Documentation (>90%) and testing coverage improved further

## 1.0.0-alpha.2 - 2019-03-27

### Added in 1.0.0-alpha.2

- Increased documentation and testing coverage across the board
- Added fullscreen button
- Bug fixes and optimizations

## 1.0.0-alpha.1 - 2019-03-06

### Added in 1.0.0-alpha.1

- Started the process of implementing the 1.0.0 UI spec
  - [Spec Doc](https://iu.box.com/s/ip91f6x6t3ni1m6xntg7r72dfzc8c08c)
  - [User Stories](https://iu.box.com/s/i0n9rales8c5556xs05vxa43u633b3n3)
- Setup the base project scaffolding for the new version
- Added CCF Partonomy (CCF-P) search and tree display
- Added a filter for filter tissues

## 0.6.0 - 2019-11-08

### Added in 0.6.0

- The [CCF API](https://github.com/hubmapconsortium/ccf-api) project was started with an initial OpenAPI Schema, [documentation](http://smart-api.info/ui/d1f33c1a75e9dcda984194e4d8cea7d8), and code for spinning up a mock data server. This codifies the [CCF data and metadata standards](https://docs.google.com/document/d/1Qgx4mNutE1V3CfQ7y8Lg3rxQy5nhiOSKCSv5MJkPRMc/edit) defined by MC-IU and will be used by the CCF EUI and RUI.
- In preparation for future developments, we added a hidden, alpha-level 3d organ viewer. You can toggle this on and off in the organ view, by typing 3d with your keyboard.
- Updated navigation to directly jump to the tissue browser when a user selects an item from the search box
- Upgraded dependencies, including upgrades to Angular 8
- Testing and bug fixes
- Minor UI updates
  - Changed download icon color
  - Changed the background color for the search
  - Moved the Technologies filter above ontology
  - Additional styles for details button

## 0.5.0 - 2019-05-24

### Added in 0.5.0

- Display of the CCF ontology, integrated with search
- Semantic search by ontology, results are presented at all levels
- Tissue overlays showing regions of interest
- Data download links to direct users to <https://sampledata.hubmapconsortium.org>
- Data documentation (95% coverage) and testing (85% coverage)

## 0.2.0 - 2019-05-03

### Added in 0.2.0

- Sprint 2 release of the CCF-UI!
- A search interface was added to query data by age, sex, technology and TMC. Ontological search will be implemented in the next sprint.
- Body, Organ, and Tissue views now respond to updates to the search on the fly
- Appropriate metadata is now displayed in the Body, Organ, Tissue, and Cell views

## 0.1.0 - 2019-04-12

### Added in 0.1.0

- Sprint 1 release of the CCF-UI!
- Setup the base project scaffolding
- Added a sample database that includes initial data provided by VU
- Added Visual browsing of tissue samples and metadata at the whole body, organ, tissue, and cell level
- Stay tuned! More features coming in Sprint 2 (starts next week!) and Sprint 3
