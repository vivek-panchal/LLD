const User = require('../models/User');

class Facebook {
    constructor() {
        this.userMap = new Map();
        this.PAGE_SIZE = 2;
        this.FEED_SIZE = 10;
    }

    getUser(userId) {
        if (!this.userMap.has(userId)) {
            this.userMap.set(userId, new User(userId));
        }
        return this.userMap.get(userId);
    }

    createPost(userId, postId) {
        const user = this.getUser(userId);
        user.createPost(postId);
        console.log(`User ${userId} posted ${postId}`);
    }

    deletePost(userId, postId) {
        const user = this.getUser(userId);
        user.deletePost(postId);
        console.log(`User ${userId} deleted post ${postId}`);
    }

    follow(followerId, followeeId) {
        const follower = this.getUser(followerId);
        const followee = this.getUser(followeeId);
        follower.follow(followeeId);
        console.log(`User ${followerId} followed User ${followeeId}`);
    }

    unfollow(followerId, followeeId) {
        const follower = this.getUser(followerId);
        follower.unfollow(followeeId);
        console.log(`User ${followerId} unfollowed User ${followeeId}`);
    }

    getNewsFeed(userId) {
        const feed = this.fetchTopNPosts(userId, this.FEED_SIZE);
        console.log(`Feed for user ${userId}`);
        feed.forEach((postId, i) => console.log(`Post ${i + 1}: ${postId}`));
    }

    getNewsFeedPaginated(userId, pageNumber) {
        const user = this.userMap.get(userId);
        if (!user) return;
        const feed = this.fetchTopNPosts(userId, Infinity);
        const start = pageNumber * this.PAGE_SIZE;
        const end = Math.min(start + this.PAGE_SIZE, feed.length);
        if (start >= end) return;

        const paginatedFeed = feed.slice(start, end);
        console.log(`Page number ${pageNumber} of user ${userId} feed`);
        paginatedFeed.forEach((postId, i) => console.log(`Post ${i + 1}: ${postId}`));
    }

    fetchTopNPosts(userId, N) {
        const user = this.userMap.get(userId);
        if (!user) return [];
        
        const pq = [];
        const followed = user.followed;

        for (let currUserId of followed) {
            const currUser = this.userMap.get(currUserId);
            let currPost = currUser.head.next;
            while (currPost.id !== -1 && pq.length < N) {
                pq.push(currPost);
                currPost = currPost.next;
            }
        }

        pq.sort((a, b) => b.time - a.time);

        return pq.slice(0, N).map(post => post.id);
    }
}

module.exports = Facebook;
