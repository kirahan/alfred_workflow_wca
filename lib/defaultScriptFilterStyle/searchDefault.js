const { displayList } = require("../scriptFilter");
const searchPannelDefault = ({
  cmd,
  dataContainer = new displayList(),
}) => {
  const data = dataContainer
  const pannelTitle = ['my','person','record','competition','rule']
    // 含有my字母就显示my面板
    if(!cmd || pannelTitle[0].includes(cmd)){
        data.additems()
            .title("my")
            .subtitle("show my own infomation")
            .autocomplete("my ")
            .valid(["set", false])
            .icon("jpg", "./img/me.jpg");
    }

    // 含有person字母就显示person面板
    if(!cmd || pannelTitle[1].includes(cmd)){
        data.additems()
        .icon("jpg", "./img/person.jpg")
        .title("person")
        .subtitle("search person by wcaid or name")
        .autocomplete("person ")
        .valid(["set", false]);
    }

    // 含有record字母就显示record面板
    if(!cmd || pannelTitle[2].includes(cmd)){
        data.additems()
        .icon("jpg", "./img/record.jpg")
            .title("record")
            .subtitle("search the record")
            .autocomplete("record ")
            .valid(["set", false]);
       
    }

    // 含有competition字母就显示competition面板
    if(!cmd || pannelTitle[3].includes(cmd)){
        data.additems()
        .icon("jpg", "./img/competition.jpg")
            .title("competition")
            .subtitle("search competition by title")
            .autocomplete("competition ")
            .valid(["set", false]);
       
    }

    // 含有rule字母就显示rule面板
    if(!cmd || pannelTitle[4].includes(cmd)){
        data.additems()
        .icon("jpg", "./img/rule.jpg")
            .title("rule")
            .subtitle("search rule by content")
            .autocomplete("rule ")
            .valid(["set", false]);
    }
   
    return data;
}

const searchRecordPannelDefault = ({
  record,
  dataContainer = new displayList()
})=>{
  const data = dataContainer
  const title_1 = record
    ? `Search records in localhost`
    : `Search records in localhost, need update`;
  const subtitle_1 = record
    ? `[updated in ${record.updateAt.slice(0, 10)}]`
    : `records data size is large, so save it in local and upgrade when necessary`;
  const title_2 = `Format: region + item, like "record w 333"`;
  const subtitle_2 = `region: [w] for WR ,[af,eu,as,na,sa,oc] for CR,[country name] for NR`;
            
  data
  .title(title_1)
  .subtitle(subtitle_1)
  .valid(["set", false])
  .icon("jpg", "./img/help.jpg")
  .additems()
  .title(title_2)
  .subtitle(subtitle_2)
  .valid(["set", false])
  .icon("jpg", "./img/help.jpg")
  .additems()
  .title(`Update records for WCA`)
  .subtitle(`it may take 10-20 seconds, please wait`)
  .autocomplete('record update ')
  .valid(["set", false]);
  return data
}

const searchPersonPannelDefault = ({
  cmd,
  dataContainer = new displayList()
})=>{
  const data = dataContainer
  data
  .title(` > Tutorial`)
  .subtitle("just type person name or wcaid, wcaid are recommended")
  .valid(["set", false])
  .icon("jpg", "./img/help.jpg");
  return data
}

const searchRulePannelDefault = ({
  cmd,
  dataContainer = new displayList()
})=>{
  const data = dataContainer
  data
  .title(` > Tutorial`)
  .subtitle("Search regulations,use content 1e1 or title")
  .valid(["set", false])
  .icon("jpg", "./img/help.jpg");
  return data
}

const searchCompetitionPannelDefault = ({
  cmd,
  dataContainer = new displayList()
})=>{
  const data = dataContainer
  data
  .title(` > Tutorial`)
  .subtitle("input competition title to search it, search begin when = is detected ")
  .valid(["set", false])
  .icon("jpg", "./img/help.jpg");
  return data
}

const searchPersonPannelHelp = ({
  content,
  dataContainer = new displayList()
})=>{
  const data = dataContainer
  data
  .title(`Search for ${content}`)
  .subtitle(
    "just type person name or wcaid, search begin when = is detected"
  )
  .autocomplete(`${process.argv[3]}=`)
  .valid(["set", false])
  .icon("jpg", "./img/search.jpg")
  .additems()
  .title(`Search <${content}> in WCA`)
  .subtitle("press enter to open with your default browser")
  .valid(["set", true])
  .arg(
    `openpage,https://www.worldcubeassociation.org/search?q=${content}`
  );
  return data
}

const searchRulePannelHelp = ({
  content,
  dataContainer = new displayList()
})=>{
  const data = dataContainer
  data
  .title(`Search for ${content}`)
  .subtitle(
    "Search regulations,use content 1e1 or title, begin when = is detected"
  )
  .valid(["set", false])
  .autocomplete(`${process.argv[3]}=`)
  .icon("jpg", "./img/search.jpg")
  .additems()
  .title(`Search regulations <${content}> in WCA`)
  .subtitle("press enter to open with your default browser")
  .valid(["set", true])
  .arg(
    `openpage,https://www.worldcubeassociation.org/search?q=${content}`
  );
  return data
}

const searchCompetitionPannelHelp = ({
  content,
  dataContainer = new displayList()
})=>{
  const data = dataContainer
  data
  .title(`Search competition for ${content}`)
  .subtitle(
    "input competition title to search it, search begin when = is detected"
  )
  .autocomplete(`${process.argv[3]}=`)
  .valid(["set", false])
  .icon("jpg", "./img/search.jpg")
  .additems()
  .title(`Search competition <${content}> in WCA`)
  .subtitle("press enter to open with your default browser")
  .valid(["set", true])
  .arg(
    `openpage,https://www.worldcubeassociation.org/search?q=${content}`
  );
  return data
}


module.exports = {
    searchPannelDefault,
    searchPersonPannelDefault,
    searchPersonPannelHelp,
    searchCompetitionPannelDefault,
    searchCompetitionPannelHelp,
    searchRulePannelDefault,
    searchRulePannelHelp,
    searchRecordPannelDefault,
};
