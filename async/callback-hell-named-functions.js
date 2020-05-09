console.log('before');

getUser(1, getRepositories);

function getRepositories(repos){
    repos.forEach(repo => {
        console.log(repo);
    });
}

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