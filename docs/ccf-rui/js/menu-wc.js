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
                    <a href="index.html" data-type="index-link">Application ccf-rui documentation</a>
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
                                            'data-target="#components-links-module-AppModule-4b1d3a94103525fed1e331868f1ce03d"' : 'data-target="#xs-components-links-module-AppModule-4b1d3a94103525fed1e331868f1ce03d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-4b1d3a94103525fed1e331868f1ce03d"' :
                                            'id="xs-components-links-module-AppModule-4b1d3a94103525fed1e331868f1ce03d"' }>
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
                                <a href="modules/BlockSizeInputModule.html" data-type="entity-link" >BlockSizeInputModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-BlockSizeInputModule-ff01e107d4654cf34056956741d2db37"' : 'data-target="#xs-components-links-module-BlockSizeInputModule-ff01e107d4654cf34056956741d2db37"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BlockSizeInputModule-ff01e107d4654cf34056956741d2db37"' :
                                            'id="xs-components-links-module-BlockSizeInputModule-ff01e107d4654cf34056956741d2db37"' }>
                                            <li class="link">
                                                <a href="components/BlockSizeInputComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BlockSizeInputComponent</a>
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
                                <a href="modules/HeaderModule.html" data-type="entity-link" >HeaderModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-HeaderModule-99e890e18b63d475b90c0eaab1de2576"' : 'data-target="#xs-components-links-module-HeaderModule-99e890e18b63d475b90c0eaab1de2576"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HeaderModule-99e890e18b63d475b90c0eaab1de2576"' :
                                            'id="xs-components-links-module-HeaderModule-99e890e18b63d475b90c0eaab1de2576"' }>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HeaderComponent</a>
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
                                <a href="modules/NameInputModule.html" data-type="entity-link" >NameInputModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-NameInputModule-d1046d4c968d7cba9b7ece2ab418d0a7"' : 'data-target="#xs-components-links-module-NameInputModule-d1046d4c968d7cba9b7ece2ab418d0a7"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-NameInputModule-d1046d4c968d7cba9b7ece2ab418d0a7"' :
                                            'id="xs-components-links-module-NameInputModule-d1046d4c968d7cba9b7ece2ab418d0a7"' }>
                                            <li class="link">
                                                <a href="components/NameInputComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NameInputComponent</a>
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
                                <a href="modules/ReviewButtonModule.html" data-type="entity-link" >ReviewButtonModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ReviewButtonModule-d7c14d9aadc7de409abe9471caaef798"' : 'data-target="#xs-components-links-module-ReviewButtonModule-d7c14d9aadc7de409abe9471caaef798"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ReviewButtonModule-d7c14d9aadc7de409abe9471caaef798"' :
                                            'id="xs-components-links-module-ReviewButtonModule-d7c14d9aadc7de409abe9471caaef798"' }>
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
                                <a href="modules/StageNavModule.html" data-type="entity-link" >StageNavModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-StageNavModule-feb8af1a164d72dc89e972d9d0fcf37a"' : 'data-target="#xs-components-links-module-StageNavModule-feb8af1a164d72dc89e972d9d0fcf37a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-StageNavModule-feb8af1a164d72dc89e972d9d0fcf37a"' :
                                            'id="xs-components-links-module-StageNavModule-feb8af1a164d72dc89e972d9d0fcf37a"' }>
                                            <li class="link">
                                                <a href="components/StageNavComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StageNavComponent</a>
                                            </li>
                                        </ul>
                                    </li>
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
                                    <a href="injectables/AnatomicalStructureTagState.html" data-type="entity-link" >AnatomicalStructureTagState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/IconRegistryState.html" data-type="entity-link" >IconRegistryState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MessageService.html" data-type="entity-link" >MessageService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ModelState.html" data-type="entity-link" >ModelState</a>
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
                                <a href="interfaces/AnatomicalStructureTagStateModel.html" data-type="entity-link" >AnatomicalStructureTagStateModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AppOptions.html" data-type="entity-link" >AppOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BlockSize.html" data-type="entity-link" >BlockSize</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ContentContainerChanged.html" data-type="entity-link" >ContentContainerChanged</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DefaultIconDefinition.html" data-type="entity-link" >DefaultIconDefinition</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DocumentationContent.html" data-type="entity-link" >DocumentationContent</a>
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
                                <a href="interfaces/ExtractionSet.html" data-type="entity-link" >ExtractionSet</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GlobalConfig.html" data-type="entity-link" >GlobalConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IconDefinition.html" data-type="entity-link" >IconDefinition</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Message.html" data-type="entity-link" >Message</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MessageServiceConfig.html" data-type="entity-link" >MessageServiceConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MetaDataField.html" data-type="entity-link" >MetaDataField</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ModelStateModel.html" data-type="entity-link" >ModelStateModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OrganData.html" data-type="entity-link" >OrganData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PageStateModel.html" data-type="entity-link" >PageStateModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Person.html" data-type="entity-link" >Person</a>
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
                                <a href="interfaces/SlicesConfig.html" data-type="entity-link" >SlicesConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SlicesConfig-1.html" data-type="entity-link" >SlicesConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Tag.html" data-type="entity-link" >Tag</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TagSearchResult.html" data-type="entity-link" >TagSearchResult</a>
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