# qcloud-iot-panel-component

腾讯连连标准面板组件库

## 开发

```bash
yarn #安装依赖
yarn dev #开发组件
yarn build #打包组件

# 最后执行 yarn docs 可以实时预览组件效果
yarn docs
```

在小程序中使用本地包时，可以执行以下命令：

```bash

# 在组件库目录
yarn build
yarn pack # 生成 qcloud-iot-panel-component-v0.0.xx.tgz

# 在小程序目录下
yarn add path/to/qcloud-iot-panel-component-v0.0.xx.tgz

```

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

使用 [Taro](https://github.com/NervJS/taro) 的[HTML编译功能](https://taro-docs.jd.com/taro/docs/use-h5)，我们可以将包使用在小程序中，在这之前需要先将 Taro 版本升级到 3.3 以上。

1. 在config中配置如下：

```js
  plugins: [
    ['@tarojs/plugin-html', {
      // 包含 `iotp-` 的类名选择器中的 px 单位不会被解析
      pxtransformBlackList: [/iotp-/]
    }]
  ],
```

除了上述配置外，使用方法上与h5相同:

```ts
// 引入组件库的css
import 'qcloud-iot-panel-component/lib/index.css';

import { BoolWidget } from 'qcloud-iot-panel-component';

```


