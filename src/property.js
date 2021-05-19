class Property {
    static allProperties = []
    static propNames = []

    constructor({id, name}){
        this.id = id
        this.name = name
        Property.allProperties.push(this)
        Property.propNames.push(this)
    }

    // not using this yet
    static fetchProperties(){
        debugger
        fetch('http://localhost:3000/properties')
            .then(resp => resp.json())
            .then(properties => { 
                if(properties){
                    for (let p of properties){
                        new Property(p)
                    }
                            
                        // if (!Property.propNames.includes(p.name)){
                            // new Property(p)
                        // }else if(Property.allProperties.includes(p) && p.name){
                        
                        // }else {
                        //     throw new Error(p.message)
                        
                    
                }
                // need to call when new herb and edit herb forms are being created 
                // this.appendCheckboxes()
            }).catch(err => alert(err))
    }


    // should this go here or herb class?
    // static appendCheckboxes(){
    //     debugger
    //     const checkbox = document.getElementsByClassName('checkbox')[0]
    //     // const cb = document.querySelectorAll('.cb')
    //     this.allProperties.forEach(p => {
    //         const cb = document.createElement('input')
    //         const label = document.createElement('label')
    //         label.innerText = p.name
    //         label.id = p.id
    //         // want to add event listener to take us to property show page w/ definition:
    //         // label.addEventListener('click', e => this.fetchProperty(e))
    //         cb.setAttribute('type', 'checkbox')
    //         cb.id = p.id
    //         cb.name = p.name
    //         cb.className = 'cb'
    //         checkbox.appendChild(cb)
    //         checkbox.appendChild(label)
    //         // !this.allProperties.includes(p.id) ? this.allProperties.push(p.id) : p
    //     })
    // }

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
