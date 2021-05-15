const herbsURL = 'http://localhost:3000/herbs'
const container = document.getElementById('herbsContainer')
const propNames = Property.allProperties.map(p => p.name)
// const checkboxProperties = []
// const checkbox = document.querySelectorAll('.cb')
// const common = document.getElementById('common').value
// const latin = document.getElementById('latin').value
// const medicinal = document.getElementById('medicinal').value
// const history = document.getElementById('history').value
// const spiritual = document.getElementById('spiritual').value

function formContent(){
     return `<label>Common Name:</label>
    <input id='common' class="herbform" type="text" value="${this.commonName || ""}"><br>
    <label>Latin Name:</label>
    <input id='latin' class="herbform" type="text" value="${this.latinName || ""}"><br>
    <label>Medicinal Uses:</label><br>
    <textarea rows = "5" cols = "60" id='medicinal' class="textarea" type="text_area" form='herbForm'>${this.medicinalUses || ""}</textarea><br>
    <label>Spiritual Uses:</label><br>
    <textarea rows = "5" cols = "60" id='spiritual' class="textarea" type="text_area" form='herbForm'>${this.spiritualUses || ""}</textarea><br>
    <label>History:</label><br>
    <textarea rows = "5" cols = "60" id='history' class="textarea" type="text_area" form='herbForm'>${this.history || ""}</textarea><br>`
}

// can i abstract this somehow??
function alphabetize(){
    if (a.name < b.name) {return -1}
    if (a.name > b.name) {return 1}
    return 0
}

class Herb {
    static allHerbs = []

    constructor({id, latinName, history, commonName, medicinalUses, spiritualUses, propertyIds}){
        const blankInputText = "Looks like no one has added anything here yet, go head and be the first to tell us what you know!"
        this.id = id 
        this.commonName = commonName 
        this.latinName = latinName 
        this.medicinalUses = medicinalUses || blankInputText
        this.history = history || blankInputText
        this.spiritualUses = spiritualUses || blankInputText
        this.propertyIds = propertyIds 
        Herb.allHerbs.push(this)   
    }

    get properties(){
        return Property.allProperties.filter(property => this.propertyIds.includes(property.id))
    }  
    
    static fetchHerbs() {
        fetch(herbsURL)
            .then(resp => resp.json())
            .then(herbs => {
                if (herbs){
                    for(let herb of herbs){
                        const h = new Herb(herb)
                    }
                    this.renderHerbs()
                } else {
                    throw new Error(herb.message)
                }
            }).catch(err => alert(err))
    }

    static clearContainer(){
        container.innerHTML = ""
        return container
    }

    static renderHerbs(){
        const div = document.createElement('div')
        const ul = document.createElement('ul')
        ul.id = 'herbs'
        div.innerHTML = '<h1>Encyclopedia of Herbs</h1>'
        div.id = 'encyclopedia'
        container.append(div)
        div.append(ul)

        // how to get this to work w/ appendHerb() which needs instance of herb class
        // const mapped = this.allHerbs.map(h => h.commonName).sort()
      
        // clean this up/ make dynamic
        // this.allHerbs.sort(alphabetize(commonName))???
        this.allHerbs.sort((a, b) => {
            if (a.commonName < b.commonName) {return -1}
            if (a.commonName > b.commonName) {return 1}
            return 0
        })
        for(let herb of this.allHerbs){ herb.appendHerb()} 
       
    }

    appendHerb(){
        const ul = document.getElementById('herbs') || document.createElement('ul')
        const li = document.createElement('li')
        ul.id = 'herbs'
        li.innerText = `${this.commonName} - ${this.latinName}`
        ul.append(li) 
        li.addEventListener('click', e => this.herbProfile(e))
    }

