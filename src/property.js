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


    // moved to herb class
    // static appendCheckboxes(prop){
    //     // need to know what herb i'm editing, if that herb is associated, fill in check box
    //     this.allProperties.forEach(p => {
    //         const cb = document.createElement('input')
    //         const label = document.createElement('label')
    //         label.innerText = p.name
    //         // want to add event listener to take us to property show page:
    //         // label.addEventListener('click', e => this.fetchProperty(e))
    //         cb.setAttribute('type', 'checkbox')
    //         // ###need to get value of checked boxes, not value of every property
    //         // cb.value = p.name
    //         cb.innerText = p.name
    //         prop.appendChild(cb)
    //         prop.appendChild(label)
    //         // if checked, get value and add to herb's properties...give checkboxes id value here
    //         // prop.innerText += p.name
    //     })

        

        // want to add event listener to take us to property show page
        // fetchProperty(e){
        //     debugger
        // }
        
    // }

}
