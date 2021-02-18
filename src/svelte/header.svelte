<script>
    import Svg from './svg.svelte'
    import Account from './account.svelte'

    let mobileMenuOpened = false;
</script>

<div class="desktop-header">

    <a href="/" class="desktop-header__home-button">
        <Svg _class="desktop-header__logo" src="/assets/img/logo.svg"/>
    </a>

    <nav class="desktop-header__nav">
        <a class="desktop-header__nav-tab link" href="/features">Features</a>
        <a class="desktop-header__nav-tab link" href="/changelog">Changelog</a>
        <a class="desktop-header__nav-tab link" href="/support">Support</a>
    </nav>

    <Account/>

    <div class="desktop-header__settings-button">
        <Svg _class="desktop-header__settings-button-icon" src="/assets/img/settings_button.svg"/>
    </div>

</div>
<div class="mobile-header">

    <div class="mobile-header__top">

        <button class="mobile-header__button" on:click={() => mobileMenuOpened = !mobileMenuOpened}>
            <Svg _class="mobile-header__button-icon {mobileMenuOpened ? 'mobile-header__button-icon--cross': ''}" src="/assets/img/menu.svg"/>
        </button>
    
        <Svg _class="mobile-header__logo" src="/assets/img/logo.svg"/>
    
        <Account mobile=true/>

    </div>

    <div class="mobile-header__menu {mobileMenuOpened ? 'mobile-header__menu--opened': ''}">
        <a class="mobile-header__nav-tab link" href="/features">Features</a>
        <a class="mobile-header__nav-tab link" href="/changelog">Changelog</a>
        <a class="mobile-header__nav-tab link" href="/support">Support</a>
    </div>
</div>