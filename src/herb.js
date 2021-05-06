
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
        // fetch herbs
        fetch('http://localhost:3000/herbs')
            .then(resp => resp.json())
            .then(herbs => {
                // do i need to create new herb here for frontend?
                console.log('h:', herbs)
                this.displayHerbs(herbs)
            })
    }

    static displayHerbs(herbs){
        for(let herb of herbs){
            const h = new Herb(herb)
            h.displayHerb()
        }
    }

    displayHerb(){
        const div = document.getElementById('herbs')
        const ul = document.createElement('ul')
        const li = document.createElement('li')
        li.innerText = `${this.commonName} - ${this.latinName}`
        li.addEventListener('click', e => this.herbProfile(e))
        div.append(ul)
        ul.append(li)    
    }

    herbProfile(e){
        e.preventDefault()
        // should i define this globally?:
        const container = document.getElementById("herbsContainer")
        // const title = document.createElement('h1')
        const par = document.createElement('p')
        container.innerText = ""
        // title.innerText = this.commonName
        // container.append(title)
        // should i just hardcode this in index.html?:
        container.innerHTML = `
            <div id='herbProfile'</div>
                <div id='title'></div>
                <div id='latinName'></div>
                <div id='properties'></div>
                <div id='medicinalUses'></div>
                <div id='history'></div>
                <div id='spiritualUses'></div>
                <button id="editBtn">Edit Herb Profile</button>
            </div>
        `
        this.profileContentCreator(container, par)
    }

    // trying to use HTML here instead of having to create div ids on a bunch of div variables
    profileContentCreator(container, par){
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
        latinName.innerHTML = `<h3>Latin Name:</h3>${this.latinName}<br><br>`
        properties.innerHTML = `<h3>Medicinal Properties:</h3>`
        medicinalUses.innerHTML = `<h3>Medicinal Uses:</h3>${this.medicinalUses}<br><br>`
        history.innerHTML = `<h3>History:</h3> ${this.history}<br><br>`
        spiritualUses.innerHTML = `<h3>Spiritual Uses:</h3>${this.spiritualUses}<br><br>`

        // how to extract more of this into appendPropertyToProfile?
        this.properties.forEach(p => par.innerHTML += `${p.name}, `)
        properties.append(par)

        // is this ridiculous to do this? could i turn these into an object or something instead?
        editBtn.addEventListener('click', (e) => this.editForm(e))
    }

    editForm(e){
        e.preventDefault()
        const container = document.getElementById("herbsContainer")
        // where should this live
        const form = `
        <form id="herbForm">
                <h1>Edit Herb Profile:</h1><br>
                <label>Common Name:</label>
                <input id='common' type="text" value="${this.commonName}"><br>
                <label>Latin Name:</label>
                <input id='latin' type="text" value="${this.latinName}"><br><br>
                <label id='prop'>Properties:</label></div><br><br>
                <label>Medicinal Uses:</label><br>
                <textarea rows = "5" cols = "60" id='medicinal' type="text_area" value="${this.medicinalUses}"></textarea><br>
                <label>Spiritual Uses:</label><br>
                <textarea rows = "5" cols = "60" id='spiritual' type="text" value="${this.spiritualUses}"></textarea><br><br>
                <label>History:</label><br>
                <textarea rows = "5" cols = "60" id='history' type="text" value="${this.history}"></textarea><br>
                <input type="submit" value="Edit Herb Profile">
        </form><br> `
        
        container.innerHTML = form
        const prop = document.getElementById('prop')
        Property.createCheckboxes(prop)
    }


    // profileContentCreator(container, par){
    //     // how to clean this up??
    //     const latDiv = document.createElement('div')
    //     const spiritDiv = document.createElement('div')
    //     const historyDiv = document.createElement('div')
    //     const medDiv = document.createElement('div')
    //     const propDiv = document.createElement('div')

    //     // const par = document.createElement('p')

    //     latDiv.innerHTML = `<h3>Latin Name:</h3> ${this.latinName}<br><br>`
    //     propDiv.innerHTML = `<h3>Properties:</h3>`
    //     medDiv.innerHTML = `<h3>Medicinal Uses:</h3> ${this.medicinalUses}<br><br>`
    //     historyDiv.innerHTML = `<h3>History:</h3> ${this.history}<br><br>`
    //     spiritDiv.innerHTML = `<h3>Spiritual Uses:</h3> ${this.spiritualUses}<br><br>`

    //     this.properties.forEach(p => p.appendPropertyToProfile(par))
    //     propDiv.append(par) 
    //     container.append(latDiv)
    //     container.append(propDiv)
    //     container.append(medDiv)
    //     container.append(historyDiv)
    //     container.append(spiritDiv)
    // }

    static postHerb(){
        event.preventDefault()
        const common = document.getElementById('common').value
        const latin = document.getElementById('latin').value
        const properties = document.getElementById('properties').value
        const medicinal = document.getElementById('medicinal').value
        const history = document.getElementById('history').value
        const spiritual = document.getElementById('spiritual').value


        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                herb: {
                    // should i have id in here
                    // id: id,
                    common_name: common,
                    latin_name: latin,
                    properties: properties,
                    medicinal_uses: medicinal,
                    history: history,
                    spiritual_uses: spiritual
                }
            })
        }

       event.target.reset()

        fetch('http://localhost:3000/herbs', options)
        .then(resp => resp.json())
        .then(herbObj => {
            let herb = new Herb(herbObj)
            herb.displayHerb()
        })
    }

    
}