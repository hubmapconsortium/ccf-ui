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
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-1af705bef164ab4747014e9d4e21f488"' : 'data-target="#xs-components-links-module-AppModule-1af705bef164ab4747014e9d4e21f488"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-1af705bef164ab4747014e9d4e21f488"' :
                                            'id="xs-components-links-module-AppModule-1af705bef164ab4747014e9d4e21f488"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-cdb95986d7d14ef4f6bd598ebe4d004d-1"' : 'data-target="#xs-components-links-module-AppModule-cdb95986d7d14ef4f6bd598ebe4d004d-1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-cdb95986d7d14ef4f6bd598ebe4d004d-1"' :
                                            'id="xs-components-links-module-AppModule-cdb95986d7d14ef4f6bd598ebe4d004d-1"' }>
                                            <li class="link">
                                                <a href="components/AppComponent-1.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/BlockSizeInputModule.html" data-type="entity-link">BlockSizeInputModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-BlockSizeInputModule-ffafeffea790c7a8522e9a546bc4615d"' : 'data-target="#xs-components-links-module-BlockSizeInputModule-ffafeffea790c7a8522e9a546bc4615d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BlockSizeInputModule-ffafeffea790c7a8522e9a546bc4615d"' :
                                            'id="xs-components-links-module-BlockSizeInputModule-ffafeffea790c7a8522e9a546bc4615d"' }>
                                            <li class="link">
                                                <a href="components/BlockSizeInputComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BlockSizeInputComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/BodyModule.html" data-type="entity-link">BodyModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/BodyUiModule.html" data-type="entity-link">BodyUiModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-BodyUiModule-20628eedad68f384d7dad05e88ec3b60"' : 'data-target="#xs-components-links-module-BodyUiModule-20628eedad68f384d7dad05e88ec3b60"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BodyUiModule-20628eedad68f384d7dad05e88ec3b60"' :
                                            'id="xs-components-links-module-BodyUiModule-20628eedad68f384d7dad05e88ec3b60"' }>
                                            <li class="link">
                                                <a href="components/BodyUiComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BodyUiComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CheckboxModule.html" data-type="entity-link">CheckboxModule</a>
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
                                                <a href="components/CheckboxComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CheckboxComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ColorBarModule.html" data-type="entity-link">ColorBarModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ColorBarModule-ad13043a1bf04b8d6f8de4c914fe4e1e"' : 'data-target="#xs-components-links-module-ColorBarModule-ad13043a1bf04b8d6f8de4c914fe4e1e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ColorBarModule-ad13043a1bf04b8d6f8de4c914fe4e1e"' :
                                            'id="xs-components-links-module-ColorBarModule-ad13043a1bf04b8d6f8de4c914fe4e1e"' }>
                                            <li class="link">
                                                <a href="components/ColorBarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ColorBarComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ColorPickerLauncherModule.html" data-type="entity-link">ColorPickerLauncherModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ColorPickerLauncherModule-006f774b28b67fd996204678faf22918"' : 'data-target="#xs-components-links-module-ColorPickerLauncherModule-006f774b28b67fd996204678faf22918"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ColorPickerLauncherModule-006f774b28b67fd996204678faf22918"' :
                                            'id="xs-components-links-module-ColorPickerLauncherModule-006f774b28b67fd996204678faf22918"' }>
                                            <li class="link">
                                                <a href="components/ColorPickerLauncherComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ColorPickerLauncherComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ColorSchemeContentsModule.html" data-type="entity-link">ColorSchemeContentsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ColorSchemeContentsModule-6aa1faeec6e2f6add11533f7c88e87cf"' : 'data-target="#xs-components-links-module-ColorSchemeContentsModule-6aa1faeec6e2f6add11533f7c88e87cf"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ColorSchemeContentsModule-6aa1faeec6e2f6add11533f7c88e87cf"' :
                                            'id="xs-components-links-module-ColorSchemeContentsModule-6aa1faeec6e2f6add11533f7c88e87cf"' }>
                                            <li class="link">
                                                <a href="components/ColorSchemeContentsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ColorSchemeContentsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ColorSchemePopupModule.html" data-type="entity-link">ColorSchemePopupModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ColorSchemePopupModule-a7a9c86861a9b62caff7ac8a573ab1c1"' : 'data-target="#xs-components-links-module-ColorSchemePopupModule-a7a9c86861a9b62caff7ac8a573ab1c1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ColorSchemePopupModule-a7a9c86861a9b62caff7ac8a573ab1c1"' :
                                            'id="xs-components-links-module-ColorSchemePopupModule-a7a9c86861a9b62caff7ac8a573ab1c1"' }>
                                            <li class="link">
                                                <a href="components/ColorSchemePopupComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ColorSchemePopupComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ContentModule.html" data-type="entity-link">ContentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ContentModule-378ac575ca8a85e573fc2bf55cb53a1a"' : 'data-target="#xs-components-links-module-ContentModule-378ac575ca8a85e573fc2bf55cb53a1a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ContentModule-378ac575ca8a85e573fc2bf55cb53a1a"' :
                                            'id="xs-components-links-module-ContentModule-378ac575ca8a85e573fc2bf55cb53a1a"' }>
                                            <li class="link">
                                                <a href="components/ContentComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ContentComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CoreModule.html" data-type="entity-link">CoreModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CoreModule.html" data-type="entity-link">CoreModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/DrawerModule.html" data-type="entity-link">DrawerModule</a>
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
                                                <a href="components/ContainerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ContainerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ContentComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ContentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DrawerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DrawerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ToggleButtonComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ToggleButtonComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DrawerModule.html" data-type="entity-link">DrawerModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-DrawerModule-2facb8ede5531dd4425e86d57567e82d-1"' : 'data-target="#xs-components-links-module-DrawerModule-2facb8ede5531dd4425e86d57567e82d-1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DrawerModule-2facb8ede5531dd4425e86d57567e82d-1"' :
                                            'id="xs-components-links-module-DrawerModule-2facb8ede5531dd4425e86d57567e82d-1"' }>
                                            <li class="link">
                                                <a href="components/ContainerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ContainerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ContentComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ContentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DrawerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DrawerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ToggleButtonComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ToggleButtonComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DropdownModule.html" data-type="entity-link">DropdownModule</a>
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
                                                <a href="components/DropdownComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DropdownComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DualSliderModule.html" data-type="entity-link">DualSliderModule</a>
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
                                                <a href="components/DualSliderComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DualSliderComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/FiltersContentModule.html" data-type="entity-link">FiltersContentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-FiltersContentModule-4c8588c02a61c533c1fee7ec0d1b4549"' : 'data-target="#xs-components-links-module-FiltersContentModule-4c8588c02a61c533c1fee7ec0d1b4549"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-FiltersContentModule-4c8588c02a61c533c1fee7ec0d1b4549"' :
                                            'id="xs-components-links-module-FiltersContentModule-4c8588c02a61c533c1fee7ec0d1b4549"' }>
                                            <li class="link">
                                                <a href="components/FiltersContentComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FiltersContentComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/FiltersPopoverModule.html" data-type="entity-link">FiltersPopoverModule</a>
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
                                                <a href="components/FiltersPopoverComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FiltersPopoverComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/GenderSelectorModule.html" data-type="entity-link">GenderSelectorModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-GenderSelectorModule-1b2b6b01e2b58c3335be895fcb8cbd75"' : 'data-target="#xs-components-links-module-GenderSelectorModule-1b2b6b01e2b58c3335be895fcb8cbd75"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-GenderSelectorModule-1b2b6b01e2b58c3335be895fcb8cbd75"' :
                                            'id="xs-components-links-module-GenderSelectorModule-1b2b6b01e2b58c3335be895fcb8cbd75"' }>
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
                                            'data-target="#components-links-module-HeaderModule-7d1a4411f789fce9a9fe8808e990c3e8"' : 'data-target="#xs-components-links-module-HeaderModule-7d1a4411f789fce9a9fe8808e990c3e8"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HeaderModule-7d1a4411f789fce9a9fe8808e990c3e8"' :
                                            'id="xs-components-links-module-HeaderModule-7d1a4411f789fce9a9fe8808e990c3e8"' }>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HeaderComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HeaderModule.html" data-type="entity-link">HeaderModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-HeaderModule-d0415e60ca0573065a90eeb7185e6c52-1"' : 'data-target="#xs-components-links-module-HeaderModule-d0415e60ca0573065a90eeb7185e6c52-1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HeaderModule-d0415e60ca0573065a90eeb7185e6c52-1"' :
                                            'id="xs-components-links-module-HeaderModule-d0415e60ca0573065a90eeb7185e6c52-1"' }>
                                            <li class="link">
                                                <a href="components/HeaderComponent-1.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HeaderComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ImageViewerAccordionModule.html" data-type="entity-link">ImageViewerAccordionModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ImageViewerAccordionModule-efc9f1d0bb5dec4c15418ebe43034c20"' : 'data-target="#xs-components-links-module-ImageViewerAccordionModule-efc9f1d0bb5dec4c15418ebe43034c20"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ImageViewerAccordionModule-efc9f1d0bb5dec4c15418ebe43034c20"' :
                                            'id="xs-components-links-module-ImageViewerAccordionModule-efc9f1d0bb5dec4c15418ebe43034c20"' }>
                                            <li class="link">
                                                <a href="components/ImageViewerAccordionComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ImageViewerAccordionComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ImageViewerContentModule.html" data-type="entity-link">ImageViewerContentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ImageViewerContentModule-98c16f050583157c7fdcf0ef5da7023e"' : 'data-target="#xs-components-links-module-ImageViewerContentModule-98c16f050583157c7fdcf0ef5da7023e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ImageViewerContentModule-98c16f050583157c7fdcf0ef5da7023e"' :
                                            'id="xs-components-links-module-ImageViewerContentModule-98c16f050583157c7fdcf0ef5da7023e"' }>
                                            <li class="link">
                                                <a href="components/ImageViewerContentComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ImageViewerContentComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ImageViewerLayersModule.html" data-type="entity-link">ImageViewerLayersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ImageViewerLayersModule-6e4bfa9f2a051ce403e9c015c34eb132"' : 'data-target="#xs-components-links-module-ImageViewerLayersModule-6e4bfa9f2a051ce403e9c015c34eb132"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ImageViewerLayersModule-6e4bfa9f2a051ce403e9c015c34eb132"' :
                                            'id="xs-components-links-module-ImageViewerLayersModule-6e4bfa9f2a051ce403e9c015c34eb132"' }>
                                            <li class="link">
                                                <a href="components/ImageViewerLayersComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ImageViewerLayersComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ImageViewerLegendModule.html" data-type="entity-link">ImageViewerLegendModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ImageViewerLegendModule-726bd943d14e91b7321b75579fe66bb8"' : 'data-target="#xs-components-links-module-ImageViewerLegendModule-726bd943d14e91b7321b75579fe66bb8"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ImageViewerLegendModule-726bd943d14e91b7321b75579fe66bb8"' :
                                            'id="xs-components-links-module-ImageViewerLegendModule-726bd943d14e91b7321b75579fe66bb8"' }>
                                            <li class="link">
                                                <a href="components/ImageViewerLegendComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ImageViewerLegendComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ImageViewerModule.html" data-type="entity-link">ImageViewerModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ImageViewerPopoverModule.html" data-type="entity-link">ImageViewerPopoverModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ImageViewerPopoverModule-a530f7a8e927ec6d322da4737e4ba5d0"' : 'data-target="#xs-components-links-module-ImageViewerPopoverModule-a530f7a8e927ec6d322da4737e4ba5d0"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ImageViewerPopoverModule-a530f7a8e927ec6d322da4737e4ba5d0"' :
                                            'id="xs-components-links-module-ImageViewerPopoverModule-a530f7a8e927ec6d322da4737e4ba5d0"' }>
                                            <li class="link">
                                                <a href="components/ImageViewerPopoverComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ImageViewerPopoverComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/InfoButtonModule.html" data-type="entity-link">InfoButtonModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-InfoButtonModule-ecd842e3d1f8b312a0dc711f81ce9ed1"' : 'data-target="#xs-components-links-module-InfoButtonModule-ecd842e3d1f8b312a0dc711f81ce9ed1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-InfoButtonModule-ecd842e3d1f8b312a0dc711f81ce9ed1"' :
                                            'id="xs-components-links-module-InfoButtonModule-ecd842e3d1f8b312a0dc711f81ce9ed1"' }>
                                            <li class="link">
                                                <a href="components/InfoButtonComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">InfoButtonComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/InfoDialogModule.html" data-type="entity-link">InfoDialogModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-InfoDialogModule-b79e661dfc707e66ba2496b959e9e392"' : 'data-target="#xs-components-links-module-InfoDialogModule-b79e661dfc707e66ba2496b959e9e392"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-InfoDialogModule-b79e661dfc707e66ba2496b959e9e392"' :
                                            'id="xs-components-links-module-InfoDialogModule-b79e661dfc707e66ba2496b959e9e392"' }>
                                            <li class="link">
                                                <a href="components/InfoDialogComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">InfoDialogComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LeftSidebarModule.html" data-type="entity-link">LeftSidebarModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-LeftSidebarModule-2d32d5ac4623154d28af0eb56836185d"' : 'data-target="#xs-components-links-module-LeftSidebarModule-2d32d5ac4623154d28af0eb56836185d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LeftSidebarModule-2d32d5ac4623154d28af0eb56836185d"' :
                                            'id="xs-components-links-module-LeftSidebarModule-2d32d5ac4623154d28af0eb56836185d"' }>
                                            <li class="link">
                                                <a href="components/LeftSidebarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LeftSidebarComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/OntologyExplorationModule.html" data-type="entity-link">OntologyExplorationModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/OntologySearchModule.html" data-type="entity-link">OntologySearchModule</a>
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
                                                <a href="components/OntologySearchComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OntologySearchComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/OntologySelectionModule.html" data-type="entity-link">OntologySelectionModule</a>
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
                                                <a href="components/OntologySelectionComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OntologySelectionComponent</a>
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
                                <a href="modules/OrganSelectorModule.html" data-type="entity-link">OrganSelectorModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-OrganSelectorModule-a6bf5a0a82c13f9c44b0b121562f50d9"' : 'data-target="#xs-components-links-module-OrganSelectorModule-a6bf5a0a82c13f9c44b0b121562f50d9"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-OrganSelectorModule-a6bf5a0a82c13f9c44b0b121562f50d9"' :
                                            'id="xs-components-links-module-OrganSelectorModule-a6bf5a0a82c13f9c44b0b121562f50d9"' }>
                                            <li class="link">
                                                <a href="components/OrganSelectorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OrganSelectorComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ResultsBrowserItemModule.html" data-type="entity-link">ResultsBrowserItemModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ResultsBrowserItemModule-e1d561805baf032753d1c8846cbec8d6"' : 'data-target="#xs-components-links-module-ResultsBrowserItemModule-e1d561805baf032753d1c8846cbec8d6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ResultsBrowserItemModule-e1d561805baf032753d1c8846cbec8d6"' :
                                            'id="xs-components-links-module-ResultsBrowserItemModule-e1d561805baf032753d1c8846cbec8d6"' }>
                                            <li class="link">
                                                <a href="components/ResultsBrowserItemComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ResultsBrowserItemComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ResultsBrowserModule.html" data-type="entity-link">ResultsBrowserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ResultsBrowserModule-d9eb48dea67fabaf4f98b35c0862d812"' : 'data-target="#xs-components-links-module-ResultsBrowserModule-d9eb48dea67fabaf4f98b35c0862d812"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ResultsBrowserModule-d9eb48dea67fabaf4f98b35c0862d812"' :
                                            'id="xs-components-links-module-ResultsBrowserModule-d9eb48dea67fabaf4f98b35c0862d812"' }>
                                            <li class="link">
                                                <a href="components/ResultsBrowserComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ResultsBrowserComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/RightSidebarModule.html" data-type="entity-link">RightSidebarModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-RightSidebarModule-9393e62cf6c9899eb4810966f553a448"' : 'data-target="#xs-components-links-module-RightSidebarModule-9393e62cf6c9899eb4810966f553a448"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RightSidebarModule-9393e62cf6c9899eb4810966f553a448"' :
                                            'id="xs-components-links-module-RightSidebarModule-9393e62cf6c9899eb4810966f553a448"' }>
                                            <li class="link">
                                                <a href="components/RightSidebarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RightSidebarComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/RotationSliderModule.html" data-type="entity-link">RotationSliderModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-RotationSliderModule-869ae97474ab5dc50af990d70e6fbc0b"' : 'data-target="#xs-components-links-module-RotationSliderModule-869ae97474ab5dc50af990d70e6fbc0b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RotationSliderModule-869ae97474ab5dc50af990d70e6fbc0b"' :
                                            'id="xs-components-links-module-RotationSliderModule-869ae97474ab5dc50af990d70e6fbc0b"' }>
                                            <li class="link">
                                                <a href="components/RotationSliderComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RotationSliderComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SchemeDropdownModule.html" data-type="entity-link">SchemeDropdownModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SchemeDropdownModule-ff63df77f5605fd36f4989dd22d8418f"' : 'data-target="#xs-components-links-module-SchemeDropdownModule-ff63df77f5605fd36f4989dd22d8418f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SchemeDropdownModule-ff63df77f5605fd36f4989dd22d8418f"' :
                                            'id="xs-components-links-module-SchemeDropdownModule-ff63df77f5605fd36f4989dd22d8418f"' }>
                                            <li class="link">
                                                <a href="components/SchemeDropdownComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SchemeDropdownComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SideSelectorModule.html" data-type="entity-link">SideSelectorModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SideSelectorModule-b243ceef614f9ed46b2e4957d1590c10"' : 'data-target="#xs-components-links-module-SideSelectorModule-b243ceef614f9ed46b2e4957d1590c10"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SideSelectorModule-b243ceef614f9ed46b2e4957d1590c10"' :
                                            'id="xs-components-links-module-SideSelectorModule-b243ceef614f9ed46b2e4957d1590c10"' }>
                                            <li class="link">
                                                <a href="components/SideSelectorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SideSelectorComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SlicesInputModule.html" data-type="entity-link">SlicesInputModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SlicesInputModule-943320c08209d6d393d4ca1f73f0e484"' : 'data-target="#xs-components-links-module-SlicesInputModule-943320c08209d6d393d4ca1f73f0e484"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SlicesInputModule-943320c08209d6d393d4ca1f73f0e484"' :
                                            'id="xs-components-links-module-SlicesInputModule-943320c08209d6d393d4ca1f73f0e484"' }>
                                            <li class="link">
                                                <a href="components/SlicesInputComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SlicesInputComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SpinnerOverlayModule.html" data-type="entity-link">SpinnerOverlayModule</a>
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
                                                <a href="components/SpinnerOverlayComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SpinnerOverlayComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/StageNavModule.html" data-type="entity-link">StageNavModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-StageNavModule-905ad4189794754a9e4a1b0713212527"' : 'data-target="#xs-components-links-module-StageNavModule-905ad4189794754a9e4a1b0713212527"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-StageNavModule-905ad4189794754a9e4a1b0713212527"' :
                                            'id="xs-components-links-module-StageNavModule-905ad4189794754a9e4a1b0713212527"' }>
                                            <li class="link">
                                                <a href="components/StageNavComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">StageNavComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/StoreModule.html" data-type="entity-link">StoreModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/StoreModule.html" data-type="entity-link">StoreModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ThemingModule.html" data-type="entity-link">ThemingModule</a>
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
                                            <a href="injectables/ThemingService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ThemingService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ThemingModule.html" data-type="entity-link">ThemingModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ThemingModule-6eb32d8cab3c120770d9f6e433bd3f4c-1"' : 'data-target="#xs-injectables-links-module-ThemingModule-6eb32d8cab3c120770d9f6e433bd3f4c-1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ThemingModule-6eb32d8cab3c120770d9f6e433bd3f4c-1"' :
                                        'id="xs-injectables-links-module-ThemingModule-6eb32d8cab3c120770d9f6e433bd3f4c-1"' }>
                                        <li class="link">
                                            <a href="injectables/ThemingService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ThemingService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ViewerModule.html" data-type="entity-link">ViewerModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ViewerModule-44094f9d6b585a0810a153b3805ce835"' : 'data-target="#xs-components-links-module-ViewerModule-44094f9d6b585a0810a153b3805ce835"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ViewerModule-44094f9d6b585a0810a153b3805ce835"' :
                                            'id="xs-components-links-module-ViewerModule-44094f9d6b585a0810a153b3805ce835"' }>
                                            <li class="link">
                                                <a href="components/ViewerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ViewerComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#components-links"' :
                            'data-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/ContentComponent-1.html" data-type="entity-link">ContentComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ContentComponent-2.html" data-type="entity-link">ContentComponent</a>
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
                                <a href="classes/AppPage.html" data-type="entity-link">AppPage</a>
                            </li>
                            <li class="link">
                                <a href="classes/AppPage-1.html" data-type="entity-link">AppPage</a>
                            </li>
                            <li class="link">
                                <a href="classes/BodyUI.html" data-type="entity-link">BodyUI</a>
                            </li>
                            <li class="link">
                                <a href="classes/BodyUILayer.html" data-type="entity-link">BodyUILayer</a>
                            </li>
                            <li class="link">
                                <a href="classes/CCFDatabase.html" data-type="entity-link">CCFDatabase</a>
                            </li>
                            <li class="link">
                                <a href="classes/CCFSpatialGraph.html" data-type="entity-link">CCFSpatialGraph</a>
                            </li>
                            <li class="link">
                                <a href="classes/CCFSpatialScene.html" data-type="entity-link">CCFSpatialScene</a>
                            </li>
                            <li class="link">
                                <a href="classes/FlatNode.html" data-type="entity-link">FlatNode</a>
                            </li>
                            <li class="link">
                                <a href="classes/HuBMAPEntity.html" data-type="entity-link">HuBMAPEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/ImageViewer.html" data-type="entity-link">ImageViewer</a>
                            </li>
                            <li class="link">
                                <a href="classes/ImageViewerLayer.html" data-type="entity-link">ImageViewerLayer</a>
                            </li>
                            <li class="link">
                                <a href="classes/InitializationState.html" data-type="entity-link">InitializationState</a>
                            </li>
                            <li class="link">
                                <a href="classes/InitializationState-1.html" data-type="entity-link">InitializationState</a>
                            </li>
                            <li class="link">
                                <a href="classes/MessageChannel.html" data-type="entity-link">MessageChannel</a>
                            </li>
                            <li class="link">
                                <a href="classes/MessageChannel-1.html" data-type="entity-link">MessageChannel</a>
                            </li>
                            <li class="link">
                                <a href="classes/PictureInPictureViewer.html" data-type="entity-link">PictureInPictureViewer</a>
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
                                    <a href="injectables/DataSourceService.html" data-type="entity-link">DataSourceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DataState.html" data-type="entity-link">DataState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/IconRegistryState.html" data-type="entity-link">IconRegistryState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/IconRegistryState-1.html" data-type="entity-link">IconRegistryState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MessageService.html" data-type="entity-link">MessageService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MessageService-1.html" data-type="entity-link">MessageService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OntologySearchService.html" data-type="entity-link">OntologySearchService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OntologyState.html" data-type="entity-link">OntologyState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PageState.html" data-type="entity-link">PageState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ViewerState.html" data-type="entity-link">ViewerState</a>
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
                                <a href="interfaces/AggregateResult.html" data-type="entity-link">AggregateResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BlockSizes.html" data-type="entity-link">BlockSizes</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BodyUIProps.html" data-type="entity-link">BodyUIProps</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BodyUIViewStateProps.html" data-type="entity-link">BodyUIViewStateProps</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CCFDatabaseOptions.html" data-type="entity-link">CCFDatabaseOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ChannelConfig.html" data-type="entity-link">ChannelConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Collision.html" data-type="entity-link">Collision</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ColorScheme.html" data-type="entity-link">ColorScheme</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ColorScheme-1.html" data-type="entity-link">ColorScheme</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ColorSchemeSelection.html" data-type="entity-link">ColorSchemeSelection</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ContentContainerChanged.html" data-type="entity-link">ContentContainerChanged</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ContentContainerChanged-1.html" data-type="entity-link">ContentContainerChanged</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DataSource.html" data-type="entity-link">DataSource</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DataSource-1.html" data-type="entity-link">DataSource</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DataStateModel.html" data-type="entity-link">DataStateModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DefaultIconDefinition.html" data-type="entity-link">DefaultIconDefinition</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DefaultIconDefinition-1.html" data-type="entity-link">DefaultIconDefinition</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DrawerContainersChanged.html" data-type="entity-link">DrawerContainersChanged</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DrawerContainersChanged-1.html" data-type="entity-link">DrawerContainersChanged</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DrawerInitialized.html" data-type="entity-link">DrawerInitialized</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DrawerInitialized-1.html" data-type="entity-link">DrawerInitialized</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DrawerToggled.html" data-type="entity-link">DrawerToggled</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DrawerToggled-1.html" data-type="entity-link">DrawerToggled</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ExtDeckProps.html" data-type="entity-link">ExtDeckProps</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Filter.html" data-type="entity-link">Filter</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IconDefinition.html" data-type="entity-link">IconDefinition</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IconDefinition-1.html" data-type="entity-link">IconDefinition</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IdObject.html" data-type="entity-link">IdObject</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ImageViewerData.html" data-type="entity-link">ImageViewerData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ImageViewerProps.html" data-type="entity-link">ImageViewerProps</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/JsonOntologyNode.html" data-type="entity-link">JsonOntologyNode</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ListResult.html" data-type="entity-link">ListResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Message.html" data-type="entity-link">Message</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Message-1.html" data-type="entity-link">Message</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MessageServiceConfig.html" data-type="entity-link">MessageServiceConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MessageServiceConfig-1.html" data-type="entity-link">MessageServiceConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OldRuiData.html" data-type="entity-link">OldRuiData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OMEZarrInfo.html" data-type="entity-link">OMEZarrInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OntologyNode.html" data-type="entity-link">OntologyNode</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OntologySelection.html" data-type="entity-link">OntologySelection</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OntologyStateModel.html" data-type="entity-link">OntologyStateModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OrganInfo.html" data-type="entity-link">OrganInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PageStateModel.html" data-type="entity-link">PageStateModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PictureInPictureViewerProps.html" data-type="entity-link">PictureInPictureViewerProps</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PureImageViewerLayer.html" data-type="entity-link">PureImageViewerLayer</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Rotation.html" data-type="entity-link">Rotation</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SearchableItem.html" data-type="entity-link">SearchableItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SearchResult.html" data-type="entity-link">SearchResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SlicesData.html" data-type="entity-link">SlicesData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SpatialEntity.html" data-type="entity-link">SpatialEntity</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SpatialObjectReference.html" data-type="entity-link">SpatialObjectReference</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SpatialPlacement.html" data-type="entity-link">SpatialPlacement</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SpatialSceneNode.html" data-type="entity-link">SpatialSceneNode</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SpatialSceneNode-1.html" data-type="entity-link">SpatialSceneNode</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TiffInfo.html" data-type="entity-link">TiffInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ValueObject.html" data-type="entity-link">ValueObject</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ViewerStateModel.html" data-type="entity-link">ViewerStateModel</a>
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