const herbsURL = 'http://localhost:3000/herbs'
const container = document.getElementById('herbsContainer')
// const checkboxProperties = []
// const checkbox = document.querySelectorAll('.cb')
// const common = document.getElementById('common').value
// const latin = document.getElementById('latin').value
// const medicinal = document.getElementById('medicinal').value
// const history = document.getElementById('history').value
// const spiritual = document.getElementById('spiritual').value

function formContent(){
     return `<label>Common Name:</label>
    <input id='common' class="herbform" type="text" value="${this.commonName || ""}"><br>
    <label>Latin Name:</label>
    <input id='latin' class="herbform" type="text" value="${this.latinName || ""}"><br><br>
    <label>Medicinal Uses:</label><br>
    <textarea rows = "5" cols = "60" id='medicinal' class="textarea" type="text_area" form='herbForm'>${this.medicinalUses || ""}</textarea><br>
    <label>Spiritual Uses:</label><br>
    <textarea rows = "5" cols = "60" id='spiritual' class="textarea" type="text_area" form='herbForm'>${this.spiritualUses || ""}</textarea><br>
    <label>History:</label><br>
    <textarea rows = "5" cols = "60" id='history' class="textarea" type="text_area" form='herbForm'>${this.history || ""}</textarea><br>`
}

class Herb {
    static allHerbs = []

    constructor({id, latinName, history, commonName, medicinalUses, spiritualUses, propertyIds}){
        const blankInputText = "Looks like no one has added anything here yet, go head and be the first to tell us what you know!"
        this.id = id 
        this.commonName = commonName 
        this.latinName = latinName 
        this.medicinalUses = medicinalUses || blankInputText
        this.history = history || blankInputText
        this.spiritualUses = spiritualUses || blankInputText
        this.propertyIds = propertyIds 
        Herb.allHerbs.push(this)
    }

    get properties(){
        return Property.allProperties.filter(property => this.propertyIds.includes(property.id))
    }  
    
    static fetchHerbs() {
        fetch(herbsURL)
            .then(resp => resp.json())
            .then(herbs => {
                if (herbs){
                    for(let herb of herbs){
                        const h = new Herb(herb)
                    }
                    this.renderHerbs()
                } else {
                    throw new Error(herb.message)
                }
            }).catch(err => alert(err))
    }

    static clearContainer(){
        container.innerHTML = ""
    }

    static renderHerbs(){
        const div = document.createElement('div')
        const ul = document.createElement('ul')
        ul.id = 'herbs'
        div.innerHTML = '<h1>Encyclopedia of Herbs</h1>'
        div.id = 'encyclopedia'
        container.append(div)
        div.append(ul)

        // how to get this to work w/ appendHerb() which needs instance of herb class
        // const mapped = this.allHerbs.map(h => h.commonName).sort()
      
        // clean this up/ make dynamic
        // this.allHerbs.sort(alphabetize(commonName))???
        this.allHerbs.sort((a, b) => {
            if (a.commonName < b.commonName) {return -1}
            if (a.commonName > b.commonName) {return 1}
            return 0
        })
        for(let herb of this.allHerbs){ herb.appendHerb()} 
       
    }

    appendHerb(){
        const ul = document.getElementById('herbs') || document.createElement('ul')
        const li = document.createElement('li')
        ul.id = 'herbs'
        li.innerText = `${this.commonName} - ${this.latinName}`
        ul.append(li) 
        li.addEventListener('click', e => this.herbProfile(e))
    }

    herbProfile(e){
        if(e) {e.preventDefault()}
        // const par = document.createElement('p')
        // should i just hardcode this in index.html?:
        container.innerHTML = `
            <div id='herbProfile'>
                <div id='title'></div>
                <div id='latinName'></div>
                <div id='properties'></div>
                <div id='medicinalUses'></div>
                <div id='spiritualUses'></div>
                <div id='history'></div>
                <button id="editBtn">Edit Herb Profile</button>
            </div>
        `
        this.profileContentCreator()
    }

