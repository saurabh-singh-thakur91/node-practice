console.log('before');

getUser(1, (user) => {
    console.log('User: ', user);

    getRepositories(user.githubUserName, (repos) => {
        repos.forEach(element => {
            console.log(element);
        });
    });
});

function getUser(id, callback){
    setTimeout(() => {
        console.log('Fetching data from database . . .');

        callback({ id: id, githubUserName: 'Saurabh Thakur' });

    }, 2000);
}

function getRepositories(githubUserName, callback){
    setTimeout(() => {
        console.log('Fetching repos for github user: ', githubUserName);

        callback(['repo-1', 'repo-2', 'repo-3']);

    }, 2000);
}

console.log('after');