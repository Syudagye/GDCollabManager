var Cookies
var User

var isPopupFocused = true

function popupClose(){
    $('#main-page').removeClass('blurred')
    $('#settings-popup').addClass('hidden')
    $('#gradient-selection').addClass('hidden')
    $('#account-popup').addClass('hidden')
    setTimeout(() => isPopupFocused = true, 10)
}

function removeGradientClasses(){
    $('body').removeClass('gradient1')
    $('body').removeClass('gradient2')
    $('body').removeClass('gradient3')
    $('#gradient1').removeClass('selected-gradient')
    $('#gradient2').removeClass('selected-gradient')
    $('#gradient3').removeClass('selected-gradient')
}

function loadSvg(){
    $('div[svg-data]').each((k, v) => {
        console.log(v)
        var classes = v.className.split(' ')
        $.get(v.getAttribute('svg-data'), (data, status) => {
            var svg = data.children[0]
            if(classes[0] != "")
                classes.forEach(e => {
                    svg.classList.add(e)
                });
            svg.id = v.id
            v.replaceWith(svg)
        })
    });
}

function parseCookies(cookies) {
    let array = cookies.split('; ')
    let result = "{"
    array.forEach(e => {
        let tmp = e.split('=')
        result = result.concat(`"${tmp[0]}": "${tmp[1]}",`)
    });
    Cookies = JSON.parse(result.slice(0, result.length - 1).concat('}'))
}

function setCookie(name, value){
    document.cookie = `${name}=${value}`
    parseCookies(document.cookie)
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

function loadEvents() {

    $('#js--login').click(() => login())

    //popups open
    $('#open-settings').click(() => {
        $('#main-page').addClass('blurred')
        $('#settings-popup').removeClass('hidden')
    })
    $('#used-gradient').click(() => {
        console.log("e")
        $('#gradient-selection').removeClass('hidden')
    })
    $('#js--account-popup-open').click(() => {
        $('#main-page').addClass('blurred')
        $('#account-popup').removeClass('hidden')
    })

    //popups close buttons
    $('#settings-close').click(() => popupClose())
    $('#js--account-popup-close').click(() => popupClose())

    //popups closing by clicking out of them
    $('#settings-popup').mouseenter(() => isPopupFocused = true)
    $('#settings-popup').mouseleave(() => isPopupFocused = false)
    $('#account-popup').mouseenter(() => isPopupFocused = true)
    $('#account-popup').mouseleave(() => isPopupFocused = false)
    $(document).click(() => {
        if(!isPopupFocused) popupClose()
    })

    //switches
    $('#dark-theme-switch').click(() => {
        console.log('triggered')
        var tmp = $('#dark-theme-switch')
        tmp.toggleClass('switch-on')
        if(tmp.hasClass('switch-on')){
            $('body').addClass('dark-theme')
            $('body').removeClass('light-theme')
        }else{
            $('body').removeClass('dark-theme')
            $('body').addClass('light-theme')
        }
    })

    //buttons        
    $('#gradient1').click(() => {
        removeGradientClasses()            
        $('body').addClass('gradient1')
        $('#gradient1').addClass('selected-gradient')
        popupClose()
    })
    $('#gradient2').click(() => {
        removeGradientClasses()            
        $('body').addClass('gradient2')
        $('#gradient2').addClass('selected-gradient')
        popupClose()
    })
    $('#gradient3').click(() => {
        removeGradientClasses()            
        $('body').addClass('gradient3')
        $('#gradient3').addClass('selected-gradient')
        popupClose()
    })

    //redirects
    $('.start-button').click(() => {
        if(Cookies.tokens != undefined && Cookies.tokens != '')
            window.location.href = "/dashboard"
        else
            login()
    })
    $('#js--access-dashboard').click(() => window.location.href = "/dashboard")
    $('#js--account-disconnect').click(() => window.location.href = "/logout")
}

$('document').ready(async () => {

    parseCookies(document.cookie)

    if(Cookies.tokens != undefined && Cookies.tokens != ''){
        $('.account').attr('id', 'js--account-popup-open').children().replaceWith([
            '<img class=\"icon\">',
            '<span class=\"account-name\">loading...</span>',
            '<div class="down-arrow svg-gradient-icon filled" svg-data="/assets/img/down_arrow.svg"></div>'
        ])
        if(JSON.parse(decodeURIComponent(Cookies.tokens_expiration)).time < Date.now()){
            $.get(`/discord_auth/refresh_token?refresh_token=${JSON.parse(decodeURIComponent(Cookies.tokens).substr(2)).refresh_token}`, (data, status) => {
                setCookie('tokens', encodeURIComponent(data))
            })
        }
        let token = JSON.parse(decodeURIComponent(Cookies.tokens).substr(2)).access_token
        $.ajax({
            type: 'GET',
            url: 'https://discord.com/api/v8/users/@me',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).done((data, status) => {
            User = data
            $('.account img.icon, .account-popup-topbar img.icon').attr('src', `https://cdn.discordapp.com/avatars/${User.id}/${User.avatar}.png`)
            $('.account-name').html(User.username)
            loadSvg()
            loadEvents()
        })
    }else{
        loadEvents()
        if(window.location.href.endsWith('/dashboard')) window.location.href = '/'
    }
    loadSvg()
})