    herbProfile(e){
        if(e) {e.preventDefault()}
        const par = document.createElement('p')
        container.innerHTML = `
            <div id='herbProfile'>
                <div id='title'><h1>${this.commonName}</h1></div>
                <div id='latinName'><h3>Latin Name:</h3>${this.latinName}<br></div>
                <div id='properties'><h3>Medicinal Properties:</h3></div>
                <div id='medicinalUses'><h3>Medicinal Uses:</h3>${this.medicinalUses}<br></div>
                <div id='spiritualUses'><h3>Spiritual Uses:</h3>${this.spiritualUses}<br></div>
                <div id='history'><h3>History:</h3> ${this.history}<br></div>
                <button id="editBtn">Edit Herb Profile</button>
            </div>
        `
        const properties = document.getElementById('properties')
        console.log(this.properties)
        this.properties.forEach(p => par.innerHTML += `${p.name}, `)
        properties.append(par)

        editBtn.addEventListener('click', (e) => this.editForm(e))
    }

    static newHerbForm(e){
        e.preventDefault()
        
        const herbForm = `
        <form id="herbForm">
                <h1>Create a New Herb Profile:</h1><br>
                ${formContent.call({})}

                <label>Medicinal Properties:</label><br>
                    <ul>
                        <li>You can use a combination of checkboxes & manual entry</li>
                        <li>Don't worry about entering something twice</li>
                    </ul>
                <input id='properties' class="herbform" type="text" placeholder="Use comma-separated-values, ie astringent, vulnerary"><br>
                <div class='checkbox'></div>
                <input type="submit" value="Create New Herb Profile">
            </form>`

        Herb.clearContainer().innerHTML = herbForm
        this.appendCheckboxes()
        const formFound = document.getElementById('herbForm')
        formFound.addEventListener('submit', e => {this.newHerbAttributes(e)}) 
    }

    static appendCheckboxes(){
        const checkbox = document.getElementsByClassName('checkbox')[0]
        // const table = document.createElement('table')
        // const row = document.createElement('tr')
      
        
        // checkbox.appendChild(table)
        // table.appendChild(row)
       
        // alphabetize properties...try to abstract this out with the other alphabetize function for encycplopedia index
        Property.allProperties.sort((a, b) => {
            if (a.name < b.name) {return -1}
            if (a.name > b.name) {return 1}
            return 0
        })


        let table = document.createElement('table'), tr, td, cell
        table.id = 'table'
        table.setAttribute('width', '100%')
        
        let i = 0
        // while( i <= Property.allProperties.length){
        for(let i = 0; i < Property.allProperties.length; i++){
            if(i%4 === 0){
                tr = document.createElement('tr')
                tr.className = 'tr'
                table.appendChild(tr)
            }
                td = document.createElement('td')
                td.innerHTML = Property.allProperties[i].name
                td.className = 'td'
                tr.appendChild(td)
        //     const cb = document.createElement('input')
        //     const label = document.createElement('label')
            // how to fill in the rest of the table row? 

            //  for(let r of table.rows){
            //     for(let i = 0; i )
            //     td = document.createElement('td')
            //     td.innerHTML = Property.allProperties[i].name
            //     td.className = 'td'
            //     r.appendChild(td)
            //  }
            // td.id = `td-${p.id}`

            // for (cell = 0; cell < 6; cell++){
            //         td = document.createElement('td')
            //         td.innerHTML = Property.allProperties[cell].name
            //         tr.appendChild(td)
            //     }

            
        //     // want to add event listener to take us to property show page w/ definition:
        //     // label.addEventListener('click', e => this.fetchProperty(e))
        //     cb.setAttribute('type', 'checkbox')
        //     cb.id = p.id
        //     cb.name = p.name
        //     cb.className = 'cb'
        //     cb.label = p.name
        //     cb.text = cb.name
        //     label.htmlFor = cb.id

        //     label.appendChild(document.createTextNode(cb.name))
            // table.appendChild(td)
            // table.appendChild(tr)
        //     table.appendChild(cb)
        //     table.appendChild(label)

            // i+=4
        }
        checkbox.appendChild(table)
    }

