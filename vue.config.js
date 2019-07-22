const debug = process.env.NODE_ENV !== 'production'

console.log('debug:', debug)
console.log('本地启动或构建的文件信息 | 开始--------------------------------------------------------------')

console.log('本地启动或构建的文件信息 | 结束--------------------------------------------------------------')
console.log('')

module.exports = {
    publicPath: '/static/migu_vue_static/',
    // publicPath: '/',
    filenameHashing: false,
    productionSourceMap: false,
    devServer: {
        proxy: {
            '/api': {
                target: 'http://vueapi.kmfx1.com', // 测试环境
                changOrigin: true,
                // pathRewrite: {
                //     '^/api': ''
                // }
            },
            '/wx': {
                target: 'https://api.weixin.qq.com',
                changOrigin: true,
                pathRewrite: {
                    '^/wx': ''
                }
            }
        }
    }
}
