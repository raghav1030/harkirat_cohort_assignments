let counter = 0
// for(let i = 0; i < 1000000; i++){
//     for(let j = 0; j < 3000000000; j++){}
//     console.log(counter++)
// }

const delayedCounter = () => {
    setTimeout(delayedCounter, 1000)
    console.log(counter++)
}

delayedCounter()