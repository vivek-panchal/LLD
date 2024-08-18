const Post = require('./Post');

class User {
    constructor(userId) {
        this.userId = userId;
        this.followed = new Set();
        this.postMap = new Map();
        this.head = new Post(-1);
        this.tail = new Post(-1);
        this.head.next = this.tail;
        this.tail.prev = this.head;

        this.follow(userId); // A user follows themselves by default
    }

    follow(userId) {
        this.followed.add(userId);
    }

    unfollow(userId) {
        this.followed.delete(userId);
    }

    createPost(postId) {
        const post = new Post(postId);
        this.postMap.set(postId, post);
        const next = this.head.next;
        this.head.next = post;
        post.prev = this.head;
        post.next = next;
        next.prev = post;
    }

    deletePost(postId) {
        const post = this.postMap.get(postId);
        if (!post) return;
        const prev = post.prev;
        const next = post.next;
        prev.next = next;
        next.prev = prev;
        this.postMap.delete(postId);
    }
}

module.exports = User;
