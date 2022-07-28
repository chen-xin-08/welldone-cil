#!/usr/bin/env node

const program = require('commander')
// 引用自己help
const helpOptions = require('./lib/core/help')
const createCommands = require('./lib/core/creat')

// 查看版本号
program.version(require('./package.json').version )
helpOptions(program)
createCommands(program)
program.parse(process.argv)
