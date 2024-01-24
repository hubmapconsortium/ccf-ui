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
                                            'data-bs-target="#components-links-module-AppModule-9517349e43642ed6c564c08f9683ffda3684aae2fd1878a4b0b78590608e9c2ffcf9029183eacea0cd4e9dc599250aefc16662dae595aa8544d001526583dbbe"' : 'data-bs-target="#xs-components-links-module-AppModule-9517349e43642ed6c564c08f9683ffda3684aae2fd1878a4b0b78590608e9c2ffcf9029183eacea0cd4e9dc599250aefc16662dae595aa8544d001526583dbbe"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-9517349e43642ed6c564c08f9683ffda3684aae2fd1878a4b0b78590608e9c2ffcf9029183eacea0cd4e9dc599250aefc16662dae595aa8544d001526583dbbe"' :
                                            'id="xs-components-links-module-AppModule-9517349e43642ed6c564c08f9683ffda3684aae2fd1878a4b0b78590608e9c2ffcf9029183eacea0cd4e9dc599250aefc16662dae595aa8544d001526583dbbe"' }>
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
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-BlockSizeInputModule-c8f7d29ddd3fde2228c5b16d6e982c124ffa8adcef6798e64f41966d6a08580ce22467f43455fb3ff6b6ef182206a05977f16c37ded389201490cfd147e9ee38"' : 'data-bs-target="#xs-components-links-module-BlockSizeInputModule-c8f7d29ddd3fde2228c5b16d6e982c124ffa8adcef6798e64f41966d6a08580ce22467f43455fb3ff6b6ef182206a05977f16c37ded389201490cfd147e9ee38"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BlockSizeInputModule-c8f7d29ddd3fde2228c5b16d6e982c124ffa8adcef6798e64f41966d6a08580ce22467f43455fb3ff6b6ef182206a05977f16c37ded389201490cfd147e9ee38"' :
                                            'id="xs-components-links-module-BlockSizeInputModule-c8f7d29ddd3fde2228c5b16d6e982c124ffa8adcef6798e64f41966d6a08580ce22467f43455fb3ff6b6ef182206a05977f16c37ded389201490cfd147e9ee38"' }>
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
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ContentModule-eb09457d0d2d793b6b21895812ee8a2ca6f3fd05d912d182b5128cda8ecdc14b13a0edb8cfc59faaea1f6ddc1de8e3e5e71ec0f12c0d7526dcbe624ef6ee71fc"' : 'data-bs-target="#xs-components-links-module-ContentModule-eb09457d0d2d793b6b21895812ee8a2ca6f3fd05d912d182b5128cda8ecdc14b13a0edb8cfc59faaea1f6ddc1de8e3e5e71ec0f12c0d7526dcbe624ef6ee71fc"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ContentModule-eb09457d0d2d793b6b21895812ee8a2ca6f3fd05d912d182b5128cda8ecdc14b13a0edb8cfc59faaea1f6ddc1de8e3e5e71ec0f12c0d7526dcbe624ef6ee71fc"' :
                                            'id="xs-components-links-module-ContentModule-eb09457d0d2d793b6b21895812ee8a2ca6f3fd05d912d182b5128cda8ecdc14b13a0edb8cfc59faaea1f6ddc1de8e3e5e71ec0f12c0d7526dcbe624ef6ee71fc"' }>
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
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-DetailsLabelModule-686ded830e166efa4c22ff4f2f8078eda888d1d0f4a5104251e08cdd8b9c94244e7f9b6c8fa5f042274a9c41694c23e338e842184c06e5b2ed755983f6849272"' : 'data-bs-target="#xs-components-links-module-DetailsLabelModule-686ded830e166efa4c22ff4f2f8078eda888d1d0f4a5104251e08cdd8b9c94244e7f9b6c8fa5f042274a9c41694c23e338e842184c06e5b2ed755983f6849272"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DetailsLabelModule-686ded830e166efa4c22ff4f2f8078eda888d1d0f4a5104251e08cdd8b9c94244e7f9b6c8fa5f042274a9c41694c23e338e842184c06e5b2ed755983f6849272"' :
                                            'id="xs-components-links-module-DetailsLabelModule-686ded830e166efa4c22ff4f2f8078eda888d1d0f4a5104251e08cdd8b9c94244e7f9b6c8fa5f042274a9c41694c23e338e842184c06e5b2ed755983f6849272"' }>
                                            <li class="link">
                                                <a href="components/DetailsLabelComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DetailsLabelComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DrawerModule.html" data-type="entity-link" >DrawerModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-DrawerModule-98d96546d847993304a4636395abb1874cf2803e6caf1a2690d159e96102978fef8fb38b787889da9b84b801e116310717d53ecd982e66a8ec52311f0ab1669f"' : 'data-bs-target="#xs-components-links-module-DrawerModule-98d96546d847993304a4636395abb1874cf2803e6caf1a2690d159e96102978fef8fb38b787889da9b84b801e116310717d53ecd982e66a8ec52311f0ab1669f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DrawerModule-98d96546d847993304a4636395abb1874cf2803e6caf1a2690d159e96102978fef8fb38b787889da9b84b801e116310717d53ecd982e66a8ec52311f0ab1669f"' :
                                            'id="xs-components-links-module-DrawerModule-98d96546d847993304a4636395abb1874cf2803e6caf1a2690d159e96102978fef8fb38b787889da9b84b801e116310717d53ecd982e66a8ec52311f0ab1669f"' }>
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
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ExtractionSetDropdownModule-2b25922c6b4e1de9851ddce4667a4c07c3646ee3c24a64e7dc2978055c2777c3e79191fc85e2635088c4e511c6b93c906dce2fd3138485e14f5302d3955b7ed1"' : 'data-bs-target="#xs-components-links-module-ExtractionSetDropdownModule-2b25922c6b4e1de9851ddce4667a4c07c3646ee3c24a64e7dc2978055c2777c3e79191fc85e2635088c4e511c6b93c906dce2fd3138485e14f5302d3955b7ed1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ExtractionSetDropdownModule-2b25922c6b4e1de9851ddce4667a4c07c3646ee3c24a64e7dc2978055c2777c3e79191fc85e2635088c4e511c6b93c906dce2fd3138485e14f5302d3955b7ed1"' :
                                            'id="xs-components-links-module-ExtractionSetDropdownModule-2b25922c6b4e1de9851ddce4667a4c07c3646ee3c24a64e7dc2978055c2777c3e79191fc85e2635088c4e511c6b93c906dce2fd3138485e14f5302d3955b7ed1"' }>
                                            <li class="link">
                                                <a href="components/ExtractionSetDropdownComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExtractionSetDropdownComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HeaderModule.html" data-type="entity-link" >HeaderModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-HeaderModule-ab452c4ea00c323df512af7e041ae32a7285c0bd4a1c5387a31ba4eb36fd4fab6596dda2a3683f5040b97f7d6c20d30e3efe36bce8cc2fca04ac109ca5931f98"' : 'data-bs-target="#xs-components-links-module-HeaderModule-ab452c4ea00c323df512af7e041ae32a7285c0bd4a1c5387a31ba4eb36fd4fab6596dda2a3683f5040b97f7d6c20d30e3efe36bce8cc2fca04ac109ca5931f98"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HeaderModule-ab452c4ea00c323df512af7e041ae32a7285c0bd4a1c5387a31ba4eb36fd4fab6596dda2a3683f5040b97f7d6c20d30e3efe36bce8cc2fca04ac109ca5931f98"' :
                                            'id="xs-components-links-module-HeaderModule-ab452c4ea00c323df512af7e041ae32a7285c0bd4a1c5387a31ba4eb36fd4fab6596dda2a3683f5040b97f7d6c20d30e3efe36bce8cc2fca04ac109ca5931f98"' }>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HeaderComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/JsonFileReaderModule.html" data-type="entity-link" >JsonFileReaderModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-JsonFileReaderModule-ffec96528cdfedc559fc883bb38b6bf34ff09afdf93dda0a98149a446a8a7580b10bab08ac18a186d30e18adfa754ddf65475b4aad68630fa26c81ad6e27aec4"' : 'data-bs-target="#xs-components-links-module-JsonFileReaderModule-ffec96528cdfedc559fc883bb38b6bf34ff09afdf93dda0a98149a446a8a7580b10bab08ac18a186d30e18adfa754ddf65475b4aad68630fa26c81ad6e27aec4"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-JsonFileReaderModule-ffec96528cdfedc559fc883bb38b6bf34ff09afdf93dda0a98149a446a8a7580b10bab08ac18a186d30e18adfa754ddf65475b4aad68630fa26c81ad6e27aec4"' :
                                            'id="xs-components-links-module-JsonFileReaderModule-ffec96528cdfedc559fc883bb38b6bf34ff09afdf93dda0a98149a446a8a7580b10bab08ac18a186d30e18adfa754ddf65475b4aad68630fa26c81ad6e27aec4"' }>
                                            <li class="link">
                                                <a href="components/JsonFileReaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JsonFileReaderComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LabeledSlideToggleModule.html" data-type="entity-link" >LabeledSlideToggleModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-LabeledSlideToggleModule-9261beeded6c3cdc7db84602ae54649c13facddce76af90fa1ea4121a53050d54a50587431417210f3ea1195230deda0509e524bbd9ead31f56c5539c5019d9e"' : 'data-bs-target="#xs-components-links-module-LabeledSlideToggleModule-9261beeded6c3cdc7db84602ae54649c13facddce76af90fa1ea4121a53050d54a50587431417210f3ea1195230deda0509e524bbd9ead31f56c5539c5019d9e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LabeledSlideToggleModule-9261beeded6c3cdc7db84602ae54649c13facddce76af90fa1ea4121a53050d54a50587431417210f3ea1195230deda0509e524bbd9ead31f56c5539c5019d9e"' :
                                            'id="xs-components-links-module-LabeledSlideToggleModule-9261beeded6c3cdc7db84602ae54649c13facddce76af90fa1ea4121a53050d54a50587431417210f3ea1195230deda0509e524bbd9ead31f56c5539c5019d9e"' }>
                                            <li class="link">
                                                <a href="components/LabeledSlideToggleComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LabeledSlideToggleComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LeftSidebarModule.html" data-type="entity-link" >LeftSidebarModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-LeftSidebarModule-6f70253dd97878e3bbd1e36e2cecebe27f2b2c622b235fbd1e3580978ef616cb18d5152b852d125a8ecb5521acde6bde140ff366281c6db460694ffdb04ed07d"' : 'data-bs-target="#xs-components-links-module-LeftSidebarModule-6f70253dd97878e3bbd1e36e2cecebe27f2b2c622b235fbd1e3580978ef616cb18d5152b852d125a8ecb5521acde6bde140ff366281c6db460694ffdb04ed07d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LeftSidebarModule-6f70253dd97878e3bbd1e36e2cecebe27f2b2c622b235fbd1e3580978ef616cb18d5152b852d125a8ecb5521acde6bde140ff366281c6db460694ffdb04ed07d"' :
                                            'id="xs-components-links-module-LeftSidebarModule-6f70253dd97878e3bbd1e36e2cecebe27f2b2c622b235fbd1e3580978ef616cb18d5152b852d125a8ecb5521acde6bde140ff366281c6db460694ffdb04ed07d"' }>
                                            <li class="link">
                                                <a href="components/LeftSidebarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LeftSidebarComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/NameInputModule.html" data-type="entity-link" >NameInputModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-NameInputModule-800e089a13bc550e0cbdf81c5866c6fea1fb9c78f1c8515c1f47f28566ead22baa6c7b6edea460a59abeb5620d3a6e5c10e70b0ced43ef85882fa2653c430902"' : 'data-bs-target="#xs-components-links-module-NameInputModule-800e089a13bc550e0cbdf81c5866c6fea1fb9c78f1c8515c1f47f28566ead22baa6c7b6edea460a59abeb5620d3a6e5c10e70b0ced43ef85882fa2653c430902"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-NameInputModule-800e089a13bc550e0cbdf81c5866c6fea1fb9c78f1c8515c1f47f28566ead22baa6c7b6edea460a59abeb5620d3a6e5c10e70b0ced43ef85882fa2653c430902"' :
                                            'id="xs-components-links-module-NameInputModule-800e089a13bc550e0cbdf81c5866c6fea1fb9c78f1c8515c1f47f28566ead22baa6c7b6edea460a59abeb5620d3a6e5c10e70b0ced43ef85882fa2653c430902"' }>
                                            <li class="link">
                                                <a href="components/NameInputComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NameInputComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/RegistrationContentModule.html" data-type="entity-link" >RegistrationContentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-RegistrationContentModule-46c8ecbb2092cb8a8af1279b6bd1d023d93ab3d09033c6d0aa00c3e6c428d6e78699a0c54bcc3a331ddf8af87f6cc7ecfcf4812ebf4fd789039e360d011079fc"' : 'data-bs-target="#xs-components-links-module-RegistrationContentModule-46c8ecbb2092cb8a8af1279b6bd1d023d93ab3d09033c6d0aa00c3e6c428d6e78699a0c54bcc3a331ddf8af87f6cc7ecfcf4812ebf4fd789039e360d011079fc"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RegistrationContentModule-46c8ecbb2092cb8a8af1279b6bd1d023d93ab3d09033c6d0aa00c3e6c428d6e78699a0c54bcc3a331ddf8af87f6cc7ecfcf4812ebf4fd789039e360d011079fc"' :
                                            'id="xs-components-links-module-RegistrationContentModule-46c8ecbb2092cb8a8af1279b6bd1d023d93ab3d09033c6d0aa00c3e6c428d6e78699a0c54bcc3a331ddf8af87f6cc7ecfcf4812ebf4fd789039e360d011079fc"' }>
                                            <li class="link">
                                                <a href="components/RegistrationContentComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RegistrationContentComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/RegistrationMetadataModule.html" data-type="entity-link" >RegistrationMetadataModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-RegistrationMetadataModule-c7c1be3e2db4192cfe23313f517973d478aa447b4915e606fb2d03ba71195a080af3ee79828c38c6131b2529b871639891f6cc4d7275d3d22ad4b2da24d2bfc0"' : 'data-bs-target="#xs-components-links-module-RegistrationMetadataModule-c7c1be3e2db4192cfe23313f517973d478aa447b4915e606fb2d03ba71195a080af3ee79828c38c6131b2529b871639891f6cc4d7275d3d22ad4b2da24d2bfc0"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RegistrationMetadataModule-c7c1be3e2db4192cfe23313f517973d478aa447b4915e606fb2d03ba71195a080af3ee79828c38c6131b2529b871639891f6cc4d7275d3d22ad4b2da24d2bfc0"' :
                                            'id="xs-components-links-module-RegistrationMetadataModule-c7c1be3e2db4192cfe23313f517973d478aa447b4915e606fb2d03ba71195a080af3ee79828c38c6131b2529b871639891f6cc4d7275d3d22ad4b2da24d2bfc0"' }>
                                            <li class="link">
                                                <a href="components/RegistrationMetadataComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RegistrationMetadataComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/RegistrationModalModule.html" data-type="entity-link" >RegistrationModalModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-RegistrationModalModule-aac15f4789b6dd9dcf987534e87e62ddde0d23fa700d7f7eada3f608030b2a4fe354436194fcacf81db36205957db21c2de70d882ee88bbb318de62f7e97a1c6"' : 'data-bs-target="#xs-components-links-module-RegistrationModalModule-aac15f4789b6dd9dcf987534e87e62ddde0d23fa700d7f7eada3f608030b2a4fe354436194fcacf81db36205957db21c2de70d882ee88bbb318de62f7e97a1c6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RegistrationModalModule-aac15f4789b6dd9dcf987534e87e62ddde0d23fa700d7f7eada3f608030b2a4fe354436194fcacf81db36205957db21c2de70d882ee88bbb318de62f7e97a1c6"' :
                                            'id="xs-components-links-module-RegistrationModalModule-aac15f4789b6dd9dcf987534e87e62ddde0d23fa700d7f7eada3f608030b2a4fe354436194fcacf81db36205957db21c2de70d882ee88bbb318de62f7e97a1c6"' }>
                                            <li class="link">
                                                <a href="components/RegistrationModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RegistrationModalComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ReviewButtonModule.html" data-type="entity-link" >ReviewButtonModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ReviewButtonModule-5b6353635af9a2be0c1802885a7a74660d488088f37d02279441030d5a14f565840bd87792585e7f5fedac7b047a406f994e32b70939aa80b0a1330366865d24"' : 'data-bs-target="#xs-components-links-module-ReviewButtonModule-5b6353635af9a2be0c1802885a7a74660d488088f37d02279441030d5a14f565840bd87792585e7f5fedac7b047a406f994e32b70939aa80b0a1330366865d24"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ReviewButtonModule-5b6353635af9a2be0c1802885a7a74660d488088f37d02279441030d5a14f565840bd87792585e7f5fedac7b047a406f994e32b70939aa80b0a1330366865d24"' :
                                            'id="xs-components-links-module-ReviewButtonModule-5b6353635af9a2be0c1802885a7a74660d488088f37d02279441030d5a14f565840bd87792585e7f5fedac7b047a406f994e32b70939aa80b0a1330366865d24"' }>
                                            <li class="link">
                                                <a href="components/ReviewButtonComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReviewButtonComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ReviewModalModule.html" data-type="entity-link" >ReviewModalModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ReviewModalModule-70a6c924f4d010256061f5baaa2d3a92391ad2ddd45e3b01ec90d5c1b077c5910320342ac7580a2ad077ace4dbc99dcd710730cb6311aadc035a9a374e483bfe"' : 'data-bs-target="#xs-components-links-module-ReviewModalModule-70a6c924f4d010256061f5baaa2d3a92391ad2ddd45e3b01ec90d5c1b077c5910320342ac7580a2ad077ace4dbc99dcd710730cb6311aadc035a9a374e483bfe"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ReviewModalModule-70a6c924f4d010256061f5baaa2d3a92391ad2ddd45e3b01ec90d5c1b077c5910320342ac7580a2ad077ace4dbc99dcd710730cb6311aadc035a9a374e483bfe"' :
                                            'id="xs-components-links-module-ReviewModalModule-70a6c924f4d010256061f5baaa2d3a92391ad2ddd45e3b01ec90d5c1b077c5910320342ac7580a2ad077ace4dbc99dcd710730cb6311aadc035a9a374e483bfe"' }>
                                            <li class="link">
                                                <a href="components/ReviewModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReviewModalComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/RightSidebarModule.html" data-type="entity-link" >RightSidebarModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-RightSidebarModule-1ec90a044c8f9a1eaeb8e4866c937683867ededfb0e4ed3936a6370c8b2f0effa06286bf386129235a5c9cde6d3bf596d7e11bcdfdbea20197c0a4e2277dba9a"' : 'data-bs-target="#xs-components-links-module-RightSidebarModule-1ec90a044c8f9a1eaeb8e4866c937683867ededfb0e4ed3936a6370c8b2f0effa06286bf386129235a5c9cde6d3bf596d7e11bcdfdbea20197c0a4e2277dba9a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RightSidebarModule-1ec90a044c8f9a1eaeb8e4866c937683867ededfb0e4ed3936a6370c8b2f0effa06286bf386129235a5c9cde6d3bf596d7e11bcdfdbea20197c0a4e2277dba9a"' :
                                            'id="xs-components-links-module-RightSidebarModule-1ec90a044c8f9a1eaeb8e4866c937683867ededfb0e4ed3936a6370c8b2f0effa06286bf386129235a5c9cde6d3bf596d7e11bcdfdbea20197c0a4e2277dba9a"' }>
                                            <li class="link">
                                                <a href="components/RightSidebarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RightSidebarComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/RotationSliderModule.html" data-type="entity-link" >RotationSliderModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-RotationSliderModule-9ea4608b9aa6d0d1682b620d58b07f0570c0e9d8055980125018d3c634a19929f076ee666b0c48fac5673283665ef153fc6b338f3a74f337ffba6d423efb1978"' : 'data-bs-target="#xs-components-links-module-RotationSliderModule-9ea4608b9aa6d0d1682b620d58b07f0570c0e9d8055980125018d3c634a19929f076ee666b0c48fac5673283665ef153fc6b338f3a74f337ffba6d423efb1978"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RotationSliderModule-9ea4608b9aa6d0d1682b620d58b07f0570c0e9d8055980125018d3c634a19929f076ee666b0c48fac5673283665ef153fc6b338f3a74f337ffba6d423efb1978"' :
                                            'id="xs-components-links-module-RotationSliderModule-9ea4608b9aa6d0d1682b620d58b07f0570c0e9d8055980125018d3c634a19929f076ee666b0c48fac5673283665ef153fc6b338f3a74f337ffba6d423efb1978"' }>
                                            <li class="link">
                                                <a href="components/RotationSliderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RotationSliderComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SlicesInputModule.html" data-type="entity-link" >SlicesInputModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SlicesInputModule-60b6ae19162f19bdbb6d8d724e26591232b71a9a0275a56dfa3f457e3998927ac12b94c62336cfd841ae0a2e2c0da91985291abbdd434ac43ded24cfa6b466ce"' : 'data-bs-target="#xs-components-links-module-SlicesInputModule-60b6ae19162f19bdbb6d8d724e26591232b71a9a0275a56dfa3f457e3998927ac12b94c62336cfd841ae0a2e2c0da91985291abbdd434ac43ded24cfa6b466ce"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SlicesInputModule-60b6ae19162f19bdbb6d8d724e26591232b71a9a0275a56dfa3f457e3998927ac12b94c62336cfd841ae0a2e2c0da91985291abbdd434ac43ded24cfa6b466ce"' :
                                            'id="xs-components-links-module-SlicesInputModule-60b6ae19162f19bdbb6d8d724e26591232b71a9a0275a56dfa3f457e3998927ac12b94c62336cfd841ae0a2e2c0da91985291abbdd434ac43ded24cfa6b466ce"' }>
                                            <li class="link">
                                                <a href="components/SlicesInputComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SlicesInputComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/StageNavModule.html" data-type="entity-link" >StageNavModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-StageNavModule-f35824befdd798927b716414116265be627772906f6cd020160fa185d5cbe218a793b416179bf3fb5da9a946710ccda53eab0392d92eb4f57e11911b3d4f3a86"' : 'data-bs-target="#xs-components-links-module-StageNavModule-f35824befdd798927b716414116265be627772906f6cd020160fa185d5cbe218a793b416179bf3fb5da9a946710ccda53eab0392d92eb4f57e11911b3d4f3a86"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-StageNavModule-f35824befdd798927b716414116265be627772906f6cd020160fa185d5cbe218a793b416179bf3fb5da9a946710ccda53eab0392d92eb4f57e11911b3d4f3a86"' :
                                            'id="xs-components-links-module-StageNavModule-f35824befdd798927b716414116265be627772906f6cd020160fa185d5cbe218a793b416179bf3fb5da9a946710ccda53eab0392d92eb4f57e11911b3d4f3a86"' }>
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
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-TagListModule-d5d7d1750eb4b97ae4569acf6be2050d820c7f7ba6225ccdaddb9dc3129f110b05cd5432ce1db2db7806b53b17953aaa2298a2e2bc3e9e661a6217f13b210803"' : 'data-bs-target="#xs-components-links-module-TagListModule-d5d7d1750eb4b97ae4569acf6be2050d820c7f7ba6225ccdaddb9dc3129f110b05cd5432ce1db2db7806b53b17953aaa2298a2e2bc3e9e661a6217f13b210803"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TagListModule-d5d7d1750eb4b97ae4569acf6be2050d820c7f7ba6225ccdaddb9dc3129f110b05cd5432ce1db2db7806b53b17953aaa2298a2e2bc3e9e661a6217f13b210803"' :
                                            'id="xs-components-links-module-TagListModule-d5d7d1750eb4b97ae4569acf6be2050d820c7f7ba6225ccdaddb9dc3129f110b05cd5432ce1db2db7806b53b17953aaa2298a2e2bc3e9e661a6217f13b210803"' }>
                                            <li class="link">
                                                <a href="components/TagListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TagListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TagSearchModule.html" data-type="entity-link" >TagSearchModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-TagSearchModule-ba7847850926660b4e6adcbeeaeea479829f2e06198270439edef4a08cfb78a1cbd7e836755ca4294b38445d1fb1077e4e84e6ea2d9b1c16aaa4573c33803b06"' : 'data-bs-target="#xs-components-links-module-TagSearchModule-ba7847850926660b4e6adcbeeaeea479829f2e06198270439edef4a08cfb78a1cbd7e836755ca4294b38445d1fb1077e4e84e6ea2d9b1c16aaa4573c33803b06"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TagSearchModule-ba7847850926660b4e6adcbeeaeea479829f2e06198270439edef4a08cfb78a1cbd7e836755ca4294b38445d1fb1077e4e84e6ea2d9b1c16aaa4573c33803b06"' :
                                            'id="xs-components-links-module-TagSearchModule-ba7847850926660b4e6adcbeeaeea479829f2e06198270439edef4a08cfb78a1cbd7e836755ca4294b38445d1fb1077e4e84e6ea2d9b1c16aaa4573c33803b06"' }>
                                            <li class="link">
                                                <a href="components/TagSearchComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TagSearchComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ThemingModule.html" data-type="entity-link" >ThemingModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ThemingModule-c2f0fa4d5dae0193be50097ac19092abed6370b99c7d09137799ddd7ba7c5a32c11a950d9b294d46d289fc98a05974d13cbd1e59d180036f47ff7321b1f45b56"' : 'data-bs-target="#xs-injectables-links-module-ThemingModule-c2f0fa4d5dae0193be50097ac19092abed6370b99c7d09137799ddd7ba7c5a32c11a950d9b294d46d289fc98a05974d13cbd1e59d180036f47ff7321b1f45b56"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ThemingModule-c2f0fa4d5dae0193be50097ac19092abed6370b99c7d09137799ddd7ba7c5a32c11a950d9b294d46d289fc98a05974d13cbd1e59d180036f47ff7321b1f45b56"' :
                                        'id="xs-injectables-links-module-ThemingModule-c2f0fa4d5dae0193be50097ac19092abed6370b99c7d09137799ddd7ba7c5a32c11a950d9b294d46d289fc98a05974d13cbd1e59d180036f47ff7321b1f45b56"' }>
                                        <li class="link">
                                            <a href="injectables/ThemingService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ThemingService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/VideoModalLauncherModule.html" data-type="entity-link" >VideoModalLauncherModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-VideoModalLauncherModule-89e732544c9881a8f42716660ffb43037296f21b40152b6b374e8400575682c2d30fdc30bce4c66493f5b9c5f150db3105a6b3334b1abb0e5ada178bc4dc48f4"' : 'data-bs-target="#xs-components-links-module-VideoModalLauncherModule-89e732544c9881a8f42716660ffb43037296f21b40152b6b374e8400575682c2d30fdc30bce4c66493f5b9c5f150db3105a6b3334b1abb0e5ada178bc4dc48f4"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-VideoModalLauncherModule-89e732544c9881a8f42716660ffb43037296f21b40152b6b374e8400575682c2d30fdc30bce4c66493f5b9c5f150db3105a6b3334b1abb0e5ada178bc4dc48f4"' :
                                            'id="xs-components-links-module-VideoModalLauncherModule-89e732544c9881a8f42716660ffb43037296f21b40152b6b374e8400575682c2d30fdc30bce4c66493f5b9c5f150db3105a6b3334b1abb0e5ada178bc4dc48f4"' }>
                                            <li class="link">
                                                <a href="components/VideoModalLauncherComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VideoModalLauncherComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/VideoModalModule.html" data-type="entity-link" >VideoModalModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-VideoModalModule-e4a8bf451b8afb35ffb200de35d58e1326b80b6f344c4b1e612295bebfad6661b92459ccc546f253f36ec69ea1e1a3e6949fc320944d6a715d1134983bb9ff40"' : 'data-bs-target="#xs-components-links-module-VideoModalModule-e4a8bf451b8afb35ffb200de35d58e1326b80b6f344c4b1e612295bebfad6661b92459ccc546f253f36ec69ea1e1a3e6949fc320944d6a715d1134983bb9ff40"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-VideoModalModule-e4a8bf451b8afb35ffb200de35d58e1326b80b6f344c4b1e612295bebfad6661b92459ccc546f253f36ec69ea1e1a3e6949fc320944d6a715d1134983bb9ff40"' :
                                            'id="xs-components-links-module-VideoModalModule-e4a8bf451b8afb35ffb200de35d58e1326b80b6f344c4b1e612295bebfad6661b92459ccc546f253f36ec69ea1e1a3e6949fc320944d6a715d1134983bb9ff40"' }>
                                            <li class="link">
                                                <a href="components/VideoModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VideoModalComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/VisibilityMenuModule.html" data-type="entity-link" >VisibilityMenuModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-VisibilityMenuModule-143bbdebc604ec062bc47b85fab4ab5fcdc76d6e695454cdb52b745ad5a591a2cf680c6b6b46e56682512159788398803c5e8e62bc9dac50decfd00ce7f54714"' : 'data-bs-target="#xs-components-links-module-VisibilityMenuModule-143bbdebc604ec062bc47b85fab4ab5fcdc76d6e695454cdb52b745ad5a591a2cf680c6b6b46e56682512159788398803c5e8e62bc9dac50decfd00ce7f54714"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-VisibilityMenuModule-143bbdebc604ec062bc47b85fab4ab5fcdc76d6e695454cdb52b745ad5a591a2cf680c6b6b46e56682512159788398803c5e8e62bc9dac50decfd00ce7f54714"' :
                                            'id="xs-components-links-module-VisibilityMenuModule-143bbdebc604ec062bc47b85fab4ab5fcdc76d6e695454cdb52b745ad5a591a2cf680c6b6b46e56682512159788398803c5e8e62bc9dac50decfd00ce7f54714"' }>
                                            <li class="link">
                                                <a href="components/VisibilityMenuComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VisibilityMenuComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/VisibilityToggleModule.html" data-type="entity-link" >VisibilityToggleModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-VisibilityToggleModule-4176e196b9e5fcc30c0d36f8fbd806af62da0f46d9375f9ca6d3d95a82e148f7582d95c147964439e98033c4ceabb0be325f39e1f98f945a4a58c5cd657bd06d"' : 'data-bs-target="#xs-components-links-module-VisibilityToggleModule-4176e196b9e5fcc30c0d36f8fbd806af62da0f46d9375f9ca6d3d95a82e148f7582d95c147964439e98033c4ceabb0be325f39e1f98f945a4a58c5cd657bd06d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-VisibilityToggleModule-4176e196b9e5fcc30c0d36f8fbd806af62da0f46d9375f9ca6d3d95a82e148f7582d95c147964439e98033c4ceabb0be325f39e1f98f945a4a58c5cd657bd06d"' :
                                            'id="xs-components-links-module-VisibilityToggleModule-4176e196b9e5fcc30c0d36f8fbd806af62da0f46d9375f9ca6d3d95a82e148f7582d95c147964439e98033c4ceabb0be325f39e1f98f945a4a58c5cd657bd06d"' }>
                                            <li class="link">
                                                <a href="components/VisibilityToggleComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VisibilityToggleComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#components-links"' :
                            'data-bs-target="#xs-components-links"' }>
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
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
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
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
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
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
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
                                <a href="interfaces/OrganConfig.html" data-type="entity-link" >OrganConfig</a>
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