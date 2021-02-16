<script>
    import Svg from './svg.svelte'

    export let mobile = false;

    function login(){
        window.open('/discord_auth', '_blank', 'width=550,height=900,dependent=yes,floating=yes')
    }

    let avatar;
    let username = 'loading...';

    window.account.userFetch.then(() => {
        if(window.account.user.avatar === undefined)
            avatar = `https://cdn.discordapp.com/embed/avatars/${window.account.user.discriminator}.png`
        if(window.account.user.avatar.startsWith('a_'))
            avatar = `https://cdn.discordapp.com/avatars/${window.account.user.id}/${window.account.user.avatar}.gif`
        else
            avatar = `https://cdn.discordapp.com/avatars/${window.account.user.id}/${window.account.user.avatar}.png`
        username = window.account.user.username
    })
</script>

<div class="account {mobile ? 'account--mobile': ''}">
    {#if window.account.isAuthentified}

        <img class="account__avatar" src="{avatar}" alt="discord avatar">
        {#if !mobile}
            <span class="account__name">{username}</span>
        {/if}
        <Svg _class="account__arrow" src="/assets/img/down_arrow.svg"/>

    {:else}

        <button on:click={login} class="account__loggin-button button">
            <span class="button__inner-text">Log In</span>
        </button>

    {/if}
</div>