    // static appendCheckboxes(){
    //     const checkbox = document.getElementsByClassName('checkbox')[0]
    //     const table = document.createElement('table')
    //     table.id = 'propertiesTable'
    //     // const headerRow = document.createElement('tr')
    //     // const bodyRow = document.createElement('tr')
    //     // const th = `
    //     //     <th id='h1'>h1</th>
    //     //     <th id='h2'>h2</th>
    //     //     <th id='h3'>h3</th>
    //     //     <th id='h4'>h4</th>
    //     // `
    //     // const th2 = document.createElement('th')
    //     // table.createTBody
      
    //     checkbox.appendChild(table)    //     // table.appendChild(headerRow)
    //     // table.appendChild(bodyRow)
    //     // headerRow.innerHTML = th
    //     // alphabetize properties...try to abstract this out with the other alphabetize function for encycplopedia index
    //     Property.allProperties.sort((a, b) => {
    //         if (a.name < b.name) {return -1}
    //         if (a.name > b.name) {return 1}
    //         return 0
    //     })

    //     // after every 5 properties, make a new row of 5 below
    //     Property.allProperties.forEach(p => {
    //         const cb = document.createElement('input')
    //         const label = document.createElement('label')
    //         const td = document.createElement('td')
    //         td.id = `td-${p.id}`

    //         // code without table
    //         // checkbox.appendChild(cb)
    //         // checkbox.appendChild(label)
    //         // label.innerText = p.name
    //         // label.id = p.id

    //         const rows = []
    //         const range = (start, end, length = end - start + 1) =>
    //         Array.from({ length }, (_, i) => start + i)
            
    //         let i = 0
    //         while( i <= propNames.length){
                
    //             rows.push(range(propNames[i, i+5]))
                 
    //         i+=6
    //         }     
   
    //         // want to add event listener to take us to property show page w/ definition:
    //         // label.addEventListener('click', e => this.fetchProperty(e))
    //         cb.setAttribute('type', 'checkbox')
    //         cb.id = p.id
    //         cb.name = p.name
    //         cb.className = 'cb'
    //         cb.label = p.name
    //         cb.text = cb.name
    //         label.htmlFor = cb.id

    //         label.appendChild(document.createTextNode(cb.name))
    //         table.appendChild(td)
    //         table.appendChild(cb)
    //         table.appendChild(label)
    //     })
    // }

    editForm(e){
        e.preventDefault()
        const form = `
        <form id="editForm">
                <h1>Edit Herb Profile:</h1><br>
                ${formContent.call(this)} 
                <label id='prop'>Medicinal Properties:</label>
                <span class='checkbox'></span><br>
                <input id='submitBtn' type="submit" value="Edit Herb Profile">
        </form> `
        
        Herb.clearContainer().innerHTML = form
        
        const formFound = document.getElementById('editForm')
        const checkboxProperties = []
        const checkbox = document.querySelectorAll('.cb')
        const common = document.getElementById('common').value
        const latin = document.getElementById('latin').value
        const medicinal = document.getElementById('medicinal').value
        const history = document.getElementById('history').value
        const spiritual = document.getElementById('spiritual').value

        // checkbox.forEach(cb => cb.checked ? checkboxProperties.push(parseInt(cb.id)) : cb)

        // const herbAttributes = {herb: {
        //     common_name: common,
        //     latin_name: latin,
        //     property_ids: checkboxProperties,
        //     medicinal_uses: medicinal,
        //     history: history,
        //     spiritual_uses: spiritual
        // }}

        // is it ok to use Herb here instead of this?
        Herb.appendCheckboxes()
        document.querySelectorAll('.cb').forEach( cb => {
            this.propertyIds.includes(parseInt(cb.id)) ? cb.checked = true : cb.checked = false
        })
        
        formFound.addEventListener('submit', e => this.submitEdit(e))
    }

