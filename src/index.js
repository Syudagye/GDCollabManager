import Index from './svelte/index.svelte'
import { Account } from './svelte/stores'

let isAuthentified
Account.subscribe(v => isAuthentified = v.isAuthentified)

if(!isAuthentified && window.location.href.endsWith('/dashboard')) window.location.href = '/'

var index = new Index({
    target: document.body
})

export default index