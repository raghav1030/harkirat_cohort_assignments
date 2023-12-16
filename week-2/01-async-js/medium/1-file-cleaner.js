const fs = require('fs')

fs.readFile("1-file-cleaner.txt", "utf8", (err, data) => {
    if (err) {
        console.log(err)
    } else {
        
        result = data.replace(/\s+/g, " ")
        result = `\n\nFormatted Text :\n\n${result}`
        console.log(result)

        fs.appendFile("1-file-cleaner.txt", result, (err) => {
            if (err) {
                console.log(err)
            } else {
                console.log("success")
            }
        })

        let erase = data.replace(result, "")

        setTimeout(() => {
            fs.writeFile("1-file-cleaner.txt", erase, (err) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log("success")
                }
            })
        }, 5000)
    
}})