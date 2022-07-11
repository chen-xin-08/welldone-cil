const {promisify} = require('util')
const download = promisify(require('download-git-repo'))
const {vueRepo} = require('../config/repo-config')


const createProjectAction = async project =>{
    // 1 clone 项目
    await download(vueRepo,project,{clone:true})

    // 2 npm instrall
    // 3 npm run serve
    // 4 打开浏览器  

}

module.exports ={
    createProjectAction
}