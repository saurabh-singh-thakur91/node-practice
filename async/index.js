console.log('before');

/*
This gives undefined when we try to print the user in console.log, because the 
function getUser has a timeout of 2 seconds and the return of the function will not 
be available at the time of calling the function
*/
const user = getUser(1); 

console.log(user);

console.log('after');

function getUser(id) {
    setTimeout(() => {
        console.log('Reading a user from a database . . .');

        return { id: id, githubUserName: 'saurabh'};
    }, 2000);

    //return 1; // This value will be available to the caller of getUser immediately
}