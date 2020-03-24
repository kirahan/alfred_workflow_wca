const axios = require('axios')

const tnoodle = (baseUrl = 'https://solarsunrise.cn')=>{
    const allPuzzleName = [
        '222',
        '333',
        '333fm',
        '333ni',
        '444fast',
        '444',
        '444ni',
        '555',
        '555ni',
        '666',
        '777',
        'clock',
        'minx',
        'pyram',
        'skewb',
        'sq1',
        'sq1fast'
    ]

    const getPuzzlelist =async()=>{
        const res =await axios.get(`${baseUrl}/puzzles/.json`)
        console.log(res.data)
        return res.data
    }

    const getScrmable = async({
        puzzleName,
        number,
        dataType = '.json',
    })=>{
        const scrambleNumber = number ? `*${number}` : ''
        const fullUrl =  `${baseUrl}/scramble/${dataType}?=${puzzleName}${scrambleNumber}`
        const res =await axios.get(fullUrl)
        return res.data
    }

    const getImage = (
        {
            scrambletxt,
            puzzleName = '333',
            imageFormat = '.png',
        }
    )=>{
        const fullUrl = `${baseUrl}/view/${puzzleName}${imageFormat}?scramble=${encodeURIComponent(scrambletxt)}`
        // console.log(fullUrl)
        // const res =await axios.get(fullUrl)
        return fullUrl

    }

    return {
        getPuzzlelist,
        getScrmable,
        getImage
    }

}

module.exports = {
    tnoodle
}
