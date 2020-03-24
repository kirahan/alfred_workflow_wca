module.exports = app => {
    const express = require('express')
    const request = require('request')
    const fs = require('fs')
    const path = require('path')
    const {db} = require('../../db/db.js')
    const {authorizationUrl,oauthDataFromCode,refreshUserAccessToken} = require('../../../lib/wca')
    // const {authorizationUrl,oauthDataFromCode,refreshUserAccessToken} = require('../../../lib/wca-oauth')
    // const wcaApi = require('../../../lib/wca-api')
    const wcaApi = require('../../../lib/wcaapi')
    const router = express.Router(
        {mergeParams : true}
    )

    const userJsonToUser = userJson => ({
        wcaUserId: userJson['id'],
        wcaId: userJson['wca_id'],
        name: userJson['name'],
        avatar: {
          url: userJson['avatar']['url'],
          thumbUrl: userJson['avatar']['thumb_url'],
        },
      })

    router.get('/islogged',async(req,res)=>{
        const isLogged = db.get('isLogged').value()
        if(isLogged){
            res.send({
                isLogged : true,
            })
        }else{
            res.send({
                isLogged : false,
                loginUrl : authorizationUrl()
            })
        }
        
    })

    router.get('/oauth',async (req,res)=>{
        const oauth = await oauthDataFromCode(req.query.code);
        // if has taken store token and change logged flag
        if(oauth.accessToken){
             db.set('isLogged',true)
             .set('data.account.wca.oauth',oauth)
             .write()
             res.send('success!!')
        }
        
     })


    router.get('/myinfo',async (req,res)=>{
        const oauth = db.get('data.account.wca.oauth').value()
        const me = await wcaApi({ oauth }).getMe();
        const user = { ...userJsonToUser(me), oauth };
        db.set('data.account.wca.me',user)
        .write()
        res.send(user)

    })

    // 本地数据
    router.get('/record',async (req,res)=>{
        const records = db.get('data.result.records').value()
        res.send(records)

    })

    // 从服务器更新
    router.get('/updaterecord',async (req,res)=>{
        const oauth = db.get('data.account.wca.oauth').value()
        const records = await wcaApi({ oauth }).getRecords()
        records.updateAt = new Date()
        db.set('data.result.records',records).write()
        res.send(records)

    })

    //选手详细数据
    router.get('/person/:wcaid',async (req,res)=>{
        const wcaid = req.params.wcaid
        const oauth = db.get('data.account.wca.oauth').value()
        const person = await wcaApi({ oauth }).getPeopleByWcaIds(wcaid)
        // db.set(`data.result.person[${wcaid}]`,person).write()
        // res.send({type:'success'})
        res.send(person)

    })

    // 搜索选手
    router.get('/search/users/:nameorwcaid',async (req,res)=>{
        const nameOrwcaid = req.params.nameorwcaid
        const oauth = db.get('data.account.wca.oauth').value()
        const Users = await wcaApi({ oauth }).searchPeopleByNameOrWcaid(nameOrwcaid)
        res.send(Users.result)

    })

    // 搜索比赛
    router.get('/search/competition/:title',async (req,res)=>{
        const title = req.params.title
        const oauth = db.get('data.account.wca.oauth').value()
        const Competition = await wcaApi({ oauth }).searchCompetitionInfoByTitle(title)
        res.send(Competition.result)
    })

    // 搜索规则
    router.get('/search/rule/:index',async (req,res)=>{
        const index = req.params.index
        const oauth = db.get('data.account.wca.oauth').value()
        const Users = await wcaApi({ oauth }).searchRuleByTitle(index)
        res.send(Users.result)
    })

    //获取比赛基本信息
    router.get('/competition/:competition_id',async (req,res)=>{
        const competition_id = req.params.competition_id
        const oauth = db.get('data.account.wca.oauth').value()
        const competition = await wcaApi({ oauth }).getCompetitionInfoById(competition_id)
        res.send(competition)
    })

    //获取比赛赛果信息
    router.get('/competition/:competition_id/result',async (req,res)=>{
        const competition_id = req.params.competition_id
        const oauth = db.get('data.account.wca.oauth').value()
        const competition = await wcaApi({ oauth }).getCompetitionResultById(competition_id)
        res.send(competition)
    })

    //获取比赛赛程信息
    router.get('/competition/:competition_id/schedule',async (req,res)=>{
        const competition_id = req.params.competition_id
        const oauth = db.get('data.account.wca.oauth').value()
        const competition = await wcaApi({ oauth }).getCompetitionScheduleById(competition_id)
        res.send(competition)
    })

    //获取比赛选手信息
    router.get('/competition/:competition_id/competitior',async (req,res)=>{
        const competition_id = req.params.competition_id
        const oauth = db.get('data.account.wca.oauth').value()
        const competition = await wcaApi({ oauth }).getCompetitionCompetitorsById(competition_id)
        res.send(competition)
    })

    //获取比赛注册信息
    router.get('/competition/:competition_id/registration',async (req,res)=>{
        const competition_id = req.params.competition_id
        const oauth = db.get('data.account.wca.oauth').value()
        const competition = await wcaApi({ oauth }).getCompetitionRegistrationsById(competition_id)
        res.send(competition)
    })

    //获取比赛wcif public信息
    router.get('/competition/:competition_id/wcifpublic',async (req,res)=>{
        const competition_id = req.params.competition_id
        const oauth = db.get('data.account.wca.oauth').value()
        const competition = await wcaApi({ oauth }).getCompetitionWcifPublicById(competition_id)
        res.send(competition)
    })

    router.get('/setlogged',async (req,res)=>{
        db.set('isLogged',true)
        .write()
        res.send('success!!')
     })

     router.get('/setunlogged',async (req,res)=>{
        db.set('isLogged',false)
        .write()
        res.send('success!!')
     })
     

    app.use('/api', router)
}