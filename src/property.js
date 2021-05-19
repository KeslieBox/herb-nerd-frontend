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
                properties.forEach(p => {
                    if (!Property.allProperties.includes(p) && p.name){
                        new Property(p)
                    // }else if(Property.allProperties.includes(p) && p.name){

                    // }else {
                    //     throw new Error(p.message)
                    }
                })
                // need to call when new herb and edit herb forms are being created 
                // this.appendCheckboxes()
            }).catch(err => alert(err))
    }

    // want to add event listener to take us to property show page
    // fetchProperty(e){
    //     debugger
    // }

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
