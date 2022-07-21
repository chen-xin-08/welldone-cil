const ejs = require('ejs');

const path = require('path');

const {promisify} = require('util')

const fs = require('fs')

// const render

const compile = (templateName,data) => {
    const templatePosition = `../templates/${templateName}`
    // 拼接绝对路径
    const templatePath = path.resolve(__dirname,templatePosition)
    return new Promise((resolve, reject) =>{
        ejs.renderFile(templatePath,{data},{},(err,result) => {
            if(err) {
                console.log(err);
                reject(err);
                return
            }
            resolve(result)
        })
    })
}

const writeToFiles = (path, content) => {

    // 判断文件夹是否存在 不存在就创建
   return  fs.promises.writeFile(path, content)
}


module.exports = {
    compile,
    writeToFiles,
}