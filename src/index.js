Herb.fetchHerbs()
Property.fetchProperties()
// const herbForm = document.getElementById('herbForm')
const encyclopedia = document.getElementById('encyclopedia')

// herbForm.addEventListener('submit', e => Herb.postHerb(e))
encyclopedia.addEventListener('click', e => Herb.renderHerbs(Herb.allHerbs))

