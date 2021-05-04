class Herb {
    constructor({id, latinName, history, commonName, medicinalUses, spiritualUses}){
        this.id = id
        this.commonName = commonName
        this.latinName = latinName
        this.medicinalUses = medicinalUses
        this.history = history
        this.spiritualUses = spiritualUses
    }

    // constructor(herb){
    //     console.log('con:', herb)
    //     console.log('c:', herb.attribute)
    //     this.common_name = herb.common_name
    //     this.latin_name = herb.latin_name
    //     this.medicinal_uses = herb.medicinal_uses
    //     this.history = herb.history
    //     this.spiritual_uses = herb.spiritual_uses
    // }
    
    static getHerbs() {
        // fetch herbs
        fetch('http://localhost:3000/herbs')
        .then(resp => resp.json())
        .then(herbs => {
            this.displayHerbs(herbs)
        })
    }

    static displayHerbs(herbs){
        for(let herb of herbs){
            const h = new Herb(herb)
            console.log('herb:', herb)
            console.log('h:', h)
            h.displayHerb()
        }
    }

    displayHerb(){
        const div = document.getElementById('herbs')
        const ul = document.createElement('ul')
        const li = document.createElement('li')
        console.log(this)
        li.innerText = `${this.commonName} - ${this.latinName}`

        
    }


}