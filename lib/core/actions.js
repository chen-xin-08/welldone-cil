const {promisify} = require('util')
const download = promisify(require('download-git-repo'))


const createProjectAction = async project =>{
    // 1 clone 项目
    await download()
    // 2 npm instrall
    // 3 npm run serve
    // 4 打开浏览器  

}

module.exports ={
    createProjectAction
}