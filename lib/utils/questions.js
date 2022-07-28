const inquirer = require("inquirer")


const ask = (name,type,message)=>inquirer.prompt([{name,type,message}])

// 输入账号
ask('user_name','input',"what's your username")
// 输入密码
ask('password','password',"what's your username")
// 输入项目名称

// 选择项目模板

// 选择包管理工具





module.exports = {
    ask,
}