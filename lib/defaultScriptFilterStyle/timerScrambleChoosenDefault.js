const { displayList } = require("../scriptFilter");
const {tnoodle}= require('../wca/tnoodle')
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
const scrambleSelectPannelDefault = ({
    dataContainer = new displayList()
} = {}
)=>{
    const data = dataContainer
    const title_1 = `Before timing choose a scramble type first`
    const subtitle_1= `command : event name\t|e.g. 333、sq1`
    const title_2 = `Event: [xxx](2-7)   [xxxni](3-5)   333fm   444fast`
    const title_3 = `Event: clock  minx  pyram  skewb  sq1  sq1fast`
    data
    .title(title_1)
    .subtitle(subtitle_1)
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

const timerPannelHelp = (
    {
        dataContainer = new displayList()
    } = {}
)=>{
    const data = dataContainer
    data
        .title(`Start| press enter or table to start`)
        .valid(['set',false])
        .icon('jpg',`./img/timer_start.jpg`)
        .autocomplete('s')
        .additems()
        .title(`Stop| press enter or table to stop timer`)
        .valid(['set',false])
        .icon('jpg',`./img/timer_stop.jpg`)
        .autocomplete('e')
        .additems()
        .title(`Clear| press enter or table to clear`)
        .valid(['set',false])
        .icon('jpg',`./img/timer_clear.jpg`)
        .autocomplete('c')
        .additems()
        .title(`Simple Timer, just for fun`)
        .subtitle('s to start,e to stop, c to clear')
        .valid(['set',false])
        .icon('jpg',`./img/help.jpg`)
    return data
}

const timerOnPannel = (
    {
        type,
        scramble,
        dataContainer = new displayList()
    } = {}
)=>{
    const data = dataContainer
    // sq1 特殊，没有sq1fast图片
    const eventicon = type=='sq1fast'
    ? 'sq1'
    : type.match(/(^[2-7]{3})|(^[a-z]+)/g)[0]

    data
    .title(`Start| press enter or table to start`)
    // .valid(['set',false])
    .arg('true')
    .icon('jpg',`./img/timer_start.jpg`)
    .autocomplete('s')
    const scramble_img = tnoodle().getImage({
        scrambletxt : scramble,
        puzzleName : type
    })
    scramble = scramble.replace(/\n/g,' ')
    if(eventicon == '222'|| eventicon == '333'){
        data.additems()
            .title(scramble)
            .subtitle(`Press enter to copy this scramble, shift to show scramble image`)
            .icon("jpg", `./img/event/${eventicon}.jpg`)
            .text(scramble,scramble)
            .valid(['set',false])
            .quicklookurl(`${scramble_img}`)
    }else{
        for(let text_index = 0;text_index<scramble.length;text_index=text_index+50){
            data.additems()
            .title(scramble.substr(text_index,50))
            .subtitle(`Press enter to copy this scramble, shift to show scramble image`)
            .icon("jpg", `./img/event/${eventicon}.jpg`)
            .text(scramble,scramble)
            .valid(['set',false])
            // .arg(scramble)
            .quicklookurl(`${scramble_img}`)
        }
    }
    return data
}

const timerStartPannel = (
    {
        type,
        scramble,
        timer,
        dataContainer = new displayList()
    } = {}
)=>{
    const data = dataContainer
    // sq1 特殊，没有sq1fast图片
    const eventicon = type=='sq1fast'
    ? 'sq1'
    : type.match(/(^[2-7]{3})|(^[a-z]+)/g)[0]

    data
    .title(`Stop| press enter or table to stop timer`)
    .valid(['set',false])
    .icon('jpg',`./img/timer_stop.jpg`)
    .autocomplete('e')
    .additems()
    .title(`Time:\t${timer}`)
    .valid(["set", false])
    .rerun("0.2")
    const scramble_img = tnoodle().getImage({
        scrambletxt : scramble,
        puzzleName : type
    })
    scramble = scramble.replace(/\n/g,' ')
    if(eventicon == '222'|| eventicon == '333'){
        data.additems()
            .title(scramble)
            .subtitle(`Press enter to copy this scramble, shift to show scramble image`)
            .icon("jpg", `./img/event/${eventicon}.jpg`)
            .text(scramble,scramble)
            .valid(['set',false])
            .quicklookurl(`${scramble_img}`)
    }else{
        for(let text_index = 0;text_index<scramble.length;text_index=text_index+50){
            data.additems()
            .title(scramble.substr(text_index,50))
            .subtitle(`Press enter to copy this scramble, shift to show scramble image`)
            .icon("jpg", `./img/event/${eventicon}.jpg`)
            .text(scramble,scramble)
            .valid(['set',false])
            // .arg(scramble)
            .quicklookurl(`${scramble_img}`)
        }
    }
    return data
}

const timerStopPannel = (
    {
        type,
        scramble,
        timer,
        dataContainer = new displayList()
    } = {}
)=>{
    const data = dataContainer
    // sq1 特殊，没有sq1fast图片
    const eventicon = type=='sq1fast'
    ? 'sq1'
    : type.match(/(^[2-7]{3})|(^[a-z]+)/g)[0]
    
    const  finnalResult = `Item: ${type}\nResult: ${timer}\nScramble:${scramble}\n`


    data
    .title(`Clear and rescramble| press enter or table to restart`)
    .valid(['set',false])
    .icon('jpg',`./img/timer_clear.jpg`)
    .autocomplete('r')
    .additems()
    .title(`Time Result:\t${timer}`)
    .subtitle(`Press enter to copy this result and scramble`)
    .valid(["set", true])
    .text(finnalResult,finnalResult)
    .arg(finnalResult)
    const scramble_img = tnoodle().getImage({
        scrambletxt : scramble,
        puzzleName : type
    })
    scramble = scramble.replace(/\n/g,' ')
    if(eventicon == '222'|| eventicon == '333'){
        data.additems()
            .title(scramble)
            .subtitle(`Press enter to copy this scramble, shift to show scramble image`)
            .icon("jpg", `./img/event/${eventicon}.jpg`)
            .text(scramble,scramble)
            .valid(['set',false])
            .quicklookurl(`${scramble_img}`)
    }else{
        for(let text_index = 0;text_index<scramble.length;text_index=text_index+50){
            data.additems()
            .title(scramble.substr(text_index,50))
            .subtitle(`Press enter to copy this scramble, shift to show scramble image`)
            .icon("jpg", `./img/event/${eventicon}.jpg`)
            .text(scramble,scramble)
            .valid(['set',false])
            // .arg(scramble)
            .quicklookurl(`${scramble_img}`)
        }
    }
    return data
}

const timerRestartPannel = (
    {
        type,
        scramble,
        dataContainer = new displayList()
    } = {}
)=>{
    const data = dataContainer
    // sq1 特殊，没有sq1fast图片
    const eventicon = type=='sq1fast'
    ? 'sq1'
    : type.match(/(^[2-7]{3})|(^[a-z]+)/g)[0]

    data
    .title(`Start| press enter or table to start`)
    .valid(['set',false])
    .icon('jpg',`./img/timer_start.jpg`)
    .autocomplete('s')
    const scramble_img = tnoodle().getImage({
        scrambletxt : scramble,
        puzzleName : type
    })
    scramble = scramble.replace(/\n/g,' ')
    if(eventicon == '222'|| eventicon == '333'){
        data.additems()
            .title(scramble)
            .subtitle(`Press enter to copy this scramble, shift to show scramble image`)
            .icon("jpg", `./img/event/${eventicon}.jpg`)
            .text(scramble,scramble)
            .valid(['set',false])
            .quicklookurl(`${scramble_img}`)
    }else{
        for(let text_index = 0;text_index<scramble.length;text_index=text_index+50){
            data.additems()
            .title(scramble.substr(text_index,50))
            .subtitle(`Press enter to copy this scramble, shift to show scramble image`)
            .icon("jpg", `./img/event/${eventicon}.jpg`)
            .text(scramble,scramble)
            .valid(['set',false])
            // .arg(scramble)
            .quicklookurl(`${scramble_img}`)
        }
    }
    return data
}







const scrambleSelectPannelHelp = ({
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
                .title(`Choose <${scramble_type}> as scramble type`)
                .subtitle(`press enter to choose this type`)
                .valid(["set", false])
                .autocomplete(`${scramble_type}-s`)
                .icon("jpg", `./img/event/${evneticon}.jpg`)
            }
    }
    return data
}


module.exports = {
    scrambleSelectPannelDefault,
    scrambleSelectPannelHelp,
    timerPannelHelp,
    timerOnPannel,
    timerRestartPannel,
    timerStartPannel,
    timerStopPannel,
};
