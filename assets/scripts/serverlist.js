$('document').ready(() => {   

    $.ajax({
        url: "http://localhost:974/getserverlist",
        type: 'GET',
        success: function (result) {
            let list = ""
            result.configured_admin_guilds.forEach(e => {
                list = list.concat(`<div class="server-tab">`)
                if(e.icon != null)
                    list = list.concat(`<img class="server-icon" src="https://cdn.discordapp.com/icons/${e.id}/${e.icon}.png"/>`)
                else
                    list = list.concat(`<div class="server-icon no-img">${e.name.charAt(0)}</div>`)
                list = list.concat(`<div class="server-name">${e.name}</div>`)
                list = list.concat('<button class="dashboard-button">Dashboard</button></div>')
            });
            result.admin_guilds.forEach(e => {
                list = list.concat(`<div class="server-tab">`)
                if(e.icon != null)
                    list = list.concat(`<img class="server-icon" src="https://cdn.discordapp.com/icons/${e.id}/${e.icon}.png"/>`)
                else
                    list = list.concat(`<div class="server-icon no-img"><span>${e.name.charAt(0)}</span></div>`)
                list = list.concat(`<div class="server-name">${e.name}</div>`)
                list = list.concat('<button class="configure-button">Configure</button></div>')
            });
            result.others_guilds.forEach(e => {
                list = list.concat(`<div class="server-tab">`)
                if(e.icon != null)
                    list = list.concat(`<img class="server-icon" src="https://cdn.discordapp.com/icons/${e.id}/${e.icon}.png"/>`)
                else
                    list = list.concat(`<div class="server-icon no-img">${e.name.charAt(0)}</div>`)
                list = list.concat(`<div class="server-name">${e.name}</div>`)
                list = list.concat('<button class="overview-button">Overview</button></div>')
            });
            $('.server-tab-list').html(list)
        },
        error: function (error) {
            alert('an error occured while loading your servers :(')
        }
    });
})