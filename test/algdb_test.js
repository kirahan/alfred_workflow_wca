const {algdb} = require('../lib/algdb/algdbapi')
// const {
//     svg2png,
//     downloadSvgAnd2PngThenSave
// } = require('../lib/algdb/svg2pngAndSave')


// const puzzles = algdb().getStats()
// const puzzles = algdb().getPuzzles()
// const puzzles = algdb().getTopCaseGroups()
// const puzzles = algdb().getCase()
// console.log(puzzles)

// const newfile = downloadSvgAnd2PngThenSave({
//     fileName : `cll`,
//     imageUrl : `http://cubiclealgdbimagegen.azurewebsites.net/generator?&puzzle=2&case=y' F U' R2 U' R' U2 R U' R2 F'&view=plan&stage=cll`
// })
// // console.log(newfile)

// svg2png('cll')

const puzzleOptions = {
    id: "5ffac66a-7f8d-414a-8cd6-73150cb137ba",
name: "OH OLL",
shortName: "oholl",
nameWithParents: "OH OLL",
puzzleName: "3x3",
puzzleShortName: "333",
public: true,
hasChildren: false,
imageType: "puzzleImageGenerator",
pigPuzzle: "3",
pigCase: "R' U R2 z' R u' z U r z' R' U2 z U' R",
pigStage: "oll",
pigView: "trans",
caseTypeEnum: "permutation",
}
const url = algdb().getVisCubePngUrl(puzzleOptions)