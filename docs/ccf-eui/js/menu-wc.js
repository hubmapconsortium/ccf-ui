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
                                            'data-bs-target="#components-links-module-AppModule-60d2e3b127b01fc7e8d4bff63b3f17b2924191007a996b5ce0de2223c2e590666f1ca5c695b248b27fc4b7dd59ce7ed3594578353ee7ef3a5022ab312166d738"' : 'data-bs-target="#xs-components-links-module-AppModule-60d2e3b127b01fc7e8d4bff63b3f17b2924191007a996b5ce0de2223c2e590666f1ca5c695b248b27fc4b7dd59ce7ed3594578353ee7ef3a5022ab312166d738"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-60d2e3b127b01fc7e8d4bff63b3f17b2924191007a996b5ce0de2223c2e590666f1ca5c695b248b27fc4b7dd59ce7ed3594578353ee7ef3a5022ab312166d738"' :
                                            'id="xs-components-links-module-AppModule-60d2e3b127b01fc7e8d4bff63b3f17b2924191007a996b5ce0de2223c2e590666f1ca5c695b248b27fc4b7dd59ce7ed3594578353ee7ef3a5022ab312166d738"' }>
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
                                <a href="modules/ButtonToggleModule.html" data-type="entity-link" >ButtonToggleModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ButtonToggleModule-826524a90928256fe177c17dc3ae3e140ae376b10e94542dfc37f3a481d5b9ca3596a4c8497bf7d044b11961a77e43b930d9d62d9dde901012a83c852a44895d"' : 'data-bs-target="#xs-components-links-module-ButtonToggleModule-826524a90928256fe177c17dc3ae3e140ae376b10e94542dfc37f3a481d5b9ca3596a4c8497bf7d044b11961a77e43b930d9d62d9dde901012a83c852a44895d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ButtonToggleModule-826524a90928256fe177c17dc3ae3e140ae376b10e94542dfc37f3a481d5b9ca3596a4c8497bf7d044b11961a77e43b930d9d62d9dde901012a83c852a44895d"' :
                                            'id="xs-components-links-module-ButtonToggleModule-826524a90928256fe177c17dc3ae3e140ae376b10e94542dfc37f3a481d5b9ca3596a4c8497bf7d044b11961a77e43b930d9d62d9dde901012a83c852a44895d"' }>
                                            <li class="link">
                                                <a href="components/ButtonToggleComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ButtonToggleComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CheckboxModule.html" data-type="entity-link" >CheckboxModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-CheckboxModule-f8bdcc0c77c62d730e5b58555ea4e58c8ea0fe92f5b51278b66994e6401a3061bf161082971a5e20b887b07461883e47ff94872e23cf59d0890fc9f9ef3c4a26"' : 'data-bs-target="#xs-components-links-module-CheckboxModule-f8bdcc0c77c62d730e5b58555ea4e58c8ea0fe92f5b51278b66994e6401a3061bf161082971a5e20b887b07461883e47ff94872e23cf59d0890fc9f9ef3c4a26"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CheckboxModule-f8bdcc0c77c62d730e5b58555ea4e58c8ea0fe92f5b51278b66994e6401a3061bf161082971a5e20b887b07461883e47ff94872e23cf59d0890fc9f9ef3c4a26"' :
                                            'id="xs-components-links-module-CheckboxModule-f8bdcc0c77c62d730e5b58555ea4e58c8ea0fe92f5b51278b66994e6401a3061bf161082971a5e20b887b07461883e47ff94872e23cf59d0890fc9f9ef3c4a26"' }>
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
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-DonorCardModule-5d7f222f5672fcf58443a27988872f0a5d124a8ab0f428913da7fa71bb7942b1aad857a2820686005651cd5a2a799692fc79759e8f40431e77cd7430926a4068"' : 'data-bs-target="#xs-components-links-module-DonorCardModule-5d7f222f5672fcf58443a27988872f0a5d124a8ab0f428913da7fa71bb7942b1aad857a2820686005651cd5a2a799692fc79759e8f40431e77cd7430926a4068"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DonorCardModule-5d7f222f5672fcf58443a27988872f0a5d124a8ab0f428913da7fa71bb7942b1aad857a2820686005651cd5a2a799692fc79759e8f40431e77cd7430926a4068"' :
                                            'id="xs-components-links-module-DonorCardModule-5d7f222f5672fcf58443a27988872f0a5d124a8ab0f428913da7fa71bb7942b1aad857a2820686005651cd5a2a799692fc79759e8f40431e77cd7430926a4068"' }>
                                            <li class="link">
                                                <a href="components/DonorCardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DonorCardComponent</a>
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
                                <a href="modules/DropdownModule.html" data-type="entity-link" >DropdownModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-DropdownModule-9b01a0a7b555f78e70e87791c3439da38a33eebf5675f57f005683cbaf012a42f085ebcc0274d2ec488249ccd7de0ec9025e4b068a0fdd0b78320e0796ea50cf"' : 'data-bs-target="#xs-components-links-module-DropdownModule-9b01a0a7b555f78e70e87791c3439da38a33eebf5675f57f005683cbaf012a42f085ebcc0274d2ec488249ccd7de0ec9025e4b068a0fdd0b78320e0796ea50cf"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DropdownModule-9b01a0a7b555f78e70e87791c3439da38a33eebf5675f57f005683cbaf012a42f085ebcc0274d2ec488249ccd7de0ec9025e4b068a0fdd0b78320e0796ea50cf"' :
                                            'id="xs-components-links-module-DropdownModule-9b01a0a7b555f78e70e87791c3439da38a33eebf5675f57f005683cbaf012a42f085ebcc0274d2ec488249ccd7de0ec9025e4b068a0fdd0b78320e0796ea50cf"' }>
                                            <li class="link">
                                                <a href="components/DropdownComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DropdownComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DualSliderModule.html" data-type="entity-link" >DualSliderModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-DualSliderModule-75f683a7124b2e5fb3786e9ad6d116b88686b6e372c97078a80ef2de473322e0d4fa1c8c2027e5ab795d52181382d46d16735e5b1cafede5065ade7916be661a"' : 'data-bs-target="#xs-components-links-module-DualSliderModule-75f683a7124b2e5fb3786e9ad6d116b88686b6e372c97078a80ef2de473322e0d4fa1c8c2027e5ab795d52181382d46d16735e5b1cafede5065ade7916be661a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DualSliderModule-75f683a7124b2e5fb3786e9ad6d116b88686b6e372c97078a80ef2de473322e0d4fa1c8c2027e5ab795d52181382d46d16735e5b1cafede5065ade7916be661a"' :
                                            'id="xs-components-links-module-DualSliderModule-75f683a7124b2e5fb3786e9ad6d116b88686b6e372c97078a80ef2de473322e0d4fa1c8c2027e5ab795d52181382d46d16735e5b1cafede5065ade7916be661a"' }>
                                            <li class="link">
                                                <a href="components/DualSliderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DualSliderComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/FiltersContentModule.html" data-type="entity-link" >FiltersContentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-FiltersContentModule-ac71ca89e05924a511e17a66a4900f5e133bb41c5bc8efe507ab39bc67a665b6654ff84c7bfd9c5737c439fb6b193d4cea40fc93b2ad6b5cc31b62a45988e303"' : 'data-bs-target="#xs-components-links-module-FiltersContentModule-ac71ca89e05924a511e17a66a4900f5e133bb41c5bc8efe507ab39bc67a665b6654ff84c7bfd9c5737c439fb6b193d4cea40fc93b2ad6b5cc31b62a45988e303"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-FiltersContentModule-ac71ca89e05924a511e17a66a4900f5e133bb41c5bc8efe507ab39bc67a665b6654ff84c7bfd9c5737c439fb6b193d4cea40fc93b2ad6b5cc31b62a45988e303"' :
                                            'id="xs-components-links-module-FiltersContentModule-ac71ca89e05924a511e17a66a4900f5e133bb41c5bc8efe507ab39bc67a665b6654ff84c7bfd9c5737c439fb6b193d4cea40fc93b2ad6b5cc31b62a45988e303"' }>
                                            <li class="link">
                                                <a href="components/FiltersContentComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FiltersContentComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/FiltersPopoverModule.html" data-type="entity-link" >FiltersPopoverModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-FiltersPopoverModule-0300237d7f04762b6684e3d70fa2879a5dd80d5381d52ee9c3a2f0009f3a1cd3d0fc2f80760a3af395e894449f75672cbf4a72b49d3c97440dce14576907236c"' : 'data-bs-target="#xs-components-links-module-FiltersPopoverModule-0300237d7f04762b6684e3d70fa2879a5dd80d5381d52ee9c3a2f0009f3a1cd3d0fc2f80760a3af395e894449f75672cbf4a72b49d3c97440dce14576907236c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-FiltersPopoverModule-0300237d7f04762b6684e3d70fa2879a5dd80d5381d52ee9c3a2f0009f3a1cd3d0fc2f80760a3af395e894449f75672cbf4a72b49d3c97440dce14576907236c"' :
                                            'id="xs-components-links-module-FiltersPopoverModule-0300237d7f04762b6684e3d70fa2879a5dd80d5381d52ee9c3a2f0009f3a1cd3d0fc2f80760a3af395e894449f75672cbf4a72b49d3c97440dce14576907236c"' }>
                                            <li class="link">
                                                <a href="components/FiltersPopoverComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FiltersPopoverComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HeaderModule.html" data-type="entity-link" >HeaderModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-HeaderModule-854e5ee2521f594b39dd7fab1e48251b0479ff042bf877ec1acea9b7ffd8c05216ec3de5e643406b5a7a6276f8f928e14d0a97870c6e1bc9405821293acfa17f"' : 'data-bs-target="#xs-components-links-module-HeaderModule-854e5ee2521f594b39dd7fab1e48251b0479ff042bf877ec1acea9b7ffd8c05216ec3de5e643406b5a7a6276f8f928e14d0a97870c6e1bc9405821293acfa17f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HeaderModule-854e5ee2521f594b39dd7fab1e48251b0479ff042bf877ec1acea9b7ffd8c05216ec3de5e643406b5a7a6276f8f928e14d0a97870c6e1bc9405821293acfa17f"' :
                                            'id="xs-components-links-module-HeaderModule-854e5ee2521f594b39dd7fab1e48251b0479ff042bf877ec1acea9b7ffd8c05216ec3de5e643406b5a7a6276f8f928e14d0a97870c6e1bc9405821293acfa17f"' }>
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
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-OntologySearchModule-018217920c030cae4ac78b7c41bfa4f57e01e5058653b187e8d82982bd4c101fe1021f063931ec97e6c0cb55c1e560f13520efb858fcaf7d3c7c839886b35bed"' : 'data-bs-target="#xs-components-links-module-OntologySearchModule-018217920c030cae4ac78b7c41bfa4f57e01e5058653b187e8d82982bd4c101fe1021f063931ec97e6c0cb55c1e560f13520efb858fcaf7d3c7c839886b35bed"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-OntologySearchModule-018217920c030cae4ac78b7c41bfa4f57e01e5058653b187e8d82982bd4c101fe1021f063931ec97e6c0cb55c1e560f13520efb858fcaf7d3c7c839886b35bed"' :
                                            'id="xs-components-links-module-OntologySearchModule-018217920c030cae4ac78b7c41bfa4f57e01e5058653b187e8d82982bd4c101fe1021f063931ec97e6c0cb55c1e560f13520efb858fcaf7d3c7c839886b35bed"' }>
                                            <li class="link">
                                                <a href="components/OntologySearchComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OntologySearchComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/OntologySelectionModule.html" data-type="entity-link" >OntologySelectionModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-OntologySelectionModule-397a1305adacba391a69c137a03a479aaf07ea6504c41a89cb7cb32c403014649b08a27d65e10ae29dd8e8270d7a9b5a7979136216b06a7cf5412dd6c540e3f9"' : 'data-bs-target="#xs-components-links-module-OntologySelectionModule-397a1305adacba391a69c137a03a479aaf07ea6504c41a89cb7cb32c403014649b08a27d65e10ae29dd8e8270d7a9b5a7979136216b06a7cf5412dd6c540e3f9"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-OntologySelectionModule-397a1305adacba391a69c137a03a479aaf07ea6504c41a89cb7cb32c403014649b08a27d65e10ae29dd8e8270d7a9b5a7979136216b06a7cf5412dd6c540e3f9"' :
                                            'id="xs-components-links-module-OntologySelectionModule-397a1305adacba391a69c137a03a479aaf07ea6504c41a89cb7cb32c403014649b08a27d65e10ae29dd8e8270d7a9b5a7979136216b06a7cf5412dd6c540e3f9"' }>
                                            <li class="link">
                                                <a href="components/OntologySelectionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OntologySelectionComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/OntologyTreeModule.html" data-type="entity-link" >OntologyTreeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-OntologyTreeModule-bb99780e49a3eef08fb38dbfd02f960a8ff5744f8fbd9e24305334bad8023d179fdc29d3aa54b9c3579cfe9dae0ff5179ab6135035e8db938530833e0e18dc76"' : 'data-bs-target="#xs-components-links-module-OntologyTreeModule-bb99780e49a3eef08fb38dbfd02f960a8ff5744f8fbd9e24305334bad8023d179fdc29d3aa54b9c3579cfe9dae0ff5179ab6135035e8db938530833e0e18dc76"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-OntologyTreeModule-bb99780e49a3eef08fb38dbfd02f960a8ff5744f8fbd9e24305334bad8023d179fdc29d3aa54b9c3579cfe9dae0ff5179ab6135035e8db938530833e0e18dc76"' :
                                            'id="xs-components-links-module-OntologyTreeModule-bb99780e49a3eef08fb38dbfd02f960a8ff5744f8fbd9e24305334bad8023d179fdc29d3aa54b9c3579cfe9dae0ff5179ab6135035e8db938530833e0e18dc76"' }>
                                            <li class="link">
                                                <a href="components/OntologyTreeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OntologyTreeComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ResultsBrowserModule.html" data-type="entity-link" >ResultsBrowserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ResultsBrowserModule-e52544282ab73275482612dfafc6fa8e8974d6b1e2116a2e48ae6000877eff40dbcf0528acb1705ce66f311a709c9caee4a13be3bdde82a416458d7250a5066e"' : 'data-bs-target="#xs-components-links-module-ResultsBrowserModule-e52544282ab73275482612dfafc6fa8e8974d6b1e2116a2e48ae6000877eff40dbcf0528acb1705ce66f311a709c9caee4a13be3bdde82a416458d7250a5066e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ResultsBrowserModule-e52544282ab73275482612dfafc6fa8e8974d6b1e2116a2e48ae6000877eff40dbcf0528acb1705ce66f311a709c9caee4a13be3bdde82a416458d7250a5066e"' :
                                            'id="xs-components-links-module-ResultsBrowserModule-e52544282ab73275482612dfafc6fa8e8974d6b1e2116a2e48ae6000877eff40dbcf0528acb1705ce66f311a709c9caee4a13be3bdde82a416458d7250a5066e"' }>
                                            <li class="link">
                                                <a href="components/ResultsBrowserComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResultsBrowserComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/RunSpatialSearchModule.html" data-type="entity-link" >RunSpatialSearchModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-RunSpatialSearchModule-44a881591dbaef050077fe1e86964211baff38bd0eb9fa8abb7344ed1b8fdc1a261ee152014ddeb9e5bcc57e7da2b82eb42e4e21bfff265c537c63bf2493ce5f"' : 'data-bs-target="#xs-components-links-module-RunSpatialSearchModule-44a881591dbaef050077fe1e86964211baff38bd0eb9fa8abb7344ed1b8fdc1a261ee152014ddeb9e5bcc57e7da2b82eb42e4e21bfff265c537c63bf2493ce5f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RunSpatialSearchModule-44a881591dbaef050077fe1e86964211baff38bd0eb9fa8abb7344ed1b8fdc1a261ee152014ddeb9e5bcc57e7da2b82eb42e4e21bfff265c537c63bf2493ce5f"' :
                                            'id="xs-components-links-module-RunSpatialSearchModule-44a881591dbaef050077fe1e86964211baff38bd0eb9fa8abb7344ed1b8fdc1a261ee152014ddeb9e5bcc57e7da2b82eb42e4e21bfff265c537c63bf2493ce5f"' }>
                                            <li class="link">
                                                <a href="components/RunSpatialSearchComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RunSpatialSearchComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SpatialSearchConfigBehaviorModule.html" data-type="entity-link" >SpatialSearchConfigBehaviorModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SpatialSearchConfigBehaviorModule-257da96133377ce70032035ad2b9226d7f0f8cdf229e18094846165b15fdb24959a447f162be8615d2ee7c52eb7db2229cfaac1da388fdbd5494cda0b089bf8f"' : 'data-bs-target="#xs-components-links-module-SpatialSearchConfigBehaviorModule-257da96133377ce70032035ad2b9226d7f0f8cdf229e18094846165b15fdb24959a447f162be8615d2ee7c52eb7db2229cfaac1da388fdbd5494cda0b089bf8f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SpatialSearchConfigBehaviorModule-257da96133377ce70032035ad2b9226d7f0f8cdf229e18094846165b15fdb24959a447f162be8615d2ee7c52eb7db2229cfaac1da388fdbd5494cda0b089bf8f"' :
                                            'id="xs-components-links-module-SpatialSearchConfigBehaviorModule-257da96133377ce70032035ad2b9226d7f0f8cdf229e18094846165b15fdb24959a447f162be8615d2ee7c52eb7db2229cfaac1da388fdbd5494cda0b089bf8f"' }>
                                            <li class="link">
                                                <a href="components/SpatialSearchConfigBehaviorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SpatialSearchConfigBehaviorComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SpatialSearchConfigModule.html" data-type="entity-link" >SpatialSearchConfigModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SpatialSearchConfigModule-04e053d7191d7b5b26d752416347ee8eca663dedda4b6a4f10228e9e36a972d7b680e5c1107fb0014105038ac2ed3f4ca2dd4be5d4faab8f6a34aaf899b9dd62"' : 'data-bs-target="#xs-components-links-module-SpatialSearchConfigModule-04e053d7191d7b5b26d752416347ee8eca663dedda4b6a4f10228e9e36a972d7b680e5c1107fb0014105038ac2ed3f4ca2dd4be5d4faab8f6a34aaf899b9dd62"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SpatialSearchConfigModule-04e053d7191d7b5b26d752416347ee8eca663dedda4b6a4f10228e9e36a972d7b680e5c1107fb0014105038ac2ed3f4ca2dd4be5d4faab8f6a34aaf899b9dd62"' :
                                            'id="xs-components-links-module-SpatialSearchConfigModule-04e053d7191d7b5b26d752416347ee8eca663dedda4b6a4f10228e9e36a972d7b680e5c1107fb0014105038ac2ed3f4ca2dd4be5d4faab8f6a34aaf899b9dd62"' }>
                                            <li class="link">
                                                <a href="components/SpatialSearchConfigComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SpatialSearchConfigComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SpatialSearchUiBehaviorModule.html" data-type="entity-link" >SpatialSearchUiBehaviorModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SpatialSearchUiBehaviorModule-4e008247beb5aebefe481340be1cc86d222c8cea474483aef62c1c54914d1f627cb369b26220263131a5f4add50a2a9756c201f8edabb78ee29c6dbd5fa6ce86"' : 'data-bs-target="#xs-components-links-module-SpatialSearchUiBehaviorModule-4e008247beb5aebefe481340be1cc86d222c8cea474483aef62c1c54914d1f627cb369b26220263131a5f4add50a2a9756c201f8edabb78ee29c6dbd5fa6ce86"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SpatialSearchUiBehaviorModule-4e008247beb5aebefe481340be1cc86d222c8cea474483aef62c1c54914d1f627cb369b26220263131a5f4add50a2a9756c201f8edabb78ee29c6dbd5fa6ce86"' :
                                            'id="xs-components-links-module-SpatialSearchUiBehaviorModule-4e008247beb5aebefe481340be1cc86d222c8cea474483aef62c1c54914d1f627cb369b26220263131a5f4add50a2a9756c201f8edabb78ee29c6dbd5fa6ce86"' }>
                                            <li class="link">
                                                <a href="components/SpatialSearchUiBehaviorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SpatialSearchUiBehaviorComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SpatialSearchUiModule.html" data-type="entity-link" >SpatialSearchUiModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SpatialSearchUiModule-aad1c51310b6cb3d8b31dfcaed06edb740e3807f684d7177aca96c4922c2a48571a2aa4264bba497be9addea7548c7f8f5136c574c7cf3fdc725378ec1668810"' : 'data-bs-target="#xs-components-links-module-SpatialSearchUiModule-aad1c51310b6cb3d8b31dfcaed06edb740e3807f684d7177aca96c4922c2a48571a2aa4264bba497be9addea7548c7f8f5136c574c7cf3fdc725378ec1668810"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SpatialSearchUiModule-aad1c51310b6cb3d8b31dfcaed06edb740e3807f684d7177aca96c4922c2a48571a2aa4264bba497be9addea7548c7f8f5136c574c7cf3fdc725378ec1668810"' :
                                            'id="xs-components-links-module-SpatialSearchUiModule-aad1c51310b6cb3d8b31dfcaed06edb740e3807f684d7177aca96c4922c2a48571a2aa4264bba497be9addea7548c7f8f5136c574c7cf3fdc725378ec1668810"' }>
                                            <li class="link">
                                                <a href="components/SpatialSearchUiComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SpatialSearchUiComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SpinnerOverlayModule.html" data-type="entity-link" >SpinnerOverlayModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SpinnerOverlayModule-3e11c2b043f70e188a64042ae346f8689ddf612cf9d94418736132365cca211ca3f008532ec2dc68a05d61738a56713fd0e55b265f955e82221c4e2deed2fada"' : 'data-bs-target="#xs-components-links-module-SpinnerOverlayModule-3e11c2b043f70e188a64042ae346f8689ddf612cf9d94418736132365cca211ca3f008532ec2dc68a05d61738a56713fd0e55b265f955e82221c4e2deed2fada"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SpinnerOverlayModule-3e11c2b043f70e188a64042ae346f8689ddf612cf9d94418736132365cca211ca3f008532ec2dc68a05d61738a56713fd0e55b265f955e82221c4e2deed2fada"' :
                                            'id="xs-components-links-module-SpinnerOverlayModule-3e11c2b043f70e188a64042ae346f8689ddf612cf9d94418736132365cca211ca3f008532ec2dc68a05d61738a56713fd0e55b265f955e82221c4e2deed2fada"' }>
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
                                <a href="modules/TermOccurrenceListModule.html" data-type="entity-link" >TermOccurrenceListModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-TermOccurrenceListModule-0e3f85cb613619b630aa900a89e2f18e227a07e4a384b633cccd2abeb0a77aba61878740f791e238b4517844e9cfac8ab5c27910759b1e1a48a57cee06259307"' : 'data-bs-target="#xs-components-links-module-TermOccurrenceListModule-0e3f85cb613619b630aa900a89e2f18e227a07e4a384b633cccd2abeb0a77aba61878740f791e238b4517844e9cfac8ab5c27910759b1e1a48a57cee06259307"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TermOccurrenceListModule-0e3f85cb613619b630aa900a89e2f18e227a07e4a384b633cccd2abeb0a77aba61878740f791e238b4517844e9cfac8ab5c27910759b1e1a48a57cee06259307"' :
                                            'id="xs-components-links-module-TermOccurrenceListModule-0e3f85cb613619b630aa900a89e2f18e227a07e4a384b633cccd2abeb0a77aba61878740f791e238b4517844e9cfac8ab5c27910759b1e1a48a57cee06259307"' }>
                                            <li class="link">
                                                <a href="components/TermOccurrenceListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TermOccurrenceListComponent</a>
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
                                <a href="modules/ThumbnailCarouselModule.html" data-type="entity-link" >ThumbnailCarouselModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ThumbnailCarouselModule-b8c2b4e9b28d8d1e934c8f33d6bca89d7ab0b79387211f81aef570e37e53abde71fd5bf01e6dc3e1d21ce62b3765fb45e549ef6ca5c84ad0ff4906376ce0bad7"' : 'data-bs-target="#xs-components-links-module-ThumbnailCarouselModule-b8c2b4e9b28d8d1e934c8f33d6bca89d7ab0b79387211f81aef570e37e53abde71fd5bf01e6dc3e1d21ce62b3765fb45e549ef6ca5c84ad0ff4906376ce0bad7"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ThumbnailCarouselModule-b8c2b4e9b28d8d1e934c8f33d6bca89d7ab0b79387211f81aef570e37e53abde71fd5bf01e6dc3e1d21ce62b3765fb45e549ef6ca5c84ad0ff4906376ce0bad7"' :
                                            'id="xs-components-links-module-ThumbnailCarouselModule-b8c2b4e9b28d8d1e934c8f33d6bca89d7ab0b79387211f81aef570e37e53abde71fd5bf01e6dc3e1d21ce62b3765fb45e549ef6ca5c84ad0ff4906376ce0bad7"' }>
                                            <li class="link">
                                                <a href="components/ThumbnailCarouselComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ThumbnailCarouselComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TissueBlockListModule.html" data-type="entity-link" >TissueBlockListModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-TissueBlockListModule-e877987776335c8e3787557d48974337f366f43dd6ca863afcd894c4908ab6f27cda2aa90c79833d6fbf579f33e4a5768cee4b60a97b2fe8f6960b4e476645e6"' : 'data-bs-target="#xs-components-links-module-TissueBlockListModule-e877987776335c8e3787557d48974337f366f43dd6ca863afcd894c4908ab6f27cda2aa90c79833d6fbf579f33e4a5768cee4b60a97b2fe8f6960b4e476645e6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TissueBlockListModule-e877987776335c8e3787557d48974337f366f43dd6ca863afcd894c4908ab6f27cda2aa90c79833d6fbf579f33e4a5768cee4b60a97b2fe8f6960b4e476645e6"' :
                                            'id="xs-components-links-module-TissueBlockListModule-e877987776335c8e3787557d48974337f366f43dd6ca863afcd894c4908ab6f27cda2aa90c79833d6fbf579f33e4a5768cee4b60a97b2fe8f6960b4e476645e6"' }>
                                            <li class="link">
                                                <a href="components/TissueBlockListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TissueBlockListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TissueSectionVisModule.html" data-type="entity-link" >TissueSectionVisModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-TissueSectionVisModule-1fd508bcec22e1f52aecc01be2365b62d545e745c9383b1a70bb369b65fe6b6f1f95aa73959f2a1b935ead7735197d8c0ba69cb3efdbffeac9c680a17383ad5a"' : 'data-bs-target="#xs-components-links-module-TissueSectionVisModule-1fd508bcec22e1f52aecc01be2365b62d545e745c9383b1a70bb369b65fe6b6f1f95aa73959f2a1b935ead7735197d8c0ba69cb3efdbffeac9c680a17383ad5a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TissueSectionVisModule-1fd508bcec22e1f52aecc01be2365b62d545e745c9383b1a70bb369b65fe6b6f1f95aa73959f2a1b935ead7735197d8c0ba69cb3efdbffeac9c680a17383ad5a"' :
                                            'id="xs-components-links-module-TissueSectionVisModule-1fd508bcec22e1f52aecc01be2365b62d545e745c9383b1a70bb369b65fe6b6f1f95aa73959f2a1b935ead7735197d8c0ba69cb3efdbffeac9c680a17383ad5a"' }>
                                            <li class="link">
                                                <a href="components/TissueSectionVisComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TissueSectionVisComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ViewerModule.html" data-type="entity-link" >ViewerModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ViewerModule-182fbcd4bbbe9fc69dafd3bc781e472668de26cea9c1784ced24f35a7f1ba0ee705709d88b845f5836ffeac17082120f6eeb23b97a260c273ff940257d54fa32"' : 'data-bs-target="#xs-components-links-module-ViewerModule-182fbcd4bbbe9fc69dafd3bc781e472668de26cea9c1784ced24f35a7f1ba0ee705709d88b845f5836ffeac17082120f6eeb23b97a260c273ff940257d54fa32"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ViewerModule-182fbcd4bbbe9fc69dafd3bc781e472668de26cea9c1784ced24f35a7f1ba0ee705709d88b845f5836ffeac17082120f6eeb23b97a260c273ff940257d54fa32"' :
                                            'id="xs-components-links-module-ViewerModule-182fbcd4bbbe9fc69dafd3bc781e472668de26cea9c1784ced24f35a7f1ba0ee705709d88b845f5836ffeac17082120f6eeb23b97a260c273ff940257d54fa32"' }>
                                            <li class="link">
                                                <a href="components/ViewerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ViewerComponent</a>
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
                                <a href="classes/AddSearch.html" data-type="entity-link" >AddSearch</a>
                            </li>
                            <li class="link">
                                <a href="classes/DataStateSelectors.html" data-type="entity-link" >DataStateSelectors</a>
                            </li>
                            <li class="link">
                                <a href="classes/FlatNode.html" data-type="entity-link" >FlatNode</a>
                            </li>
                            <li class="link">
                                <a href="classes/GenerateSpatialSearch.html" data-type="entity-link" >GenerateSpatialSearch</a>
                            </li>
                            <li class="link">
                                <a href="classes/InitializationState.html" data-type="entity-link" >InitializationState</a>
                            </li>
                            <li class="link">
                                <a href="classes/MessageChannel.html" data-type="entity-link" >MessageChannel</a>
                            </li>
                            <li class="link">
                                <a href="classes/MoveToNode.html" data-type="entity-link" >MoveToNode</a>
                            </li>
                            <li class="link">
                                <a href="classes/ReallyUpdateSpatialSearch.html" data-type="entity-link" >ReallyUpdateSpatialSearch</a>
                            </li>
                            <li class="link">
                                <a href="classes/RemoveSearch.html" data-type="entity-link" >RemoveSearch</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResetPosition.html" data-type="entity-link" >ResetPosition</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResetRadius.html" data-type="entity-link" >ResetRadius</a>
                            </li>
                            <li class="link">
                                <a href="classes/SetExecuteSearchOnGenerate.html" data-type="entity-link" >SetExecuteSearchOnGenerate</a>
                            </li>
                            <li class="link">
                                <a href="classes/SetOrgan.html" data-type="entity-link" >SetOrgan</a>
                            </li>
                            <li class="link">
                                <a href="classes/SetPosition.html" data-type="entity-link" >SetPosition</a>
                            </li>
                            <li class="link">
                                <a href="classes/SetRadius.html" data-type="entity-link" >SetRadius</a>
                            </li>
                            <li class="link">
                                <a href="classes/SetSelectedSearches.html" data-type="entity-link" >SetSelectedSearches</a>
                            </li>
                            <li class="link">
                                <a href="classes/SetSex.html" data-type="entity-link" >SetSex</a>
                            </li>
                            <li class="link">
                                <a href="classes/SpatialSearchFilterSelectors.html" data-type="entity-link" >SpatialSearchFilterSelectors</a>
                            </li>
                            <li class="link">
                                <a href="classes/SpatialSearchUiSelectors.html" data-type="entity-link" >SpatialSearchUiSelectors</a>
                            </li>
                            <li class="link">
                                <a href="classes/StartSpatialSearchFlow.html" data-type="entity-link" >StartSpatialSearchFlow</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateFilter.html" data-type="entity-link" >UpdateFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateSpatialSearch.html" data-type="entity-link" >UpdateSpatialSearch</a>
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
                                    <a href="injectables/SpatialSearchFilterState.html" data-type="entity-link" >SpatialSearchFilterState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SpatialSearchUiState.html" data-type="entity-link" >SpatialSearchUiState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/WorkerDataSourceService.html" data-type="entity-link" >WorkerDataSourceService</a>
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
                                <a href="interfaces/Position.html" data-type="entity-link" >Position</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RadiusSettings.html" data-type="entity-link" >RadiusSettings</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SceneStateModel.html" data-type="entity-link" >SceneStateModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SearchResult.html" data-type="entity-link" >SearchResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SpatialSearchFilterItem.html" data-type="entity-link" >SpatialSearchFilterItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SpatialSearchUiModel.html" data-type="entity-link" >SpatialSearchUiModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TermResult.html" data-type="entity-link" >TermResult</a>
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