    // trying to use HTML here instead of having to create div ids on a bunch of div variables
    profileContentCreator(){
        // can i make these into an object or something?
        const par = document.createElement('p')
        const title = document.getElementById('title')
        const latinName = document.getElementById('latinName')
        const spiritualUses = document.getElementById('spiritualUses')
        const history = document.getElementById('history')
        const medicinalUses = document.getElementById('medicinalUses')
        const properties = document.getElementById('properties')
        const editBtn = document.getElementById('editBtn')
       
        // should i just prefill this into the HTML string in herbProfile??
        title.innerHTML = `<h1>${this.commonName}</h1>`
        latinName.innerHTML = `<h3>Latin Name:</h3>${this.latinName}<br>`
        properties.innerHTML = `<h3>Medicinal Properties:</h3>`
        medicinalUses.innerHTML = `<h3>Medicinal Uses:</h3>${this.medicinalUses}<br>`
        spiritualUses.innerHTML = `<h3>Spiritual Uses:</h3>${this.spiritualUses}<br>`
        history.innerHTML = `<h3>History:</h3> ${this.history}<br>`

        this.properties.forEach(p => par.innerHTML += `${p.name}, `)
        properties.append(par)

        editBtn.addEventListener('click', (e) => this.editForm(e))
    }

    static newHerbForm(e){
        e.preventDefault()
        Herb.clearContainer()
        
        const herbForm = `
        <form id="herbForm">
                <h1>Create a New Herb Profile:</h1><br>
                ${formContent.call({})}

                <label>Medicinal Properties:</label><br>
                    <ul>
                        <li>You can use a combination of checkboxes & manual entry</li>
                        <li>Don't worry about entering something twice</li>
                    </ul>
                <input id='properties' class="herbform" type="text" placeholder="Use comma-separated-values, ie astringent, vulnerary"><br>
                <span class='checkbox'></span>
                <input type="submit" value="Create New Herb Profile">
            </form>`

        container.innerHTML = herbForm
        const propertiesInput = document.getElementById('properties')
        propertiesInput.addEventListener('click', e => e.target.value = "")
        this.appendCheckboxes()
        const formFound = document.getElementById('herbForm')
        formFound.addEventListener('submit', e => {
            this.newHerbProperties(e)
        }) 
    }

    static appendCheckboxes(){
        const checkbox = document.getElementsByClassName('checkbox')[0]
        Property.allProperties.sort((a, b) => {
            if (a.name < b.name) {return -1}
            if (a.name > b.name) {return 1}
            return 0
        })
        Property.allProperties.forEach(p => {
            const cb = document.createElement('input')
            const label = document.createElement('label')
            label.innerText = p.name
            label.id = p.id
            // want to add event listener to take us to property show page w/ definition:
            // label.addEventListener('click', e => this.fetchProperty(e))
            cb.setAttribute('type', 'checkbox')
            cb.id = p.id
            cb.name = p.name
            cb.className = 'cb'
            checkbox.appendChild(cb)
            checkbox.appendChild(label)
        })
    }

    editForm(e){
        e.preventDefault()
        // where should this form live?:
        debugger
        const form = `
        <form id="editForm">
                <h1>Edit Herb Profile:</h1><br>
                ${formContent.call(this)} 
                <label id='prop'>Medicinal Properties:</label>
                <span class='checkbox'></span><br>
                <input id='submitBtn' type="submit" value="Edit Herb Profile">
        </form> `
        
        Herb.clearContainer()
        container.innerHTML = form
        
        debugger
        const formFound = document.getElementById('editForm')
        const checkboxProperties = []
        const checkbox = document.querySelectorAll('.cb')
        const common = document.getElementById('common').value
        const latin = document.getElementById('latin').value
        const medicinal = document.getElementById('medicinal').value
        const history = document.getElementById('history').value
        const spiritual = document.getElementById('spiritual').value

        checkbox.forEach(cb => cb.checked ? checkboxProperties.push(parseInt(cb.id)) : cb)

        const herbAttributes = {herb: {
            common_name: common,
            latin_name: latin,
            property_ids: checkboxProperties,
            medicinal_uses: medicinal,
            history: history,
            spiritual_uses: spiritual
        }}

        // is it ok to use Herb here instead of this?
        Herb.appendCheckboxes()
        document.querySelectorAll('.cb').forEach( cb => {
            this.propertyIds.includes(parseInt(cb.id)) ? cb.checked = true : cb.checked = false
        })
        
        formFound.addEventListener('submit', e => this.submitEdit(e, herbAttributes))
    }

