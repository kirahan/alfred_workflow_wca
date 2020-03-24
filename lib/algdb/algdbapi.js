const axios = require('axios')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const path = require('path')
const adapter = new FileSync(path.join(__dirname+'/algdb.json'))
const db = low(adapter)

const getParamFieldUpdateDateOfLocalJsonDB = (field,comparedate = Date.now())=>{
    const updateAt = db.get(`${field}_updateAt`).value()
    if(updateAt){
        const islessthan1day = ((comparedate - updateAt)/1000/60/60/24)<1 ? true : false
        return {updateAt,islessthan1day,hasfield:true}
    }else{
        return {hasfield:false}
    }
    
}


const algdb = (baseUrl = 'http://cubiclealgdbserver.azurewebsites.net/user')=>{

    const getPuzzles = async()=>{
        const localData = getParamFieldUpdateDateOfLocalJsonDB('puzzles')   
        if(localData.hasfield && localData.islessthan1day){
            return db.get('puzzles').value
        }else{
            const res = await axios.get(`${baseUrl}/content/puzzles`)
            const updateAt = Date.now()
                db.set('puzzles',res.data ).set('puzzles_updateAt',updateAt).write()
            return res.data 
        } 
    }

    const getTopCaseGroups = async()=>{
        const localData = getParamFieldUpdateDateOfLocalJsonDB('topCaseGroups')   
        if(localData.hasfield && localData.islessthan1day){
            return db.get('topCaseGroups').value
        }else{
            const res = await axios.get(`${baseUrl}/topCaseGroups`)
            const updateAt = Date.now()
                db.set('topCaseGroups',res.data ).set('topCaseGroups_updateAt',updateAt).write()
            return res.data 
        } 
        
    }

    const getStats = async()=>{
        const localData = getParamFieldUpdateDateOfLocalJsonDB('stats')   
        if(localData.hasfield && localData.islessthan1day){
            return db.get('stats').value
        }else{
            const res = await axios.get(`${baseUrl}/stats`)
            const updateAt = Date.now()
                db.set('stats',res.data ).set('stats_updateAt',updateAt).write()
            return res.data 
        } 
        
    }

    // const get222Set = async()=>{
    //     const res = await axios.get(`${baseUrl}/content/puzzle/222`)
    //     return res.data
    // }

    // const get333Set = async()=>{
    //     const res = await axios.get(`${baseUrl}/content/puzzle/333`)
    //     return res.data
    // }

    const getPuzzleSet = async(puzzle)=>{
        const localData = getParamFieldUpdateDateOfLocalJsonDB(`puzzle_${puzzle}_sets`)   
        if(localData.hasfield && localData.islessthan1day){
            return db.get(`puzzle_${puzzle}_sets`).value()
        }else{
            const res = await axios.get(`${baseUrl}/content/puzzle/${puzzle}`)
            const updateAt = Date.now()
                db.set(`puzzle_${puzzle}_sets`,res.data ).set(`puzzle_${puzzle}_sets_updateAt`,updateAt).write()
            return res.data 
        } 
    }


    // const getsq1Set = async()=>{
    //     const res = await axios.get(`${baseUrl}/content/puzzle/sq1`)
    //     console.log(res.data)
    //     return res.data
    // }

    const getCaseGroup = async(puzzleName = '333',caseGroupName = 'pll')=>{
        const field = `algs.p_${puzzleName}.c_${caseGroupName}.list`
        const update_filed = `puzzle_${puzzleName}_set_${caseGroupName}`
        const localData = getParamFieldUpdateDateOfLocalJsonDB(update_filed)   
        if(localData.hasfield && localData.islessthan1day){
            return db.get(field).value()
        }else{
            const res = await axios.get(`${baseUrl}/content/caseGroup/${puzzleName}/${caseGroupName}`)
            const updateAt = Date.now()
                db.set(field,res.data ).set(`puzzle_${puzzleName}_set_${caseGroupName}_updateAt`,updateAt).write()
            return res.data 
        }
    }

    const getCase = async(puzzleName = '333',caseGroupName = 'pll',caseName = 'aa')=>{

        const field = `algs.p_${puzzleName}.c_${caseGroupName}.a_${caseName}`
        const update_filed = `puzzle_${puzzleName}_set_${caseGroupName}_case_${caseName}`
        const localData = getParamFieldUpdateDateOfLocalJsonDB(update_filed)   
        if(localData.hasfield && localData.islessthan1day){
            return db.get(field).value()
        }else{
            const res = await axios.post(`${baseUrl}/content/case/${puzzleName}/${caseGroupName}/${caseName}`,{
                userId: null
            })
            const updateAt = Date.now()
                db.set(field,res.data ).set(`${update_filed}_updateAt`,updateAt).write()
            return res.data 
        }
    }

    // algdb的visualcube经过了修改，与原版的visualcube不太一致
    // 因为algdb的图片不支持png格式，而且svg格式经过sharp转化png也不正确
    // 所以这个方法是转换到原版visualcube获取一次
    // 返回我自己的服务器版本url
    const getVisCubePngUrl = imageParams =>{
        const {
            name,shortName,nameWithParents,puzzleName,
            puzzleShortName,pigPuzzle,pigCase,pigStage,
            pigView,caseTypeEnum
        } = imageParams
        const BASEURL = 'http://solarsunrise.cn/index.php'
        const FMT = 'png'
        const SIZE = '200'
        const CASE = encodeURIComponent(pigCase)
        const STAGE = pigStage
        // 原版不支持 two 、three 两个字段
        const PZL = pigPuzzle == 'two' ? '2' : (pigPuzzle == 'three' ? '3' : pigPuzzle)
        // 原版的trans表示魔方trans，alg表示的是背景的颜色
        const VIEW = pigView == 'trans' ? '' :pigView
        const allParams = `${BASEURL}?fmt=${FMT}&pzl=${PZL}&size=${SIZE}&view=${VIEW}&case=${CASE}&stage=${STAGE}`
        return allParams
    }


    return {
        getStats,
        // get222Set,
        // get333Set,
        // getsq1Set,
        getPuzzleSet,
        getPuzzles,
        getCase,
        getCaseGroup,
        getTopCaseGroups,
        getVisCubePngUrl,
    }

}

module.exports = {
    algdb
}
