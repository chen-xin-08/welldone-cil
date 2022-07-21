#!/usr/bin/env node

const program = require('commander')
// 引用自己help
const helpOptions = require('./lib/core/help')
const createCommands = require('./lib/core/creat')

// 查看版本号
program.version(require('./package.json').version )


helpOptions(program)
createCommands(program)

// const { promisify } = require('util')
// const figlet = promisify(require('figlet'))
// const chalk = require('chalk')
// const welcomeHandler = async () =>{
//     console.log(213);
//     const data = await figlet("welcome to welldone-cil")
//     console.log(data);
//     console.log(chalk.green(data));
// }

// welcomeHandler()


// // 增加自己的option --help

// program.option('-C --chen <cdd>' , 'a chen cil')

// program.option('-d --dest <dest>' , 'a destination folder, 例如：-d /src/components', )


// // 监听指令
// program.on('--help',function(){
//     console.log("object")
// })

program.parse(process.argv)
// console.log(program._optionValues.dest);
// console.log(program.options);
// console.log(program._optionValues.dest);