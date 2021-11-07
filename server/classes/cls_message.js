class Message {
    constructor (author, text,  id) {
        this.text = text
        this.user = author
        this.send_time = new Date()
        this._id = id 
    }
    
}

module.exports = Message