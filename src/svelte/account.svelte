<script>
    import { Account } from './stores'
    import Svg from './svg.svelte'

    export let mobile = false;

    function login(){
        window.open('/discord_auth', '_blank', 'width=550,height=900,dependent=yes,floating=yes')
    }

    let avatarUrl

    $: {
        if($Account.isAuthentified){
            let avatar = $Account.user.avatar
            if(avatar === null)
                avatarUrl = `https://cdn.discordapp.com/embed/avatars/${$Account.user.discriminator % 5}.png`
            else if(avatar.startsWith('a_'))
                avatarUrl = `https://cdn.discordapp.com/avatars/${$Account.user.id}/${avatar}.gif`
            else
                avatarUrl = `https://cdn.discordapp.com/avatars/${$Account.user.id}/${avatar}.png`
        }
    }

</script>

<div class="account {mobile ? 'account--mobile': ''}">
    {#if $Account.isAuthentified}

        <img class="account__avatar" src="{avatarUrl}" alt="discord avatar">
        {#if !mobile}
            <span class="account__name">{$Account.user.username}</span>
        {/if}
        <Svg _class="account__arrow" src="/assets/img/down_arrow.svg"/>

    {:else}

        <button on:click={login} class="account__loggin-button button">
            <span class="button__inner-text">Log In</span>
        </button>

    {/if}
</div>