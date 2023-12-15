'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">Library ccf-database documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="changelog.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>CHANGELOG
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CCFDatabase.html" data-type="entity-link" >CCFDatabase</a>
                            </li>
                            <li class="link">
                                <a href="classes/CCFDatabaseStatusTracker.html" data-type="entity-link" >CCFDatabaseStatusTracker</a>
                            </li>
                            <li class="link">
                                <a href="classes/CCFSpatialGraph.html" data-type="entity-link" >CCFSpatialGraph</a>
                            </li>
                            <li class="link">
                                <a href="classes/CCFSpatialScene.html" data-type="entity-link" >CCFSpatialScene</a>
                            </li>
                            <li class="link">
                                <a href="classes/HuBMAPTissueBlock.html" data-type="entity-link" >HuBMAPTissueBlock</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AggregateResult.html" data-type="entity-link" >AggregateResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CCFDatabaseOptions.html" data-type="entity-link" >CCFDatabaseOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DatabaseStatus.html" data-type="entity-link" >DatabaseStatus</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DatasetResult.html" data-type="entity-link" >DatasetResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DonorResult.html" data-type="entity-link" >DonorResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ExtractionSet.html" data-type="entity-link" >ExtractionSet</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Filter.html" data-type="entity-link" >Filter</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FlatSpatialPlacement.html" data-type="entity-link" >FlatSpatialPlacement</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ListResultItem.html" data-type="entity-link" >ListResultItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OntologyTreeModel.html" data-type="entity-link" >OntologyTreeModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OntologyTreeNode.html" data-type="entity-link" >OntologyTreeNode</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Portal.html" data-type="entity-link" >Portal</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SearchableItem.html" data-type="entity-link" >SearchableItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SearchResultJson.html" data-type="entity-link" >SearchResultJson</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SpatialEntity.html" data-type="entity-link" >SpatialEntity</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SpatialObjectReference.html" data-type="entity-link" >SpatialObjectReference</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SpatialPlacement.html" data-type="entity-link" >SpatialPlacement</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SpatialPlacementCommon.html" data-type="entity-link" >SpatialPlacementCommon</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SpatialSceneNode.html" data-type="entity-link" >SpatialSceneNode</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SpatialSearch.html" data-type="entity-link" >SpatialSearch</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TissueBlockResult.html" data-type="entity-link" >TissueBlockResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TissueSectionResult.html" data-type="entity-link" >TissueSectionResult</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});