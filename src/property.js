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
    // this returns the properties for the herb profile
    appendProperty(){
        if (this.propertyIds.includes(property.id)){
            const p = document.createElement('p')
            p.innerHTML += `${property.name}, `
            return propDiv.append(p) 
        }
    }
}
