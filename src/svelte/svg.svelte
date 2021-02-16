<script>
    const domParser = new DOMParser()

    export let src
    export let _class = ""
    export let id = ""
    let data
    let svg

    fetch(src)
    .then(res => res.blob())
    .then(blob => blob.text())
    .then(text => data = domParser.parseFromString(text, 'image/svg+xml').documentElement)

    $: if(data != undefined && svg != undefined) {
        data.setAttribute('class', _class)
        data.setAttribute('id', id)
        svg.replaceWith(data)
    }
</script>

{#if data != undefined}
    <svg bind:this={svg}/>
{/if}