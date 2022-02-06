class APA {
    constructor(authors, title, year, publisher){
        this.authors = authors
        this.title = title
        this.year = year
        this.publisher = publisher
    }

    bookReference() {
        //below is for non organizational authors
        function sanitizeAuthor(author){
            //takes in array of authors
            //['Kelly Rob']
            let numAuthors = author.length
            
            if(numAuthors === 1){
                var authorNameArray = Array.from(author[0].split(' '))
                let lastName = authorNameArray[authorNameArray.length - 1], 
                    firstInitial = authorNameArray[0].charAt(0).toUpperCase(),
                    middleInitial = authorNameArray[1].charAt(0).toUpperCase()
                return `${lastName}, ${firstInitial}.${middleInitial}`
            }else if(numAuthors === 2){
                let twoAuthors = [];
                author.forEach((item) => {
                    var authorNameArray = Array.from(item.split(" "));
                    let lastName = authorNameArray[authorNameArray.length - 1],
                        firstInitial = authorNameArray[0].charAt(0).toUpperCase(),
                        middleInitial = authorNameArray[1].charAt(0).toUpperCase(),
                        authorFullRef = `${lastName}, ${firstInitial}.${middleInitial}.`;
                    twoAuthors.push(authorFullRef);
                })
                return twoAuthors.join(" & ")
            }else if(numAuthors > 2 && numAuthors <=20){
                let manyAuthors = []
                author.forEach(item=>{
                    var authorNameArray = Array.from(item.split(" "));
                    //console.log(authorNameArray)
                    let lastName = authorNameArray[authorNameArray.length - 1],
                        firstInitial = authorNameArray[0].charAt(0).toUpperCase(),
                        middleInitial = authorNameArray[1].charAt(0).toUpperCase(),
                        authorFullRef = `${lastName}, ${firstInitial}. ${middleInitial}`;
                    manyAuthors.push(authorFullRef);
                })
               let finalList = '', finalName = manyAuthors[manyAuthors.length -1]
        
                for (let i = 0;  i < manyAuthors.length - 1; i ++) {
                    finalList +=  manyAuthors[i] + ', '
                }
                finalList += ` & ${finalName}`
                return finalList
            }
        }
        //code for organization aurthor
        let authorRef = sanitizeAuthor(this.authors)
        var reference  = `${authorRef}.(${this.year}).${this.title}.${this.publisher} `
        //code for organization aurthor
        return reference
    }

    journalReference()
}

const myApa = new APA(['Alpha Emmanuel Ochieng', 'Brenda Alex Wright', 'Alex Morgan Charity'], 'Becoming Obama', 2009, 'Oxford Press')
