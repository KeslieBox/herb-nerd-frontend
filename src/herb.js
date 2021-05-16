const herbsURL = 'http://localhost:3000/herbs'
const container = document.getElementById('herbsContainer')
const propNames = Property.allProperties.map(p => p.name)
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
    <input id='latin' class="herbform" type="text" value="${this.latinName || ""}"><br>
    <label>Medicinal Uses:</label><br>
    <textarea rows = "5" cols = "60" id='medicinal' class="textarea" type="text_area" form='herbForm'>${this.medicinalUses || ""}</textarea><br>
    <label>Spiritual Uses:</label><br>
    <textarea rows = "5" cols = "60" id='spiritual' class="textarea" type="text_area" form='herbForm'>${this.spiritualUses || ""}</textarea><br>
    <label>History:</label><br>
    <textarea rows = "5" cols = "60" id='history' class="textarea" type="text_area" form='herbForm'>${this.history || ""}</textarea><br>`
}

// can i abstract this somehow??
function alphabetize(){
    if (a.name < b.name) {return -1}
    if (a.name > b.name) {return 1}
    return 0
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
        return container
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
        const par = document.createElement('p')
        container.innerHTML = `
            <div id='herbProfile'>
                <div id='title'><h1>${this.commonName}</h1></div>
                <div id='latinName'><h3>Latin Name:</h3>${this.latinName}<br></div>
                <div id='properties'><h3>Medicinal Properties:</h3></div>
                <div id='medicinalUses'><h3>Medicinal Uses:</h3>${this.medicinalUses}<br></div>
                <div id='spiritualUses'><h3>Spiritual Uses:</h3>${this.spiritualUses}<br></div>
                <div id='history'><h3>History:</h3> ${this.history}<br></div>
                <button id="editBtn">Edit Herb Profile</button>
            </div>
        `
        const properties = document.getElementById('properties')
        console.log(this.properties)
        this.properties.forEach(p => par.innerHTML += `${p.name}, `)
        properties.append(par)

        editBtn.addEventListener('click', (e) => this.editForm(e))
    }

    static newHerbForm(e){
        e.preventDefault()
        
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

        Herb.clearContainer().innerHTML = herbForm
        this.appendCheckboxes()
        const formFound = document.getElementById('herbForm')
        formFound.addEventListener('submit', e => {this.newHerbAttributes(e)}) 
    }

    static appendCheckboxes(){
        const checkbox = document.getElementsByClassName('checkbox')[0]
        let table = document.createElement('table'), tr, td
        table.id = 'table'
        table.setAttribute('width', '100%')

        // alphabetize properties...try to abstract this out with the other alphabetize function for encycplopedia index
        Property.allProperties.sort((a, b) => {
            if (a.name < b.name) {return -1}
            if (a.name > b.name) {return 1}
            return 0
        })
        
        for(let i = 0; i < Property.allProperties.length; i++){
            if(i % 4 === 0){
                tr = document.createElement('tr')
                tr.className = 'tr'
                table.appendChild(tr)
            }
            const cb = document.createElement('input')
            const label = document.createElement('label')
            td = document.createElement('td')
            td.className = 'td'
            cb.id = `cb-${Property.allProperties[i].id}`
            cb.name = Property.allProperties[i].name
            cb.className = 'cb'
            // label.htmlFor = cb.id
            // label.innerText = cb.name
            cb.setAttribute('type', 'checkbox')
            tr.appendChild(td)
            // td.appendChild(cb)
            td.appendChild(label)
            label.appendChild(cb)
            label.appendChild(document.createTextNode(cb.name))
        }
        checkbox.appendChild(table)
    }

    editForm(e){
        e.preventDefault()
        const form = `
        <form id="editForm">
                <h1>Edit Herb Profile:</h1><br>
                ${formContent.call(this)} 
                <label id='prop'>Medicinal Properties:</label>
                <span class='checkbox'></span><br>
                <input id='submitBtn' type="submit" value="Edit Herb Profile">
        </form> `
        
        Herb.clearContainer().innerHTML = form
        
        const formFound = document.getElementById('editForm')
        const checkboxProperties = []
        const checkbox = document.querySelectorAll('.cb')
        const common = document.getElementById('common').value
        const latin = document.getElementById('latin').value
        const medicinal = document.getElementById('medicinal').value
        const history = document.getElementById('history').value
        const spiritual = document.getElementById('spiritual').value

        // checkbox.forEach(cb => cb.checked ? checkboxProperties.push(parseInt(cb.id)) : cb)

        // const herbAttributes = {herb: {
        //     common_name: common,
        //     latin_name: latin,
        //     property_ids: checkboxProperties,
        //     medicinal_uses: medicinal,
        //     history: history,
        //     spiritual_uses: spiritual
        // }}

        // is it ok to use Herb here instead of this?
        Herb.appendCheckboxes()
        document.querySelectorAll('.cb').forEach( cb => {
            this.propertyIds.includes(parseInt(cb.id)) ? cb.checked = true : cb.checked = false
        })
        
        formFound.addEventListener('submit', e => this.submitEdit(e))
    }

    submitEdit(e){
        e.preventDefault()
    
        const checkboxProperties = []
        const checkbox = document.querySelectorAll('.cb')
        const common = document.getElementById('common').value
        const latin = document.getElementById('latin').value
        const medicinal = document.getElementById('medicinal').value
        const history = document.getElementById('history').value
        const spiritual = document.getElementById('spiritual').value
        // for trying out adding new properties here, also need to change the form to have this input
        // const properties = document.getElementById('properties').value.toLowerCase().split(', ')

        checkbox.forEach(cb => cb.checked ? checkboxProperties.push(parseInt(cb.id)) : cb)
        // create single source for the body for edit and for posting a new herb
        // experiment with adding new properties here, need to add properties_attributes to request body
        // let properties_attributes = {}
        // for(let i=0; i < properties.length; i++){
        //     let o = {}
        //     o[i] = {name: properties[i]}
        //     properties_attributes = Object.assign(properties_attributes, o)
        // }
        const options = {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                herb: {
                common_name: common,
                latin_name: latin,
                property_ids: checkboxProperties,
                medicinal_uses: medicinal,
                history: history,
                spiritual_uses: spiritual
                }
            })
        }

        fetch(`http://localhost:3000/herbs/${this.id}`, options)
        .then(resp => resp.json())
        .then(herbObj => {
            const herb = Herb.allHerbs.find(h => h.id === herbObj.id)
            // can i make a post request from inside of here to make new properties while in edit form? and then update edit and new forms to be even more the same??
            // if (herb.properties){
            //     herbObj.properties.forEach(p => {if (!Property.allProperties.includes(p) && p.name) {new Property(p)}}) 
            // }
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
    
    static newHerbAttributes(e){
        e.preventDefault()
        const common = document.getElementById('common').value
        const latin = document.getElementById('latin').value
        const medicinal = document.getElementById('medicinal').value
        const history = document.getElementById('history').value
        const spiritual = document.getElementById('spiritual').value
        const properties = document.getElementById('properties').value.toLowerCase().split(', ')
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
            .then(herbObj => {
                let herbNames = Herb.allHerbs.map(h => h.commonName)
                let propNames = Property.allProperties.map(p => p.name)
                let herb = Herb.allHerbs.find(herb => herb.commonName === herbObj.commonName) 
                if(herbObj.commonName && herbObj.latinName){  
                    if (!herbNames.includes(herbObj.commonName)) { herb = new Herb(herbObj)}
                    if (herbObj.properties){
                        herbObj.properties.forEach(p => {
                            if(!propNames.includes(p.name)) {new Property(p)} 
                            if(!herb.propertyIds.includes(p.id)) {herb.propertyIds.push(p.id)}
                        }) 
                    } 
                    herb.herbProfile()
                } else {
                    throw new Error(herbObj.message)
                }
            }).catch((err) => alert(err))
    }
}

