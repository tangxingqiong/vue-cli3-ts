# pem_iview

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
### 预览本地build包
```
node app.js
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
See [vue-cli config](https://cli.vuejs.org/config/).

### vue打包后详细查看各部分体积大小
```
npm run build --report
```


## 目录结构
```
pem_iview - PEM前端项目
|-- public - 静态文件,不会被Webpack处理
|-- src
|  |-- assets - 静态文件,会被webpack处理解析为模块依赖，只支持相对路径形式
|  |-- components - 公共组件
|  |-- layout - 页面框架
|  |-- plugins - 插件设置
|  |-- views - pem_iview项目
|  |-- router - 路由
|  |-- services - 服务层
|  |  |-- api.js - 后台接口目录
|  |-- services - 服务层
|  |-- store - vuex
|  |-- styles - 公共样式
|  |-- mock - 接口模拟

```
