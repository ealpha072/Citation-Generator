switch (this.style) {
    case 'APA':
        authorFullRef = `${lastName}, ${firstInitial}.${middleInitial}.,`
        twoAuthors.push(authorFullRef)
    case 'Harvard':
        authorFullRef = `${lastName}, ${firstInitial}${middleInitial},`
        twoAuthors.push(authorFullRef)
}