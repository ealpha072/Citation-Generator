function sanitizeAuthor(author){
    //takes in array of authors
    //['Kelly Rob']
    let numAuthors = author.length
    console.log(numAuthors)
    switch (numAuthors) {
        case 1:
            var authorNameArray = Array.from(author[0].split(' '))
            console.log(authorNameArray)
            let lastName = authorNameArray[authorNameArray.length - 1], 
                firstInitial = authorNameArray[0].charAt(0).toUpperCase(),
                middleInitial = authorNameArray[1].charAt(0).toUpperCase()
            console.log(`${lastName}, ${firstInitial}. ${middleInitial}.`)
        case 2:
            let authors = []
            author.forEach(item=>{
                var authorNameArray = Array.from(item.split(' '))
                let lastName = authorNameArray[authorNameArray.length - 1], 
                    firstInitial = authorNameArray[0].charAt(0).toUpperCase(),
                    middleInitial = authorNameArray[1].charAt(0).toUpperCase(),
                    authorFullRef= `${lastName}, ${firstInitial}. ${middleInitial}.`
                authors.push(authorFullRef)
            })
            console.log(authors.join(' & '))
    }
}

sanitizeAuthor(['Alpha Emmanuel Ochieng', 'David Omollo'])
