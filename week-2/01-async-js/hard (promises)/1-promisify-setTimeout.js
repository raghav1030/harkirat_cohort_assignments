/*
    Write a function that returns a promise that resolves after n seconds have passed, where n is passed as an argument to the function.
*/

async function wait(n) {
   
    return new Promise((resolve) => {
        setTimeout(()=>{
            resolve()
        }, n*1000)
    })
    
}

// wait(1)

// console.log(wait(3).then(() => console.log("Done")));

module.exports = wait;
