export const Switch = process.env.TARO_ENV === 'weapp' ?  require('./SwitchTaro') : require('./SwitchH5');
