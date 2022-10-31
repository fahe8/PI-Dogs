const minValue = (value) => {
    const bothValues = value.replace(/\s/g,'').split('-')

    if(bothValues.length) {
        const res = !isNaN(bothValues[0])?  Number(bothValues[0]):   Number(bothValues[1])-2
        return res
    } else {
        return bothValues[1]-2
    }


}

const maxValue = (value) => {
    const bothValues = value.replace(/\s/g,'').split('-')

    if(bothValues.length) {
        const res = !isNaN(bothValues[1])?  Number(bothValues[1]):   Number(bothValues[0])+2
        return res
    } else {
        return  bothValues[0]+2
    }
}


module.exports ={minValue, maxValue}