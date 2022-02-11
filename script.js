let commonfields = ['author', 'title', 'year'], sourcetypes = ['Book',  'Report' ],
    citation_options = ['Harvard', 'APA', 'MLA', 'Chicago']

const sources = [
    {
        name:'Book',
        fields:['publisher', 'pages']
    },{
        name:'Report',
        fields:['Publisher']
    }
]

//dom elements
let styles_select = $('#style-select'), bibliography_select = $('#bib-select'), source_select = $('#source-select'), add_source = $('')
class Reference {
    constructor(style, source, obj) {
        this.style = style
        this.source = source
        for (var field in obj) {
            this[field] = obj[field]
        }
    }

    sanitizeAuthor = (authorName) => {
        let author = authorName.includes(',') ? Array.from(authorName.split(',')) : [authorName]
        let numAuthors = author.length

        if (numAuthors === 1) {
            var authorNameArray = Array.from(author[0].split(' '))
            let lastName = authorNameArray[authorNameArray.length - 1], 
                firstInitial = authorNameArray[0].charAt(0).toUpperCase(), 
                middleInitial = authorNameArray[1].charAt(0).toUpperCase()
            //check the end of initials punctuation
            switch (this.style) {
                case 'APA':
                    return `${lastName}, ${firstInitial}.${middleInitial}`
                case 'Harvard':
                    return `${lastName}, ${firstInitial}${middleInitial},`
            }
        } else if (numAuthors === 2) {
            //console.log(author)
            let twoAuthors = []
            author.forEach((item) => {
                let authorNameArray = Array.from(item.split(" "))
                let lastName = authorNameArray[authorNameArray.length - 1], 
                    firstInitial = authorNameArray[0].charAt(0).toUpperCase(), 
                    middleInitial = authorNameArray[1].charAt(0).toUpperCase(),
                    authorFullRef = ''

                if(this.style === 'APA'){
                    authorFullRef = `${lastName +', ' + firstInitial+ '.'+middleInitial}`
                }else{
                    authorFullRef = `${lastName +', ' + firstInitial+middleInitial}`
                }
                twoAuthors.push(authorFullRef)
                
            })
            console.log(twoAuthors.join(' & '))
        } else if (numAuthors > 2 && numAuthors <= 20) {
            let manyAuthors = []
            author.forEach(item => {
                var authorNameArray = Array.from(item.split(" "))
                //console.log(authorNameArray)
                let lastName = authorNameArray[authorNameArray.length - 1], 
                    firstInitial = authorNameArray[0].charAt(0).toUpperCase(), 
                    middleInitial = authorNameArray[1].charAt(0).toUpperCase(), 
                    authorFullRef = ''
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

    getRef() {
        switch (this.source) {
            case 'Book':
                switch (this.style) {
                    case 'APA':
                        //let authr = this.sanitizeAuthor(this.author)
                        console.log('Reached here')
                        return `${this.sanitizeAuthor(this.author)}.(${this.year}). ${this.title}. ${this.publisher}`
                    case 'Harvard':
                        return null //return something here
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

$(document).ready(function(){        
    citation_options.forEach(element => {
        //consider reversing
        let option = '';
        option = (element === 'Book') ? `<option class="" selected>${element}</option>`: `<option class="">${element}</option>`
       
        styles_select.append(option)
    });

    sourcetypes.forEach(type=>{
        let option = ''
        option = (type === 'Book') ? `<option class="" selected>${type}</option>` : `<option class="">${type}</option>`
        source_select.append(option)
    })

    $('#exampleModal').on('show.bs.modal', function (){
        $(this).find('h5').text($('#style-select option:selected').text())
        $(this).find('h6').text($('#source-select option:selected').text())
        $(this).find('form').html('')
        generateForm(commonfields)//add extra fields

        let buttons = `
            <div class="">
                <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary btn-sm" id="save_ref">Save changes</button>
            </div>`
        $('#add_source_form').append(buttons)
        
    })

    $('#add_source_form').submit(function(e){
        e.preventDefault()
        let formData = $(this).serializeArray(), refStyle = $('#exampleModal').find('h5').text(), refSource = $('#exampleModal').find('h6').text()
        
        console.log(formData)
        let obj = {}
        //START FROM CONVERTING STRING TO ARRAY
        formData.forEach(data=>{
            obj[data.name] = data.value
        })
        console.log(obj, refStyle)
        
        let ref = new Reference(refStyle, refSource, obj)
        ref.sanitizeAuthor(obj.author)
    })
})

const generateForm = (commonFields) => {
    let form = $('#add_source_form')
    let specialFields = []
    let sourceSelctedString = Array.from($('#selected-source').text().split(' '))
    
    for (var i = 0; i < sources.length; i++) {
        if(sources[i].name === sourceSelctedString[0]){
            let sourceIndex = sources.indexOf(sources[i])
            specialFields = [...sources[sourceIndex].fields]
        }
    }
    let allFields = [...commonFields, ...specialFields]

    allFields.forEach(field => {
        let div = ''
        if(field === 'Authors'){
            div = `<div class="form-group row">
                <label for="" class="col-sm-2 col-form-label-sm">${field}</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control form-control-sm" id="author" placeholder="${field}" name="${field}">

                    <div class="mt-2 form-inline">
                        <input type="checkbox" class="" id="check-corp-author">
                        <label for="" class="col-form-label-sm mr-3 ml-2">Corporate Author</label>
                        <input type="text" name="" id="" placeholder="Corporate Author" name= "Corporate Author" class="form-control form-control-sm col-sm-9">
                    </div>
                </div>
            </div>`
        }else{
            div = `<div class="form-group row">
                <label for="" class="col-sm-2 col-form-label-sm">${field}</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control form-control-sm" id="" placeholder="${field}" name="${field}">
                </div>
            </div>`
        }
        form.append(div)
    })
}




