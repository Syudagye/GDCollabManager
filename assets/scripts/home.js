document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.start-button').onclick = () => {
        if(isAuthentified) window.location.href = "/dashboard"
        else login()
    }
})