class Quality{
    static allQualities = []

    constructor({id, herbId, propertyId}){
        this.id = id
        this.herbId = herbId
        this.propertyId = propertyId
        Quality.allQualities.push(this)
    }


}