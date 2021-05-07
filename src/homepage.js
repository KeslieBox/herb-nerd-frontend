const homeLink = document.getElementById('homeLink')

homeLink.addEventListener('click', e => showHomepage(e))

function showHomepage(e){
    e.preventDefault()
    // figure out what goes on home page
    const container = document.getElementById('herbsContainer')
    container.innerText = ""
}

