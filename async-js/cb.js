const { users, posts } = require('./data');

const getUser = (username, cb) => {
    setTimeout(() => {
        const user = users.find(u => u.name === username);
        if (!user) {
            cb("user not found");
            return;
        }
        cb(null, user);
    }, 2000);
}


const getPosts = (userId, cb) => {
    setTimeout(() => {
        const post = posts.find(u => u.userId === userId);
        if (!post) {
            cb("posts not found");
            return;
        }
        cb(null, post);
    }, 2000);

}




console.log('begin');


getUser('ram', (err, user) => {
    if (err) {
        console.log('error', err);
        return;
    }
    console.log('user 1', user);
    getPosts(user.id, (err, post) => {
        if (err) {
            console.log('error', err);
            return;
        }
        console.log('posts', post);

    });
});


getUser('hari', (err, user) => {
    if (err) {
        console.log('error', err);
        return;
    }
    console.log('user 2', user);
    getPosts(user.id, (err, post) => {
        if (err) {
            console.log('error', err);
            return;
        }
        console.log('posts', post);

    });
});
console.log('end');