class Reference {
    constructor(style, source) {

        this.style = style
        this.source = source

        this.sanitizeAuthor = (author) => {
            let numAuthors = author.length

            if (numAuthors === 1) {
                var authorNameArray = Array.from(author[0].split(' '))
                let lastName = authorNameArray[authorNameArray.length - 1], firstInitial = authorNameArray[0].charAt(0).toUpperCase(), middleInitial = authorNameArray[1].charAt(0).toUpperCase()
                //check the end of initials punctuation
                switch (this.style) {
                    case 'APA':
                        return `${lastName}, ${firstInitial}.${middleInitial}`
                    case 'Harvard':
                        return `${lastName}, ${firstInitial}${middleInitial},`
                }
            } else if (numAuthors === 2) {
                let twoAuthors = []
                author.forEach((item) => {
                    var authorNameArray = Array.from(item.split(" "))
                    let lastName = authorNameArray[authorNameArray.length - 1], firstInitial = authorNameArray[0].charAt(0).toUpperCase(), middleInitial = authorNameArray[1].charAt(0).toUpperCase()
                    authorFullRef = ''
                    switch (this.style) {
                        case 'APA':
                            authorFullRef = `${lastName}, ${firstInitial}.${middleInitial}.,`
                            twoAuthors.push(authorFullRef)
                        case 'Harvard':
                            authorFullRef = `${lastName}, ${firstInitial}${middleInitial},`
                            twoAuthors.push(authorFullRef)
                    }
                })
                return twoAuthors.join(" & ")
            } else if (numAuthors > 2 && numAuthors <= 20) {
                let manyAuthors = []
                author.forEach(item => {
                    var authorNameArray = Array.from(item.split(" "))
                    //console.log(authorNameArray)
                    let lastName = authorNameArray[authorNameArray.length - 1], firstInitial = authorNameArray[0].charAt(0).toUpperCase(), middleInitial = authorNameArray[1].charAt(0).toUpperCase(), authorFullRef = ''
                    switch (this.style) {
                        case "APA":
                            authorFullRef = `${lastName}, ${firstInitial}. ${middleInitial}`
                            manyAuthors.push(authorFullRef)
                        case "Harvard":
                            authorFullRef = `${lastName}, ${firstInitial}${middleInitial}`
                            manyAuthors.push(authorFullRef)
                    }
                })
                let finalList = '', finalName = manyAuthors[manyAuthors.length - 1]

                for (let i = 0; i < manyAuthors.length - 1; i++) {
                    finalList += manyAuthors[i] + ', '
                }
                finalList += ` & ${finalName}`
                return finalList
            }
        }
    }

    getRef(obj) {
        for (var field in obj) {
            this[field] = obj[field]
        }

        switch (this.source) {
            case 'Book':
                switch (this.style) {
                    case 'APA':
                        //let authr = this.sanitizeAuthor(this.author)
                        return `${authr}.(${this.year}).${this.title}.${this.publisher}`
                    case 'Harvard':
                        return null //return something here
                    default:
                        break
                }
            case 'Report':
                switch (this.style) {
                    case 'APA':
                        return `${this.sanitizeAuthor(this.author)}. (${this.year}). ${this.title} (${this.reportNum}). ${this.location}: ${this.publisher}`
                    case 'Harvard':
                        return null //return sth here
                    default:
                        break
                }
            case 'Journal':
                switch (this.style) {
                    case 'APA':
                        return `${this.sanitizeAuthor(this.author)}. (${this.year}). ${this.title}. ${this.journalTitle}, ${this.volume}(${this.issueNum}), ${this.pages}. ${this.doi}`
                    case 'Harvard':
                        return null //return sth here
                    default:
                        break
                }
            case 'Website':
                switch (this.style) {
                    case 'APA':
                        return `${this.sanitizeAuthor(this.author)}. (${this.year}, ${this.month} ${this.day}). ${this.title}. ${this.url}, ${this.webname}.`
                    case 'Harvard':
                        return null //return sth here
                    default:
                        break
                }
            case 'Thesis':
                switch (this.style) {
                    case 'APA':
                        return `${this.sanitizeAuthor(this.author)}. (${this.year}). ${this.title} [${this.thesisType}, ${this.university}]. ${this.url}.`
                    case 'Harvard':
                        return null //return sth here
                    default:
                        break
                }
            case 'Legislation':
                switch (this.style) {
                    case 'APA':
                        return `${this.title} ${this.year} (${this.jurisdictionAbbr}) s. ${this.sectNUm} (${this.countryAbbr})`
                    case 'Harvard':
                        return null //return sth here
                    default:
                        break
                }
            case 'Caselaw':
                switch (this.style) {
                    case 'APA':
                        return `${this.title} (${this.year} ${this.volumeNum} ${this.reporterAbbr} ${this.pageNum} (${this.countryAbbr}.).)`
                    case 'Harvard':
                        return null //return sth here
                    default:
                        break
                }
            default:
                break
        }
    }
}


let ref = new Reference('APA', 'Book')

let reference  = ref.getRef({
    author:'Alpha Emmanuel Ochieng',
    year:2009,
    title:'To become normal',
    publisher:'Oxford press',
})

console.log(reference)


