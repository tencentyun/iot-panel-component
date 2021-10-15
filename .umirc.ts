// .umirc.ts
export default {
  // ...
  logo: '/images/egg-fried.svg',
  themeConfig: {
    carrier: '中国移动', // title text at left on status bar of device
    hd: {
      rules: [],
    },
  },
  base: '/iot-panel-component/',
  publicPath: '/iot-panel-component/',
  description: '腾讯连连标准组件库',
  styles: ['.__dumi-default-device{width: 375px!important; transform: scale(0.75); background: rgb(245,245,245)}']
}
