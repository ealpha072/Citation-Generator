function Ref(obj){
    for(var item in obj){
        this[item] = obj[item]
    }  

    this.getAuthor = ()=>{
        console.log(this.publisher)
    }

}

let ref = new Ref({
    author:'Alpha',
    publisher:'Oxford'
})

ref.getAuthor()

