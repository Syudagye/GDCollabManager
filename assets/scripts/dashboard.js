var servers = []
var collabs = []

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
    httpGet(`/api/collabs/${servers[index].id}`, (res) => {
        collabs = JSON.parse(res)
        let collablist = ""
        console.log(collabs)
        collabs.forEach(collab => {
            console.log(collab)
            httpGet(`/api/discord/users/${collab.host_id}`, (res) => {
                console.log(res)
                collablist += `<li class="collab-list-tile"><div class="collab-list-tile_main-infos">`
                    + `<h1>${collab.name}</h1><h2>${res.username}</h2><h3>song</h3></div>` // need to handle song info parsing
                    + `<div class="collab-list-tile_collab-infos"><div class="collab-list-tile_member-count"><div svg-data="/assets/img/members.svg" class="svg-gradient-icon filled"></div>`
                    + `<span>?</span></div><span class="collab-list-tile_collab-status"></span></div>` // niy (member count + collab status)
            })
        });
        let tiles = document.querySelector('#collab-list')
        tiles.innerHTML = collablist
        tiles.childNodes.forEach((el, index) => el.onclick = (() => selectCollab(index)))
        selectCollab(0)
        loadSvg()
    })
}

function selectCollab(index) {
    document.querySelectorAll('#collab-list li').forEach(el => el.classList.remove('collab-list-tile--selected'))
    document.querySelector('#collab-list').children[index].classList.add('collab-list-tile--selected')
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