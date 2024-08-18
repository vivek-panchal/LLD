const Facebook = require('./services/Facebook');

const facebook = new Facebook();

facebook.follow(1, 2);
facebook.follow(1, 3);
facebook.createPost(1, 1000);
facebook.createPost(2, 1002);
facebook.getNewsFeed(1);
facebook.unfollow(1, 2);
facebook.getNewsFeed(1);
facebook.deletePost(2, 1002);
facebook.getNewsFeedPaginated(1, 0);
facebook.getNewsFeedPaginated(1, 1);
