const { displayList } = require("../scriptFilter");
const { events, eventNameById } = require("./events");
const { resultToString } = require("./utils");
const recordResDataToScriptFilterData = ({
  recordResult,
  region = "world_records",
  dataContainer = new displayList(),
  event = ""
}) => {
  const data = dataContainer;
  const recordUrl = `https://www.worldcubeassociation.org/results/records?region=${region}`;

  // 获取头像地址
  // const avatarpath = saveAvatar(avatar)
  let regionTitle = region;

  // 不同区域做名称格式化
  if (region == "world_records") {
    regionTitle = "World";
  } else if (region.match(/^_/g) != null) {
    // contionental_records startwith _ ,eg _Africa _Europe
    regionTitle = region.slice(1);
  }

  data
    .title(`\t\t\t\t${regionTitle} Records`)
    .subtitle(`press enter button to show ${regionTitle} records`)
    .arg(`openpage,${recordUrl}`)
    .valid(["set", true]);
  // .autocomplete(`${process.argv[3]} `)   回车之后补一个空格
  // .icon('png',`countryflag`)

  for (let item in recordResult) {
    // case 1 当 event是''的时候直接满足条件 直接输出所有项目
    // case 2 当 event不为空的时候, 会匹配event的值是否在这个item中，在就显示不在就不显示
    if ((event && item.includes(event)) || !event) {
      const resultSingle = recordResult[item].single;

      recordResult[item].single = resultToString(resultSingle, item, "single");

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
      // 有平均成绩
      if (recordResult[item].average) {
        const resultAverage = recordResult[item].average;
        recordResult[item].average = resultToString(
          resultAverage,
          item,
          "average"
        );
        const clipboard = `${regionTitle} Record\nEvent:${eventNameById(
          item
        )}\nSingle:${recordResult[item].single}\nAverage:${
          recordResult[item].average
        }\n`;
        data
          .additems()
          .title(
            `\t\t${recordResult[item].single}\t\ts|${itemtitle}|a\t\t\t${recordResult[item].average}`
          )
          .icon("jpg", iconpath)
          .valid(["set", false])
          .text(clipboard, clipboard);
      } else {
        const clipboard = `${regionTitle} Record\nEvent:${eventNameById(
          item
        )}\nSingle:${recordResult[item].single}\n`;
        data
          .additems()
          .title(`\t\t${recordResult[item].single}\t\ts|${itemtitle}`)
          .icon("jpg", iconpath)
          .valid(["set", false])
          .text(clipboard, clipboard);
      }
    }
  }

  return data;
};
const recordCountrySearchResDataToScriptFilterData = ({
  region,
  recordResult,
  dataContainer = new displayList()
}) => {
  const data = dataContainer;

  for (let countryname in recordResult) {
    // 大小写都可以搜索
    if (
      countryname.toLowerCase().includes(region.toLowerCase()) ||
      countryname.toUpperCase().includes(region.toUpperCase())
    ) {
      // 获取头像地址
      // const avatarpath = saveAvatar(avatar)
      const recordUrl = `https://www.worldcubeassociation.org/results/records?region=${countryname}`;
      data
        .title(`\t\t\t\t${countryname} Records`)
        .subtitle(`press enter button to show ${countryname} records`)
        .autocomplete(`record ${countryname} `)
        .valid(["set", false])
        .mods("alt", {
          valid: true,
          arg: `openpage,${recordUrl}`,
          subtitle: `Open ${countryname} wca page in browser`
        })
        .additems();
      if (data._items.length > 20) {
        break;
      }
    }
  }

  return data;
};

module.exports = {
  recordResDataToScriptFilterData,
  recordCountrySearchResDataToScriptFilterData
};
