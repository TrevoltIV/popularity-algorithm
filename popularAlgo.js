// Social media post popularity sorting algorithm. Simple but gets the job done if you're looking for a fast solution.
// 


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
        const postAge = (currentDate - postDate) / oneDay;
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

        if (postAge < 0.2) {
            // If post is newer than 4.8 hours old, weight will be significantly decreased to account for exaggerated rates
            // If this wasn't done, the only posts you'd see at the top of the list would be new ones with only 1 like, because 1 divided by 0.0002 is a giant number
            popularPosts.push([{...post, score: postScore / 20000}]);
        } else {
            // If post is older than 4.8 hours, weight is normal because the post has had enough time to acquire a more accurate engagement rate.
            // At this point in time, if a post still hasn't gotten much engagement, it will be lower in rank than other posts which have.
            popularPosts.push([{...post, score: postScore}]);
        }
    });
    
    const sortedPosts = popularPosts.sort((a, b) => b[0].score - a[0].score);
    return sortedPosts;
}

console.log(popularAlgo(posts));



// REACT FIREBASE IMPLEMENTATION:

import { db } from '@/firebase/firebase-config'
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore'


export async function popularityAlgo(uid) {

    if (uid) {
        // You can tailor by user recommendation here if you pass the uid, otherwise it will get overall popular posts
        return
    } else {
        // General popularity algorithm
        const q = query(collection(db, 'forum-posts'))
        const querySnapshot = await getDocs(q)
        let posts = []
        querySnapshot.forEach((doc) => {
            posts.push(doc.data())
        })

        const topPosts = []

        posts.forEach((post) => {
            const currentDate = Date.now()
            const postDate = post.date
            const oneDay = 86400000
            const postAge = (currentDate - postDate) / oneDay

            const postLikes = post.likes
            const postComments = post.comments.length
            const postViews = post.views

            const postLikesRate = postLikes / postAge
            const postCommentsRate = postComments / postAge
            const postRate = postLikesRate + postCommentsRate

            const postScore = postRate / postViews

            if (postAge < 0.2) {
                topPosts.push({...post, score: postScore / 20000})
            } else {
                topPosts.push({...post, score: postScore})
            }
        })

        const sortedPosts = topPosts.sort((a, b) => b.score - a.score)
        return sortedPosts
    }
}
