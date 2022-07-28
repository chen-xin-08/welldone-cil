const { promisify } = require('util');
const download = promisify(require('download-git-repo'));
const open = require('open');
const { vueRepogitee } = require('../config/repo-config');

const { commandSpawn } = require('../utils/terminal');

const { compile, writeToFiles } = require('../utils/utils');

const { figletText, printTextHex ,bar} = require('../utils/word');
const path = require('path');

const createProjectAction = async (project) => {
  await figletText('welcome  to  use  welldone-cil');
  printTextHex(
    `${project} is being created...... please wait a moment`,
    '#FFCCFF'
  );
  // 1 clone 项目
  await download(vueRepogitee, project, { clone: true });

  printTextHex(
    'your project is being installed modules...... please wait a moment',
    '#FFCCFF'
  );

  // 2 npm instrall  window系统 npm.cmd
  const command = process.platform === 'win32' ? 'npm.cmd' : 'npm';

  await commandSpawn(command, ['install'], { cwd: `./${project}` });

  printTextHex('your project is running...... please wait a moment', '#FFCCFF');

  // 3 npm run serve
  commandSpawn(command, ['run', 'serve'], { cwd: `./${project}` });

  // 4 打开浏览器
  // open('http://localhost:8080')
  printTextHex('your project is done', '#FFCCFF');
};

// 添加组件action

const addCpmAction = async (name, dest) => {
  // 1.有对应ejs模板
  // 2.编译ejs模板 result
  const res = await compile('vue-component.ejs', {
    name,
    lowerName: name.toLowerCase(),
  });
  // 3.将result写入.vue文件中
  // 4.放到对应文件夹中
  const targetPath = path.resolve(dest, `${name}.vue`);
  writeToFiles(targetPath, res);
};

// 添加组件和路由
const addPageAndRoute = async (name, dest) => {
  // 编译模板
  const data = { name, lowerName: name.toLowerCase() };
  const pageResult = await compile('vue-component.ejs', data);
  const routeResult = await compile('vue-router.ejs', data);

  // 写入文件
  const targetPagePath = path.resolve(dest, `${name}.vue`);
  const targetRoutePath = path.resolve(dest, 'router.js');
  writeToFiles(targetPagePath, pageResult);
  writeToFiles(targetRoutePath, routeResult);
};


// 自动读取swagger 并生成api文件
const autoCreateApi = async (name, dest) => {
    
    // const data = { name, lowerName: name.toLowerCase() };
    // const targetPagePath = path.resolve(dest, `${name}.js`);
    // writeToFiles(targetPagePath, pageResult);
    // writeToFiles(targetRoutePath, routeResult);

    // 读取swagger文档

    // 写入文件
  };

module.exports = {
  createProjectAction,
  addCpmAction,
  addPageAndRoute,
};
