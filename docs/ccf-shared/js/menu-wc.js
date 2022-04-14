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
                    <a href="index.html" data-type="index-link">Library ccf-shared documentation</a>
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
                                <a href="modules/AnalyticsModule.html" data-type="entity-link" >AnalyticsModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AnalyticsModule-6428b344f4dcc8617e21c0db96452956"' : 'data-target="#xs-injectables-links-module-AnalyticsModule-6428b344f4dcc8617e21c0db96452956"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AnalyticsModule-6428b344f4dcc8617e21c0db96452956"' :
                                        'id="xs-injectables-links-module-AnalyticsModule-6428b344f4dcc8617e21c0db96452956"' }>
                                        <li class="link">
                                            <a href="injectables/ConsentService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ConsentService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GoogleAnalyticsSyncService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GoogleAnalyticsSyncService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalStorageSyncService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocalStorageSyncService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/BodyUiModule.html" data-type="entity-link" >BodyUiModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-BodyUiModule-af993bd96277ed66c04cae4bd67c66ea"' : 'data-target="#xs-components-links-module-BodyUiModule-af993bd96277ed66c04cae4bd67c66ea"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BodyUiModule-af993bd96277ed66c04cae4bd67c66ea"' :
                                            'id="xs-components-links-module-BodyUiModule-af993bd96277ed66c04cae4bd67c66ea"' }>
                                            <li class="link">
                                                <a href="components/BodyUiComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BodyUiComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DecoratedTextModule.html" data-type="entity-link" >DecoratedTextModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-DecoratedTextModule-8ce4ebb17d0b9cd7758564f00cb59157"' : 'data-target="#xs-components-links-module-DecoratedTextModule-8ce4ebb17d0b9cd7758564f00cb59157"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DecoratedTextModule-8ce4ebb17d0b9cd7758564f00cb59157"' :
                                            'id="xs-components-links-module-DecoratedTextModule-8ce4ebb17d0b9cd7758564f00cb59157"' }>
                                            <li class="link">
                                                <a href="components/DecoratedTextComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DecoratedTextComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/InfoButtonModule.html" data-type="entity-link" >InfoButtonModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-InfoButtonModule-d4ea880cb1418beab58247bfceda5260"' : 'data-target="#xs-components-links-module-InfoButtonModule-d4ea880cb1418beab58247bfceda5260"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-InfoButtonModule-d4ea880cb1418beab58247bfceda5260"' :
                                            'id="xs-components-links-module-InfoButtonModule-d4ea880cb1418beab58247bfceda5260"' }>
                                            <li class="link">
                                                <a href="components/InfoButtonComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InfoButtonComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/InfoDialogModule.html" data-type="entity-link" >InfoDialogModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-InfoDialogModule-4cbee6e64ab8ed5ed1fbbd9268c88b0d"' : 'data-target="#xs-components-links-module-InfoDialogModule-4cbee6e64ab8ed5ed1fbbd9268c88b0d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-InfoDialogModule-4cbee6e64ab8ed5ed1fbbd9268c88b0d"' :
                                            'id="xs-components-links-module-InfoDialogModule-4cbee6e64ab8ed5ed1fbbd9268c88b0d"' }>
                                            <li class="link">
                                                <a href="components/InfoDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InfoDialogComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MousePositionTrackerModule.html" data-type="entity-link" >MousePositionTrackerModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/NumbersOnlyModule.html" data-type="entity-link" >NumbersOnlyModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-NumbersOnlyModule-3062ec7e4e8774689cc58e9b6ef4b262"' : 'data-target="#xs-directives-links-module-NumbersOnlyModule-3062ec7e4e8774689cc58e9b6ef4b262"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-NumbersOnlyModule-3062ec7e4e8774689cc58e9b6ef4b262"' :
                                        'id="xs-directives-links-module-NumbersOnlyModule-3062ec7e4e8774689cc58e9b6ef4b262"' }>
                                        <li class="link">
                                            <a href="directives/NumberDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NumberDirective</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/OpacitySliderModule.html" data-type="entity-link" >OpacitySliderModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-OpacitySliderModule-9f2c2e3bc724f81f7144048554431dff"' : 'data-target="#xs-components-links-module-OpacitySliderModule-9f2c2e3bc724f81f7144048554431dff"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-OpacitySliderModule-9f2c2e3bc724f81f7144048554431dff"' :
                                            'id="xs-components-links-module-OpacitySliderModule-9f2c2e3bc724f81f7144048554431dff"' }>
                                            <li class="link">
                                                <a href="components/OpacitySliderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OpacitySliderComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/OrganSelectorModule.html" data-type="entity-link" >OrganSelectorModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-OrganSelectorModule-fb6384cc05003c92105220fa949ac03e"' : 'data-target="#xs-components-links-module-OrganSelectorModule-fb6384cc05003c92105220fa949ac03e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-OrganSelectorModule-fb6384cc05003c92105220fa949ac03e"' :
                                            'id="xs-components-links-module-OrganSelectorModule-fb6384cc05003c92105220fa949ac03e"' }>
                                            <li class="link">
                                                <a href="components/OrganSelectorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OrganSelectorComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/StoreDebugModule.html" data-type="entity-link" >StoreDebugModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-StoreDebugModule-252db461d01c008c49d797d82a01c877"' : 'data-target="#xs-components-links-module-StoreDebugModule-252db461d01c008c49d797d82a01c877"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-StoreDebugModule-252db461d01c008c49d797d82a01c877"' :
                                            'id="xs-components-links-module-StoreDebugModule-252db461d01c008c49d797d82a01c877"' }>
                                            <li class="link">
                                                <a href="components/StoreDebugComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StoreDebugComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TextSearchModule.html" data-type="entity-link" >TextSearchModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TextSearchModule-4e5d217b0c57051509857b689ea23951"' : 'data-target="#xs-components-links-module-TextSearchModule-4e5d217b0c57051509857b689ea23951"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TextSearchModule-4e5d217b0c57051509857b689ea23951"' :
                                            'id="xs-components-links-module-TextSearchModule-4e5d217b0c57051509857b689ea23951"' }>
                                            <li class="link">
                                                <a href="components/TextSearchComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TextSearchComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TrackingPopupModule.html" data-type="entity-link" >TrackingPopupModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TrackingPopupModule-99dd4508435f1f853ae1901e3f0e26de"' : 'data-target="#xs-components-links-module-TrackingPopupModule-99dd4508435f1f853ae1901e3f0e26de"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TrackingPopupModule-99dd4508435f1f853ae1901e3f0e26de"' :
                                            'id="xs-components-links-module-TrackingPopupModule-99dd4508435f1f853ae1901e3f0e26de"' }>
                                            <li class="link">
                                                <a href="components/TrackingPopupComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TrackingPopupComponent</a>
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
                                <a href="classes/DelegateDataSource.html" data-type="entity-link" >DelegateDataSource</a>
                            </li>
                            <li class="link">
                                <a href="classes/ForwardingDataSource.html" data-type="entity-link" >ForwardingDataSource</a>
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
                                    <a href="injectables/ApiEndpointDataSourceService.html" data-type="entity-link" >ApiEndpointDataSourceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CCFDatabaseDataSourceBaseService.html" data-type="entity-link" >CCFDatabaseDataSourceBaseService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CCFDatabaseDataSourceService.html" data-type="entity-link" >CCFDatabaseDataSourceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ConsentService.html" data-type="entity-link" >ConsentService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DataSourceService.html" data-type="entity-link" >DataSourceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GlobalConfigState.html" data-type="entity-link" >GlobalConfigState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GlobalsService.html" data-type="entity-link" >GlobalsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GoogleAnalyticsSyncService.html" data-type="entity-link" >GoogleAnalyticsSyncService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/InfoButtonService.html" data-type="entity-link" >InfoButtonService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/InjectorDelegateDataSourceService.html" data-type="entity-link" >InjectorDelegateDataSourceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalStorageSyncService.html" data-type="entity-link" >LocalStorageSyncService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TrackingState.html" data-type="entity-link" >TrackingState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/WorkerCCFDatabaseDataSourceService.html" data-type="entity-link" >WorkerCCFDatabaseDataSourceService</a>
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
                                <a href="interfaces/AnalyticsOptions.html" data-type="entity-link" >AnalyticsOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ApiEndpointDataSourceOptions.html" data-type="entity-link" >ApiEndpointDataSourceOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AutoCompleteOption.html" data-type="entity-link" >AutoCompleteOption</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CCFDatabaseManager.html" data-type="entity-link" >CCFDatabaseManager</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DataSource.html" data-type="entity-link" >DataSource</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DecoratedRange.html" data-type="entity-link" >DecoratedRange</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DefaultParams.html" data-type="entity-link" >DefaultParams</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DocumentationContent.html" data-type="entity-link" >DocumentationContent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FilterParams.html" data-type="entity-link" >FilterParams</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InfoDialogData.html" data-type="entity-link" >InfoDialogData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OrganInfo.html" data-type="entity-link" >OrganInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PluckUniqueOptions.html" data-type="entity-link" >PluckUniqueOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Segment.html" data-type="entity-link" >Segment</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StackOp.html" data-type="entity-link" >StackOp</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TrackingStateModel.html" data-type="entity-link" >TrackingStateModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/XYZTriplet.html" data-type="entity-link" >XYZTriplet</a>
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