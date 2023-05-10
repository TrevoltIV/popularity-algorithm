


const posts = [
    {
        title: '1',
        body: 'This is algo 1',
        likes: 50,
        author: 'John Doe',
        date: 1683692732730,
        views: 297,
        comments: [
            'nice post',
            'thanks for sharing',
            'I love this post',
            'This is a great post',
        ]
    },
    {
        title: '2',
        body: 'This is algo 1',
        likes: 98,
        author: 'John Doe',
        date: 1683606332730,
        views: 5226,
        comments: [
            'nice post',
            'thanks for sharing',
        ]
    },
    {
        title: '3',
        body: 'This is algo 1',
        likes: 130,
        author: 'John Doe',
        date: 1683519932730,
        views: 986,
        comments: [
            'nice post',
            'thanks for sharing',
            'I love this post',
        ]
    },
    {
        title: '4',
        body: 'This is algo 1',
        likes: 190,
        author: 'John Doe',
        date: 1683433532730,
        views: 9453,
        comments: [
            'nice post',
            'thanks for sharing',
            'I love this post',
            'This is a great post',
            'Filler comment',
            'Another filler comment',
        ]
    },
];


const popularAlgo = (posts) => {
    let popularPosts = [];

    posts.forEach((post) => {
        const currentDate = Date.now();
        const oneDay = 86400000;
        const postDate = post.date;
        const postLikes = post.likes;
        const postComments = post.comments.length;
        const postViews = post.views;
        // Get the age of the post in days
        const postAge = currentDate - postDate / oneDay;
        // Get the average like rate per day
        const postLikesRate = postLikes / postAge;
        // Get the average comment rate per day
        const postCommentsRate = postComments / postAge;
        // Weight scores based on views.
        // If a post has high views but low engagement relative to views, rank goes lower.
        // If a post has low views but high engagement relative to views, rank goes higher.
        // And lastly, if a post is old and stops getting engagement, rank goes lower.
        const postRate = postLikesRate + postCommentsRate;
        const postScore = postRate / postViews;

        popularPosts.push([{...post, score: postScore}]);
    });
    return popularPosts.sort((a, b) => b[0].score - a[0].score);
}

console.log(popularAlgo(posts));