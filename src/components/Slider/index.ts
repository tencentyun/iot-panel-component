export const Slider = process.env.TARO_ENV === 'weapp' ? require('./SliderTaro') : require('./SliderH5');
