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
                    <a href="index.html" data-type="index-link">ccf-ui documentation</a>
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
                                <a href="modules/AboutModule.html" data-type="entity-link">AboutModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AboutModule-09c20fbec07df9e75b3b8a461c6674a8"' : 'data-target="#xs-components-links-module-AboutModule-09c20fbec07df9e75b3b8a461c6674a8"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AboutModule-09c20fbec07df9e75b3b8a461c6674a8"' :
                                            'id="xs-components-links-module-AboutModule-09c20fbec07df9e75b3b8a461c6674a8"' }>
                                            <li class="link">
                                                <a href="components/AboutComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AboutComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AgeSelectorModule.html" data-type="entity-link">AgeSelectorModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AgeSelectorModule-f3cb4b899518cd02902c0d4115d91e29"' : 'data-target="#xs-components-links-module-AgeSelectorModule-f3cb4b899518cd02902c0d4115d91e29"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AgeSelectorModule-f3cb4b899518cd02902c0d4115d91e29"' :
                                            'id="xs-components-links-module-AgeSelectorModule-f3cb4b899518cd02902c0d4115d91e29"' }>
                                            <li class="link">
                                                <a href="components/AgeSelectorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AgeSelectorComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-680555c42834e03c84f883f3f5b5cab9"' : 'data-target="#xs-components-links-module-AppModule-680555c42834e03c84f883f3f5b5cab9"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-680555c42834e03c84f883f3f5b5cab9"' :
                                            'id="xs-components-links-module-AppModule-680555c42834e03c84f883f3f5b5cab9"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRenderInitModule.html" data-type="entity-link">AppRenderInitModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppStateModule.html" data-type="entity-link">AppStateModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/BodyModule.html" data-type="entity-link">BodyModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-BodyModule-14602dd2de7f8d80e59cf7438f7c7d04"' : 'data-target="#xs-components-links-module-BodyModule-14602dd2de7f8d80e59cf7438f7c7d04"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BodyModule-14602dd2de7f8d80e59cf7438f7c7d04"' :
                                            'id="xs-components-links-module-BodyModule-14602dd2de7f8d80e59cf7438f7c7d04"' }>
                                            <li class="link">
                                                <a href="components/BodyComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BodyComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-BodyModule-14602dd2de7f8d80e59cf7438f7c7d04"' : 'data-target="#xs-injectables-links-module-BodyModule-14602dd2de7f8d80e59cf7438f7c7d04"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-BodyModule-14602dd2de7f8d80e59cf7438f7c7d04"' :
                                        'id="xs-injectables-links-module-BodyModule-14602dd2de7f8d80e59cf7438f7c7d04"' }>
                                        <li class="link">
                                            <a href="injectables/BodyDataService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>BodyDataService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/BodyRoutingModule.html" data-type="entity-link">BodyRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CalloutModule.html" data-type="entity-link">CalloutModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-CalloutModule-c51a4c497fd88608a8d25d4e6a9182f4"' : 'data-target="#xs-components-links-module-CalloutModule-c51a4c497fd88608a8d25d4e6a9182f4"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CalloutModule-c51a4c497fd88608a8d25d4e6a9182f4"' :
                                            'id="xs-components-links-module-CalloutModule-c51a4c497fd88608a8d25d4e6a9182f4"' }>
                                            <li class="link">
                                                <a href="components/CalloutComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CalloutComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/GenderSelectorModule.html" data-type="entity-link">GenderSelectorModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-GenderSelectorModule-440533a67f725689641327afe7cb4c9c"' : 'data-target="#xs-components-links-module-GenderSelectorModule-440533a67f725689641327afe7cb4c9c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-GenderSelectorModule-440533a67f725689641327afe7cb4c9c"' :
                                            'id="xs-components-links-module-GenderSelectorModule-440533a67f725689641327afe7cb4c9c"' }>
                                            <li class="link">
                                                <a href="components/GenderSelectorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">GenderSelectorComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HeaderModule.html" data-type="entity-link">HeaderModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-HeaderModule-34014d1ac068fff2bad05cd32a800e18"' : 'data-target="#xs-components-links-module-HeaderModule-34014d1ac068fff2bad05cd32a800e18"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HeaderModule-34014d1ac068fff2bad05cd32a800e18"' :
                                            'id="xs-components-links-module-HeaderModule-34014d1ac068fff2bad05cd32a800e18"' }>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HeaderComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HomeModule.html" data-type="entity-link">HomeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-HomeModule-0e01bb5caa2e2e7b76d7f1717588378e"' : 'data-target="#xs-components-links-module-HomeModule-0e01bb5caa2e2e7b76d7f1717588378e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HomeModule-0e01bb5caa2e2e7b76d7f1717588378e"' :
                                            'id="xs-components-links-module-HomeModule-0e01bb5caa2e2e7b76d7f1717588378e"' }>
                                            <li class="link">
                                                <a href="components/HomeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomeComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HomeRoutingModule.html" data-type="entity-link">HomeRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MainModule.html" data-type="entity-link">MainModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-MainModule-520409f314b01a24c98244c6c8864b77"' : 'data-target="#xs-components-links-module-MainModule-520409f314b01a24c98244c6c8864b77"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MainModule-520409f314b01a24c98244c6c8864b77"' :
                                            'id="xs-components-links-module-MainModule-520409f314b01a24c98244c6c8864b77"' }>
                                            <li class="link">
                                                <a href="components/MainComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MainComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MetadataModule.html" data-type="entity-link">MetadataModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-MetadataModule-9dc74111fd6e8c16a954ef54cbc8b647"' : 'data-target="#xs-components-links-module-MetadataModule-9dc74111fd6e8c16a954ef54cbc8b647"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MetadataModule-9dc74111fd6e8c16a954ef54cbc8b647"' :
                                            'id="xs-components-links-module-MetadataModule-9dc74111fd6e8c16a954ef54cbc8b647"' }>
                                            <li class="link">
                                                <a href="components/MetadataComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MetadataComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/NavigationModule.html" data-type="entity-link">NavigationModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-NavigationModule-7a0f20d8a1973cc85aba2f98c283d965"' : 'data-target="#xs-components-links-module-NavigationModule-7a0f20d8a1973cc85aba2f98c283d965"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-NavigationModule-7a0f20d8a1973cc85aba2f98c283d965"' :
                                            'id="xs-components-links-module-NavigationModule-7a0f20d8a1973cc85aba2f98c283d965"' }>
                                            <li class="link">
                                                <a href="components/NavigationComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NavigationComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/OntologySearchModule.html" data-type="entity-link">OntologySearchModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-OntologySearchModule-bc47cace5f0c9b133ac6838585f9daf0"' : 'data-target="#xs-components-links-module-OntologySearchModule-bc47cace5f0c9b133ac6838585f9daf0"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-OntologySearchModule-bc47cace5f0c9b133ac6838585f9daf0"' :
                                            'id="xs-components-links-module-OntologySearchModule-bc47cace5f0c9b133ac6838585f9daf0"' }>
                                            <li class="link">
                                                <a href="components/OntologySearchComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OntologySearchComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/OntologyTreeModule.html" data-type="entity-link">OntologyTreeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-OntologyTreeModule-b787a8a6df179485f9225a4e4c0025c2"' : 'data-target="#xs-components-links-module-OntologyTreeModule-b787a8a6df179485f9225a4e4c0025c2"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-OntologyTreeModule-b787a8a6df179485f9225a4e4c0025c2"' :
                                            'id="xs-components-links-module-OntologyTreeModule-b787a8a6df179485f9225a4e4c0025c2"' }>
                                            <li class="link">
                                                <a href="components/OntologyTreeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OntologyTreeComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/Organ3dModule.html" data-type="entity-link">Organ3dModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-Organ3dModule-e14bed22d2b39a0d733a01ba73a9b0ec"' : 'data-target="#xs-components-links-module-Organ3dModule-e14bed22d2b39a0d733a01ba73a9b0ec"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-Organ3dModule-e14bed22d2b39a0d733a01ba73a9b0ec"' :
                                            'id="xs-components-links-module-Organ3dModule-e14bed22d2b39a0d733a01ba73a9b0ec"' }>
                                            <li class="link">
                                                <a href="components/Organ3dComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">Organ3dComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/OrganModule.html" data-type="entity-link">OrganModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-OrganModule-7086c9b6e92db2f3f9cb0e9198872695"' : 'data-target="#xs-components-links-module-OrganModule-7086c9b6e92db2f3f9cb0e9198872695"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-OrganModule-7086c9b6e92db2f3f9cb0e9198872695"' :
                                            'id="xs-components-links-module-OrganModule-7086c9b6e92db2f3f9cb0e9198872695"' }>
                                            <li class="link">
                                                <a href="components/OrganComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OrganComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-OrganModule-7086c9b6e92db2f3f9cb0e9198872695"' : 'data-target="#xs-injectables-links-module-OrganModule-7086c9b6e92db2f3f9cb0e9198872695"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-OrganModule-7086c9b6e92db2f3f9cb0e9198872695"' :
                                        'id="xs-injectables-links-module-OrganModule-7086c9b6e92db2f3f9cb0e9198872695"' }>
                                        <li class="link">
                                            <a href="injectables/OrganDataService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>OrganDataService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/OrganRoutingModule.html" data-type="entity-link">OrganRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SearchCategoriesModule.html" data-type="entity-link">SearchCategoriesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SearchCategoriesModule-33b8c04b31958c1b0259669674b2fe6f"' : 'data-target="#xs-components-links-module-SearchCategoriesModule-33b8c04b31958c1b0259669674b2fe6f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SearchCategoriesModule-33b8c04b31958c1b0259669674b2fe6f"' :
                                            'id="xs-components-links-module-SearchCategoriesModule-33b8c04b31958c1b0259669674b2fe6f"' }>
                                            <li class="link">
                                                <a href="components/SearchCategoriesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SearchCategoriesComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SearchModule.html" data-type="entity-link">SearchModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SearchModule-5fa5476b1f0ef30d12cadee60ee7390b"' : 'data-target="#xs-components-links-module-SearchModule-5fa5476b1f0ef30d12cadee60ee7390b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SearchModule-5fa5476b1f0ef30d12cadee60ee7390b"' :
                                            'id="xs-components-links-module-SearchModule-5fa5476b1f0ef30d12cadee60ee7390b"' }>
                                            <li class="link">
                                                <a href="components/SearchComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SearchComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TissueModule.html" data-type="entity-link">TissueModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TissueModule-7080a2702ad9001b492a4d7d681c2e88"' : 'data-target="#xs-components-links-module-TissueModule-7080a2702ad9001b492a4d7d681c2e88"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TissueModule-7080a2702ad9001b492a4d7d681c2e88"' :
                                            'id="xs-components-links-module-TissueModule-7080a2702ad9001b492a4d7d681c2e88"' }>
                                            <li class="link">
                                                <a href="components/TissueComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TissueComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-TissueModule-7080a2702ad9001b492a4d7d681c2e88"' : 'data-target="#xs-injectables-links-module-TissueModule-7080a2702ad9001b492a4d7d681c2e88"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TissueModule-7080a2702ad9001b492a4d7d681c2e88"' :
                                        'id="xs-injectables-links-module-TissueModule-7080a2702ad9001b492a4d7d681c2e88"' }>
                                        <li class="link">
                                            <a href="injectables/TissueDataService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>TissueDataService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TissueRoutingModule.html" data-type="entity-link">TissueRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/TissuesBrowserGridItemModule.html" data-type="entity-link">TissuesBrowserGridItemModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TissuesBrowserGridItemModule-4fa8b0f3b6e5e06f2857559d9755a7df"' : 'data-target="#xs-components-links-module-TissuesBrowserGridItemModule-4fa8b0f3b6e5e06f2857559d9755a7df"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TissuesBrowserGridItemModule-4fa8b0f3b6e5e06f2857559d9755a7df"' :
                                            'id="xs-components-links-module-TissuesBrowserGridItemModule-4fa8b0f3b6e5e06f2857559d9755a7df"' }>
                                            <li class="link">
                                                <a href="components/TissuesBrowserGridItemComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TissuesBrowserGridItemComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TissuesBrowserGridModule.html" data-type="entity-link">TissuesBrowserGridModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TissuesBrowserGridModule-96f07bb7fa6795443953278e8a9dfb9d"' : 'data-target="#xs-components-links-module-TissuesBrowserGridModule-96f07bb7fa6795443953278e8a9dfb9d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TissuesBrowserGridModule-96f07bb7fa6795443953278e8a9dfb9d"' :
                                            'id="xs-components-links-module-TissuesBrowserGridModule-96f07bb7fa6795443953278e8a9dfb9d"' }>
                                            <li class="link">
                                                <a href="components/TissuesBrowserGridComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TissuesBrowserGridComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TissuesBrowserGridPopoverContentModule.html" data-type="entity-link">TissuesBrowserGridPopoverContentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TissuesBrowserGridPopoverContentModule-4cb10961b553efb7335318837a54bee9"' : 'data-target="#xs-components-links-module-TissuesBrowserGridPopoverContentModule-4cb10961b553efb7335318837a54bee9"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TissuesBrowserGridPopoverContentModule-4cb10961b553efb7335318837a54bee9"' :
                                            'id="xs-components-links-module-TissuesBrowserGridPopoverContentModule-4cb10961b553efb7335318837a54bee9"' }>
                                            <li class="link">
                                                <a href="components/TissuesBrowserGridPopoverContentComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TissuesBrowserGridPopoverContentComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TissuesBrowserModule.html" data-type="entity-link">TissuesBrowserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TissuesBrowserModule-f30469d6bd7fd560879162ff7d4413a9"' : 'data-target="#xs-components-links-module-TissuesBrowserModule-f30469d6bd7fd560879162ff7d4413a9"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TissuesBrowserModule-f30469d6bd7fd560879162ff7d4413a9"' :
                                            'id="xs-components-links-module-TissuesBrowserModule-f30469d6bd7fd560879162ff7d4413a9"' }>
                                            <li class="link">
                                                <a href="components/TissuesBrowserComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TissuesBrowserComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-TissuesBrowserModule-f30469d6bd7fd560879162ff7d4413a9"' : 'data-target="#xs-injectables-links-module-TissuesBrowserModule-f30469d6bd7fd560879162ff7d4413a9"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TissuesBrowserModule-f30469d6bd7fd560879162ff7d4413a9"' :
                                        'id="xs-injectables-links-module-TissuesBrowserModule-f30469d6bd7fd560879162ff7d4413a9"' }>
                                        <li class="link">
                                            <a href="injectables/TissuesBrowserDataService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>TissuesBrowserDataService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TissuesBrowserRoutingModule.html" data-type="entity-link">TissuesBrowserRoutingModule</a>
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
                                <a href="classes/FilterBuilder.html" data-type="entity-link">FilterBuilder</a>
                            </li>
                            <li class="link">
                                <a href="classes/FlatNode.html" data-type="entity-link">FlatNode</a>
                            </li>
                            <li class="link">
                                <a href="classes/IconRegistryState.html" data-type="entity-link">IconRegistryState</a>
                            </li>
                            <li class="link">
                                <a href="classes/NavigationState.html" data-type="entity-link">NavigationState</a>
                            </li>
                            <li class="link">
                                <a href="classes/OntologyState.html" data-type="entity-link">OntologyState</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegisterIcon.html" data-type="entity-link">RegisterIcon</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegistrationError.html" data-type="entity-link">RegistrationError</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegistrationSuccess.html" data-type="entity-link">RegistrationSuccess</a>
                            </li>
                            <li class="link">
                                <a href="classes/SearchState.html" data-type="entity-link">SearchState</a>
                            </li>
                            <li class="link">
                                <a href="classes/SelectTechnology.html" data-type="entity-link">SelectTechnology</a>
                            </li>
                            <li class="link">
                                <a href="classes/SelectTMC.html" data-type="entity-link">SelectTMC</a>
                            </li>
                            <li class="link">
                                <a href="classes/SetAgeRangeFilter.html" data-type="entity-link">SetAgeRangeFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/SetGenderFilter.html" data-type="entity-link">SetGenderFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/SetLocation.html" data-type="entity-link">SetLocation</a>
                            </li>
                            <li class="link">
                                <a href="classes/ThreeJsLayer.html" data-type="entity-link">ThreeJsLayer</a>
                            </li>
                            <li class="link">
                                <a href="classes/UnselectTechnology.html" data-type="entity-link">UnselectTechnology</a>
                            </li>
                            <li class="link">
                                <a href="classes/UnselectTMC.html" data-type="entity-link">UnselectTMC</a>
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
                                    <a href="injectables/LocalDatabaseService.html" data-type="entity-link">LocalDatabaseService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NavigationService.html" data-type="entity-link">NavigationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OntologySearchService.html" data-type="entity-link">OntologySearchService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OntologyService.html" data-type="entity-link">OntologyService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SearchService.html" data-type="entity-link">SearchService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/TissueResolverService.html" data-type="entity-link">TissueResolverService</a>
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
                                <a href="interfaces/Annotated.html" data-type="entity-link">Annotated</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CountMetadata.html" data-type="entity-link">CountMetadata</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CountMetaData.html" data-type="entity-link">CountMetaData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IconDefinition.html" data-type="entity-link">IconDefinition</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IdObject.html" data-type="entity-link">IdObject</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/JsonOntologyNode.html" data-type="entity-link">JsonOntologyNode</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LocalDatabase.html" data-type="entity-link">LocalDatabase</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NavigationStateModel.html" data-type="entity-link">NavigationStateModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OntologyNode.html" data-type="entity-link">OntologyNode</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OntologyStateModel.html" data-type="entity-link">OntologyStateModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Patient.html" data-type="entity-link">Patient</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SearchResult.html" data-type="entity-link">SearchResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SearchStateModel.html" data-type="entity-link">SearchStateModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ThreeJsLayerOptions.html" data-type="entity-link">ThreeJsLayerOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TissueCell.html" data-type="entity-link">TissueCell</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TissueImage.html" data-type="entity-link">TissueImage</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TissueOverlay.html" data-type="entity-link">TissueOverlay</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TissueSample.html" data-type="entity-link">TissueSample</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TissueSlice.html" data-type="entity-link">TissueSlice</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ValueObject.html" data-type="entity-link">ValueObject</a>
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
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
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