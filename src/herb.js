class Herb {
    static allHerbs = []

    constructor({id, latinName, history, commonName, medicinalUses, spiritualUses, properties, qualities}){
        this.id = id
        this.commonName = commonName
        this.latinName = latinName
        this.medicinalUses = medicinalUses
        this.history = history
        this.spiritualUses = spiritualUses
        qualities.forEach(q => {
            const qual = new Quality(q)
            console.log('q:', qual)
            })
        properties.forEach(p => {
            const prop = new Property(p)
            console.log(prop)
            })
        Herb.allHerbs.push(this)
    }

    // constructor(herb){
    //     console.log('con:', herb)
    //     console.log('prop:', herb.properties)
    //     this.common_name = herb.common_name
    //     this.latin_name = herb.latin_name
    //     this.medicinal_uses = herb.medicinal_uses
    //     this.history = herb.history
    //     this.spiritual_uses = herb.spiritual_uses
    // }

    get properties(){
        return Property.allProperties.filter(property => property.herbId === property.id)
    }

    get qualities(){   
        debugger 
        return Quality.allQualities.filter(quality => console.log('q:', quality))
    }
    
    static getHerbs() {
        // fetch herbs
        fetch('http://localhost:3000/herbs')
        .then(resp => resp.json())
        .then(herbs => {
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

    // without handling for null properties
    // herbProfile(e){
    //     e.preventDefault()
    //     const container = document.getElementById("herbsContainer")
    //     const showHerb = document.createElement('div')
    //     // need to create error handling when a property is null
    //     // need to add properties
    //     showHerb.innerHTML = `
    //         <h1>${this.commonName}</h1>
//                 <h3>Latin Name:</h3>
//                 ${this.latinName}<br><br>
//                 <h3>History:</h3>
//                 ${this.history}<br><br>
//                 <h3>Medicinal Uses:</h3>
//                 ${this.medicinalUses}<br><br>
//                 <h3>Spiritual Uses:</h3>
//                 ${this.spiritualUses}
    //         `
    //     showHerb.id = 'herbProfile'
    //     container.innerText = ""
    //     container.append(showHerb)
    // }

    herbProfile(e){
        e.preventDefault()
        const container = document.getElementById("herbsContainer")
        container.innerText = ""
        const title = document.createElement('h1')
        title.innerText = this.commonName
        container.append(title)
        this.profileContentCreator(container)
        console.log(this.qualities)
    }

    profileContentCreator(container){
        // need to add properties
        // let latinName, history, medicinalUses, spiritualUses
        let latinName = document.createElement('div')
        let spiritualUses = document.createElement('div')
        let history = document.createElement('div')
        let medicinalUses = document.createElement('div')

        if(!this.latinName){
            latinName.innerHTML = `<h3>Latin Name:</h3><br>`
        } else {
            latinName.innerHTML = `
            <h3>Latin Name:</h3>
            ${this.latinName}<br><br>`
        }

        if(!this.medicinalUses){
            medicinalUses.innerHTML = `<h3>Medicinal Uses:</h3><br>`
        } else {
            medicinalUses.innerHTML = `
            <h3>Medicinal Uses:</h3>
            ${this.medicinalUses}<br><br>`
        }

        if(!this.history){
            history.innerHTML = `<h3>History:</h3><br>`
        } else {
            history.innerHTML = `
            <h3>History:</h3>
            ${this.history}<br><br>`
        }

        if(!this.spiritualUses){
            spiritualUses.innerHTML = `<h3>Spiritual Uses:</h3><br>`
        } else {
            spiritualUses.innerHTML = `
            <h3>Spiritual Uses:</h3>
            ${this.spiritualUses}<br><br>`
        }
        container.append(latinName)
        container.append(medicinalUses)
        container.append(history)
        container.append(spiritualUses)
    }

    


}