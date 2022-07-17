const ejs = require('ejs');

const path = require('path');

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


module.exports = {
    compile
}