    submitEdit(e, herbAttributes){
        e.preventDefault()
        // const checkboxProperties = []
        // const checkbox = document.querySelectorAll('.cb')
        // const common = document.getElementById('common').value
        // const latin = document.getElementById('latin').value
        // const medicinal = document.getElementById('medicinal').value
        // const history = document.getElementById('history').value
        // const spiritual = document.getElementById('spiritual').value

        // checkbox.forEach(cb => cb.checked ? checkboxProperties.push(parseInt(cb.id)) : cb)

        // create single source for the body here and for posting a new herb
        const options = {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({herbAttributes})
        }

        fetch(`http://localhost:3000/herbs/${this.id}`, options)
        .then(resp => resp.json())
        .then(herbObj => {
            const herb = Herb.allHerbs.find(h => h.id === herbObj.id)
            herb.updateAttributes(herbObj)
            herb.herbProfile(e)
        })
    }

    updateAttributes(herbObj){
        this.commonName = herbObj.commonName
        this.latinName = herbObj.latinName
        this.spiritualUses = herbObj.spiritualUses
        this.history = herbObj.history
        this.medicinalUses = herbObj.medicinalUses
        this.propertyIds = herbObj.propertyIds
    }
    
    static newHerbProperties(e){
        e.preventDefault()
        const common = document.getElementById('common').value
        const latin = document.getElementById('latin').value
        const properties = document.getElementById('properties').value.toLowerCase().split(', ')
        const medicinal = document.getElementById('medicinal').value
        const history = document.getElementById('history').value
        const spiritual = document.getElementById('spiritual').value
        const checkboxProperties = []
        const checkbox = document.querySelectorAll('.cb')

        checkbox.forEach(cb => {
            if(properties.includes(cb.name)) {properties.splice(properties.indexOf(cb.name))}
            if(cb.checked) {checkboxProperties.push(parseInt(cb.id))}
        })

        let properties_attributes = {}
        for(let i=0; i < properties.length; i++){
            let o = {}
            o[i] = {name: properties[i]}
            properties_attributes = Object.assign(properties_attributes, o)
        }

        const herbAttributes = {herb: {
            common_name: common,
            latin_name: latin,
            property_ids: checkboxProperties,
            properties_attributes: properties_attributes,
            medicinal_uses: medicinal,
            history: history,
            spiritual_uses: spiritual
        }}

        this.postHerb(e, herbAttributes)
    }

    static postHerb(e, herbAttributes){
        e.preventDefault()
        
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(herbAttributes)
        }

       e.target.reset()

        fetch(herbsURL, options)
            .then(resp => resp.json())
            // is there a way to clean this up??
            .then(herbObj => {
                if(herbObj.commonName && herbObj.latinName && herbObj.properties){
                    
                    const herb = new Herb(herbObj)
                    herb.herbProfile()
                    debugger
                    // do i need to check length on p.name to make sure it doesn't save empty strings?
                    herbObj.properties.forEach(p => {if (!Property.allProperties.includes(p) && p.name) {new Property(p)}}) 
                // do i need to check length on common and latin names to make sure it doesn't save empty strings?
                } else if (herbObj.commonName && herbObj.latinName){
                    const herb = new Herb(herbObj)
                    herb.herbProfile()
                } else if (herbObj.properties){
                    herbObj.properties.forEach(p => new Property(p)) 
                } else {
                    throw new Error(herbObj.message)
                }
            }).catch((err) => alert(err))
    }
}

