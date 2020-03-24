const fs = require("fs");
const request = require("request");
const sharp = require('sharp');
// Convert any input to PNG output
const saveSvgFile = (
    fileName,
    imageUrl,
    callback
) =>{
    // 根目录是workflow
    fs.access(`./img/algdb/${fileName}.svg`, err => {
        if (err) {
          let writeStream = fs.createWriteStream(`./img/algdb/${fileName}.svg`);
          let readStream = request(imageUrl);
          readStream.pipe(writeStream);
          readStream.on("end", function() {
            return callback(`${fileName}`)
          });
        }
      });
}

const svg2png =  fileName =>{
    sharp(`./img/algdb/${fileName}.svg`)
        .png()
        .resize(1000, 1000)
        .toFile(`./img/algdb/${fileName}.png`)
        .then(info => { 
            console.log(info)
            console.log(`./img/algdb/${fileName}.svg`)
            return `./img/algdb/${fileName}.png` })
        .catch(err => { console.log(err) });
    
}

const downloadSvgAnd2PngThenSave = ({
        fileName,
        imageUrl
})=>{
    saveSvgFile(fileName,imageUrl,(name)=>{
        svg2png(name)
        }
    )
}


module.exports = {
    svg2png,
    saveSvgFile,
    downloadSvgAnd2PngThenSave
  };  
