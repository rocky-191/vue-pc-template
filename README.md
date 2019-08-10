# emergency-lib

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

# 项目结构

```

├── build                                       // webpack config file
├── public                                      // 存放页面模板比如index.html,本地mock数据，favicon.ico
├── src                                         // source directory
│   ├── api                                     // 项目页面请求方法（按模块划分）
│   │   ├── common                              // 模块1
│   │   │   ├── commonApi.js                    // 对应模块页面请求
│   │   ├── module1                             // 模块1
│   │   │   ├── module1.js                      // 对应模块页面请求
│   └── assets
│   │   ├── image                               // 全局图片
│   │   ├── style                               // 全局样式
│   │   │   ├── reset.scss                      // 重置样式
│   │   │   ├── variable.scss                   // 全局变量声明
│   │   │   ├── mixin.scss                      // 混合函数库
│   │   │   ├── base.scss                       // 基础组件样式
│   ├── components                              // 全局组件文件夹
│   │   ├── global                              // 全局组件
│   │   │   ├── componentA                      // 具体组件文件夹
│   │   │   │   ├── componentA.vue              // 具体组件
│   │   │   │   ├── index.js                    // 组件出口
│   │   ├── index.js                            // 所有组件统一出口
│   ├── directives                              // 全局指令
│   │   ├── index.js
│   ├── filters                                 // 全局过滤器
│   │   ├── index.js
│   ├── views                                   // 项目页面级组件（按模块划分）
│   │   ├── Login                               // 模块名称（示例）
│   │   │   ├── index.vue                       // 页面级组件示例
│   ├── request                                 // axios配置拦截器
│   │   ├── axios.js
│   ├── router                                  // 按照模块划分路由
│   │   └── Module1                             // 模块1路由文件夹
│   │   │   ├── index.js                        // 模块1路由出口(路由path和name和模块名保持一致)
│   │   └── Module2                             // 模块2路由文件夹
│   │   │   ├── index.js                        // 模块2路由出口
│   │   └── index.js                            // 整体项目路由出口
│   ├── mixins                                  // 全局公用混入方法（按功能划分）
│   │   ├── funcMixin                           // 示例
│   │   │   ├── index.js
│   │   ├── index.js                            // mixin出口
│   ├── store                                   // Vuex配置（按模块划分）
│   │   ├── common                              // 公共模块的store
│   │   │   ├── action.js                       // actions configuration
│   │   │   ├── getters.js                      // getters configuration
│   │   │   ├── index.js                        // 模块store出口
│   │   │   ├── state.js                        // store state
│   │   │   └── mutations.js                    // mutations configuration
│   │   ├── module1                             // 模块1的store
│   │   │   ├── action.js                       // actions configuration
│   │   │   ├── getters.js                      // getters configuration
│   │   │   ├── index.js                        // 模块store出口
│   │   │   ├── state.js                        // store state
│   │   │   └── mutations.js                    // mutations configuration
│   │   ├── index.js                            // use vuex，new store，vuex出口
│   ├── utils                                   // 全局公共方法
│   │   ├── globalFunc.js                       // 示例
│   ├── App.vue                                 // 根组件
│   ├── main.js                                 // 项目入口
├── .browserslistrc                             // 浏览器配置
├── .env.dev                                    // 开发环境变量配置
├── .env.prod                                   // 生产环境变量配置
├── .eslintignore                               // eslint配置忽略项
├── .eslintrc.js                                // eslint配置
├── .gitignore                                  // git提交忽略项
├── babel.config.js                             // babel配置项
├── package.json                                // 依赖项配置
├── postcss.config.js                           // css工程化配置项
├── README.md                                   // 全局说明
├── vue.config.js                               // 全局配置


```

#