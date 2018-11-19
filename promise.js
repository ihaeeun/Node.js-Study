const condition = false;
const promise = new Promise((resolve, reject) => {
    if(condition){ resolve('success'); }
    else{ reject('fail'); }
});

promise
    .then((message) => { console.log(message); })
    .catch((error) => { (console.log(error)); });