let commonfields = ['author', 'title', 'year'], sourcetypes = ['Book', 'Report', 'Journal', 'Theses'],
    citation_options = ['APA', 'Harvard']

const sources = [
    {
        name:'Book',
        fields:['publisher', 'pages', 'city']
    },{
        name:'Report',
        fields:['publisher', 'url', 'city']
    },{
        name:'Journal',
        fields:['journal_title', 'volume', 'issue', 'pages', 'doi']
    },{
        name:'Theses',
        fields:['type', 'university', 'url', 'database', 'city']
    },{
        name:'Act',
        fields:['jurisdiction_Abbr', 'section', 'country_abbr']
    }
]

//dom elements
let styles_select = $('#style-select'), bibliography_select = $('#bib-select'), source_select = $('#source-select'), bibliography = $('#user-bibliography')
const userReferences = []
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
            if(this.style === 'APA'){
                return `${lastName}, ${firstInitial}.${middleInitial}.`
            }else if(this.style === 'Harvard'){
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
                    authorFullRef = `${lastName +', ' + firstInitial+ '.'+middleInitial+"."}`
                }else{
                    authorFullRef = `${lastName +', ' + firstInitial+middleInitial}`
                }
                twoAuthors.push(authorFullRef)
            })
            return twoAuthors.join(' & ')
        } else if (numAuthors > 2 && numAuthors <= 20) {
            let manyAuthors = []
            author.forEach(item => {
                var authorNameArray = Array.from(item.split(" "))
                //console.log(authorNameArray)
                let lastName = authorNameArray[authorNameArray.length - 1], 
                    firstInitial = authorNameArray[0].charAt(0).toUpperCase(), 
                    middleInitial = authorNameArray[1].charAt(0).toUpperCase(), 
                    authorFullRef = ''
                
                if(this.style === 'APA'){
                    authorFullRef = `${lastName}, ${firstInitial}. ${middleInitial}`
                }else{
                    authorFullRef = `${lastName}, ${firstInitial}${middleInitial}`
                }
                manyAuthors.push(authorFullRef)
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
                        return `<li>${this.sanitizeAuthor(this.author)}.(${this.year}). <span style="font-style: italic;">${this.title}. </span>${this.publisher}</li>`
                    case 'Harvard':
                        return `<li>${this.sanitizeAuthor(this.author)} ${this.year}, <span style="font-style: italic;">${this.title}, </span>${this.publisher}, ${this.city} </li>`
                }
            case 'Report':
                switch (this.style) {
                    case 'APA':
                        return `<li>${this.sanitizeAuthor(this.author)}. (${this.year}). <span style="font-style: italic;">${this.title}</span>(${this.report_num}). ${this.publisher}. ${this.url}</li>`
                    case 'Harvard':
                        /* */
                        /*Author(s) of report (person or organisation) Family name, Initials Year of Publication, Title of report - italicised and sentence case, Report series name and Report number (if available), Publisher/Institution, Place of publication. */
                        return `<li>${this.sanitizeAuthor(this.author)}, ${this.year}, <span style="font-style: italic;">${this.title}</span>, ${this.publisher}, ${this.city}</li>`
                }
            case 'Journal':
                switch (this.style) {
                    case 'APA':
                        //'journal_title', 'volume', 'issue', 'pages', 'doi'
                        return `<li>${this.sanitizeAuthor(this.author)}. (${this.year}). ${this.title}. <span style="font-style: italic;">${this.journal_title}, ${this.volume}</span>(${this.issue}), ${this.pages}. ${this.doi}</li>`
                    case 'Harvard':
                        return `<li>${this.sanitizeAuthor(this.author) + ', ' + this.year}, '${this.title}', <span style="font-style: italic;">${this.journal_title}, vol. ${this.volume}, no. ${this.issue}, pp. ${this.pages}</span></li>`
                }
            case 'Website':
                switch (this.style) {
                    case 'APA':
                        return `<li>${this.sanitizeAuthor(this.author)}. (${this.year}, ${this.month} ${this.day}). ${this.title}. ${this.url}, ${this.webname}.</li>`
                    case 'Harvard':
                        return null //return sth here
                }
            case 'Theses':
                switch (this.style) {
                    case 'APA':
                        //['type', 'universty', 'url', 'database']
                        return `<li>${this.sanitizeAuthor(this.author)}. (${this.year}). <span style="font-style: italic">${this.title}</span> [${this.type}, ${this.university}]. ${this.database + '. ' + this.url}.<li>`
                    case 'Harvard':
                        return `<li>${this.sanitizeAuthor(this.author) + ' ' + this.year}, '${this.title}', ${this.type}, ${this.university}, ${this.city}</li>`
                }
            case 'Act':
                switch (this.style) {
                    case 'APA':
                        //['jurisdiction_Abbr', 'section', 'country_abbr']
                        return `<li><span style="font-style: italic">${this.title}</span> ${this.year} (${this.jurisdiction_Abbr}) s. ${this.section} (${this.country_abbr}.).</li>`
                    case 'Harvard':
                        return `<li>${this.title} <span style="font-style:italic;">${this.year} </span>${this.jurisdiction_Abbr}</li>`
                }
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
        
        let obj = {}
        formData.forEach(data=>{
            obj[data.name] = data.value
        })
        let ref = new Reference(refStyle, refSource, obj)
        let generatedRef = ref.getRef()
        userReferences.push({obj:obj, ref:generatedRef})
        console.log(userReferences)
        bibliography.html(' ')
        render(userReferences)
        $('#exampleModal').modal('hide')
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

const render = arr => {
    arr.forEach(element => {
        let listElem = element.ref
        bibliography.append(listElem)
    });
}


