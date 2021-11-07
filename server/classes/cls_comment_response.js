class CommentResponse {
    constructor(text, user, id, recipient_user, to_comment_id) {
        this.text = text;
        this.user = user;
        this.author = null;
        this.send_time = new Date();
        this.id = id;
        this.recipient_user = recipient_user;
        this.to_comment_id = to_comment_id;
        this.responses = []
    }
}

module.exports = CommentResponse;
