const { displayList } = require("../scriptFilter");
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
const scramblePannelDefault = ({
    dataContainer = new displayList()
} = {}
)=>{
    const data = dataContainer
    const title_1 = `Generate scramble | command : event + numbers(1-5)`
    const title_2 = `Event: [xxx](2-7)   [xxxni](3-5)   333fm   444fast`
    const title_3 = `Event: clock  minx  pyram  skewb  sq1  sq1fast`
    data
    .title(title_1)
    .valid(["set", false])
    .icon("jpg", "./img/help.jpg")
    .additems()
    .title(title_2)
    .valid(["set", false])
    .icon("jpg", "./img/help.jpg")
    .additems()
    .title(title_3)
    .valid(["set", false])
    .icon("jpg", "./img/help.jpg")
    return data
}

const scramblePannelHelp = ({
    type,
    dataContainer = new displayList()
    })=>{
    const data = dataContainer
    

    for(let scramble_type of allPuzzleName){
        if(scramble_type.includes(type)){
                // sq1 特殊，没有sq1fast图片
                const evneticon = scramble_type=='sq1fast'
                ? 'sq1'
                : scramble_type.match(/(^[2-7]{3})|(^[a-z]+)/g)[0]
                data.additems()
                .title(`Generate <${scramble_type}> scramble`)
                .subtitle(`press enter to choose this type`)
                .valid(["set", false])
                .autocomplete(`${scramble_type} `)
                .icon("jpg", `./img/event/${evneticon}.jpg`)
                // .quicklookurl(`https://www.baidu.com`)

            }
    }
    // 放在最后
    data.additems()
    .title(`Generate <${type}> scramble `)
    .subtitle(
        "Command Format: event + numbers(1-5)"
    )
    .valid(["set", false])
    .icon("jpg", "./img/help.jpg")

    return data
}


module.exports = {
    scramblePannelDefault,
    scramblePannelHelp
};
