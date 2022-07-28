const {promisify} = require('util')
const figlet = promisify(require('figlet'))
const chalk = require('chalk')

const ProgressBar = require('progress');
 
// 打印彩色字体
const printText = (content,color) => console.log(chalk[color](content));
const printTextHex = (content,color) => console.log(chalk.hex(color)(content));


// 打印大号字体

const figletText = async name =>{
    const data = await figlet(name)
    printTextHex(data,'#FF3399')
}


// 进度条
const bar = (len)=>new ProgressBar('downloading [:bar] :rate/bps :percent :etas', { complete: '=',
incomplete: ' ',
width: 20,
total: len });

module.exports ={
    printText,
    figletText,
    printTextHex,
    bar,
}