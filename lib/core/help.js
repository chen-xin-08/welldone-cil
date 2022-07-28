const helpOptions = program => {
  // 增加自己的option --help

  program.option('create <projectname>', 'create a project');
  program.option('swg <swaggerUrl>', 'auto create api file');

  program.option(
    '-d --dest <dest>',
    'a destination folder, 例如：-d /src/components'
  );

  // 监听指令
  program.on('--help', function () {
    console.log('object');
  });

};

module.exports = helpOptions
