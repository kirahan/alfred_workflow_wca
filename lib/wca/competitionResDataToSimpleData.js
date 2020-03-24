const { displayList } = require("../scriptFilter");
const { events, eventNameById } = require("./events");

const competitionResDataToScriptFilterData = ({
  wcif,
  result,
  baseinfo,
  competitior,
  registration,
  dataContainer = new displayList(),
}) => {
  const data = dataContainer;
  
  if(baseinfo){
      const {
          url,id,name,short_name,website,city,venue_address,venue_details,country_iso2,start_date,
          end_date,delegates,event_ids
      } = baseinfo
    //   title1 name
    // title2 date
    // title3 address


      let title_2  = start_date == end_date 
        ? `Date: ${start_date.replace(/-/g,'.')}`
        : `Date: ${start_date.replace(/-/g,'.')}-${end_date.split('-').pop()}`
      let title_3 = `${city},\t${country_iso2} `

      data.additems()
      .title(`${name}`).valid(['set',true]).arg(`openpage,${url}`).subtitle(`Open ${short_name} Wca page in browser`)
      .mods("alt", {
        valid: true,
        arg: `openpage,${website}`,
        subtitle: `Open ${short_name} website page in browser`
      })
      .additems()
      .title(`${title_2}`).valid(['set',false])
      .additems()
      .title(`${title_3}`).valid(['set',false]).subtitle(`${venue_address}|${venue_details}`)
  }
  if(wcif){
      const {
        id,name,shortName,persons,events,competitorLimit
      } = wcif
    //   title1 name
    // title2 date
    // title3 address
    // title1
    let title_1 = persons.length==2 
    ?   `Organizers:${persons[0].name}|Delegates:${persons[0].name}`
    :   `Delegates:${persons[0].name}`

    data.additems()
    .title(`${title_1}`).valid(['set',false])
   

    for(let event of events){
        const round = event.rounds.length
        const title = `${eventNameById(event.id)}\t|\tRound:${round}`
        data.additems()
        .title(`${title}`).valid(['set',false])
    }

  }


  return data;
};
module.exports = {
    competitionResDataToScriptFilterData,
};
