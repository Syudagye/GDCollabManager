import { readable } from 'svelte/store'
import Cookie from 'js-cookie'

export const Account = readable({
    tokens: null,
    isAuthentified: false,
    user: null
}, set => {

    const tokens = Cookie.getJSON('tokens')
    const isAuthentified = tokens != undefined && tokens != ''

    if(!isAuthentified && window.location.href.endsWith('/dashboard')) return window.location.href = '/'

    let user = null

    if (isAuthentified) {
        fetchUser(tokens.access_token)
        .then(v => {
            user = v
            set({
                tokens,
                isAuthentified,
                user 
            })
        })
    }
    else set({
        tokens,
        isAuthentified,
        user
    })
})

async function fetchUser(token, isAuthentified) {
    let user = await fetch('https://discord.com/api/v8/users/@me', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return await user.json()
}