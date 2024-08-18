class Post {
    constructor(id) {
        this.id = id;
        this.time = Post.timestamp++;
        this.prev = null;
        this.next = null;
    }

    static timestamp = 0;
}

module.exports = Post;
