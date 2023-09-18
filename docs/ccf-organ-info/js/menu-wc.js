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
                    <a href="index.html" data-type="index-link">Application ccf-organ-info documentation</a>
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
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-9be778ae7f27ddbe2d469aa406f5450722e344c2c575026dc79d8833736f0e6c082228bc5c39bb77361df72f94e62d7f3cc92a04e7bcaa28a1428e960bd67b3b"' : 'data-bs-target="#xs-components-links-module-AppModule-9be778ae7f27ddbe2d469aa406f5450722e344c2c575026dc79d8833736f0e6c082228bc5c39bb77361df72f94e62d7f3cc92a04e7bcaa28a1428e960bd67b3b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-9be778ae7f27ddbe2d469aa406f5450722e344c2c575026dc79d8833736f0e6c082228bc5c39bb77361df72f94e62d7f3cc92a04e7bcaa28a1428e960bd67b3b"' :
                                            'id="xs-components-links-module-AppModule-9be778ae7f27ddbe2d469aa406f5450722e344c2c575026dc79d8833736f0e6c082228bc5c39bb77361df72f94e62d7f3cc92a04e7bcaa28a1428e960bd67b3b"' }>
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
                                <a href="modules/CoreModule.html" data-type="entity-link" >CoreModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/LinkCardsModule.html" data-type="entity-link" >LinkCardsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-LinkCardsModule-2d757f08809e877725ebfeaad12a57c241eb66964ef97397651343551aa8e6e32bfc9fae53ea54bcc98737907f818870101dc58b3061d9e4eeccc9bb07aaf00b"' : 'data-bs-target="#xs-components-links-module-LinkCardsModule-2d757f08809e877725ebfeaad12a57c241eb66964ef97397651343551aa8e6e32bfc9fae53ea54bcc98737907f818870101dc58b3061d9e4eeccc9bb07aaf00b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LinkCardsModule-2d757f08809e877725ebfeaad12a57c241eb66964ef97397651343551aa8e6e32bfc9fae53ea54bcc98737907f818870101dc58b3061d9e4eeccc9bb07aaf00b"' :
                                            'id="xs-components-links-module-LinkCardsModule-2d757f08809e877725ebfeaad12a57c241eb66964ef97397651343551aa8e6e32bfc9fae53ea54bcc98737907f818870101dc58b3061d9e4eeccc9bb07aaf00b"' }>
                                            <li class="link">
                                                <a href="components/LinkCardsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LinkCardsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/OrganModule.html" data-type="entity-link" >OrganModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-OrganModule-a2e6a022037680ef65f0a1b05e54aafddc5903a6f080695ef743c504574805214bb0304ae687c474906f25a946f3575360c11cc3eae54bf988533950971e4155"' : 'data-bs-target="#xs-components-links-module-OrganModule-a2e6a022037680ef65f0a1b05e54aafddc5903a6f080695ef743c504574805214bb0304ae687c474906f25a946f3575360c11cc3eae54bf988533950971e4155"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-OrganModule-a2e6a022037680ef65f0a1b05e54aafddc5903a6f080695ef743c504574805214bb0304ae687c474906f25a946f3575360c11cc3eae54bf988533950971e4155"' :
                                            'id="xs-components-links-module-OrganModule-a2e6a022037680ef65f0a1b05e54aafddc5903a6f080695ef743c504574805214bb0304ae687c474906f25a946f3575360c11cc3eae54bf988533950971e4155"' }>
                                            <li class="link">
                                                <a href="components/OrganComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OrganComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SlideToggleModule.html" data-type="entity-link" >SlideToggleModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SlideToggleModule-a1bc9b9712ab8fe44de58e7e779fdc58bd91794a2d2d47255f896a2f6361c0743c3b74c9f5f4ec1e440c3e4577aa1334d1d6014894f62c28c37c956daad946da"' : 'data-bs-target="#xs-components-links-module-SlideToggleModule-a1bc9b9712ab8fe44de58e7e779fdc58bd91794a2d2d47255f896a2f6361c0743c3b74c9f5f4ec1e440c3e4577aa1334d1d6014894f62c28c37c956daad946da"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SlideToggleModule-a1bc9b9712ab8fe44de58e7e779fdc58bd91794a2d2d47255f896a2f6361c0743c3b74c9f5f4ec1e440c3e4577aa1334d1d6014894f62c28c37c956daad946da"' :
                                            'id="xs-components-links-module-SlideToggleModule-a1bc9b9712ab8fe44de58e7e779fdc58bd91794a2d2d47255f896a2f6361c0743c3b74c9f5f4ec1e440c3e4577aa1334d1d6014894f62c28c37c956daad946da"' }>
                                            <li class="link">
                                                <a href="components/SlideToggleComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SlideToggleComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/StatsListModule.html" data-type="entity-link" >StatsListModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-StatsListModule-8202a828fb09c9cf548815780ceda5ba910eb08e90a4e31bf3d2e3570c89de6884e39e94aa73ce03da96f512cced2fac967cff162ccc264875d4f7a68638ba7f"' : 'data-bs-target="#xs-components-links-module-StatsListModule-8202a828fb09c9cf548815780ceda5ba910eb08e90a4e31bf3d2e3570c89de6884e39e94aa73ce03da96f512cced2fac967cff162ccc264875d4f7a68638ba7f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-StatsListModule-8202a828fb09c9cf548815780ceda5ba910eb08e90a4e31bf3d2e3570c89de6884e39e94aa73ce03da96f512cced2fac967cff162ccc264875d4f7a68638ba7f"' :
                                            'id="xs-components-links-module-StatsListModule-8202a828fb09c9cf548815780ceda5ba910eb08e90a4e31bf3d2e3570c89de6884e39e94aa73ce03da96f512cced2fac967cff162ccc264875d4f7a68638ba7f"' }>
                                            <li class="link">
                                                <a href="components/StatsListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StatsListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/StoreModule.html" data-type="entity-link" >StoreModule</a>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/DelegateDataSourceService.html" data-type="entity-link" >DelegateDataSourceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OrganLookupService.html" data-type="entity-link" >OrganLookupService</a>
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
                                <a href="interfaces/DelegateDataSourceOptions.html" data-type="entity-link" >DelegateDataSourceOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GlobalConfig.html" data-type="entity-link" >GlobalConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LinkCard.html" data-type="entity-link" >LinkCard</a>
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