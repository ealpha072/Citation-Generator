let commonfields = ['Authors', 'Title', 'Year'], sourcetypes = ['Book', 'Book Section','Journal Article', 'Article in a periodical', 'Report', 'Website', 'Document from Website' ],
citation_options = ['Harvard', 'APA', 'MLA', 'Chicago']

const sources = [
    {
        name:'Book',
        fields:['City', 'Publisher', 'Editor', 'Pages']
    }
]
//tsource type fileds 
let book_fields = ['City', 'Publisher', 'Editor', 'Pages']
//dom elements
let styles_select = $('#style-select'), bibliography_select = $('#bib-select'), source_select = $('#source-select'), add_source = $('')

$(document).ready(function(){        
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
        let option = ''
        option = (type === 'Book') ? `<option class="" selected>${type}</option>` : `<option class="">${type}</option>`
        source_select.append(option)
    })

    $('#exampleModal').on('show.bs.modal', function (){
        $(this).find('h5').text($('#style-select option:selected').text() + ' Referencing')
        $(this).find('h6').text($('#source-select option:selected').text() + ' Source')
        $(this).find('form').html('')
        generateForm([...commonfields, ])//add extra fields
    })
})

const generateForm = (commonFields) => {
    let form = $('#add_source_form')
    let specialFields = []
    let sourceSelctedString = Array.from($('#selected-source').text().split(' '))
    console.log(sourceSelctedString)
    
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
                    <input type="text" class="form-control form-control-sm" id="author" placeholder="${field}">

                    <div class="mt-2 form-inline">
                        <input type="checkbox" class="" id="check-corp-author">
                        <label for="" class="col-form-label-sm mr-3 ml-2">Corporate Author</label>
                        <input type="text" name="" id="" placeholder="Corporate Author" class="form-control form-control-sm col-sm-9">
                    </div>
                </div>
            </div>`
        }else{
            div = `<div class="form-group row">
                <label for="" class="col-sm-2 col-form-label-sm">${field}</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control form-control-sm" id="" placeholder="${field}">
                </div>
            </div>`
        }
        form.append(div)
    })
}