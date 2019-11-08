const { users, posts } = require('./data');

const getUser = (username) => {
   return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = users.find(u => u.name === username);
            if (!user) {
                reject("user not found");
                return;
            }
            resolve(user);
        }, 2000);
    });
}


const getPosts = (userId) => {
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            const post = posts.filter(u => u.userId === userId);
            if (!post) {
                reject("posts not found");
                return;
            }
            resolve(post);
        }, 2000);
    });
}


const getUserAndPosts= async (userInput)=>{
    try{
    const user = await getUser(userInput);
    const postsforUser = await getPosts(user.id);
    console.log('user', user);
    console.log('posts',postsforUser);
    }catch(e){
        console.log(e);
    }

}



console.log('begin');

getUserAndPosts('ram');
getUserAndPosts('ram1');
// getUser('ram')
// .then((user)=>{
//     console.log('user 1',user.id);
//     return getPosts(user.id);
// })
// .then((post)=>{
//     console.log('posts',post);
// }).catch((err)=>{
//     console.log('error',err);
// })

console.log('end');