const {algdb} = require('./algdbapi')
const {savePngFile} = require('./pngSaver')



const createPuzzleImage = async ()=>{
    const puzzles = await algdb().getPuzzles()
    // console.log(puzzles)
    for(puzzle of puzzles){
        const imageUrl = algdb().getVisCubePngUrl(puzzle)
        const fileName = puzzle.shortName
        savePngFile(fileName,imageUrl, (name)=>{
            console.log(`file ${name} download successfully`)
        })
    }
}
const create222SetImage = async ()=>{
    const sets = await algdb().get222Set()
    const folder = '222'
    // console.log(puzzles)
    for(set of sets){
        const imageUrl = algdb().getVisCubePngUrl(set)
        console.log(imageUrl)
        const fileName = `222_sets_${set.shortName}`
        savePngFile(folder,fileName,imageUrl, (name)=>{
            console.log(`file ${name} download successfully`)
        })
    }
}
const create333SetImage = async ()=>{
    const sets = await algdb().get333Set()
    const folder = '333'
    // console.log(puzzles)
    for(set of sets){
        const imageUrl = algdb().getVisCubePngUrl(set)
        console.log(imageUrl)
        const fileName = `333_sets_${set.shortName}`
        savePngFile(folder,fileName,imageUrl, (name)=>{
            console.log(`file ${name} download successfully`)
        })
    }
}

const createPuzzleCaseGroupImage = async (puzzle)=>{
    
    const sets = await algdb().getPuzzleSet(puzzle)

    for(set of sets){
        const caseGroupName = set.shortName
        await createCaseGroupImage(puzzle,caseGroupName)
    }
    console.log(`全部${puzzle}下图片下载完成`)
    return Promise.resolve()
}

const createCaseGroupImage = async (puzzle,casegroup)=>{
    const caseGroups = await algdb().getCaseGroup(puzzle,casegroup)
    const folder = puzzle
    // console.log(puzzles)
    for(caseGroup of caseGroups){
        const imageUrl = algdb().getVisCubePngUrl(caseGroup)
        console.log(imageUrl)
        const fileName = `${puzzle}_casegroup_${caseGroup.shortName}`
        savePngFile(folder,fileName,imageUrl, (name)=>{
            console.log(`file ${name} download successfully`)
        })
    }
}




// createPuzzleImage()
// create222SetImage()
// create333SetImage()
// createAllCaseGroupImage('333','cmll')

// createPuzzleCaseGroupImage('222')
// createPuzzleCaseGroupImage('333')


algdb().getCaseGroup('333','pll')
// algdb().getCase('333','pll','aa')


