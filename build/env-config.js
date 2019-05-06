/*
 使用方法示例：
 打包：
 打包dev环境：npm run build --dev
 打包st环境：npm run build --st
 打包uat环境：npm run build --uat
 本地运行：
 本地运行dev环境：npm run dev --dev
 本地运行st环境：npm run dev --st
 无【--xxx】参数，则默认为dev环境：npm run dev
 */
'use strict'
 
const chalk = require('chalk')
const path = require('path')
/*
 * 环境列表，第一个环境为默认环境
 * envName: 指明现在使用的环境
 * dirName: 打包的路径，只在build的时候有用
 * baseUrl: 这个环境下面的api 请求的域名
 * assetsPublicPath: 静态资源存放的域名，未指定则使用相对路径
 * */
const ENV_LIST = [
    {
        //开发环境
        envName: 'dev',
        dirName: 'dev',
        baseUrl: '/api/',
        assetsPublicPath:'/'
    },
    {
        //测试环境
        envName: 'st',
        dirName: path.resolve(__dirname, '../static'),
        baseUrl: 'http://example.cn/',
        assetsPublicPath: '/'
    },
    {
        //用户测试环境（命令行参数（process.arg）中prod是保留字，所以使用pro）
        envName: 'uat',
        dirName: path.resolve(__dirname, '../static'),
        baseUrl: 'http://example.cn/',
        assetsPublicPath:'/'
    },
 
]
//获取命令行参数 http://nodejs.cn/api/process.html#process_process_argv
const argv = JSON.parse(process.env.npm_config_argv).original || process.argv
const HOST_ENV = argv[2] ? argv[2].replace(/[^a-z]+/ig,"") : ''
//没有设置环境，则默认为第一个
const HOST_CONF = HOST_ENV  ? ENV_LIST.find(item => item.envName === HOST_ENV) : ENV_LIST[0]
// 把环境常量挂载到process.env.HOST_ENV方便客户端使用
process.env.BASE_URL = HOST_CONF.baseUrl
// log选中的变量
console.log(chalk.green('当前环境对应的常量：'))
console.log(HOST_CONF)
 
module.exports.HOST_CONF = HOST_CONF
module.exports.ENV_LIST = ENV_LIST
