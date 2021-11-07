
class Comment {
    constructor (text, user, id) {
        this.text = text
        this.user = user
        this.author = null
        this.send_time = new Date()
        this.id = id
        this.responses = []
    }
}


module.exports = Comment