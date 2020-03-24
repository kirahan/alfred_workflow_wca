const { displayList } = require("../scriptFilter");
const {algdb} = require('../algdb/algdbapi')
const algSearchPannelDefault = ({
    dataContainer = new displayList()
} = {}
)=>{
    const data = dataContainer
    const title_1 = `Search algs | First step type EventName`
    const title_2 = `Command : EventName + SetName + CaseName`
    const title_3 = `Available Event: 222 、333`
    data
    .title(`Show all 222 CaseSets`)
    .subtitle('Press enter or table to show them')
    .valid(["set", false])
    .icon("jpg", `./img/algdb/222.png`)
    .autocomplete('222 ')
    .additems()
    .title(`Show all 333 CaseSets`)
    .subtitle('Press enter or table to show them')
    .valid(["set", false])
    .icon("jpg", `./img/algdb/333.png`)
    .autocomplete('333 ')
    .additems()
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

const algPuzzleSelectPannel = ({
        pzl,
        dataContainer = new displayList()
} = {}
)=>{
    const data = dataContainer

    const puzzleList = ['222','333']
    for(puzzle of puzzleList){
        // console.log(puzzle)
        if(puzzle.includes(pzl)){
            data
            .title(`Show all ${puzzle} CaseSets`)
            .subtitle('Press enter or table to show them')
            .valid(["set", false])
            .icon("jpg", `./img/algdb/${puzzle}.png`)
            .autocomplete(`${puzzle} `)
            .additems()
        }
    }
    data
    .title(`sq1 does not support`)
    .valid(["set", false])
    .icon("jpg", "./img/help.jpg")

    return data
}

const algPuzzleSetsSelectPannel = async ({
    pzl,
    setname,
    dataContainer = new displayList(),
    callback,
} = {}
)=>{
    const data = dataContainer
    const sets = await algdb().getPuzzleSet(pzl)
        for(set of sets){
            const {
                name,shortName
            }= set
            if(shortName.includes(setname) || setname==undefined){
                data
                .title(`Show CaseSets ${name} of puzzle ${pzl}`)
                .subtitle('Press enter or table to show them')
                .valid(["set", false])
                .icon("jpg", `./img/algdb/${pzl}/${pzl}_sets_${shortName}.png`)
                .autocomplete(`${pzl} ${shortName} `)
                .additems()
            }
        }
    callback(data)
    // return data
}

const algPuzzleCaseSelectPannel = async ({
    pzl,
    setname,
    casename,
    callback,
} = {}
)=>{
    const data = new displayList()



    const cases = await algdb().getCaseGroup(pzl,setname)
        for(_case of cases){
            const {
                name,shortName,caseAlgs,caseGroupName
            }= _case
            if(shortName.includes(casename) || casename==undefined){
                data
                .title(`Show case ${name} of puzzle ${pzl} caseSet ${caseGroupName}`)
                .subtitle('Press enter or table to show them')
                .valid(["set", false])
                .icon("jpg", `./img/algdb/${pzl}/${pzl}_casegroup_${shortName}.png`)
                .autocomplete(`${pzl} ${setname} ${shortName} `)
                .additems()
            }
        }
    callback(data)
}

const algPuzzleCaseAlgsDisplayPannel = async ({
    pzl,
    setname,
    casename,
    callback,
} = {}
)=>{
    const data =  new displayList()
    const algs = await algdb().getCase(pzl,setname,casename)
    const {
        name,shortName,caseAlgs,caseGroupName
    }= algs

    data
    .title(`Algorithm of Case ${name} | puzzle ${pzl} | caseSet ${caseGroupName}`)
    .subtitle('Press enter on each item to copy the algorithm')
    .valid(["set", false])
    .icon("jpg", `./img/help.jpg`)
    .autocomplete(`${pzl} ${setname} `)
    .additems()

        for(caseAlg of caseAlgs){
                let subtitle = caseAlg.createDate ? `createDate:${caseAlg.createDate}|` : ''
                 subtitle += caseAlg.votes ? `votes:${caseAlg.votes}|` : ''
                 subtitle += `Press enter to copy this algorithm`
                data
                .title(caseAlg.moves)
                .subtitle(subtitle)
                .valid(["set", true])
                .arg(caseAlg.moves)
                .text(caseAlg.moves,caseAlg.moves)
                .icon("jpg", `./img/algdb/${pzl}/${pzl}_casegroup_${shortName}.png`)
                .additems()
        }
    callback(data)
}


module.exports = {
    algSearchPannelDefault,
    algPuzzleSelectPannel,
    algPuzzleSetsSelectPannel,
    algPuzzleCaseSelectPannel,
    algPuzzleCaseAlgsDisplayPannel
};