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
                                            'data-target="#components-links-module-AppModule-e651ae9ae59f305a566c9715a7109006"' : 'data-target="#xs-components-links-module-AppModule-e651ae9ae59f305a566c9715a7109006"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-e651ae9ae59f305a566c9715a7109006"' :
                                            'id="xs-components-links-module-AppModule-e651ae9ae59f305a566c9715a7109006"' }>
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
                                            'data-target="#components-links-module-AppModule-6e940ae98187cd2d75e4007c0f3fb779-1"' : 'data-target="#xs-components-links-module-AppModule-6e940ae98187cd2d75e4007c0f3fb779-1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-6e940ae98187cd2d75e4007c0f3fb779-1"' :
                                            'id="xs-components-links-module-AppModule-6e940ae98187cd2d75e4007c0f3fb779-1"' }>
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
                                            'data-target="#components-links-module-BlockSizeInputModule-c72fd1eb9546ab5ffa9e76e74d7b50b1"' : 'data-target="#xs-components-links-module-BlockSizeInputModule-c72fd1eb9546ab5ffa9e76e74d7b50b1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BlockSizeInputModule-c72fd1eb9546ab5ffa9e76e74d7b50b1"' :
                                            'id="xs-components-links-module-BlockSizeInputModule-c72fd1eb9546ab5ffa9e76e74d7b50b1"' }>
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
                                            'data-target="#components-links-module-BodyUiModule-af993bd96277ed66c04cae4bd67c66ea"' : 'data-target="#xs-components-links-module-BodyUiModule-af993bd96277ed66c04cae4bd67c66ea"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BodyUiModule-af993bd96277ed66c04cae4bd67c66ea"' :
                                            'id="xs-components-links-module-BodyUiModule-af993bd96277ed66c04cae4bd67c66ea"' }>
                                            <li class="link">
                                                <a href="components/BodyUiComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BodyUiComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/BodyUiModule.html" data-type="entity-link">BodyUiModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-BodyUiModule-20628eedad68f384d7dad05e88ec3b60-1"' : 'data-target="#xs-components-links-module-BodyUiModule-20628eedad68f384d7dad05e88ec3b60-1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BodyUiModule-20628eedad68f384d7dad05e88ec3b60-1"' :
                                            'id="xs-components-links-module-BodyUiModule-20628eedad68f384d7dad05e88ec3b60-1"' }>
                                            <li class="link">
                                                <a href="components/BodyUiComponent-1.html"
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
                                <a href="modules/ConfigModule.html" data-type="entity-link">ConfigModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ContentModule.html" data-type="entity-link">ContentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ContentModule-831d0d412ff7708b258e807d97318ccf"' : 'data-target="#xs-components-links-module-ContentModule-831d0d412ff7708b258e807d97318ccf"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ContentModule-831d0d412ff7708b258e807d97318ccf"' :
                                            'id="xs-components-links-module-ContentModule-831d0d412ff7708b258e807d97318ccf"' }>
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
                                <a href="modules/DecoratedTextModule.html" data-type="entity-link">DecoratedTextModule</a>
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
                                                <a href="components/DecoratedTextComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DecoratedTextComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DetailsLabelModule.html" data-type="entity-link">DetailsLabelModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-DetailsLabelModule-831573a6702a3cde114dd3dd898f1442"' : 'data-target="#xs-components-links-module-DetailsLabelModule-831573a6702a3cde114dd3dd898f1442"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DetailsLabelModule-831573a6702a3cde114dd3dd898f1442"' :
                                            'id="xs-components-links-module-DetailsLabelModule-831573a6702a3cde114dd3dd898f1442"' }>
                                            <li class="link">
                                                <a href="components/DetailsLabelComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DetailsLabelComponent</a>
                                            </li>
                                        </ul>
                                    </li>
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
                                <a href="modules/ExtractionSetDropdownModule.html" data-type="entity-link">ExtractionSetDropdownModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ExtractionSetDropdownModule-d4650a6fbfa7c1c8994181f2495ac0b4"' : 'data-target="#xs-components-links-module-ExtractionSetDropdownModule-d4650a6fbfa7c1c8994181f2495ac0b4"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ExtractionSetDropdownModule-d4650a6fbfa7c1c8994181f2495ac0b4"' :
                                            'id="xs-components-links-module-ExtractionSetDropdownModule-d4650a6fbfa7c1c8994181f2495ac0b4"' }>
                                            <li class="link">
                                                <a href="components/ExtractionSetDropdownComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ExtractionSetDropdownComponent</a>
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
                                            'data-target="#components-links-module-HeaderModule-5185db542a5f7c0c7c57a9a279ff89e4-1"' : 'data-target="#xs-components-links-module-HeaderModule-5185db542a5f7c0c7c57a9a279ff89e4-1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HeaderModule-5185db542a5f7c0c7c57a9a279ff89e4-1"' :
                                            'id="xs-components-links-module-HeaderModule-5185db542a5f7c0c7c57a9a279ff89e4-1"' }>
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
                                <a href="modules/InfoButtonModule.html" data-type="entity-link">InfoButtonModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-InfoButtonModule-ecd842e3d1f8b312a0dc711f81ce9ed1-1"' : 'data-target="#xs-components-links-module-InfoButtonModule-ecd842e3d1f8b312a0dc711f81ce9ed1-1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-InfoButtonModule-ecd842e3d1f8b312a0dc711f81ce9ed1-1"' :
                                            'id="xs-components-links-module-InfoButtonModule-ecd842e3d1f8b312a0dc711f81ce9ed1-1"' }>
                                            <li class="link">
                                                <a href="components/InfoButtonComponent-1.html"
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
                                <a href="modules/InfoDialogModule.html" data-type="entity-link">InfoDialogModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-InfoDialogModule-b79e661dfc707e66ba2496b959e9e392-1"' : 'data-target="#xs-components-links-module-InfoDialogModule-b79e661dfc707e66ba2496b959e9e392-1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-InfoDialogModule-b79e661dfc707e66ba2496b959e9e392-1"' :
                                            'id="xs-components-links-module-InfoDialogModule-b79e661dfc707e66ba2496b959e9e392-1"' }>
                                            <li class="link">
                                                <a href="components/InfoDialogComponent-1.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">InfoDialogComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LabeledSlideToggleModule.html" data-type="entity-link">LabeledSlideToggleModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-LabeledSlideToggleModule-60e9a07ce04f1e09708f7dc6a22c53b8"' : 'data-target="#xs-components-links-module-LabeledSlideToggleModule-60e9a07ce04f1e09708f7dc6a22c53b8"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LabeledSlideToggleModule-60e9a07ce04f1e09708f7dc6a22c53b8"' :
                                            'id="xs-components-links-module-LabeledSlideToggleModule-60e9a07ce04f1e09708f7dc6a22c53b8"' }>
                                            <li class="link">
                                                <a href="components/LabeledSlideToggleComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LabeledSlideToggleComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LeftSidebarModule.html" data-type="entity-link">LeftSidebarModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-LeftSidebarModule-8a61c74f5264ca454b9efa5449d2fed6"' : 'data-target="#xs-components-links-module-LeftSidebarModule-8a61c74f5264ca454b9efa5449d2fed6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LeftSidebarModule-8a61c74f5264ca454b9efa5449d2fed6"' :
                                            'id="xs-components-links-module-LeftSidebarModule-8a61c74f5264ca454b9efa5449d2fed6"' }>
                                            <li class="link">
                                                <a href="components/LeftSidebarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LeftSidebarComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/NameInputModule.html" data-type="entity-link">NameInputModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-NameInputModule-d8c499c4b108f721b5a5167bbdf48b9d"' : 'data-target="#xs-components-links-module-NameInputModule-d8c499c4b108f721b5a5167bbdf48b9d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-NameInputModule-d8c499c4b108f721b5a5167bbdf48b9d"' :
                                            'id="xs-components-links-module-NameInputModule-d8c499c4b108f721b5a5167bbdf48b9d"' }>
                                            <li class="link">
                                                <a href="components/NameInputComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NameInputComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/NumbersOnlyModule.html" data-type="entity-link">NumbersOnlyModule</a>
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
                                            <a href="directives/NumberDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">NumberDirective</a>
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
                                <a href="modules/OpacitySliderModule.html" data-type="entity-link">OpacitySliderModule</a>
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
                                                <a href="components/OpacitySliderComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OpacitySliderComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/OrganSelectorModule.html" data-type="entity-link">OrganSelectorModule</a>
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
                                <a href="modules/ReviewButtonModule.html" data-type="entity-link">ReviewButtonModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ReviewButtonModule-6f951e29087d48b3cd68c27355d0f2cc"' : 'data-target="#xs-components-links-module-ReviewButtonModule-6f951e29087d48b3cd68c27355d0f2cc"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ReviewButtonModule-6f951e29087d48b3cd68c27355d0f2cc"' :
                                            'id="xs-components-links-module-ReviewButtonModule-6f951e29087d48b3cd68c27355d0f2cc"' }>
                                            <li class="link">
                                                <a href="components/ReviewButtonComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ReviewButtonComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ReviewModalModule.html" data-type="entity-link">ReviewModalModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ReviewModalModule-060bae99fe18e3432e375757e5551233"' : 'data-target="#xs-components-links-module-ReviewModalModule-060bae99fe18e3432e375757e5551233"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ReviewModalModule-060bae99fe18e3432e375757e5551233"' :
                                            'id="xs-components-links-module-ReviewModalModule-060bae99fe18e3432e375757e5551233"' }>
                                            <li class="link">
                                                <a href="components/ReviewModalComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ReviewModalComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/RightSidebarModule.html" data-type="entity-link">RightSidebarModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-RightSidebarModule-8d8faae507a4a599747cf3e99629b16e"' : 'data-target="#xs-components-links-module-RightSidebarModule-8d8faae507a4a599747cf3e99629b16e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RightSidebarModule-8d8faae507a4a599747cf3e99629b16e"' :
                                            'id="xs-components-links-module-RightSidebarModule-8d8faae507a4a599747cf3e99629b16e"' }>
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
                                            'data-target="#components-links-module-RotationSliderModule-48fc840d65fb6bfe499ab23907d4faa2"' : 'data-target="#xs-components-links-module-RotationSliderModule-48fc840d65fb6bfe499ab23907d4faa2"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RotationSliderModule-48fc840d65fb6bfe499ab23907d4faa2"' :
                                            'id="xs-components-links-module-RotationSliderModule-48fc840d65fb6bfe499ab23907d4faa2"' }>
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
                                <a href="modules/SlicesInputModule.html" data-type="entity-link">SlicesInputModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SlicesInputModule-e250a3b277b777b6f1bdb05b1905c52c"' : 'data-target="#xs-components-links-module-SlicesInputModule-e250a3b277b777b6f1bdb05b1905c52c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SlicesInputModule-e250a3b277b777b6f1bdb05b1905c52c"' :
                                            'id="xs-components-links-module-SlicesInputModule-e250a3b277b777b6f1bdb05b1905c52c"' }>
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
                                            'data-target="#components-links-module-StageNavModule-9f79c1087fe202f6153e6da107b9eb5b"' : 'data-target="#xs-components-links-module-StageNavModule-9f79c1087fe202f6153e6da107b9eb5b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-StageNavModule-9f79c1087fe202f6153e6da107b9eb5b"' :
                                            'id="xs-components-links-module-StageNavModule-9f79c1087fe202f6153e6da107b9eb5b"' }>
                                            <li class="link">
                                                <a href="components/StageNavComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">StageNavComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/StoreDebugModule.html" data-type="entity-link">StoreDebugModule</a>
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
                                                <a href="components/StoreDebugComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">StoreDebugComponent</a>
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
                                <a href="modules/TagListModule.html" data-type="entity-link">TagListModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TagListModule-46200f412cd2a62f7d323a3a24f20f97"' : 'data-target="#xs-components-links-module-TagListModule-46200f412cd2a62f7d323a3a24f20f97"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TagListModule-46200f412cd2a62f7d323a3a24f20f97"' :
                                            'id="xs-components-links-module-TagListModule-46200f412cd2a62f7d323a3a24f20f97"' }>
                                            <li class="link">
                                                <a href="components/TagListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TagListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TagSearchModule.html" data-type="entity-link">TagSearchModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TagSearchModule-9f127ed1c70b88efdfd97351d1b4c759"' : 'data-target="#xs-components-links-module-TagSearchModule-9f127ed1c70b88efdfd97351d1b4c759"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TagSearchModule-9f127ed1c70b88efdfd97351d1b4c759"' :
                                            'id="xs-components-links-module-TagSearchModule-9f127ed1c70b88efdfd97351d1b4c759"' }>
                                            <li class="link">
                                                <a href="components/TagSearchComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TagSearchComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TextSearchModule.html" data-type="entity-link">TextSearchModule</a>
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
                                                <a href="components/TextSearchComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TextSearchComponent</a>
                                            </li>
                                        </ul>
                                    </li>
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
                                <a href="modules/VideoModalLauncherModule.html" data-type="entity-link">VideoModalLauncherModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-VideoModalLauncherModule-35bece3e03cc21727e66dbe3706f17b4"' : 'data-target="#xs-components-links-module-VideoModalLauncherModule-35bece3e03cc21727e66dbe3706f17b4"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-VideoModalLauncherModule-35bece3e03cc21727e66dbe3706f17b4"' :
                                            'id="xs-components-links-module-VideoModalLauncherModule-35bece3e03cc21727e66dbe3706f17b4"' }>
                                            <li class="link">
                                                <a href="components/VideoModalLauncherComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">VideoModalLauncherComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/VideoModalModule.html" data-type="entity-link">VideoModalModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-VideoModalModule-008b8716354afbf17028abbab531588c"' : 'data-target="#xs-components-links-module-VideoModalModule-008b8716354afbf17028abbab531588c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-VideoModalModule-008b8716354afbf17028abbab531588c"' :
                                            'id="xs-components-links-module-VideoModalModule-008b8716354afbf17028abbab531588c"' }>
                                            <li class="link">
                                                <a href="components/VideoModalComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">VideoModalComponent</a>
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
                            <li class="link">
                                <a href="modules/VisibilityMenuModule.html" data-type="entity-link">VisibilityMenuModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-VisibilityMenuModule-9274ca6bddfeeaf94ff6b82e0c2f877d"' : 'data-target="#xs-components-links-module-VisibilityMenuModule-9274ca6bddfeeaf94ff6b82e0c2f877d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-VisibilityMenuModule-9274ca6bddfeeaf94ff6b82e0c2f877d"' :
                                            'id="xs-components-links-module-VisibilityMenuModule-9274ca6bddfeeaf94ff6b82e0c2f877d"' }>
                                            <li class="link">
                                                <a href="components/VisibilityMenuComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">VisibilityMenuComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/VisibilityToggleModule.html" data-type="entity-link">VisibilityToggleModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-VisibilityToggleModule-53385b18d3bf45a7725aac146c29a7e6"' : 'data-target="#xs-components-links-module-VisibilityToggleModule-53385b18d3bf45a7725aac146c29a7e6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-VisibilityToggleModule-53385b18d3bf45a7725aac146c29a7e6"' :
                                            'id="xs-components-links-module-VisibilityToggleModule-53385b18d3bf45a7725aac146c29a7e6"' }>
                                            <li class="link">
                                                <a href="components/VisibilityToggleComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">VisibilityToggleComponent</a>
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
                            <li class="link">
                                <a href="components/ToggleButtonComponent-1.html" data-type="entity-link">ToggleButtonComponent</a>
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
                                    <a href="injectables/AnatomicalStructureTagState.html" data-type="entity-link">AnatomicalStructureTagState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DataSourceService.html" data-type="entity-link">DataSourceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DataState.html" data-type="entity-link">DataState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GlobalsService.html" data-type="entity-link">GlobalsService</a>
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
                                    <a href="injectables/ModelState.html" data-type="entity-link">ModelState</a>
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
                                    <a href="injectables/ReferenceDataState.html" data-type="entity-link">ReferenceDataState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RegistrationState.html" data-type="entity-link">RegistrationState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SceneState.html" data-type="entity-link">SceneState</a>
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
                                <a href="interfaces/AnatomicalStructureTagStateModel.html" data-type="entity-link">AnatomicalStructureTagStateModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AutoCompleteOption.html" data-type="entity-link">AutoCompleteOption</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BlockSize.html" data-type="entity-link">BlockSize</a>
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
                                <a href="interfaces/DecoratedRange.html" data-type="entity-link">DecoratedRange</a>
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
                                <a href="interfaces/ExtractionSet.html" data-type="entity-link">ExtractionSet</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ExtractionSet-1.html" data-type="entity-link">ExtractionSet</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Filter.html" data-type="entity-link">Filter</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GlobalConfig.html" data-type="entity-link">GlobalConfig</a>
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
                                <a href="interfaces/MetaDataField.html" data-type="entity-link">MetaDataField</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ModelStateModel.html" data-type="entity-link">ModelStateModel</a>
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
                                <a href="interfaces/Person.html" data-type="entity-link">Person</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PickInfo.html" data-type="entity-link">PickInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PictureInPictureViewerProps.html" data-type="entity-link">PictureInPictureViewerProps</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProcessedNode.html" data-type="entity-link">ProcessedNode</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PureImageViewerLayer.html" data-type="entity-link">PureImageViewerLayer</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ReferenceDataStateModel.html" data-type="entity-link">ReferenceDataStateModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RegistrationStateModel.html" data-type="entity-link">RegistrationStateModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ReviewModalData.html" data-type="entity-link">ReviewModalData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Rotation.html" data-type="entity-link">Rotation</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SceneStateModel.html" data-type="entity-link">SceneStateModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SearchableItem.html" data-type="entity-link">SearchableItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SearchResult.html" data-type="entity-link">SearchResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Segment.html" data-type="entity-link">Segment</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SlicesConfig.html" data-type="entity-link">SlicesConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SlicesConfig-1.html" data-type="entity-link">SlicesConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SpatialEntity.html" data-type="entity-link">SpatialEntity</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SpatialEntityJsonLd.html" data-type="entity-link">SpatialEntityJsonLd</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SpatialObjectReference.html" data-type="entity-link">SpatialObjectReference</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SpatialObjectReferenceJsonLd.html" data-type="entity-link">SpatialObjectReferenceJsonLd</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SpatialPlacement.html" data-type="entity-link">SpatialPlacement</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SpatialPlacementJsonLd.html" data-type="entity-link">SpatialPlacementJsonLd</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SpatialSceneNode.html" data-type="entity-link">SpatialSceneNode</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SpatialSceneNode-1.html" data-type="entity-link">SpatialSceneNode</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StackOp.html" data-type="entity-link">StackOp</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Tag.html" data-type="entity-link">Tag</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TagSearchResult.html" data-type="entity-link">TagSearchResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TiffInfo.html" data-type="entity-link">TiffInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserName.html" data-type="entity-link">UserName</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ValueObject.html" data-type="entity-link">ValueObject</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ViewerStateModel.html" data-type="entity-link">ViewerStateModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/VisibilityItem.html" data-type="entity-link">VisibilityItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/XYZTriplet.html" data-type="entity-link">XYZTriplet</a>
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