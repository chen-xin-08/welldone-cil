const chalk = require('chalk')
var ProgressBar = require('progress');
 
var bar = new ProgressBar(':bar', { total: 10 });
var timer = setInterval(function () {
  bar.tick();
  if (bar.complete) {
    console.log('\ncomplete\n');
    clearInterval(timer);
  }
}, 100);
const error = chalk.bold.red;
const warning = chalk.hex('#FFA500'); // Orange color

console.log(error('Error!'));
console.log(warning('Warning!'));

console.log(chalk.red('123213'));
console.log(chalk.green('31212312'));
console.log(chalk.blue('1233123123312213'));
console.log(chalk.yellow('1231231232131212312'));

module.exports = {
    // textStyle
}