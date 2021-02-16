<script>
    import Svg from './svg.svelte'
    import Account from './account.svelte'
</script>

<div class="desktop-header">

    <a href="/" class="desktop-header__home-button">
        <Svg _class="desktop-header__logo" src="/assets/img/logo.svg"/>
    </a>

    <nav class="desktop-header__nav">
        <a class="desktop-header__nav-tab" href="/features">Features</a>
        <a class="desktop-header__nav-tab" href="/changelog">Changelog</a>
        <a class="desktop-header__nav-tab" href="/support">Support</a>
    </nav>

    <Account/>

    <div class="desktop-header__settings-button">
        <Svg _class="desktop-header__settings-button-icon" src="/assets/img/settings_button.svg"/>
    </div>

</div>
<div class="mobile-header">

    <button>menu</button><!--TODO: Make a menu for mobile header-->

    <Svg _class="mobile-header__logo" src="/assets/img/logo.svg"/>

    <Account mobile=true/>

</div>