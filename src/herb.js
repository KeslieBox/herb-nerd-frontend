const herbsURL = 'http://localhost:3000/herbs'
const container = document.getElementById('herbsContainer')
class Herb {
    static allHerbs = []

    constructor({id, latinName, history, commonName, medicinalUses, spiritualUses, propertyIds}){
        // do i need id?
        this.id = id || ""
        this.commonName = commonName || ""
        this.latinName = latinName || ""
        this.medicinalUses = medicinalUses || ""
        this.history = history || ""
        this.spiritualUses = spiritualUses || ""
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
                // do i need to create new herb here for frontend?
                if (herbs){
                    this.renderHerbs(herbs)
                    for(let herb of herbs){
                        const h = new Herb(herb)
                        h.appendHerb()
                    }
                    // this.renderHerbs(herbs)
                } else {
                    throw new Error(herb.message)
                }
            }).catch(err => alert(err))
    }

    static renderHerbs(herbs){
        const div = document.createElement('div')
        const ul = document.createElement('ul')
        const herbForm = document.getElementById('herbForm')

        ul.id = 'herbs'
        div.innerHTML = '<h1>Encyclopedia of Herbs</h1>'
        container.append(div)
        div.append(ul)
        herbForm.addEventListener('submit', e => this.postHerb(e))

        // for(let herb of herbs){
        //     const h = new Herb(herb)
        //     h.appendHerb()
        // }    
       
    }

    appendHerb(){
        // debugger
        // const div = getElementById('herbs')
        const ul = document.getElementById('herbs')
        const li = document.createElement('li')
        // div.innerText = 'Encyclopedia of Herbs'
        li.innerText = `${this.commonName} - ${this.latinName}`
        ul.append(li) 
        li.addEventListener('click', e => this.herbProfile(e))
        // container.append(div)
        // div.append(ul)
        // div.append(ul)
        // ul.append(li)   
    }

    herbProfile(e){
        e.preventDefault()
      
        const par = document.createElement('p')
        // should i just hardcode this in index.html?:
        container.innerHTML = `
            <div id='herbProfile'</div>
                <div id='title'></div>
                <div id='latinName'></div>
                <div id='properties'></div>
                <div id='medicinalUses'></div>
                <div id='spiritualUses'></div>
                <div id='history'></div>
                <button id="editBtn">Edit Herb Profile</button>
            </div>
        `
        this.profileContentCreator(par)
    }

    // trying to use HTML here instead of having to create div ids on a bunch of div variables
    profileContentCreator(par){
        // can i make these into an object or something?
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

        // how to extract more of this into appendPropertyToProfile?
        this.properties.forEach(p => par.innerHTML += `${p.name}, `)
        properties.append(par)

        // is this ridiculous to do this? could i turn these into an object or something instead?
        editBtn.addEventListener('click', (e) => this.editForm(e))
    }

    editForm(e){
        e.preventDefault()
        // where should this form live?:
        const form = `
        <form id="editForm">
                <h1>Edit Herb Profile:</h1><br>
                <label>Common Name:</label>
                <input id='common' type="text" value="${this.commonName}"><br>
                <label>Latin Name:</label>
                <input id='latin' type="text" value="${this.latinName}"><br><br>
                <label>Medicinal Uses:</label><br>
                <textarea rows = "5" cols = "60" id='medicinal' type="text_area" form='herbForm'>${this.medicinalUses}</textarea><br>
                <label>Spiritual Uses:</label><br>
                <textarea rows = "5" cols = "60" id='spiritual' type="text_area" form='herbForm'>${this.spiritualUses}</textarea><br><br>
                <label>History:</label><br>
                <textarea rows = "5" cols = "60" id='history' type="text_area" form='herbForm'>${this.history}</textarea><br>
                <label id='prop'>Medicinal Properties:</label>
                <span class='checkbox'></span><br>
                <input id='submitBtn' type="submit" value="Edit Herb Profile">
        </form> `
        
        container.innerHTML = form
        const formFound = document.getElementById('editForm')
        const checkbox = document.getElementsByClassName('checkbox')[0]
        this.appendCheckboxes(checkbox)
        
        formFound.addEventListener('submit', e => this.submitEdit(e))
    }

    // should this stay here or since it's duplicated in properties should i find a way to leave it there?
    appendCheckboxes(checkbox){
        Property.allProperties.forEach(p => {
            const cb = document.createElement('input')
            const label = document.createElement('label')
            if (document.getElementById('editForm')){
                this.propertyIds.includes(p.id) ? cb.checked = true : cb.checked = false
                 // how to keep this locally here instead of global?
                // const checkboxes = []
                label.innerText = p.name
                label.id = p.id
                // want to add event listener to take us to property show page:
                // label.addEventListener('click', e => this.fetchProperty(e))
                cb.setAttribute('type', 'checkbox')
                cb.id = p.id
                cb.className = 'cb'
                checkbox.appendChild(cb)
                checkbox.appendChild(label)
            } 
            // else {
            //     label.innerText = p.name
            //     label.id = p.id
            //     // // want to add event listener to take us to property show page:
            //     // // label.addEventListener('click', e => this.fetchProperty(e))
            //     cb.setAttribute('type', 'checkbox')
            //     cb.id = p.id
            //     cb.className = 'cb'
            //     checkbox.appendChild(cb)
            //     checkbox.appendChild(label)
            // }
             
        })
    }

    // aka appendCheckboxesToNewHerbForm? will it do anything else?
    // newHerbForm(){

    //     const checkbox = document.getElementsByClassName('checkbox')[0]
    //     // const checkboxProperties = []
    //     const cb = document.querySelectorAll('.cb')
    //     this.appendCheckboxes(checkbox)
    //     // cb.forEach(cb => !checkboxProperties.includes(parseInt(cb.id)) ? checkboxProperties.push(parseInt(cb.id)) : cb)
    // }

    submitEdit(e){
        e.preventDefault()
        const checkboxProperties = []
        const checkbox = document.querySelectorAll('.cb')
        const common = document.getElementById('common').value
        const latin = document.getElementById('latin').value
        const medicinal = document.getElementById('medicinal').value
        const history = document.getElementById('history').value
        const spiritual = document.getElementById('spiritual').value

        checkbox.forEach(cb => cb.checked ? checkboxProperties.push(parseInt(cb.id)) : cb)

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
            console.log('h:', herbObj)
            const herb = Herb.allHerbs.find(h => h.id === herbObj.id)
            herb.updateAttributes(herbObj)
            // go back to herb profile after updated
            console.log(this)
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
    
    static postHerb(e){
        e.preventDefault()

        const checkboxProperties = []
        const checkbox = document.querySelectorAll('.cb')
        const common = document.getElementById('common').value
        const latin = document.getElementById('latin').value
        const properties = document.getElementById('properties').value.toLowerCase().split(', ')
        const medicinal = document.getElementById('medicinal').value
        const history = document.getElementById('history').value
        const spiritual = document.getElementById('spiritual').value
        checkbox.forEach(cb => cb.checked ? checkboxProperties.push(parseInt(cb.id)) : cb)

        let properties_attributes = {}
        for(let i=0; i < properties.length; i++){
            let o ={}
            o[i] = {name: properties[i]}
            properties_attributes = Object.assign(properties_attributes, o)
        }

        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                herb: {
                    common_name: common,
                    latin_name: latin,
                    property_ids: checkboxProperties,
                    properties_attributes: properties_attributes,
                    medicinal_uses: medicinal,
                    history: history,
                    spiritual_uses: spiritual
                }
            })
        }

    //    e.target.reset()
        fetch(herbsURL, options)
            .then(resp => resp.json())
            .then(herbObj => {
                if(herbObj.commonName && herbObj.latinName && herbObj.properties){
                    const herb = new Herb(herbObj)
                    herb.appendHerb()
                    herbObj.properties.forEach(p => new Property(p)) 
                } else if (herbObj.commonName && herbObj.latinName){
                    const herb = new Herb(herbObj)
                    herb.appendHerb()
                } else if (herbObj.properties){
                    herbObj.properties.forEach(p => new Property(p)) 
                } else {
                    throw new Error(herbObj.message)
                }
            }).catch((err) => alert(err))
    }
}

