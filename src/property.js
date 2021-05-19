class Property {
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
                if (properties){
                    for(let p of properties) {
                        new Property(p)
                    }
                }
            }).catch(err => alert(err))
    }

    // not using this yet
    static postProperty(p){
       
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                property: {
                    name: p
                }
            })
        }

        fetch('http://localhost:3000/properties', options)
            .then(resp => resp.json())
            .then(propObj => {
                new Property(propObj)
            })
    }

}
