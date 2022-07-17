// 消息通知

const chalk = require('chalk')

// 错误消息通知 成功消息通知  警告消息通知
const notify = (type,msgs) => {
    const message = (msg)=>({
        suc:()=>console.log(),
        war:()=>console.log(),
        err:()=>console.log(),
    })
    return message[type](msgs)
}