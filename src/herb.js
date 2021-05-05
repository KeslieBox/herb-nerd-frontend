// should i make this a chunk of HTML and give the divs ids as done below? is there a way to put these inside the class or are they ok here?
let latDiv = document.createElement('div')
let spiritDiv = document.createElement('div')
let historyDiv = document.createElement('div')
let medDiv = document.createElement('div')
let propDiv = document.createElement('div')

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
        // how to link up herb w/ property?
        // return Property.allProperties.filter(property => {
            // pull this out into instance method in property class that handles creating/ appending to dom
            // if (this.propertyIds.includes(property.id)){
            //     const p = document.createElement('p')
            //     p.innerHTML += `${property.name}, `
            //     return propDiv.append(p) 
            // }
        // })
        return Property.allProperties.filter(property =>this.propertyIds.includes(property.id))
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
        const container = document.getElementById("herbsContainer")
        container.innerText = ""
        const title = document.createElement('h1')
        title.innerText = this.commonName
        container.append(title)
        this.profileContentCreator(container)
    }

    profileContentCreator(container){
        // how to clean this up??

        const par = document.createElement('p')
        // give divs ids?
        // let latinName = document.createElement('div')
        // let spiritualUses = document.createElement('div')
        // let history = document.createElement('div')
        // let medicinalUses = document.createElement('div')
        // let properties = document.createElement('div')

        // should i do something like this instead? and then create variable to represent the found div element?
        // const herbProfile = `
        //     <div id='latinName'></div>
        //     <div id='properties'></div>
        //     <div id='medicinalUses'></div>
        //     <div id='history'></div>
        //     <div id='spiritualUses'></div>
        // `
        // container.append(herbProfile)

        latDiv.innerHTML = `<h3>Latin Name:</h3> ${this.latinName}<br><br>`

        propDiv.innerHTML = `<h3>Properties:</h3>`
        this.properties.forEach(p => p.appendProperty(par))

        medDiv.innerHTML = `<h3>Medicinal Uses:</h3> ${this.medicinalUses}<br><br>`
        historyDiv.innerHTML = `<h3>History:</h3> ${this.history}<br><br>`
        spiritDiv.innerHTML = `<h3>Spiritual Uses:</h3> ${this.spiritualUses}<br><br>`

        propDiv.append(par) 
        container.append(latDiv)
        container.append(propDiv)
        container.append(medDiv)
        container.append(historyDiv)
        container.append(spiritDiv)
    }


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
            let herb = new Herb(herbObj.common_name)
            herb.displayHerb()
        })
    }
}