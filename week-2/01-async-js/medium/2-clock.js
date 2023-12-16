let counter = 0
const date = new Date()
let seconds = date.getSeconds()
let minutes = date.getMinutes()
let hours = date.getHours()


const appendZero = (num) => {
    if(num < 10) {
        return `0${num}`
    }
    else return num
}




setInterval(() => {
    seconds++
    clock()
}, 1000)

setInterval(() => {
    minutes++
    clock()
}, 1000*60)

setInterval(() => {
    hours++
    clock()
}, 1000*60*60)

const convert24hrInto12hr = (hours) => {
    if(hours > 12) {
        hours = hours - 12
    }
    return appendZero(hours)
}

const clock = () => {

    seconds = seconds % 60
    minutes = minutes % 60
    hours = hours % 24
    let ampm = hours >= 12 ? 'PM' : 'AM'
    convert24hrInto12hr(hours)

    console.log(`24 Hours Format\t\t\t\t\t\t\t` + `12 Hours Format`)
    console.log(`${appendZero(hours)}:${appendZero(minutes)}:${appendZero(seconds)}\t\t\t\t\t\t\t` + `${convert24hrInto12hr(hours)}:${appendZero(minutes)}:${appendZero(seconds)}  ${ampm}\n`)

}


