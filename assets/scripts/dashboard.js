var servers = []

function reloadServers() {
    document.querySelectorAll('.selected-server-name').forEach(e => e.innerHTML = 'loading...')
    document.querySelector('.serverlist-tabs').innerHTML = ''
    httpGet('/api/servers', (res) => {
        servers = JSON.parse(res)
        let serverlist = ""
        console.log(servers)
        servers.forEach(server => {
            console.log(server)
            serverlist += `<li class="serverlist-tab">`
                + `<img class="icon" src="https://cdn.discordapp.com/icons/${server.id}/${server.icon}.png">`
                + `<span>${server.name}</span></li>`
        });
        let tabs = document.querySelector('.serverlist-tabs')
        tabs.innerHTML = serverlist
        tabs.childNodes.forEach((el, index) => el.onclick = (() => selectServer(index)))
        selectServer(0)
    })
}

function selectServer(index) {
    document.querySelectorAll('.serverlist-popup-topbar img.icon, #js--serverlist-open img.icon')
        .forEach(el => el.setAttribute('src', `https://cdn.discordapp.com/icons/${servers[index].id}/${servers[index].icon}.png`))        
    document.querySelectorAll('.serverlist-popup-topbar span, #js--serverlist-open span')
        .forEach(el => el.innerHTML = servers[index].name)
    closePopups()
}

function addServer() {
    addServerWindow = window.open('/dashboard/add_server', '_blank', 'width=500,height=830,dependent=yes,floating=yes')
}

function addServerEnd(isFailed) {
    if(!isFailed){
        addServerWindow.close()
        closePopups()
        reloadServers()
    }else{
        addServerWindow.close()
    }
}


document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#js--serverlist-open').onclick = () => openPopupToParentPos('#serverlist-popup', '#js--serverlist-open')
    document.querySelector('#js--server-add').onclick = () => addServer()

    if(isAuthentified) reloadServers()
})