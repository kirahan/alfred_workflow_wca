const { displayList } = require("../scriptFilter");
const { saveAvatar } = require("../saveAvator");
const searchUsersResDataToSimpleData = searchResData => {
  const data = new displayList();
  // 每一条都是一个用户
  for (let user of searchResData) {
    const { url, wca_id, name, gender, country_iso2, avatar } = user;
    const avatarpath = saveAvatar(avatar);
    if (name) {
      data
        .title(`${name}`)
        .subtitle(
          `Wcaid: ${wca_id} \tGender: ${gender} \tCountry: ${country_iso2}\t`
        )
        .icon("jpg", `./img/${avatarpath}`)
        .arg(`showuserdata,${wca_id}`)
        .mods("alt", {
          valid: true,
          arg: `openpage,${url}`,
          subtitle: `Open ${name} homepage in browser`
        })
        .additems();
    }
  }
  return data;
};

const searchCompetitionResDataToSimpleData = searchResData=>{
  const data = new displayList();
  for(let searchItem of searchResData){
    const {
      url,id,website,short_name,city,country_iso2,start_date,announced_at,
      end_date,delegates,organizers,event_ids
    } = searchItem
    let title  = start_date == end_date 
    ? `${short_name}\tDate: ${start_date.replace(/-/g,'.')}`
    : `${short_name}\tDate: ${start_date.replace(/-/g,'.')}-${end_date.split('-').pop()}`
    let subtitle = `${city}, ${country_iso2}` 
    subtitle = delegates ? subtitle + `\t|Delegates:${delegates[0].name}`: subtitle
    // subtitle = organizers ? subtitle + `|organizers:${organizers[0].name}`: subtitle
    data.title(`${title}`)
    .subtitle(`${subtitle}`)
    .valid(['set',false])
    .autocomplete(`competition ${id}?`)
    // .arg(`showcompetitiondata,${id}`)
    .mods("alt", {
      valid: true,
      arg: `openpage,${url}`,
      subtitle: `Open ${short_name} wca page in browser`
    })
    .additems()
  }
  return data
}

const searchRuleResDataToSimpleData = searchResData =>{
  const data = new displayList();
  for(let searchItem of searchResData){
    const {
      url,id,content_html
    } = searchItem
    data.title(`Regulation: ${id}|\t${content_html.slice(0,40)}`)
    .subtitle(`enter to see regulation:${id} on wca page | shift to quicklook`)
    .valid(['set',true])
    .arg(`openpage,https://www.worldcubeassociation.org${url}`)
    .quicklookurl(`https://www.worldcubeassociation.org${url}`)
    .additems()

    // let bodylength = content_html.length
    // for(let process=0;process<bodylength;process+50){
    //   data.title('232').subtitle(`${content_html.substr(process,50)}`).valid(['set',false])
    //   .additems()
    // }

  }
  return data
}

module.exports = {
  searchRuleResDataToSimpleData,
  searchUsersResDataToSimpleData,
  searchCompetitionResDataToSimpleData
};
