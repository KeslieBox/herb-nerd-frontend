Herb.fetchHerbs()

// handles events connected to navbar
const encycNav = document.getElementById('encyc-nav')
const newHerbNav = document.getElementById('newHerb-nav')

encycNav.addEventListener('click', e => {
    e.preventDefault()
    Herb.clearContainer()
    Herb.renderHerbs(Herb.allHerbs)
})

newHerbNav.addEventListener('click', e => {
    Herb.newHerbForm(e) 
})