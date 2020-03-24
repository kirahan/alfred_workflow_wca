const fs = require("fs");
const request = require("request");
const savePngFile = (
    folder,
    fileName,
    imageUrl,
    callback
) =>{
    // 根目录是workflow
    const wholepath = folder!=''
    ? `./img/algdb/${folder}/${fileName}.png`
    : `./img/algdb/${fileName}.png`
    fs.access(wholepath, err => {
        if (err) {
          let writeStream = fs.createWriteStream(wholepath);
          let readStream = request(imageUrl);
          readStream.pipe(writeStream);
          readStream.on("end", function() {
            return callback(`${fileName}`)
          });
        }
      });
}



module.exports = {
    savePngFile,
  };  
