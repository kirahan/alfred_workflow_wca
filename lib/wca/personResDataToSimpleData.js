const { displayList } = require("../scriptFilter");
const { saveAvatar } = require("../saveAvator");
const { events, eventNameById } = require("./events");
const { resultToString } = require("./utils");
const personResDataToScriptFilterData = personResData => {
  const {
    competition_count,
    records,
    medals,
    personal_records
  } = personResData;
  const {
    wca_id,
    name,
    url,
    gender,
    avatar,
    country_iso2
  } = personResData.person;
  const data = new displayList();

  if (name) {
    // 获取头像地址
    const avatarpath = saveAvatar(avatar);

    data
      .title(`\t${name}`)
      .subtitle(
        `Wcaid: ${wca_id}\tGender: ${gender}\tCountry: ${country_iso2}\tcompetition: ${competition_count}`
      )
      .icon("png", `./img/${avatarpath}`)
      .arg(`openpage,${url}`)
      .mods("alt", {
        valid: true,
        arg: `focususer,${wca_id}`,
        subtitle: `Focus ${name}`
      });

    if (records.total > 0) {
      data
        .additems()
        .icon("jpg", "./img/record.jpg")
        .title(`\tRecords total: ${records.total}`)
        .subtitle(
          ` World: ${records.world} | Continental: ${records.continetal} | National:${records.national}`
        );
    }

    if (medals.total > 0) {
      data
        .additems()
        .icon("jpg", "./img/medal.jpg")
        .title(`\tMedals total: ${medals.total}`)
        .subtitle(
          ` Gold: ${medals.gold} | Silver: ${medals.silver} | Bronze: ${medals.bronze}`
        );
    }
    for (let item in personal_records) {
      // 有平均成绩
      if (personal_records[item].average) {
        const resultSingle = personal_records[item].single.best;
        const resultAverage = personal_records[item].average.best;
        personal_records[item].single.best = resultToString(
          resultSingle,
          item,
          "single"
        );
        personal_records[item].average.best = resultToString(
          resultAverage,
          item,
          "average"
        );

        const itemlength = eventNameById(item).length;
        let itemtitle = eventNameById(item);
        if (itemlength >= 13) {
          itemtitle = eventNameById(item);
        } else if (itemlength < 13 && itemlength >= 10) {
          itemtitle = "\t" + eventNameById(item) + "\t";
        } else if (itemlength < 10 && itemlength >= 6) {
          itemtitle = "\t " + eventNameById(item) + " \t";
        } else {
          itemtitle = "\t\t" + eventNameById(item) + "\t\t";
        }
        let iconpath = `./img/event/${item}.jpg`;
        let clipboard = `Name: ${name}\nWcaid: ${wca_id}\nItem:${eventNameById(
          item
        )}\nSingle:${personal_records[item].single.best} -WR${
          personal_records[item].single.world_rank
        }-CR${personal_records[item].single.continent_rank}-NR${
          personal_records[item].single.country_rank
        }\nAverage:${personal_records[item].average.best}-NR${
          personal_records[item].average.country_rank
        }-CR${personal_records[item].average.continent_rank}-WR${
          personal_records[item].average.world_rank
        }\n`;
        data
          .additems()
          .title(
            `\t\t${personal_records[item].single.best}\t\ts|${itemtitle}|a\t\t\t${personal_records[item].average.best}`
          )
          .subtitle(
            `-WR${personal_records[item].single.world_rank}----CR${personal_records[item].single.continent_rank}----NR${personal_records[item].single.country_rank}-------------NR${personal_records[item].average.country_rank}---CR${personal_records[item].average.continent_rank}---WR${personal_records[item].average.world_rank}-----`
          )
          .icon("jpg", iconpath)
          .valid(["set", false])
          .text(clipboard, clipboard);
      } else {
        const resultSingle = personal_records[item].single.best;
        personal_records[item].single.best = resultToString(
          resultSingle,
          item,
          "single"
        );

        const itemlength = eventNameById(item).length;
        let itemtitle = eventNameById(item);
        if (itemlength >= 13) {
          itemtitle = eventNameById(item);
        } else if (itemlength < 13 && itemlength >= 10) {
          itemtitle = "\t" + eventNameById(item) + "\t";
        } else if (itemlength < 10 && itemlength >= 6) {
          itemtitle = "\t " + eventNameById(item) + " \t";
        } else {
          itemtitle = "\t\t" + eventNameById(item) + "\t\t";
        }
        let iconpath = `./img/event/${item}.jpg`;
        let clipboard = `Name: ${name}\nWcaid: ${wca_id}\nItem:${eventNameById(
          item
        )}\nSingle:${personal_records[item].single.best} -WR${
          personal_records[item].single.world_rank
        }-CR${personal_records[item].single.continent_rank}-NR${
          personal_records[item].single.country_rank
        }\n`;
        data
          .additems()
          .title(
            `\t\t${personal_records[item].single.best}\t\ts|${itemtitle}|a\t\t\t`
          )
          .subtitle(
            `-WR${personal_records[item].single.world_rank}----CR${personal_records[item].single.continent_rank}----NR${personal_records[item].single.country_rank}`
          )
          .icon("jpg", iconpath)
          .valid(["set", false])
          .text(clipboard, clipboard);
      }
    }

    return data;
  }
};

module.exports = {
  personResDataToScriptFilterData
};
