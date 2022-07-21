const {promisify} = require('util')
const download = promisify(require('download-git-repo'))
const open = require('open')
const {vueRepogitee} = require('../config/repo-config')

const {commandSpawn}= require('../utils/terminal')

const {compile,writeToFiles} = require('../utils/utils')
const path = require('path')


const createProjectAction = async project =>{
    console.log('your project is being created...... please wait a moment');
    // 1 clone 项目
    await download(vueRepogitee,project,{clone:true})

    // 2 npm instrall  window系统 npm.cmd
    const command = process.platform === 'win32'? 'npm.cmd' : 'npm'

    await commandSpawn(command,['install'],{cwd:`./${project}`})
    // 3 npm run serve
    commandSpawn(command,['run','serve'],{cwd:`./${project}`})
    // 4 打开浏览器  
    // open('http://localhost:8080')

}

// 添加组件action 

const addCpmAction =async (name,dest)=>{
    // 1.有对应ejs模板
    // 2.编译ejs模板 result
    const res = await compile('vue-component.ejs',{name,lowerName:name.toLowerCase()})
    console.log(res);
    // 3.将result写入.vue文件中
    // 4.放到对应文件夹中
    const targetPath = path.resolve(dest,`${name}.vue`)
    console.log(targetPath);
    writeToFiles(targetPath,res)
}


// 添加组件和路由
const addPageAndRoute = async (name,dest) => {
    // 编译模板
    const data = {name,lowerName:name.toLowerCase()};
    const pageResult = await compile('vue-component.ejs',data);
    const routeResult = await compile('vue-router.ejs',data);

    // 写入文件
    const targetPagePath = path.resolve(dest,`${name}.vue`)
    const targetRoutePath = path.resolve(dest,'router.js')
    writeToFiles(targetPagePath,pageResult)
    writeToFiles(targetRoutePath,routeResult)
}

module.exports ={
    createProjectAction,
    addCpmAction,
    addPageAndRoute,
}