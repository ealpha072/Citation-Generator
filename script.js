let commonfields = ['Author', 'Corporate Author', 'Title', 'Year'], sourcetypes = ['Book', 'Book Section','Journal Article', 'Article in a periodical', 'Report', 'Website', 'Document from Website' ],
citation_options = ['Harvard', 'APA', 'MLA', 'Chicago']

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