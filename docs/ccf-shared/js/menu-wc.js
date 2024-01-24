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
                                <a href="modules/AnalyticsModule.html" data-type="entity-link" >AnalyticsModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AnalyticsModule-4f0fed274732f9a3875fa901e4709ac6d21511a71ca126b3138fde1bec7a01a85800f2612cbb6b3267bc777306e8d8dc7542b4bd8ccbc3bb9ab439b501befcd5"' : 'data-bs-target="#xs-injectables-links-module-AnalyticsModule-4f0fed274732f9a3875fa901e4709ac6d21511a71ca126b3138fde1bec7a01a85800f2612cbb6b3267bc777306e8d8dc7542b4bd8ccbc3bb9ab439b501befcd5"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AnalyticsModule-4f0fed274732f9a3875fa901e4709ac6d21511a71ca126b3138fde1bec7a01a85800f2612cbb6b3267bc777306e8d8dc7542b4bd8ccbc3bb9ab439b501befcd5"' :
                                        'id="xs-injectables-links-module-AnalyticsModule-4f0fed274732f9a3875fa901e4709ac6d21511a71ca126b3138fde1bec7a01a85800f2612cbb6b3267bc777306e8d8dc7542b4bd8ccbc3bb9ab439b501befcd5"' }>
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
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-BodyUiModule-1287380a8cd8d8ba9dd786a240a0b10b4b4879cb8689fe0fc53f0f3c24345e7b1c243b7ff121cc873026b9bf17fb5cccdacb9e071672bea1c8d6916031d16e68"' : 'data-bs-target="#xs-components-links-module-BodyUiModule-1287380a8cd8d8ba9dd786a240a0b10b4b4879cb8689fe0fc53f0f3c24345e7b1c243b7ff121cc873026b9bf17fb5cccdacb9e071672bea1c8d6916031d16e68"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BodyUiModule-1287380a8cd8d8ba9dd786a240a0b10b4b4879cb8689fe0fc53f0f3c24345e7b1c243b7ff121cc873026b9bf17fb5cccdacb9e071672bea1c8d6916031d16e68"' :
                                            'id="xs-components-links-module-BodyUiModule-1287380a8cd8d8ba9dd786a240a0b10b4b4879cb8689fe0fc53f0f3c24345e7b1c243b7ff121cc873026b9bf17fb5cccdacb9e071672bea1c8d6916031d16e68"' }>
                                            <li class="link">
                                                <a href="components/BodyUiComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BodyUiComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CallToActionBehaviorModule.html" data-type="entity-link" >CallToActionBehaviorModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-CallToActionBehaviorModule-cfa4d2785a1d3c9ee375a646135848f2c5c918c4b5045ee85ef51af95475a8df2182557d26f997dbaaf9601102fa382ea4b3c094ccf8f071f63f43ee876b2082"' : 'data-bs-target="#xs-components-links-module-CallToActionBehaviorModule-cfa4d2785a1d3c9ee375a646135848f2c5c918c4b5045ee85ef51af95475a8df2182557d26f997dbaaf9601102fa382ea4b3c094ccf8f071f63f43ee876b2082"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CallToActionBehaviorModule-cfa4d2785a1d3c9ee375a646135848f2c5c918c4b5045ee85ef51af95475a8df2182557d26f997dbaaf9601102fa382ea4b3c094ccf8f071f63f43ee876b2082"' :
                                            'id="xs-components-links-module-CallToActionBehaviorModule-cfa4d2785a1d3c9ee375a646135848f2c5c918c4b5045ee85ef51af95475a8df2182557d26f997dbaaf9601102fa382ea4b3c094ccf8f071f63f43ee876b2082"' }>
                                            <li class="link">
                                                <a href="components/CallToActionBehaviorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CallToActionBehaviorComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CallToActionModule.html" data-type="entity-link" >CallToActionModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-CallToActionModule-f21787731bd01ce3bb8075dfa93bd9d926b41525cdfea4bb456117ff9503d711b2a3f2fddce07a0c0c74b7f3376a22d12aff5874c0e2e713dd075cccf894d8c2"' : 'data-bs-target="#xs-components-links-module-CallToActionModule-f21787731bd01ce3bb8075dfa93bd9d926b41525cdfea4bb456117ff9503d711b2a3f2fddce07a0c0c74b7f3376a22d12aff5874c0e2e713dd075cccf894d8c2"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CallToActionModule-f21787731bd01ce3bb8075dfa93bd9d926b41525cdfea4bb456117ff9503d711b2a3f2fddce07a0c0c74b7f3376a22d12aff5874c0e2e713dd075cccf894d8c2"' :
                                            'id="xs-components-links-module-CallToActionModule-f21787731bd01ce3bb8075dfa93bd9d926b41525cdfea4bb456117ff9503d711b2a3f2fddce07a0c0c74b7f3376a22d12aff5874c0e2e713dd075cccf894d8c2"' }>
                                            <li class="link">
                                                <a href="components/CallToActionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CallToActionComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DecoratedTextModule.html" data-type="entity-link" >DecoratedTextModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-DecoratedTextModule-fc1d8f132a4bd0027f357cbbaa125421493bfcf7d9adb8999f83d2567146f37aba0a0800e1c769d45971833f437eb3c7e7b7d6fc6a0790f80a6b018658fdf6ef"' : 'data-bs-target="#xs-components-links-module-DecoratedTextModule-fc1d8f132a4bd0027f357cbbaa125421493bfcf7d9adb8999f83d2567146f37aba0a0800e1c769d45971833f437eb3c7e7b7d6fc6a0790f80a6b018658fdf6ef"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DecoratedTextModule-fc1d8f132a4bd0027f357cbbaa125421493bfcf7d9adb8999f83d2567146f37aba0a0800e1c769d45971833f437eb3c7e7b7d6fc6a0790f80a6b018658fdf6ef"' :
                                            'id="xs-components-links-module-DecoratedTextModule-fc1d8f132a4bd0027f357cbbaa125421493bfcf7d9adb8999f83d2567146f37aba0a0800e1c769d45971833f437eb3c7e7b7d6fc6a0790f80a6b018658fdf6ef"' }>
                                            <li class="link">
                                                <a href="components/DecoratedTextComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DecoratedTextComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/InfoButtonModule.html" data-type="entity-link" >InfoButtonModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-InfoButtonModule-4c8d47fcf9be07b849e9d56c97e133c673529874b82babc8920309980331513edb7aaab9b3eea7c83c04f9af20e74bfac575f9e24f4b3d98dd99fb57933a90b1"' : 'data-bs-target="#xs-components-links-module-InfoButtonModule-4c8d47fcf9be07b849e9d56c97e133c673529874b82babc8920309980331513edb7aaab9b3eea7c83c04f9af20e74bfac575f9e24f4b3d98dd99fb57933a90b1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-InfoButtonModule-4c8d47fcf9be07b849e9d56c97e133c673529874b82babc8920309980331513edb7aaab9b3eea7c83c04f9af20e74bfac575f9e24f4b3d98dd99fb57933a90b1"' :
                                            'id="xs-components-links-module-InfoButtonModule-4c8d47fcf9be07b849e9d56c97e133c673529874b82babc8920309980331513edb7aaab9b3eea7c83c04f9af20e74bfac575f9e24f4b3d98dd99fb57933a90b1"' }>
                                            <li class="link">
                                                <a href="components/InfoButtonComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InfoButtonComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/InfoDialogModule.html" data-type="entity-link" >InfoDialogModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-InfoDialogModule-db2440556e407e2f46c3da3c623e1ef64a7b3e4c74211a544a2742141e9ca48b4b8f43c9d04c60d47fc389454e174f5f6d9f90ed15bf7f5ae22daf3e8c06726d"' : 'data-bs-target="#xs-components-links-module-InfoDialogModule-db2440556e407e2f46c3da3c623e1ef64a7b3e4c74211a544a2742141e9ca48b4b8f43c9d04c60d47fc389454e174f5f6d9f90ed15bf7f5ae22daf3e8c06726d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-InfoDialogModule-db2440556e407e2f46c3da3c623e1ef64a7b3e4c74211a544a2742141e9ca48b4b8f43c9d04c60d47fc389454e174f5f6d9f90ed15bf7f5ae22daf3e8c06726d"' :
                                            'id="xs-components-links-module-InfoDialogModule-db2440556e407e2f46c3da3c623e1ef64a7b3e4c74211a544a2742141e9ca48b4b8f43c9d04c60d47fc389454e174f5f6d9f90ed15bf7f5ae22daf3e8c06726d"' }>
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
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#directives-links-module-NumbersOnlyModule-5ee3f082a98cfcab7d7ddfb29eee5664c471998684fe2851c1b373eab42855fae92b14a0588f4e9faf980186985168099307c97bbbb4e2bfbe9449786f4ae63c"' : 'data-bs-target="#xs-directives-links-module-NumbersOnlyModule-5ee3f082a98cfcab7d7ddfb29eee5664c471998684fe2851c1b373eab42855fae92b14a0588f4e9faf980186985168099307c97bbbb4e2bfbe9449786f4ae63c"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-NumbersOnlyModule-5ee3f082a98cfcab7d7ddfb29eee5664c471998684fe2851c1b373eab42855fae92b14a0588f4e9faf980186985168099307c97bbbb4e2bfbe9449786f4ae63c"' :
                                        'id="xs-directives-links-module-NumbersOnlyModule-5ee3f082a98cfcab7d7ddfb29eee5664c471998684fe2851c1b373eab42855fae92b14a0588f4e9faf980186985168099307c97bbbb4e2bfbe9449786f4ae63c"' }>
                                        <li class="link">
                                            <a href="directives/NumberDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NumberDirective</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/OpacitySliderModule.html" data-type="entity-link" >OpacitySliderModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-OpacitySliderModule-8403770fec961e95708fc0c66bbc720f3f6fd959958481862050c6d53ac2c0f956f577a909683da2dfc5d2e83d236c6da296721b5eb235d5e3a386a960137f5d"' : 'data-bs-target="#xs-components-links-module-OpacitySliderModule-8403770fec961e95708fc0c66bbc720f3f6fd959958481862050c6d53ac2c0f956f577a909683da2dfc5d2e83d236c6da296721b5eb235d5e3a386a960137f5d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-OpacitySliderModule-8403770fec961e95708fc0c66bbc720f3f6fd959958481862050c6d53ac2c0f956f577a909683da2dfc5d2e83d236c6da296721b5eb235d5e3a386a960137f5d"' :
                                            'id="xs-components-links-module-OpacitySliderModule-8403770fec961e95708fc0c66bbc720f3f6fd959958481862050c6d53ac2c0f956f577a909683da2dfc5d2e83d236c6da296721b5eb235d5e3a386a960137f5d"' }>
                                            <li class="link">
                                                <a href="components/OpacitySliderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OpacitySliderComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/OrganSelectorModule.html" data-type="entity-link" >OrganSelectorModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-OrganSelectorModule-712c3b339394486ecc5bea9ec627a1f9de92a1ab10d9b894c431596113874c7d99b7904276edf3e1755eab223838e6e5542145954a5a17fa20783880b885c2b5"' : 'data-bs-target="#xs-components-links-module-OrganSelectorModule-712c3b339394486ecc5bea9ec627a1f9de92a1ab10d9b894c431596113874c7d99b7904276edf3e1755eab223838e6e5542145954a5a17fa20783880b885c2b5"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-OrganSelectorModule-712c3b339394486ecc5bea9ec627a1f9de92a1ab10d9b894c431596113874c7d99b7904276edf3e1755eab223838e6e5542145954a5a17fa20783880b885c2b5"' :
                                            'id="xs-components-links-module-OrganSelectorModule-712c3b339394486ecc5bea9ec627a1f9de92a1ab10d9b894c431596113874c7d99b7904276edf3e1755eab223838e6e5542145954a5a17fa20783880b885c2b5"' }>
                                            <li class="link">
                                                <a href="components/OrganSelectorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OrganSelectorComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SpatialSearchKeyboardUIBehaviorModule.html" data-type="entity-link" >SpatialSearchKeyboardUIBehaviorModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SpatialSearchKeyboardUIBehaviorModule-eaa1b03bb82006bd82d544abaa013efa1b33b511e1a5ec138d1bb9c7c83030acc45899963e94aaf8ab3603245882aa4544ea3d39dd989cf604a96a4b31b6d22b"' : 'data-bs-target="#xs-components-links-module-SpatialSearchKeyboardUIBehaviorModule-eaa1b03bb82006bd82d544abaa013efa1b33b511e1a5ec138d1bb9c7c83030acc45899963e94aaf8ab3603245882aa4544ea3d39dd989cf604a96a4b31b6d22b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SpatialSearchKeyboardUIBehaviorModule-eaa1b03bb82006bd82d544abaa013efa1b33b511e1a5ec138d1bb9c7c83030acc45899963e94aaf8ab3603245882aa4544ea3d39dd989cf604a96a4b31b6d22b"' :
                                            'id="xs-components-links-module-SpatialSearchKeyboardUIBehaviorModule-eaa1b03bb82006bd82d544abaa013efa1b33b511e1a5ec138d1bb9c7c83030acc45899963e94aaf8ab3603245882aa4544ea3d39dd989cf604a96a4b31b6d22b"' }>
                                            <li class="link">
                                                <a href="components/SpatialSearchKeyboardUIBehaviorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SpatialSearchKeyboardUIBehaviorComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SpatialSearchKeyboardUIModule.html" data-type="entity-link" >SpatialSearchKeyboardUIModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SpatialSearchKeyboardUIModule-527963cf0d41260b5849c2b0c91ca67df88a5e078d22bb04ae1d8f889fe1840bd856fcb5f837818ef2883ed1133c23df23b56bc30166201bb69c6fbb46fc3e30"' : 'data-bs-target="#xs-components-links-module-SpatialSearchKeyboardUIModule-527963cf0d41260b5849c2b0c91ca67df88a5e078d22bb04ae1d8f889fe1840bd856fcb5f837818ef2883ed1133c23df23b56bc30166201bb69c6fbb46fc3e30"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SpatialSearchKeyboardUIModule-527963cf0d41260b5849c2b0c91ca67df88a5e078d22bb04ae1d8f889fe1840bd856fcb5f837818ef2883ed1133c23df23b56bc30166201bb69c6fbb46fc3e30"' :
                                            'id="xs-components-links-module-SpatialSearchKeyboardUIModule-527963cf0d41260b5849c2b0c91ca67df88a5e078d22bb04ae1d8f889fe1840bd856fcb5f837818ef2883ed1133c23df23b56bc30166201bb69c6fbb46fc3e30"' }>
                                            <li class="link">
                                                <a href="components/SpatialSearchKeyboardUIComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SpatialSearchKeyboardUIComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SpatialSearchListModule.html" data-type="entity-link" >SpatialSearchListModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SpatialSearchListModule-dff3ffdcd0d9f2900616df2251aa370906cc4195521fc3a70cb719620d7c7150b3106d5fbd7ede18c7585d5169d1e257197ae5aafbf2093a5f99c93e5080001f"' : 'data-bs-target="#xs-components-links-module-SpatialSearchListModule-dff3ffdcd0d9f2900616df2251aa370906cc4195521fc3a70cb719620d7c7150b3106d5fbd7ede18c7585d5169d1e257197ae5aafbf2093a5f99c93e5080001f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SpatialSearchListModule-dff3ffdcd0d9f2900616df2251aa370906cc4195521fc3a70cb719620d7c7150b3106d5fbd7ede18c7585d5169d1e257197ae5aafbf2093a5f99c93e5080001f"' :
                                            'id="xs-components-links-module-SpatialSearchListModule-dff3ffdcd0d9f2900616df2251aa370906cc4195521fc3a70cb719620d7c7150b3106d5fbd7ede18c7585d5169d1e257197ae5aafbf2093a5f99c93e5080001f"' }>
                                            <li class="link">
                                                <a href="components/SpatialSearchListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SpatialSearchListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/StoreDebugModule.html" data-type="entity-link" >StoreDebugModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-StoreDebugModule-aa6a837b50f2d948f3a652b9d859a80779169210590b6d133d207bc73f7f1bd49a697dc6e0800ad10390796596dd0a85872a48383ada89f5ee91af9c6f713c2e"' : 'data-bs-target="#xs-components-links-module-StoreDebugModule-aa6a837b50f2d948f3a652b9d859a80779169210590b6d133d207bc73f7f1bd49a697dc6e0800ad10390796596dd0a85872a48383ada89f5ee91af9c6f713c2e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-StoreDebugModule-aa6a837b50f2d948f3a652b9d859a80779169210590b6d133d207bc73f7f1bd49a697dc6e0800ad10390796596dd0a85872a48383ada89f5ee91af9c6f713c2e"' :
                                            'id="xs-components-links-module-StoreDebugModule-aa6a837b50f2d948f3a652b9d859a80779169210590b6d133d207bc73f7f1bd49a697dc6e0800ad10390796596dd0a85872a48383ada89f5ee91af9c6f713c2e"' }>
                                            <li class="link">
                                                <a href="components/StoreDebugComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StoreDebugComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TextSearchModule.html" data-type="entity-link" >TextSearchModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-TextSearchModule-9358f8d395192dff7c2e478578f1af395767104333d606079b83ce74a2c2ce5475570fb096295bbc5487d27e3c836285e160ce56197b6030cf5089a0fbe13849"' : 'data-bs-target="#xs-components-links-module-TextSearchModule-9358f8d395192dff7c2e478578f1af395767104333d606079b83ce74a2c2ce5475570fb096295bbc5487d27e3c836285e160ce56197b6030cf5089a0fbe13849"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TextSearchModule-9358f8d395192dff7c2e478578f1af395767104333d606079b83ce74a2c2ce5475570fb096295bbc5487d27e3c836285e160ce56197b6030cf5089a0fbe13849"' :
                                            'id="xs-components-links-module-TextSearchModule-9358f8d395192dff7c2e478578f1af395767104333d606079b83ce74a2c2ce5475570fb096295bbc5487d27e3c836285e160ce56197b6030cf5089a0fbe13849"' }>
                                            <li class="link">
                                                <a href="components/TextSearchComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TextSearchComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TrackingPopupModule.html" data-type="entity-link" >TrackingPopupModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-TrackingPopupModule-9d205cb87586ab386bd51aa0a6621461cc59f5e22cea9ddc31d83bb37b205def6f6185eb40ef56b8f7e00477fb4f565f9e290a8eeb0647dd0ea8025583b08cc1"' : 'data-bs-target="#xs-components-links-module-TrackingPopupModule-9d205cb87586ab386bd51aa0a6621461cc59f5e22cea9ddc31d83bb37b205def6f6185eb40ef56b8f7e00477fb4f565f9e290a8eeb0647dd0ea8025583b08cc1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TrackingPopupModule-9d205cb87586ab386bd51aa0a6621461cc59f5e22cea9ddc31d83bb37b205def6f6185eb40ef56b8f7e00477fb4f565f9e290a8eeb0647dd0ea8025583b08cc1"' :
                                            'id="xs-components-links-module-TrackingPopupModule-9d205cb87586ab386bd51aa0a6621461cc59f5e22cea9ddc31d83bb37b205def6f6185eb40ef56b8f7e00477fb4f565f9e290a8eeb0647dd0ea8025583b08cc1"' }>
                                            <li class="link">
                                                <a href="components/TrackingPopupComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TrackingPopupComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/XYZPositionModule.html" data-type="entity-link" >XYZPositionModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-XYZPositionModule-0a9dfaa5fc9ded69f01088a4b35514ae1b2920751cfe9c3d66aa9cd0097bd5e6406bcbd59bbba1b8cf30a914dfba66cb12973c8f48336cc3f41c7f6a8dd662eb"' : 'data-bs-target="#xs-components-links-module-XYZPositionModule-0a9dfaa5fc9ded69f01088a4b35514ae1b2920751cfe9c3d66aa9cd0097bd5e6406bcbd59bbba1b8cf30a914dfba66cb12973c8f48336cc3f41c7f6a8dd662eb"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-XYZPositionModule-0a9dfaa5fc9ded69f01088a4b35514ae1b2920751cfe9c3d66aa9cd0097bd5e6406bcbd59bbba1b8cf30a914dfba66cb12973c8f48336cc3f41c7f6a8dd662eb"' :
                                            'id="xs-components-links-module-XYZPositionModule-0a9dfaa5fc9ded69f01088a4b35514ae1b2920751cfe9c3d66aa9cd0097bd5e6406bcbd59bbba1b8cf30a914dfba66cb12973c8f48336cc3f41c7f6a8dd662eb"' }>
                                            <li class="link">
                                                <a href="components/XYZPositionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >XYZPositionComponent</a>
                                            </li>
                                        </ul>
                                    </li>
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
                                <a href="classes/CallToActionSelectors.html" data-type="entity-link" >CallToActionSelectors</a>
                            </li>
                            <li class="link">
                                <a href="classes/CloseDialog.html" data-type="entity-link" >CloseDialog</a>
                            </li>
                            <li class="link">
                                <a href="classes/DelegateDataSource.html" data-type="entity-link" >DelegateDataSource</a>
                            </li>
                            <li class="link">
                                <a href="classes/ForwardingDataSource.html" data-type="entity-link" >ForwardingDataSource</a>
                            </li>
                            <li class="link">
                                <a href="classes/LearnMore.html" data-type="entity-link" >LearnMore</a>
                            </li>
                            <li class="link">
                                <a href="classes/OpenDialog.html" data-type="entity-link" >OpenDialog</a>
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
                                    <a href="injectables/ApiEndpointDataSourceService.html" data-type="entity-link" >ApiEndpointDataSourceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CallToActionState.html" data-type="entity-link" >CallToActionState</a>
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
                                    <a href="injectables/LocalStorageService.html" data-type="entity-link" >LocalStorageService</a>
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
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
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
                                <a href="interfaces/CallToActionModel.html" data-type="entity-link" >CallToActionModel</a>
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
                                <a href="interfaces/PanelData.html" data-type="entity-link" >PanelData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PluckUniqueOptions.html" data-type="entity-link" >PluckUniqueOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Position.html" data-type="entity-link" >Position</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Segment.html" data-type="entity-link" >Segment</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SpatialSearchListItem.html" data-type="entity-link" >SpatialSearchListItem</a>
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