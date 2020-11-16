var Cookies
var isPopupFocused = true
var Discord

function popupClose(){
    $('#main-page').removeClass('blurred')
    $('#settings-popup').addClass('hidden')
    $('#gradient-selection').addClass('hidden')
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

function login() {
    authWindow = window.open('/discord_auth', '_blank', 'width=500,height=750,dependent=yes')
}

function loginEnd() {
    authWindow.close()
    window.location.href = '/dashboard'
}

$('document').ready(async () => {
    $.when(await loadSvg()).then(() => {

        parseCookies(document.cookie)

        if(Cookies.user != undefined){
            //load discord user info and update the header
        }

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
    
        //popups close buttons
        $('#settings-close').click(() => popupClose())
    
        //popups closing by clicking out of them
        $('#settings-popup').mouseenter(() => isPopupFocused = true)
        $('#settings-popup').mouseleave(() => isPopupFocused = false)
        $(document).click(() => {
            if(!isPopupFocused) popupClose()
        })
    
        //switches
        $('#dark-theme-switch').click(() => {
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
    })
})