let commonfields = ['Authors', 'Title', 'Year'], sourcetypes = ['Book',  'Report' ],
citation_options = ['Harvard', 'APA', 'MLA', 'Chicago']

const sources = [
    {
        name:'Book',
        fields:['City','Publisher', 'Editor', 'Pages']
    },
    {
        name:'Report',
        fields:['Publisher']
    }
]

const user_ref_list = [{}];

//dom elements
let styles_select = $('#style-select'), bibliography_select = $('#bib-select'), source_select = $('#source-select'), add_source = $('')

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
        $(this).find('h5').text($('#style-select option:selected').text() + ' Referencing')
        $(this).find('h6').text($('#source-select option:selected').text() + ' Source')
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
        var formData = $(this).serializeArray()
        console.log(formData)
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

class APA {
    constructor(authors, title, year){
        this.authors = authors
        this.title = title
        this.year = year
    }

    bookReference(commonFields, bookfields) {
        let reference = ''

        function sanitizeAuthor(author){
            //takes in array of authors
            //['Kelly Rob']
            let numAuthors = author.length

            switch (numAuthors) {
                case 1:
                    var authorNameArray = Array.from(author[0].split(' '))
                    let lastName = authorNameArray[authorNameArray.length - 1], 
                        firstInitial = authorNameArray[0].charAt(0).toUpperCase(),
                        middleInitial = authorNameArray[1].charAt(0).toUpperCase()
                    return `${lastName}, ${firstInitial}.${middleInitial}`

                case 2:
                    let twoAuthors = []
                    author.forEach(item=>{
                        var authorNameArray = Array.from(item[0].split(' '))
                        let lastName = authorNameArray[authorNameArray.length - 1], 
                            firstInitial = authorNameArray[0].charAt(0).toUpperCase(),
                            middleInitial = authorNameArray[1].charAt(0).toUpperCase(),
                            authorFullRef= `${lastName}, ${firstInitial}.${middleInitial}`
                        twoAuthors.push(authorFullRef)
                    })
                    return twoAuthors.join(' & ');
                
                case numAuthors == 3:

                default:
                    break;
            }
        }
    }
}