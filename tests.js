/*class APA {
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
}*/

/*const myApa = new APA(['Alpha Emmanuel Ochieng', 'Brenda Alex Wright', 'Alex Morgan Charity'], 'Becoming Obama', 2009, 'Oxford Press')*/


function APA(authors, title, year, publisher){
    this.authors = authors
    this.title = title
    this.year = year
    this.publisher = publisher

    this.sanitizeAuthor = (author) => {
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

    this.bookReference = () => {
        let authorRef = this.sanitizeAuthor(this.authors)
        var reference  = `${authorRef}.(${this.year}).${this.title}.${this.publisher} `
        //code for organization aurthor
        return reference
    }

    this.reportReference = (/*takes in report number as argument */reportNum, location) => {
        let author = this.sanitizeAuthor(this.author)
        //Author, Initial. (Year). Title of report (Report No. xxx). Location: Publisher.
        let reference = `${author}. (${this.year}). ${this.title} (${reportNum}). ${location}: ${this.publisher}`
        return reference
    }

    this.journalReference = (journalTitle, volume, issueNum, pages, doi) => {
        /*
            A basic reference list entry for a journal article in APA must include:

                Author or authors. The surname is followed by first initials.
                Year of publication of the article (in round brackets).
                Article title.
                Journal title (in italics).
                Volume of journal (in italics).
                Issue number of journal in round brackets (no italics).
                Page range of article.
                DOI or URL
                The first line of each citation is left adjusted. Every subsequent line is indented 5-7 spaces.
                Example: 

                Ruxton, C. (2016). Tea: Hydration and other health benefits. Primary Health Care, 26(8), 34-42. https://doi.org/10.7748/phc.2016.e1162
        */
        let author = this.sanitizeAuthor(this.author)
        //Author, Initial. (Year). Title of report (Report No. xxx). Location: Publisher.
        let reference = `${author}. (${this.year}). ${this.title}. ${journalTitle}, ${volume}(${issueNum}), ${pages}. ${doi}`
        return reference
    }

    this.websiteReference = (webname, url, month, day ) => {
        /* 
            The basics of a reference list entry for a webpage on a website (individual author):

            Author or authors. The surname is followed by first initials.
            Year, Month Day (in round brackets). Use the most exact date possible
            Title (in italics).
            Website name.
            URL.
            The first line of each citation is left adjusted. Every subsequent line is indented 5-7 spaces.
            Example:

            Johnson, A. (2018, May 24). “It doesn’t need to be this way”: The promise of specialised early intervention in psychosis services. IEPA. https://iepa.org.au/network-news/it-doesnt-need-to-be-this-way-the-promise-of-specialised-early-intervention-in-psychosis-services/
        */

        let author = this.sanitizeAuthor(this.author)
        //Author, Initial. (Year). Title of report (Report No. xxx). Location: Publisher.
        let reference = `${author}. (${this.year}, ${month} ${day}). ${this.title}. ${url}, ${webname}.`
        return reference
    }

    this.thesisRefrence = (thesisType, university, url) =>{
        /*
            Author. The surname is followed by first initials.
            Year (in round brackets).
            Title (in italics).
            Level of Thesis or Dissertation [in square brackets].
            University, also in [square brackets] following directly after the Level of Thesis, for e.g. [Doctoral dissertation, Victoria University]
            Database or Archive Name
            URL
            The first line of each citation is left adjusted. Every subsequent line is indented 5-7 spaces.
            Example:​

            Mosek, E. (2017). Team flow: The missing piece in performance [Doctoral dissertation, Victoria University]. Victoria University Research         Repository. http://vuir.vu.edu.au/35038/
        */
        let author = this.sanitizeAuthor(this.author)
        //Author, Initial. (Year). Title of report (Report No. xxx). Location: Publisher.
        let reference = `${author}. (${this.year}). ${this.title} [${thesisType}, ${university}]. ${url}.`
        return reference
    }

    this.legislationReference = (jurisdictionAbbr, sectNUm, countryAbbr) => {
        /*
            Short Title of Act (in italics).
            Year (in italics).
            Jurisdiction abbreviation (in round brackets).
            Section number and subdivision if applicable.
            Country abbreviation (in round brackets).
            The first line of each citation is left adjusted. Every subsequent line is indented 5-7 spaces.
            Example: Foreign Influence Transparency Scheme Act 2018 (Cth) s. 60.1 (Austl.).
        */
        
        let reference = `${this.title} ${this.year} (${jurisdictionAbbr}) s. ${sectNUm} (${countryAbbr})`
        return reference
    }

    this.caseReference = (pageNum, volumeNum, countryAbbr) => {
        /*
            Popular title of Case (in italics).
            Year (in round brackets).
            Volume number.
            Reporter abbreviation.
            First page number.
            Country abbreviation (in round brackets).
            The first line of each citation is left adjusted. Every subsequent line is indented 5-7 spaces.
            Example: Minister for Immigration and Border Protection v Kumar (2017) 260 CLR 367 (Austl.).    
        */
       let reference = `${this.title} (${this.year} ${volumeNum} ${reporterAbbr} ${pageNum} (${countryAbbr}.).)`
       return reference
    }
}

const myApa = new APA(['Alpha Emmanuel Ochieng', 'Brenda Alex Wright', 'Alex Morgan Charity'], 'Becoming Obama', 2009, 'Oxford Press')
console.log(myApa.bookReference())