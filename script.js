let commonfields = ['Author', 'Corporate Author', 'Title', 'Year'], sourcetypes = ['Book', 'Book Section','Journal Article', 'Article in a periodical', 'Report', 'Website', 'Document from Website' ],
citation_options = ['Harvard', 'APA', 'MLA', 'Chicago']

//tsource type fileds 
let book_fields = ['City', 'Publisher', 'Editor', 'Pages']
//dom elements
let styles_select = $('#style-select'), bibliography_select = $('#bib-select'), type_select = $('#type-select')

$(document).ready(function(){
    citation_options.forEach(element => {
        let option = '';
        if(element === 'Book'){
            option = `<option class="" selected>${element}</option>`
        }else{
            option = `<option class="">${element}</option>`
        }
       
        styles_select.append(option)
    });

    sourcetypes.forEach(type=>{
        option = `<option>${type}</option>`
        type_select.append(option)
    })
})


//for each typeof source, five the form fields required
class Reference{
    //define a function that creates inputs of common file fileds and return this inputs
    constructor(Author, Corporate_Author, Title, Year){
        this.Author = Author, 
        this.Corporate_Author = Corporate_Author, 
        this.Title = Title, 
        this.Year = Year
    }

    create_fields(array){
        let biggerdiv = ''
        array.forEach(elem=>{
            div = `<div class="form-group row">
                <label for="" class="col-sm-2 col-form-label">${elem}</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="" placeholder="${elem}">
                </div>
            </div>`
            biggerdiv +=div
        })
    }
}

class APA extends Reference{
    //constructor 
    constructor(Author, Corporate_Author, Title, Year, City, Publisher, Editor, Pages){
        super(Author, Corporate_Author, Title, Year);
        this.city = City, 
        this.publisher = Publisher, 
        this.editor = Editor, 
        this.pages = Pages
    }

    //define a function that generates the reference...
    genearteReference(sourceType){
        if(sourceType === 'Book'){
            //if there is an author and if there is no author
        }
    }
}


//for each reference style, create a class that defines the rules 