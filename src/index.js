import Svg from './svelte/svg.svelte'
import Cookies from 'js-cookie'

class Account {
    constructor(tokens){
        this.tokens = tokens
        this.isAuthentified = tokens != undefined && tokens != ''
        if (this.isAuthentified){
            this.userFetch = fetch('https://discord.com/api/v8/users/@me', {
                headers: {
                    'Authorization': `Bearer ${tokens.access_token}`
                }
            })
            .then(res => {return res.json()})
            .then(user => this.user = user)
        }
    }
}

window.account = new Account(Cookies.getJSON('tokens'))

if(!account.isAuthentified && window.location.href.endsWith('/dashboard')) window.location.href = '/'

var svg = new Svg({
    target: document.body,
    props: {
        src: "/assets/img/logo_masks.svg",
        id: "svg__masks"
    }
})

export default svg