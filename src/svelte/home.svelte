<script>
    import Header from './header.svelte'
    import Svg from './svg.svelte'

    function onStartButtonClick() {
        if (window.account.isAuthentified)
            window.location.href = "/dashboard"
        else
            window.open('/discord_auth', '_blank', 'width=550,height=900,dependent=yes,floating=yes')
    }
</script>

<Header/>
<main class="home-page">

    <Svg _class="home-page__logo-bg" src="/assets/img/logo.svg"/>

    <div class="home-page__content">
        <h1 class="home-page__title">GD Collab Manager</h1>
        <h2 class="home-page__subtitle">Manage your collabs like never before</h2>
    </div>

    <div class="home-page__buttons">
        <button on:click={() => onStartButtonClick()} class="home-page__start-button button">
            <span class="button__inner-text">Start</span>
        </button>
        <a class="home-page__learn-more link" href="/">Learn More</a>
    </div>

</main>