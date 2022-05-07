export const { ScrollView } = process.env.TARO_ENV === 'weapp' ? require('./ScrollViewTaro') : require('./ScrollViewH5');
