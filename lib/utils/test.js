const fs = require('fs')

const path = require('path')

const http = require('http')

function mkdirsSync(dirname) {

if (fs.existsSync(dirname)) {

return true

} else {

if (mkdirsSync(path.dirname(dirname))) {

fs.mkdirSync(dirname)

return true

}

}

}

function getPath(pathUrl) {

return path.resolve(__dirname, pathUrl)

}

function generateTemplate(arr) {

return `import { ${arr.join(', ')} } from '@/utils/request'\n`

}

function generateFunc(name, summary, type = 'post') {

const arr = name.slice(1).split('/')

const fun = arr[arr.length - 1]

return `

// ${summary || ''}

export function ${fun}(data, cb, errHandle) {

return ${type}('${name}', data, cb, errHandle)

}\n`

}

function httpgetJson(url) {

return new Promise((resolve, reject) => {

http.get(url, (res) => {

const { statusCode } = res

const contentType = res.headers['content-type']

let error

if (statusCode !== 200) {

error = new Error('请求失败。\n' +

`状态码: ${statusCode}`)

} else if (!/^application\/json/.test(contentType)) {

error = new Error('无效的 content-type.\n' +

`期望 application/json 但获取的是 ${contentType}`)

}

if (error) {

console.error(error.message)

// 消耗响应数据以释放内存

res.resume()

return

}

res.setEncoding('utf8')

let rawData = ''

res.on('data', (chunk) => {

rawData += chunk

})

res.on('end', () => {

try {

const parsedData = JSON.parse(rawData)

resolve(parsedData)

} catch (e) {

reject(`错误: ${e.message}`)

}

})

}).on('error', (e) => {

reject(`错误: ${e.message}`)

})

})

}

const srcFolder = '/src'

const url = 'http://localhost:61793/swagger/v1/swagger.json'

// const argv = process.argv

// console.log(argv)

async function main() {

console.log('获取远程json文件中...')

const { paths } = await httpgetJson(url)

console.log('获取成功正在生成api文件')

const obj = {}

for (const name in paths) {

const path = paths[name]

let folder = ''

if (path.post) {

const tag = path.post.tags[0]

if (!tag) continue

const urlArray = name.slice(1).split('/')

if (name.slice(1).split('/').length === 4) {

folder = urlArray[1]

} else {

if (name.slice(1).split('/')[0] !== tag) continue

}

if (obj[path.post.tags[0]]) {

obj[path.post.tags[0]].push({ summary: path.post.summary, tag, name, type: 'post', folder })

} else {

obj[path.post.tags[0]] = [{ summary: path.post.summary, tag, name, type: 'post', folder }]

}

} else if (path.get) {

const tag = path.get.tags[0]

console.log(tag)

if (!tag) continue

const urlArray = name.slice(1).split('/')

if (name.slice(1).split('/').length === 4) {

folder = urlArray[1]

} else {

if (name.slice(1).split('/')[0] !== tag) continue

}

if (obj[path.get.tags[0]]) {

obj[path.get.tags[0]].push({ summary: path.get.summary, tag, name, type: 'get', folder })

} else {

obj[path.get.tags[0]] = [{ summary: path.get.summary, tag, name, type: 'get', folder }]

}

}

}

for (const tagName in obj) {

let jsString = ''

const requestTypes = []

let folder = ''

for (const item of obj[tagName]) {

const requestType = requestTypes.filter(o => o === item.type)

if (requestType.length === 0) requestTypes.push(item.type)

jsString += generateFunc(item.name, item.summary, item.type)

folder = item.folder

}

jsString = generateTemplate(requestTypes) + jsString

mkdirsSync(getPath(`..${srcFolder}/api/${folder}`))

// console.log(jsString)

fs.writeFileSync(getPath(`..${srcFolder}/api/${folder}/${tagName}.js`), jsString)

}

console.log('生成完毕')

}

main()

我目前url格式是 /Api/Admin/Home/Index 和格式 /Test/Index

生成后的文件夹格式是/api/Admin/Home.js 或/api/Test.js 文件如下

import { get, post } from '@/utils/request'

// 获取

export function Index(data, cb, errHandle) {

return get('/Api/Admin/Home/Index', data, cb, errHandle)

}

// 添加

export function Add(data, cb, errHandle) {

return post('/Api/Admin/Home/Add', data, cb, errHandle)

}

// 删除

export function Delete(data, cb, errHandle) {

return post('/Api/Admin/Home/Delete', data, cb, errHandle)

}

使用时需要将const url = 'http://localhost:61793/swagger/v1/swagger.json'改成你自己的地址

当前项目目录结构基于element-admin-template

修改package.json文件

在scripts索引中加入"swagger":"node genSwagger/index.js"

"scripts": {

"dev": "vue-cli-service serve",

"build:prod": "vue-cli-service build",

"build:stage": "vue-cli-service build --mode staging",

"preview": "node build/index.js --preview",

"lint": "eslint --ext .js,.vue src",

"test:unit": "jest --clearCache && vue-cli-service test:unit",

"test:ci": "npm run lint && npm run test:unit",

"svgo": "svgo -f src/icons/svg --config=src/icons/svgo.yml",

"swagger": "node genSwagger/index.js"

}
