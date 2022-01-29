let commonfields = ['Author', 'Corp Author', 'Title', 'Year'], sourcetypes = ['Book', 'Book Section','Journal Article', 'Article in a periodical', 'Report', 'Website', 'Document from Website' ],
citation_options = ['Harvard', 'APA', 'MLA', 'Chicago']

//tsource type fileds 
let book_fields = ['City', 'Publisher', 'Editor', 'Pages']
//dom elements
let styles_select = $('#style-select'), bibliography_select = $('#bib-select'), type_select = $('#type-select'), add_source = $('')

$(document).ready(function(){
    $('#exampleModal').on('show.bs.modal', function (){
        //get form from the dorm
        //create firlds
        //atttach fields to form
        let form = $('#add_source_form')
        let formElements = generateForm([...commonfields, ...book_fields])
        form.append(formElements)
    })
        

    citation_options.forEach(element => {
        //consider reversing
        let option = '';
        if(element === 'Book'){
            option = `<option class="" selected>${element}</option>`
        }else{
            option = `<option class="">${element}</option>`
        }
       
        styles_select.append(option)
    });

    sourcetypes.forEach(type=>{
        //let option = (indexOf(type) === 0) ? `<option class="" selected disabled>${type}</option>` : `<option>${type}</option>`
        //type_select.append(option)
    })
})

const generateForm = (fields)=> {
    let biggerDiv = $('#form-fields')
    fields.forEach(field => {
        let div = `<div class="form-group row">
            <label for="" class="col-sm-2 col-form-label">${field}</label>
            <div class="col-sm-10">
                <input type="text" class="form-control form-control-sm" id="" placeholder="${field}">
            </div>
        </div>`
        biggerDiv.append(div)
    })
    return biggerDiv

}


class Reference {
    constructor(Author, Corporate_Author, Title, Year) {
        this.author = Author,
        this.corporate_Author = Corporate_Author,
        this.title = Title,
        this.year = Year

        this.createfields = function (fields = ['Author', 'Corporate Author', 'Title', 'Year']) {
            let biggerDiv = ''
            fields.forEach(field => {
                let div = `<div class="form-group row">
                    <label for="" class="col-sm-2 col-form-label">${field}</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="" placeholder="${field}">
                    </div>
                </div>`
                biggerDiv += div
            })
            return biggerDiv
        }
    }
}


//for each reference style, create a class that defines the rules 
/* 
    when ref_type and sourcetype is selected, generate the form;
    -->get the reftype
    -->get the sourcetype
    -->generate form
        -->declare a new class with reftype as name eg (let apa = new APA())
        -->call the create form method of the class

    when i click, generate reference, 
        -->get the style and source type
        -->
*/
