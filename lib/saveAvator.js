const fs = require("fs");
const request = require("request");
const saveAvatar = avatar => {
  if (avatar.is_default) {
    return "default_avatar.png";
  } else {
    const avatarFullName = avatar.thumb_url.split("/").pop();

    // 文件名字大于20时候留20个，小于时候全部保留
    const avatarName =
      avatarFullName.length > 20
        ? avatarFullName.slice(avatarFullName.length - 20)
        : avatarFullName;
    // 根目录是workflow
    fs.access(`./img/${avatarName}`, err => {
      if (err) {
        let writeStream = fs.createWriteStream(`./img/${avatarName}`);

        let readStream = request(avatar.thumb_url);
        readStream.pipe(writeStream);
        readStream.on("end", function() {
          // console.log('文件下载成功');w
        });
      }
    });

    return avatarName;
  }
};

module.exports = {
  saveAvatar
};
