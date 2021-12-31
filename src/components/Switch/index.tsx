// eslint-disable-next-line @typescript-eslint/no-var-requires
export const { Switch } = process.env.TARO_ENV === 'weapp' ?  require('./SwitchTaro') : require('./SwitchH5');
