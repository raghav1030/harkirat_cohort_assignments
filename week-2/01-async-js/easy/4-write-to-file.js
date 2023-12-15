const fs = require('fs')
// const readline = require('readline')

// readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// })

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });


// fs.appendFile('4-write-to-file.md', `\n\n\n\n\n\n Hello World\n\n\n\n\n\n` , "utf-8", (err) =>{
//     if(err){
//         throw new err('Error writing to file')
//     }
//     else {
//         console.log('File written successfully')
//     }
// })  


const appendFileSynchronous = () => {
    fs.appendFileSync('4-write-to-file.md', `\n\n\n\n\n\n Hello World\n\n\n\n\n\n` , "utf-8", (err) =>{
        if(err){
            throw new err('Error writing to file')
        }
        else {
            console.log('Content Appended successfully in synchronous mode')
        }
    })  

    for(let i = 0; i < 100; i++){
        for(let j = 0; j < 30000000; j++){
        }
        console.log('I am not blocked')
    }
}

const appendFileAsynchronous = () => {
    fs.appendFile('4-write-to-file.md', `\n\n\n\n\n\n Hello World\n\n\n\n\n\n` , "utf-8", (err) =>{
        if(err){
            throw new err('Error writing to file')
        }
        else {
            console.log('Content Appended successfully in asynchronous mode')
        }
    })  

    for(let i = 0; i < 100; i++){
        for(let j = 0; j < 30000000; j++){
        }
        console.log('I am not blocked')
    }
}

readline.question("How do you want to append : 1. Synchronous 2. Asynchronous", n => {
    if(n == 1){
        appendFileSynchronous()
    }
    else {
        appendFileAsynchronous()
    }
    readline.close();
  });
