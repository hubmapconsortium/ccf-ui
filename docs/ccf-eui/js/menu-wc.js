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
                    <a href="index.html" data-type="index-link">Application ccf-eui documentation</a>
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
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-19aa8f4c07864c60b0c2c43361d5485a"' : 'data-target="#xs-components-links-module-AppModule-19aa8f4c07864c60b0c2c43361d5485a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-19aa8f4c07864c60b0c2c43361d5485a"' :
                                            'id="xs-components-links-module-AppModule-19aa8f4c07864c60b0c2c43361d5485a"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppWebComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppWebComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CheckboxModule.html" data-type="entity-link" >CheckboxModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-CheckboxModule-fe3e797c511bd277068797533365c362"' : 'data-target="#xs-components-links-module-CheckboxModule-fe3e797c511bd277068797533365c362"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CheckboxModule-fe3e797c511bd277068797533365c362"' :
                                            'id="xs-components-links-module-CheckboxModule-fe3e797c511bd277068797533365c362"' }>
                                            <li class="link">
                                                <a href="components/CheckboxComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CheckboxComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CoreModule.html" data-type="entity-link" >CoreModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/DonorCardModule.html" data-type="entity-link" >DonorCardModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-DonorCardModule-1f416f467bbf0aa4da9bf39b986956ff"' : 'data-target="#xs-components-links-module-DonorCardModule-1f416f467bbf0aa4da9bf39b986956ff"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DonorCardModule-1f416f467bbf0aa4da9bf39b986956ff"' :
                                            'id="xs-components-links-module-DonorCardModule-1f416f467bbf0aa4da9bf39b986956ff"' }>
                                            <li class="link">
                                                <a href="components/DonorCardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DonorCardComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DrawerModule.html" data-type="entity-link" >DrawerModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-DrawerModule-2facb8ede5531dd4425e86d57567e82d"' : 'data-target="#xs-components-links-module-DrawerModule-2facb8ede5531dd4425e86d57567e82d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DrawerModule-2facb8ede5531dd4425e86d57567e82d"' :
                                            'id="xs-components-links-module-DrawerModule-2facb8ede5531dd4425e86d57567e82d"' }>
                                            <li class="link">
                                                <a href="components/ContainerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ContainerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ContentComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ContentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DrawerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DrawerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ToggleButtonComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ToggleButtonComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DropdownModule.html" data-type="entity-link" >DropdownModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-DropdownModule-e6b459e1acb1bf223daf2170b629cee3"' : 'data-target="#xs-components-links-module-DropdownModule-e6b459e1acb1bf223daf2170b629cee3"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DropdownModule-e6b459e1acb1bf223daf2170b629cee3"' :
                                            'id="xs-components-links-module-DropdownModule-e6b459e1acb1bf223daf2170b629cee3"' }>
                                            <li class="link">
                                                <a href="components/DropdownComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DropdownComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DualSliderModule.html" data-type="entity-link" >DualSliderModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-DualSliderModule-9174b54e7ff041d39fd8552791d7fd7a"' : 'data-target="#xs-components-links-module-DualSliderModule-9174b54e7ff041d39fd8552791d7fd7a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DualSliderModule-9174b54e7ff041d39fd8552791d7fd7a"' :
                                            'id="xs-components-links-module-DualSliderModule-9174b54e7ff041d39fd8552791d7fd7a"' }>
                                            <li class="link">
                                                <a href="components/DualSliderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DualSliderComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/FiltersContentModule.html" data-type="entity-link" >FiltersContentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-FiltersContentModule-901f2a6cd6fc67edaa88228e29949e3c"' : 'data-target="#xs-components-links-module-FiltersContentModule-901f2a6cd6fc67edaa88228e29949e3c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-FiltersContentModule-901f2a6cd6fc67edaa88228e29949e3c"' :
                                            'id="xs-components-links-module-FiltersContentModule-901f2a6cd6fc67edaa88228e29949e3c"' }>
                                            <li class="link">
                                                <a href="components/FiltersContentComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FiltersContentComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/FiltersPopoverModule.html" data-type="entity-link" >FiltersPopoverModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-FiltersPopoverModule-bc8dc0a7df99a8fdd0b28e3968e97cef"' : 'data-target="#xs-components-links-module-FiltersPopoverModule-bc8dc0a7df99a8fdd0b28e3968e97cef"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-FiltersPopoverModule-bc8dc0a7df99a8fdd0b28e3968e97cef"' :
                                            'id="xs-components-links-module-FiltersPopoverModule-bc8dc0a7df99a8fdd0b28e3968e97cef"' }>
                                            <li class="link">
                                                <a href="components/FiltersPopoverComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FiltersPopoverComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HeaderModule.html" data-type="entity-link" >HeaderModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-HeaderModule-522eab15398e5cf4939846b581e9dee5"' : 'data-target="#xs-components-links-module-HeaderModule-522eab15398e5cf4939846b581e9dee5"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HeaderModule-522eab15398e5cf4939846b581e9dee5"' :
                                            'id="xs-components-links-module-HeaderModule-522eab15398e5cf4939846b581e9dee5"' }>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HeaderComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/OntologyExplorationModule.html" data-type="entity-link" >OntologyExplorationModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/OntologySearchModule.html" data-type="entity-link" >OntologySearchModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-OntologySearchModule-5483e5f7b58f467c792f8456bf51b1fd"' : 'data-target="#xs-components-links-module-OntologySearchModule-5483e5f7b58f467c792f8456bf51b1fd"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-OntologySearchModule-5483e5f7b58f467c792f8456bf51b1fd"' :
                                            'id="xs-components-links-module-OntologySearchModule-5483e5f7b58f467c792f8456bf51b1fd"' }>
                                            <li class="link">
                                                <a href="components/OntologySearchComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OntologySearchComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/OntologySelectionModule.html" data-type="entity-link" >OntologySelectionModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-OntologySelectionModule-379707d36c7b5e800f1eefe37abe2991"' : 'data-target="#xs-components-links-module-OntologySelectionModule-379707d36c7b5e800f1eefe37abe2991"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-OntologySelectionModule-379707d36c7b5e800f1eefe37abe2991"' :
                                            'id="xs-components-links-module-OntologySelectionModule-379707d36c7b5e800f1eefe37abe2991"' }>
                                            <li class="link">
                                                <a href="components/OntologySelectionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OntologySelectionComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/OntologyTreeModule.html" data-type="entity-link" >OntologyTreeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-OntologyTreeModule-526f60a4af0ae822f5a123704bb9b623"' : 'data-target="#xs-components-links-module-OntologyTreeModule-526f60a4af0ae822f5a123704bb9b623"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-OntologyTreeModule-526f60a4af0ae822f5a123704bb9b623"' :
                                            'id="xs-components-links-module-OntologyTreeModule-526f60a4af0ae822f5a123704bb9b623"' }>
                                            <li class="link">
                                                <a href="components/OntologyTreeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OntologyTreeComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ResultsBrowserModule.html" data-type="entity-link" >ResultsBrowserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ResultsBrowserModule-423c9c6cad542bd03e2f94ee47f0a850"' : 'data-target="#xs-components-links-module-ResultsBrowserModule-423c9c6cad542bd03e2f94ee47f0a850"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ResultsBrowserModule-423c9c6cad542bd03e2f94ee47f0a850"' :
                                            'id="xs-components-links-module-ResultsBrowserModule-423c9c6cad542bd03e2f94ee47f0a850"' }>
                                            <li class="link">
                                                <a href="components/ResultsBrowserComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResultsBrowserComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SpatialSearchConfigBehaviorModule.html" data-type="entity-link" >SpatialSearchConfigBehaviorModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SpatialSearchConfigBehaviorModule-331e61cf81672c8a6748ece5deb309eb"' : 'data-target="#xs-components-links-module-SpatialSearchConfigBehaviorModule-331e61cf81672c8a6748ece5deb309eb"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SpatialSearchConfigBehaviorModule-331e61cf81672c8a6748ece5deb309eb"' :
                                            'id="xs-components-links-module-SpatialSearchConfigBehaviorModule-331e61cf81672c8a6748ece5deb309eb"' }>
                                            <li class="link">
                                                <a href="components/SpatialSearchConfigBehaviorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SpatialSearchConfigBehaviorComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SpatialSearchConfigModule.html" data-type="entity-link" >SpatialSearchConfigModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SpatialSearchConfigModule-9dffdb51d2201f141f2c1fc1025f5a71"' : 'data-target="#xs-components-links-module-SpatialSearchConfigModule-9dffdb51d2201f141f2c1fc1025f5a71"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SpatialSearchConfigModule-9dffdb51d2201f141f2c1fc1025f5a71"' :
                                            'id="xs-components-links-module-SpatialSearchConfigModule-9dffdb51d2201f141f2c1fc1025f5a71"' }>
                                            <li class="link">
                                                <a href="components/SpatialSearchConfigComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SpatialSearchConfigComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SpinnerOverlayModule.html" data-type="entity-link" >SpinnerOverlayModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SpinnerOverlayModule-661c7f728084dbd96e8130bfbe046bdd"' : 'data-target="#xs-components-links-module-SpinnerOverlayModule-661c7f728084dbd96e8130bfbe046bdd"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SpinnerOverlayModule-661c7f728084dbd96e8130bfbe046bdd"' :
                                            'id="xs-components-links-module-SpinnerOverlayModule-661c7f728084dbd96e8130bfbe046bdd"' }>
                                            <li class="link">
                                                <a href="components/SpinnerOverlayComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SpinnerOverlayComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/StoreModule.html" data-type="entity-link" >StoreModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ThemingModule.html" data-type="entity-link" >ThemingModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ThemingModule-6eb32d8cab3c120770d9f6e433bd3f4c"' : 'data-target="#xs-injectables-links-module-ThemingModule-6eb32d8cab3c120770d9f6e433bd3f4c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ThemingModule-6eb32d8cab3c120770d9f6e433bd3f4c"' :
                                        'id="xs-injectables-links-module-ThemingModule-6eb32d8cab3c120770d9f6e433bd3f4c"' }>
                                        <li class="link">
                                            <a href="injectables/ThemingService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ThemingService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ThumbnailCarouselModule.html" data-type="entity-link" >ThumbnailCarouselModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ThumbnailCarouselModule-72cea5b89d26bc3311058ecad8ae374c"' : 'data-target="#xs-components-links-module-ThumbnailCarouselModule-72cea5b89d26bc3311058ecad8ae374c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ThumbnailCarouselModule-72cea5b89d26bc3311058ecad8ae374c"' :
                                            'id="xs-components-links-module-ThumbnailCarouselModule-72cea5b89d26bc3311058ecad8ae374c"' }>
                                            <li class="link">
                                                <a href="components/ThumbnailCarouselComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ThumbnailCarouselComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TissueSectionVisModule.html" data-type="entity-link" >TissueSectionVisModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TissueSectionVisModule-2c1f0dd39243ebfa24dcd891749e9f0e"' : 'data-target="#xs-components-links-module-TissueSectionVisModule-2c1f0dd39243ebfa24dcd891749e9f0e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TissueSectionVisModule-2c1f0dd39243ebfa24dcd891749e9f0e"' :
                                            'id="xs-components-links-module-TissueSectionVisModule-2c1f0dd39243ebfa24dcd891749e9f0e"' }>
                                            <li class="link">
                                                <a href="components/TissueSectionVisComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TissueSectionVisComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ViewerModule.html" data-type="entity-link" >ViewerModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ViewerModule-92c32e47213431d4b31e9f0a60601a3b"' : 'data-target="#xs-components-links-module-ViewerModule-92c32e47213431d4b31e9f0a60601a3b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ViewerModule-92c32e47213431d4b31e9f0a60601a3b"' :
                                            'id="xs-components-links-module-ViewerModule-92c32e47213431d4b31e9f0a60601a3b"' }>
                                            <li class="link">
                                                <a href="components/ViewerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ViewerComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/FlatNode.html" data-type="entity-link" >FlatNode</a>
                            </li>
                            <li class="link">
                                <a href="classes/InitializationState.html" data-type="entity-link" >InitializationState</a>
                            </li>
                            <li class="link">
                                <a href="classes/MessageChannel.html" data-type="entity-link" >MessageChannel</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppRootOverlayContainer.html" data-type="entity-link" >AppRootOverlayContainer</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ColorAssignmentState.html" data-type="entity-link" >ColorAssignmentState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DataState.html" data-type="entity-link" >DataState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DelegateDataSourceService.html" data-type="entity-link" >DelegateDataSourceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/IconRegistryState.html" data-type="entity-link" >IconRegistryState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ListResultsState.html" data-type="entity-link" >ListResultsState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MessageService.html" data-type="entity-link" >MessageService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OntologySearchService.html" data-type="entity-link" >OntologySearchService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SceneState.html" data-type="entity-link" >SceneState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/WorkerDataSourceService.html" data-type="entity-link" >WorkerDataSourceService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AppOptions.html" data-type="entity-link" >AppOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Color.html" data-type="entity-link" >Color</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ColorAssignmentStateModel.html" data-type="entity-link" >ColorAssignmentStateModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ContentContainerChanged.html" data-type="entity-link" >ContentContainerChanged</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DataStateModel.html" data-type="entity-link" >DataStateModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DefaultIconDefinition.html" data-type="entity-link" >DefaultIconDefinition</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DelegateDataSourceOptions.html" data-type="entity-link" >DelegateDataSourceOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DrawerContainersChanged.html" data-type="entity-link" >DrawerContainersChanged</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DrawerInitialized.html" data-type="entity-link" >DrawerInitialized</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DrawerToggled.html" data-type="entity-link" >DrawerToggled</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IconDefinition.html" data-type="entity-link" >IconDefinition</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ListResult.html" data-type="entity-link" >ListResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ListResultsStateModel.html" data-type="entity-link" >ListResultsStateModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Message.html" data-type="entity-link" >Message</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MessageServiceConfig.html" data-type="entity-link" >MessageServiceConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OntologySelection.html" data-type="entity-link" >OntologySelection</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SceneStateModel.html" data-type="entity-link" >SceneStateModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SearchResult.html" data-type="entity-link" >SearchResult</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
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
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});