    submitEdit(e){
        e.preventDefault()
    
        const checkboxProperties = []
        const checkbox = document.querySelectorAll('.cb')
        const common = document.getElementById('common').value
        const latin = document.getElementById('latin').value
        const medicinal = document.getElementById('medicinal').value
        const history = document.getElementById('history').value
        const spiritual = document.getElementById('spiritual').value
        // for trying out adding new properties here, also need to change the form to have this input
        // const properties = document.getElementById('properties').value.toLowerCase().split(', ')

        checkbox.forEach(cb => cb.checked ? checkboxProperties.push(parseInt(cb.id)) : cb)
        // create single source for the body for edit and for posting a new herb
        // experiment with adding new properties here, need to add properties_attributes to request body
        // let properties_attributes = {}
        // for(let i=0; i < properties.length; i++){
        //     let o = {}
        //     o[i] = {name: properties[i]}
        //     properties_attributes = Object.assign(properties_attributes, o)
        // }
        const options = {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                herb: {
                common_name: common,
                latin_name: latin,
                property_ids: checkboxProperties,
                medicinal_uses: medicinal,
                history: history,
                spiritual_uses: spiritual
                }
            })
        }

        fetch(`http://localhost:3000/herbs/${this.id}`, options)
        .then(resp => resp.json())
        .then(herbObj => {
            const herb = Herb.allHerbs.find(h => h.id === herbObj.id)
            // can i make a post request from inside of here to make new properties while in edit form? and then update edit and new forms to be even more the same??
            // if (herb.properties){
            //     herbObj.properties.forEach(p => {if (!Property.allProperties.includes(p) && p.name) {new Property(p)}}) 
            // }
            herb.updateAttributes(herbObj)
            herb.herbProfile(e)
        })
    }

    updateAttributes(herbObj){
        this.commonName = herbObj.commonName
        this.latinName = herbObj.latinName
        this.spiritualUses = herbObj.spiritualUses
        this.history = herbObj.history
        this.medicinalUses = herbObj.medicinalUses
        this.propertyIds = herbObj.propertyIds 
    }
    
    static newHerbAttributes(e){
        e.preventDefault()
        const common = document.getElementById('common').value
        const latin = document.getElementById('latin').value
        const medicinal = document.getElementById('medicinal').value
        const history = document.getElementById('history').value
        const spiritual = document.getElementById('spiritual').value
        const properties = document.getElementById('properties').value.toLowerCase().split(', ')
        const checkboxProperties = []
        const checkbox = document.querySelectorAll('.cb')

        checkbox.forEach(cb => {
            if(properties.includes(cb.name)) {properties.splice(properties.indexOf(cb.name))}
            if(cb.checked) {checkboxProperties.push(parseInt(cb.id))}
        })

        let properties_attributes = {}
        for(let i=0; i < properties.length; i++){
            let o = {}
            o[i] = {name: properties[i]}
            properties_attributes = Object.assign(properties_attributes, o)
        }

        const herbAttributes = {herb: {
            common_name: common,
            latin_name: latin,
            property_ids: checkboxProperties,
            properties_attributes: properties_attributes,
            medicinal_uses: medicinal,
            history: history,
            spiritual_uses: spiritual
        }}

        this.postHerb(e, herbAttributes)
    }

    static postHerb(e, herbAttributes){
        e.preventDefault()
        
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(herbAttributes)
        }

       e.target.reset()

        fetch(herbsURL, options)
            .then(resp => resp.json())
            .then(herbObj => {
                let herbNames = Herb.allHerbs.map(h => h.commonName)
                let propNames = Property.allProperties.map(p => p.name)
                let herb = Herb.allHerbs.find(herb => herb.commonName === herbObj.commonName) 
                if(herbObj.commonName && herbObj.latinName){  
                    if (!herbNames.includes(herbObj.commonName)) { herb = new Herb(herbObj)}
                    if (herbObj.properties){
                        herbObj.properties.forEach(p => {
                            if(!propNames.includes(p.name)) {new Property(p)} 
                            if(!herb.propertyIds.includes(p.id)) {herb.propertyIds.push(p.id)}
                        }) 
                    } 
                    herb.herbProfile()
                } else {
                    throw new Error(herbObj.message)
                }
            }).catch((err) => alert(err))
    }
}

