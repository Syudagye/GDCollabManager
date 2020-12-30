const domParser = new DOMParser()

var cookies = parseCookies()
var user
var isAuthentified = cookies.tokens != undefined && cookies.tokens != ''
var openedPopups = []

// Auth check
if(!isAuthentified && window.location.href.endsWith('/dashboard')) window.location.href = '/'

// Useful functions
function httpGet(url, callback){
    let http = new XMLHttpRequest()
    http.onreadystatechange = () => {
        if (http.readyState == 4 && http.status == 200)
            callback(http.responseText)
    }
    http.open('GET', url, true)
    http.send()
}

function loadSvg(){
    let svgs = document.querySelectorAll('div[svg-data]')
    svgs.forEach((el) => {
        let classes = el.className.split(' ')
        httpGet(el.getAttribute('svg-data'), (res) => {
            let svg = domParser.parseFromString(res, 'image/svg+xml').firstChild
            if (classes[0] != '') classes.forEach(c => {
                svg.classList.add(c)
            })
            svg.id = el.id
            el.replaceWith(svg)
        })
    })
}

function loadTheme() {
    let body = document.querySelector('body')
    if(cookies.theme === undefined){
        setCookie('theme','dark')
        debugger
    }else if(cookies.theme === 'light'){
        body.classList.add('light-theme')
        body.classList.remove('dark-theme')
        debugger
    }
    if(cookies.gradient === undefined){
        setCookie('gradient', '1')
        debugger
    }else if(cookies.gradient === '2'){
        changeGradient('2')
        debugger
    }else if(cookies.gradient === '3'){
        changeGradient('3')
        debugger
    }
}

function parseCookies() {
    let array = document.cookie.split('; ')
    let result = "{"
    array.forEach(e => {
        let tmp = e.split('=')
        result = result.concat(`"${tmp[0]}": "${tmp[1]}",`)
    });
    return JSON.parse(result.slice(0, result.length - 1).concat('}'))
}
function setCookie(name, value){
    document.cookie = `${name}=${value}`
    cookies = parseCookies()
}

function openPopup(selector) {
    document.querySelector('#main-page').classList.add('blurred')
    let popup = document.querySelector(selector)
    popup.classList.remove('hidden')
    popup.onmouseleave = () => document.onclick = () => closePopups()
    popup.onmouseenter = () => document.onclick = () => null
    openedPopups.push(popup)
}
function closePopups(selector) {
    document.querySelector('#main-page').classList.remove('blurred')
    openedPopups.forEach(v => {
        v.classList.add('hidden')
    })
    document.onclick = null
    openedPopups = []
}

function login() {
    authWindow = window.open('/discord_auth', '_blank', 'width=500,height=750,dependent=yes,floating=yes')
}

function loginEnd(isFailed) {
    if(!isFailed){
        authWindow.close()
        window.location.href = '/dashboard'
    }else{
        authWindow.close()
        alert("Authentification failed :/")
    }
}

function changeGradient(gradient) {
    let body = document.querySelector('body')
    body.classList.remove('gradient1', 'gradient2', 'gradient3')
    body.classList.add(`gradient${gradient}`)
    document.querySelectorAll('#gradient1, #gradient2, #gradient3').forEach(el => el.classList.remove('selected-gradient'))
    document.querySelector(`#gradient${gradient}`).classList.add('selected-gradient')
    setCookie('gradient', gradient)
}

function loadEvents(){
    document.querySelector('#js--access-dashboard').onclick = () => window.location.href = "/dashboard"
    document.querySelector('#js--account-disconnect').onclick = () => window.location.href = "/logout"
    
    //opening popups
    document.querySelector('#open-settings').onclick = () => openPopup('#settings-popup')
    document.querySelector('#used-gradient').onclick = () => openPopup('#gradient-selection')
    //closing popups
    document.querySelector('#settings-close').onclick = () => closePopups() //doesn't work for some reason
    document.querySelector('#js--account-popup-close').onclick = () => closePopups()

    //buttons
    document.querySelector('#gradient1').onclick = () => changeGradient('1')
    document.querySelector('#gradient2').onclick = () => changeGradient('2')
    document.querySelector('#gradient3').onclick = () => changeGradient('3')

    //switches
    let darkThemeSwitch = document.querySelector('#light-theme-switch')
    document.querySelector('#light-theme-switch').onclick = () => {
        let body = document.querySelector('body')
        if (!darkThemeSwitch.classList.contains('switch-on')){
            body.classList.add('light-theme')
            body.classList.remove('dark-theme')
            darkThemeSwitch.classList.add('switch-on')
            setCookie('theme', 'light')
        }else{
            body.classList.add('dark-theme')
            body.classList.remove('light-theme')
            darkThemeSwitch.classList.remove('switch-on')
            setCookie('theme', 'dark')
        }
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    //load all svg
    loadSvg()
    //check token and get user object
    if(isAuthentified){
        let account = document.querySelectorAll('.account')[0]
        account.id = 'js--account-popup-open'
        account.innerHTML = '<img class=\"icon\">' +
                            '<span class=\"account-name\">loading...</span>' +
                            '<div class="down-arrow svg-gradient-icon filled" svg-data="/assets/img/down_arrow.svg"></div>'
        let getUser = () => {
            let token = JSON.parse(decodeURIComponent(cookies.tokens)).access_token
            let http = new XMLHttpRequest()
            http.onreadystatechange = () => {
                if (http.readyState == 4 && http.status == 200){
                    user = JSON.parse(http.responseText)
                    document.querySelectorAll('.account img.icon, .account-popup-topbar img.icon').forEach(el => el.setAttribute('src', `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`))
                    document.querySelector('.account-name').innerHTML = user.username
                    loadSvg()
                }
            }
            http.open('GET', 'https://discord.com/api/v8/users/@me', true)
            http.setRequestHeader('Authorization', `Bearer ${token}`)
            http.send()
        }
        if(JSON.parse(decodeURIComponent(cookies.tokens_expiration)).time < Date.now()){
            httpGet(`/discord_auth/refresh_token?refresh_token=${JSON.parse(decodeURIComponent(cookies.tokens)).refresh_token}`, (res) => {
                setCookie('tokens', encodeURIComponent(res))
            })
        }
        getUser()
        document.querySelector('#js--account-popup-open').onclick = () => openPopup('#account-popup')
    }else document.querySelector('#js--login').onclick = () => login()
    //loads global events
    loadEvents()
    //theming check
    loadTheme()
})
