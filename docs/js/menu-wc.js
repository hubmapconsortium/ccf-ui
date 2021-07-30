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
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-620d61e54d6a4f982cf866030b64d4b7"' : 'data-target="#xs-components-links-module-AppModule-620d61e54d6a4f982cf866030b64d4b7"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-620d61e54d6a4f982cf866030b64d4b7"' :
                                            'id="xs-components-links-module-AppModule-620d61e54d6a4f982cf866030b64d4b7"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-a05506980842f1425b1e5c751ff2b0be-1"' : 'data-target="#xs-components-links-module-AppModule-a05506980842f1425b1e5c751ff2b0be-1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-a05506980842f1425b1e5c751ff2b0be-1"' :
                                            'id="xs-components-links-module-AppModule-a05506980842f1425b1e5c751ff2b0be-1"' }>
                                            <li class="link">
                                                <a href="components/AppComponent-1.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/BlockSizeInputModule.html" data-type="entity-link" >BlockSizeInputModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-BlockSizeInputModule-81228f3716e3c8d77e698a56cb39223b"' : 'data-target="#xs-components-links-module-BlockSizeInputModule-81228f3716e3c8d77e698a56cb39223b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BlockSizeInputModule-81228f3716e3c8d77e698a56cb39223b"' :
                                            'id="xs-components-links-module-BlockSizeInputModule-81228f3716e3c8d77e698a56cb39223b"' }>
                                            <li class="link">
                                                <a href="components/BlockSizeInputComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BlockSizeInputComponent</a>
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
                                <a href="modules/ConfigModule.html" data-type="entity-link" >ConfigModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ContentModule.html" data-type="entity-link" >ContentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ContentModule-bc1ad48a3489f9aa305aac0510d21fee"' : 'data-target="#xs-components-links-module-ContentModule-bc1ad48a3489f9aa305aac0510d21fee"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ContentModule-bc1ad48a3489f9aa305aac0510d21fee"' :
                                            'id="xs-components-links-module-ContentModule-bc1ad48a3489f9aa305aac0510d21fee"' }>
                                            <li class="link">
                                                <a href="components/ContentComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ContentComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CoreModule.html" data-type="entity-link" >CoreModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CoreModule.html" data-type="entity-link" >CoreModule</a>
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
                                <a href="modules/DetailsLabelModule.html" data-type="entity-link" >DetailsLabelModule</a>
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
                                                <a href="components/DetailsLabelComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DetailsLabelComponent</a>
                                            </li>
                                        </ul>
                                    </li>
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
                                <a href="modules/DrawerModule.html" data-type="entity-link" >DrawerModule</a>
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
                                                <a href="components/ContainerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ContainerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ContentComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ContentComponent</a>
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
                                <a href="modules/ExtractionSetDropdownModule.html" data-type="entity-link" >ExtractionSetDropdownModule</a>
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
                                                <a href="components/ExtractionSetDropdownComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExtractionSetDropdownComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/FiltersContentModule.html" data-type="entity-link" >FiltersContentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-FiltersContentModule-9fa08119e9f307ea2869ad3b97753c4f"' : 'data-target="#xs-components-links-module-FiltersContentModule-9fa08119e9f307ea2869ad3b97753c4f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-FiltersContentModule-9fa08119e9f307ea2869ad3b97753c4f"' :
                                            'id="xs-components-links-module-FiltersContentModule-9fa08119e9f307ea2869ad3b97753c4f"' }>
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
                                <a href="modules/HeaderModule.html" data-type="entity-link" >HeaderModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-HeaderModule-99e890e18b63d475b90c0eaab1de2576-1"' : 'data-target="#xs-components-links-module-HeaderModule-99e890e18b63d475b90c0eaab1de2576-1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HeaderModule-99e890e18b63d475b90c0eaab1de2576-1"' :
                                            'id="xs-components-links-module-HeaderModule-99e890e18b63d475b90c0eaab1de2576-1"' }>
                                            <li class="link">
                                                <a href="components/HeaderComponent-1.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HeaderComponent</a>
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
                                <a href="modules/JsonFileReaderModule.html" data-type="entity-link" >JsonFileReaderModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-JsonFileReaderModule-29185e0352267554c9e3064c12000c89"' : 'data-target="#xs-components-links-module-JsonFileReaderModule-29185e0352267554c9e3064c12000c89"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-JsonFileReaderModule-29185e0352267554c9e3064c12000c89"' :
                                            'id="xs-components-links-module-JsonFileReaderModule-29185e0352267554c9e3064c12000c89"' }>
                                            <li class="link">
                                                <a href="components/JsonFileReaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JsonFileReaderComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LabeledSlideToggleModule.html" data-type="entity-link" >LabeledSlideToggleModule</a>
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
                                                <a href="components/LabeledSlideToggleComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LabeledSlideToggleComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LeftSidebarModule.html" data-type="entity-link" >LeftSidebarModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-LeftSidebarModule-12b5f0bd2c0d50bbf52c05db3b686959"' : 'data-target="#xs-components-links-module-LeftSidebarModule-12b5f0bd2c0d50bbf52c05db3b686959"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LeftSidebarModule-12b5f0bd2c0d50bbf52c05db3b686959"' :
                                            'id="xs-components-links-module-LeftSidebarModule-12b5f0bd2c0d50bbf52c05db3b686959"' }>
                                            <li class="link">
                                                <a href="components/LeftSidebarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LeftSidebarComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MousePositionTrackerModule.html" data-type="entity-link" >MousePositionTrackerModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/NameInputModule.html" data-type="entity-link" >NameInputModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-NameInputModule-a8fe527afd8f495fc679fb0443ac4e73"' : 'data-target="#xs-components-links-module-NameInputModule-a8fe527afd8f495fc679fb0443ac4e73"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-NameInputModule-a8fe527afd8f495fc679fb0443ac4e73"' :
                                            'id="xs-components-links-module-NameInputModule-a8fe527afd8f495fc679fb0443ac4e73"' }>
                                            <li class="link">
                                                <a href="components/NameInputComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NameInputComponent</a>
                                            </li>
                                        </ul>
                                    </li>
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
                                <a href="modules/RegistrationContentModule.html" data-type="entity-link" >RegistrationContentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-RegistrationContentModule-d02c687e7c6d477b804a12ebdf532f08"' : 'data-target="#xs-components-links-module-RegistrationContentModule-d02c687e7c6d477b804a12ebdf532f08"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RegistrationContentModule-d02c687e7c6d477b804a12ebdf532f08"' :
                                            'id="xs-components-links-module-RegistrationContentModule-d02c687e7c6d477b804a12ebdf532f08"' }>
                                            <li class="link">
                                                <a href="components/RegistrationContentComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RegistrationContentComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/RegistrationModalModule.html" data-type="entity-link" >RegistrationModalModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-RegistrationModalModule-6497dda2280905e07bef8ec61b2f686c"' : 'data-target="#xs-components-links-module-RegistrationModalModule-6497dda2280905e07bef8ec61b2f686c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RegistrationModalModule-6497dda2280905e07bef8ec61b2f686c"' :
                                            'id="xs-components-links-module-RegistrationModalModule-6497dda2280905e07bef8ec61b2f686c"' }>
                                            <li class="link">
                                                <a href="components/RegistrationModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RegistrationModalComponent</a>
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
                                <a href="modules/ReviewButtonModule.html" data-type="entity-link" >ReviewButtonModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ReviewButtonModule-53fc29486720ed3a2afde7b50815a653"' : 'data-target="#xs-components-links-module-ReviewButtonModule-53fc29486720ed3a2afde7b50815a653"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ReviewButtonModule-53fc29486720ed3a2afde7b50815a653"' :
                                            'id="xs-components-links-module-ReviewButtonModule-53fc29486720ed3a2afde7b50815a653"' }>
                                            <li class="link">
                                                <a href="components/ReviewButtonComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReviewButtonComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ReviewModalModule.html" data-type="entity-link" >ReviewModalModule</a>
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
                                                <a href="components/ReviewModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReviewModalComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/RightSidebarModule.html" data-type="entity-link" >RightSidebarModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-RightSidebarModule-96c1b10fd3d658f5cbd798b489869aae"' : 'data-target="#xs-components-links-module-RightSidebarModule-96c1b10fd3d658f5cbd798b489869aae"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RightSidebarModule-96c1b10fd3d658f5cbd798b489869aae"' :
                                            'id="xs-components-links-module-RightSidebarModule-96c1b10fd3d658f5cbd798b489869aae"' }>
                                            <li class="link">
                                                <a href="components/RightSidebarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RightSidebarComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/RotationSliderModule.html" data-type="entity-link" >RotationSliderModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-RotationSliderModule-351205330fbcbc6794d06b4082cd9c9f"' : 'data-target="#xs-components-links-module-RotationSliderModule-351205330fbcbc6794d06b4082cd9c9f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RotationSliderModule-351205330fbcbc6794d06b4082cd9c9f"' :
                                            'id="xs-components-links-module-RotationSliderModule-351205330fbcbc6794d06b4082cd9c9f"' }>
                                            <li class="link">
                                                <a href="components/RotationSliderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RotationSliderComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SlicesInputModule.html" data-type="entity-link" >SlicesInputModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SlicesInputModule-ec08e71d7f5eac3707b309c61b9dd327"' : 'data-target="#xs-components-links-module-SlicesInputModule-ec08e71d7f5eac3707b309c61b9dd327"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SlicesInputModule-ec08e71d7f5eac3707b309c61b9dd327"' :
                                            'id="xs-components-links-module-SlicesInputModule-ec08e71d7f5eac3707b309c61b9dd327"' }>
                                            <li class="link">
                                                <a href="components/SlicesInputComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SlicesInputComponent</a>
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
                                <a href="modules/StageNavModule.html" data-type="entity-link" >StageNavModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-StageNavModule-fa7a062379556730c70b99a68bd3fc6a"' : 'data-target="#xs-components-links-module-StageNavModule-fa7a062379556730c70b99a68bd3fc6a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-StageNavModule-fa7a062379556730c70b99a68bd3fc6a"' :
                                            'id="xs-components-links-module-StageNavModule-fa7a062379556730c70b99a68bd3fc6a"' }>
                                            <li class="link">
                                                <a href="components/StageNavComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StageNavComponent</a>
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
                                <a href="modules/StoreModule.html" data-type="entity-link" >StoreModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/StoreModule.html" data-type="entity-link" >StoreModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/TagListModule.html" data-type="entity-link" >TagListModule</a>
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
                                                <a href="components/TagListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TagListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TagSearchModule.html" data-type="entity-link" >TagSearchModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TagSearchModule-af822f23cd5f4b809fd226c4732685ca"' : 'data-target="#xs-components-links-module-TagSearchModule-af822f23cd5f4b809fd226c4732685ca"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TagSearchModule-af822f23cd5f4b809fd226c4732685ca"' :
                                            'id="xs-components-links-module-TagSearchModule-af822f23cd5f4b809fd226c4732685ca"' }>
                                            <li class="link">
                                                <a href="components/TagSearchComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TagSearchComponent</a>
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
                                <a href="modules/ThemingModule.html" data-type="entity-link" >ThemingModule</a>
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
                            <li class="link">
                                <a href="modules/VideoModalLauncherModule.html" data-type="entity-link" >VideoModalLauncherModule</a>
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
                                                <a href="components/VideoModalLauncherComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VideoModalLauncherComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/VideoModalModule.html" data-type="entity-link" >VideoModalModule</a>
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
                                                <a href="components/VideoModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VideoModalComponent</a>
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
                            <li class="link">
                                <a href="modules/VisibilityMenuModule.html" data-type="entity-link" >VisibilityMenuModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-VisibilityMenuModule-0b97c89cf8a7c397cea0a36f600dc2a0"' : 'data-target="#xs-components-links-module-VisibilityMenuModule-0b97c89cf8a7c397cea0a36f600dc2a0"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-VisibilityMenuModule-0b97c89cf8a7c397cea0a36f600dc2a0"' :
                                            'id="xs-components-links-module-VisibilityMenuModule-0b97c89cf8a7c397cea0a36f600dc2a0"' }>
                                            <li class="link">
                                                <a href="components/VisibilityMenuComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VisibilityMenuComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/VisibilityToggleModule.html" data-type="entity-link" >VisibilityToggleModule</a>
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
                                                <a href="components/VisibilityToggleComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VisibilityToggleComponent</a>
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
                                <a href="components/ContentComponent-1.html" data-type="entity-link" >ContentComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ContentComponent-2.html" data-type="entity-link" >ContentComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DrawerComponent-1.html" data-type="entity-link" >DrawerComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ToggleButtonComponent-1.html" data-type="entity-link" >ToggleButtonComponent</a>
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
                                <a href="classes/AppPage.html" data-type="entity-link" >AppPage</a>
                            </li>
                            <li class="link">
                                <a href="classes/AppPage-1.html" data-type="entity-link" >AppPage</a>
                            </li>
                            <li class="link">
                                <a href="classes/BodyUI.html" data-type="entity-link" >BodyUI</a>
                            </li>
                            <li class="link">
                                <a href="classes/BodyUILayer.html" data-type="entity-link" >BodyUILayer</a>
                            </li>
                            <li class="link">
                                <a href="classes/CCFDatabase.html" data-type="entity-link" >CCFDatabase</a>
                            </li>
                            <li class="link">
                                <a href="classes/CCFSpatialGraph.html" data-type="entity-link" >CCFSpatialGraph</a>
                            </li>
                            <li class="link">
                                <a href="classes/CCFSpatialScene.html" data-type="entity-link" >CCFSpatialScene</a>
                            </li>
                            <li class="link">
                                <a href="classes/FlatNode.html" data-type="entity-link" >FlatNode</a>
                            </li>
                            <li class="link">
                                <a href="classes/HuBMAPTissueBlock.html" data-type="entity-link" >HuBMAPTissueBlock</a>
                            </li>
                            <li class="link">
                                <a href="classes/InitializationState.html" data-type="entity-link" >InitializationState</a>
                            </li>
                            <li class="link">
                                <a href="classes/InitializationState-1.html" data-type="entity-link" >InitializationState</a>
                            </li>
                            <li class="link">
                                <a href="classes/MessageChannel.html" data-type="entity-link" >MessageChannel</a>
                            </li>
                            <li class="link">
                                <a href="classes/MessageChannel-1.html" data-type="entity-link" >MessageChannel</a>
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
                                    <a href="injectables/AnatomicalStructureTagState.html" data-type="entity-link" >AnatomicalStructureTagState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AppRootOverlayContainer.html" data-type="entity-link" >AppRootOverlayContainer</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ColorAssignmentState.html" data-type="entity-link" >ColorAssignmentState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DataSourceService.html" data-type="entity-link" >DataSourceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DataState.html" data-type="entity-link" >DataState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GlobalConfigState.html" data-type="entity-link" >GlobalConfigState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GlobalsService.html" data-type="entity-link" >GlobalsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/IconRegistryState.html" data-type="entity-link" >IconRegistryState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/IconRegistryState-1.html" data-type="entity-link" >IconRegistryState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/InfoButtonService.html" data-type="entity-link" >InfoButtonService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ListResultsState.html" data-type="entity-link" >ListResultsState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MessageService.html" data-type="entity-link" >MessageService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MessageService-1.html" data-type="entity-link" >MessageService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ModelState.html" data-type="entity-link" >ModelState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OntologySearchService.html" data-type="entity-link" >OntologySearchService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OntologyState.html" data-type="entity-link" >OntologyState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PageState.html" data-type="entity-link" >PageState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ReferenceDataState.html" data-type="entity-link" >ReferenceDataState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RegistrationState.html" data-type="entity-link" >RegistrationState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SceneState.html" data-type="entity-link" >SceneState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SceneState-1.html" data-type="entity-link" >SceneState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TrackingState.html" data-type="entity-link" >TrackingState</a>
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
                                <a href="interfaces/AggregateResult.html" data-type="entity-link" >AggregateResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AnatomicalStructureTagStateModel.html" data-type="entity-link" >AnatomicalStructureTagStateModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AutoCompleteOption.html" data-type="entity-link" >AutoCompleteOption</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BlockSize.html" data-type="entity-link" >BlockSize</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BodyUIProps.html" data-type="entity-link" >BodyUIProps</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BodyUIViewStateProps.html" data-type="entity-link" >BodyUIViewStateProps</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CCFDatabaseOptions.html" data-type="entity-link" >CCFDatabaseOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Collision.html" data-type="entity-link" >Collision</a>
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
                                <a href="interfaces/ContentContainerChanged-1.html" data-type="entity-link" >ContentContainerChanged</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DatasetResult.html" data-type="entity-link" >DatasetResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DataStateModel.html" data-type="entity-link" >DataStateModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DecoratedRange.html" data-type="entity-link" >DecoratedRange</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DefaultIconDefinition.html" data-type="entity-link" >DefaultIconDefinition</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DefaultIconDefinition-1.html" data-type="entity-link" >DefaultIconDefinition</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DocumentationContent.html" data-type="entity-link" >DocumentationContent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DocumentationContent-1.html" data-type="entity-link" >DocumentationContent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DonorResult.html" data-type="entity-link" >DonorResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DrawerContainersChanged.html" data-type="entity-link" >DrawerContainersChanged</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DrawerContainersChanged-1.html" data-type="entity-link" >DrawerContainersChanged</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DrawerInitialized.html" data-type="entity-link" >DrawerInitialized</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DrawerInitialized-1.html" data-type="entity-link" >DrawerInitialized</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DrawerToggled.html" data-type="entity-link" >DrawerToggled</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DrawerToggled-1.html" data-type="entity-link" >DrawerToggled</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ExtractionSet.html" data-type="entity-link" >ExtractionSet</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ExtractionSet-1.html" data-type="entity-link" >ExtractionSet</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Filter.html" data-type="entity-link" >Filter</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GlobalConfig.html" data-type="entity-link" >GlobalConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IconDefinition.html" data-type="entity-link" >IconDefinition</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IconDefinition-1.html" data-type="entity-link" >IconDefinition</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InfoDialogData.html" data-type="entity-link" >InfoDialogData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ListResult.html" data-type="entity-link" >ListResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ListResultItem.html" data-type="entity-link" >ListResultItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ListResultsStateModel.html" data-type="entity-link" >ListResultsStateModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Message.html" data-type="entity-link" >Message</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Message-1.html" data-type="entity-link" >Message</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MessageServiceConfig.html" data-type="entity-link" >MessageServiceConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MessageServiceConfig-1.html" data-type="entity-link" >MessageServiceConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MetaDataField.html" data-type="entity-link" >MetaDataField</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ModelStateModel.html" data-type="entity-link" >ModelStateModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OntologySelection.html" data-type="entity-link" >OntologySelection</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OntologyTreeModel.html" data-type="entity-link" >OntologyTreeModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OntologyTreeNode.html" data-type="entity-link" >OntologyTreeNode</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OrganData.html" data-type="entity-link" >OrganData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OrganInfo.html" data-type="entity-link" >OrganInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PageStateModel.html" data-type="entity-link" >PageStateModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Person.html" data-type="entity-link" >Person</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PickInfo.html" data-type="entity-link" >PickInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PluckUniqueOptions.html" data-type="entity-link" >PluckUniqueOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProcessedNode.html" data-type="entity-link" >ProcessedNode</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ReferenceDataStateModel.html" data-type="entity-link" >ReferenceDataStateModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RegistrationStateModel.html" data-type="entity-link" >RegistrationStateModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ReviewModalData.html" data-type="entity-link" >ReviewModalData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Rotation.html" data-type="entity-link" >Rotation</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SceneStateModel.html" data-type="entity-link" >SceneStateModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SceneStateModel-1.html" data-type="entity-link" >SceneStateModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SearchableItem.html" data-type="entity-link" >SearchableItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SearchResult.html" data-type="entity-link" >SearchResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Segment.html" data-type="entity-link" >Segment</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SlicesConfig.html" data-type="entity-link" >SlicesConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SlicesConfig-1.html" data-type="entity-link" >SlicesConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SpatialEntity.html" data-type="entity-link" >SpatialEntity</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SpatialEntityJsonLd.html" data-type="entity-link" >SpatialEntityJsonLd</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SpatialObjectReference.html" data-type="entity-link" >SpatialObjectReference</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SpatialObjectReferenceJsonLd.html" data-type="entity-link" >SpatialObjectReferenceJsonLd</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SpatialPlacement.html" data-type="entity-link" >SpatialPlacement</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SpatialPlacementJsonLd.html" data-type="entity-link" >SpatialPlacementJsonLd</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SpatialSceneNode.html" data-type="entity-link" >SpatialSceneNode</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SpatialSceneNode-1.html" data-type="entity-link" >SpatialSceneNode</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StackOp.html" data-type="entity-link" >StackOp</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Tag.html" data-type="entity-link" >Tag</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TagSearchResult.html" data-type="entity-link" >TagSearchResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TissueBlockResult.html" data-type="entity-link" >TissueBlockResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TissueSectionResult.html" data-type="entity-link" >TissueSectionResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TrackingStateModel.html" data-type="entity-link" >TrackingStateModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserName.html" data-type="entity-link" >UserName</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/VisibilityItem.html" data-type="entity-link" >VisibilityItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/XYZTriplet.html" data-type="entity-link" >XYZTriplet</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/XYZTriplet-1.html" data-type="entity-link" >XYZTriplet</a>
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