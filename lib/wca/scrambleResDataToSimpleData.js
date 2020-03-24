const { displayList } = require("../scriptFilter")
const {tnoodle} = require('./tnoodle')
const scrambleResDataToScriptFilterData = scrambleResData =>{
    const {
        scrambles,
        type = '333',
    } = scrambleResData

    const data = new displayList()
    // sq1 特殊，没有sq1fast图片
    const eventicon = type=='sq1fast'
    ? 'sq1'
    : type.match(/(^[2-7]{3})|(^[a-z]+)/g)[0]

    let clipboard = ''
    for(let index=0;index<scrambles.length;index++){
        clipboard = clipboard + `${index+1}.${scrambles[index]}\n`
    }
    data
    .title(`Generate <${type}> again`)
    .valid(["set", false])
    .autocomplete(`${type} ${scrambles.length} ${Math.floor(Math.random()*100)}`)
    .additems()
    .title(`Generate <${type}> press enter to copy all scrambles`)
    .valid(["set", true])
    .icon("jpg", `./img/event/${eventicon}.jpg`)
    .text(clipboard,clipboard)
    .arg(clipboard)
    // .quicklookurl(`https://www.baidu.com`)
    
    for(let scramble of scrambles){

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
                .arg(scramble)
                .quicklookurl(`${scramble_img}`)
        }else{
            for(let text_index = 0;text_index<scramble.length;text_index=text_index+50){
                data.additems()
                .title(scramble.substr(text_index,50))
                .subtitle(`Press enter to copy this scramble, shift to show scramble image`)
                .icon("jpg", `./img/event/${eventicon}.jpg`)
                .text(scramble,scramble)
                .arg(scramble)
                .quicklookurl(`${scramble_img}`)
            }
        }
        
        


    }

    return data


}


module.exports = {
    scrambleResDataToScriptFilterData
}