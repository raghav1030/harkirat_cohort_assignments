const fs = require('fs')

function readFile (){

    
        fs.readFile('3-read-from-file.md', "utf-8", (err, data) => {
            
            if(err){
                console.log(err)
            }
            
            
            
            else if(!data){
                console.log('File is empty')
            }
            
            else {
                console.log(data)
        }
    })

    for(let i = 0; i < 100; i++){
        for(let j = 0; j < 30000000; j++){
        }
        console.log('I am not blocked')
    }
}

readFile()