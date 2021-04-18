<script>
    import Svg from './svg.svelte'

    let serverListPopupOpened = false

</script>

<div class="dashboard-sidebar">

    <div class="server-selection">

        <span>Discord Server</span>
        <div on:click={serverListPopupOpened = !serverListPopupOpened} class="server-selection__selected-server">

            <img class="icon" src="" alt="">
            <span>Server name</span>
            <Svg src="/assets/img/down_arrow.svg"/>

        </div>        
    </div>

    <div class="collab-selection">
        <span>Collab Section</span>
        <ul id="collab-list">
            <li class="collab-list-tile">
                <div class="collab-list-tile__main-infos">
                    <h1>Collab Name</h1>
                    <h2>Collab Host</h2>
                    <h3>Collab Song</h3>
                </div>
                <div class="collab-list-tile__collab-infos">
                    <div class="collab-list-tile__member-count">
                        <Svg _class="filled" src="/assets/img/member.svg"/>
                        <span>23</span>
                    </div>
                </div>
            </li>
            <li class="collab-list-tile collab-list-tile--selected">
                <div class="collab-list-tile__main-infos">
                    <h1>Collab Name</h1>
                    <h2>Collab Host</h2>
                    <h3>Collab Song</h3>
                </div>
                <div class="collab-list-tile__collab-infos">
                    <div class="collab-list-tile__member-count">
                        <Svg _class="svg-gradient-icon filled" src="/assets/img/member.svg" />
                        <span>23</span>
                    </div>
                </div>
            </li>
        </ul>
        <div class="collab-selection__create-collab">
            <Svg src="/assets/img/add_button.svg"/>
            <span>Create Collab</span>
        </div>
    </div>
</div>