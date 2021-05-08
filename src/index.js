// Property.fetchProperties()
Herb.fetchHerbs()
Property.fetchProperties()
// const herbForm = document.getElementById('herbForm')
const encycNav = document.getElementById('encyc-nav')
const newHerbNav = document.getElementById('newHerb-nav')

// herbForm.addEventListener('submit', e => Herb.postHerb(e))

encycNav.addEventListener('click', e => {
    e.preventDefault()
    Herb.clearContainer()
    Herb.renderHerbs(Herb.allHerbs)
})

// newHerbNav.addEventListener('click', e => {
//     // call newHerbForm 
// })