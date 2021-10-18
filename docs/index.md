# 腾讯连连标准组件库
## H5 使用

```bash
yarn add qcloud-iot-panel-component
```

开始引用组件：

```ts
/* panel.tsx */

// 引入组件库的css
import 'qcloud-iot-panel-component/lib/index.css';

import { BoolWidget } from 'qcloud-iot-panel-component';
```



## 小程序使用

使用Taro的[HTML编译功能](https://taro-docs.jd.com/taro/docs/use-h5)，我们可以将包使用在小程序中，由于这个功能Taro 3.3.3之后才支持，在这之前需要先将Taro版本升级到`3.3.3`以上。

1. 在config中配置如下：

```js
  plugins: [
    ['@tarojs/plugin-html', {
      // 包含 `demo-`、`van-` 的类名选择器中的 px 单位不会被解析
      pxtransformBlackList: [/iotp-/]
    }]
  ],
```

使用方法上， 除上述配置外，其他使用方法与h5相同:

```ts
// 引入组件库的css
import 'qcloud-iot-panel-component/lib/index.css';

import { BoolWidget } from 'qcloud-iot-panel-component';

```

## 开发

```bash
yarn #安装依赖
yarn dev #开发组件
yarn build #打包组件
yarn docs #开发文档
```

