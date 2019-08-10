// vue.config.js 配置说明
// 这里只列一部分，具体配置参考官方配置文档
module.exports = {
  // baseUrl  type:{string} default:'/'
  // 将部署应用程序的基本URL
  // 将部署应用程序的基本URL。
  // 默认情况下，Vue CLI假设您的应用程序将部署在域的根目录下。
  // https://www.my-app.com/。如果应用程序部署在子路径上，则需要使用此选项指定子路径。例如，如果您的应用程序部署在https://www.foobar.com/my-app/，集baseUrl到'/my-app/'.

  publicPath: process.env.NODE_ENV === "production" ? "/" : "/",

  // outputDir: 在npm run build时 生成文件的目录 type:string, default:'dist'

  // outputDir: 'dist',

  assetsDir: "static", //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。

  // pages:{ type:Object,Default:undefined }
  /*
构建多页面模式的应用程序.每个“页面”都应该有一个相应的JavaScript条目文件。该值应该是一
个对象，其中键是条目的名称，而该值要么是指定其条目、模板和文件名的对象，要么是指定其条目
的字符串，
注意：请保证pages里配置的路径和文件名 在你的文档目录都存在 否则启动服务会报错的
*/
  pages: {
    index: {
      //entry for the page
      entry: "src/main.js",
      //the source template
      template: "public/index.html",
      //output as dist/index.html
      filename: "index.html"
    }
    // when using the entry-only string format,
    // template is inferred to be `public/subpage.html`
    // and falls back to `public/index.html` if not found.
    // Output filename is inferred to be `subpage.html`.
    // subpage: 'src/subpage/main.js'
  },

  //   lintOnSave：{ type:Boolean default:true } 问你是否使用eslint
  //lintOnSave: process.env.NODE_ENV !== 'production',//只在开发环境使用eslint-loader，生产环境时禁用
  lintOnSave: false,
  // productionSourceMap：{ type:Bollean,default:true } 生产源映射
  // 如果您不需要生产时的源映射，那么将此设置为false可以加速生产构建
  productionSourceMap: false,
  // devServer:{type:Object} 3个属性host,port,https
  // 它支持webPack-dev-server的所有选项

  devServer: {
    port: 8085, // 端口号
    //host: 'localhost',
    https: false, // https:{type:Boolean}
    open: true //配置自动启动浏览器
  },
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    // extract: true,
    // // 开启 CSS source maps?
    // sourceMap: false,
    // // 启用 CSS modules for all css / pre-processor files.
    // modules: false,
    // css预设器配置项
    loaderOptions: {
      // 给 sass-loader 传递选项,向所有 Sass 样式传入共享的全局变量
      sass: {
        // @/ 是 src/ 的别名
        data: `@import "@/assets/style/base.scss";`
      }
    }
  },
  //webpack自定义配置
  configureWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      // 为生产环境修改配置...
    } else {
      // 为开发环境修改配置...
    }
  },
  chainWebpack: config => {
    config.plugin("define").tap(args => {
      args[0]["process.env"].BASE_URL = JSON.stringify(process.env.BASE_URL);
      return args;
    });
  }
};
