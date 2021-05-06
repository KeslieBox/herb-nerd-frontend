class Property{
    static allProperties = []

    constructor({id, name}){
        this.id = id
        this.name = name
        Property.allProperties.push(this)
    }

    static fetchProperties(){
        fetch('http://localhost:3000/properties')
            .then(resp => resp.json())
            .then(properties => { 
                properties.forEach(p => {
                    if (!Property.allProperties.includes(p)){
                        new Property(p)
                    }
                })
            })
    }

    // don't think i need this anymore
    // appendPropertyToProfile(par){
    //     par.innerHTML += `${this.name}, `
    // }

    static createCheckboxes(prop){
        this.allProperties.forEach(p => {
            const cb = document.createElement('input')
            const label = document.createElement('label')
            label.innerText = p.name
            cb.setAttribute('type', 'checkbox')
            cb.value = p.name
            cb.innerText = p.name
            prop.appendChild(cb)
            prop.appendChild(label)
            // prop.innerText += p.name
        })
        
    }

}
