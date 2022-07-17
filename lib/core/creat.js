const {createProjectAction,addCpmAction} = require('./actions')


const createCommands=program=>{
    program
    .command('create <project> [others...]')
    .description('clone a repository into a folder')
    .action(createProjectAction)
    program
    .command('addcpm <name>')
    .description('add vue component, 例如:')
    .action(addCpmAction)
}

module.exports = createCommands