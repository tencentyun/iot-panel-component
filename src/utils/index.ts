export const noop = () => null;

export const delay = (timeout: number) => new Promise<void>(resolve => setTimeout(() => resolve(), timeout));

export const isFloatNumber = (num:number | string) =>{
  return /\d.\d+/g.test(String(num));
};

export const getFloatDigit = function(number: number) {
  const digit = String(number).split('.');
  return (digit[1] == undefined) ? 0 : digit[1].length;
};

export enum arithmeticType {
  add = 'add',
  sub = 'sub',
  multi = 'multi',
  divide = 'divide',
}
export const arithmetic = (type: arithmeticType, firstNumber: number, secondNumber: number, fixLength = 2) => {
  let result;
      // 小数计算
  if (isFloatNumber(firstNumber) || isFloatNumber(secondNumber)) {
      const firstDecimalLength = getFloatDigit(firstNumber);
      const secondDecimalLength = getFloatDigit(secondNumber);
      const maxDecimalLength = firstDecimalLength >= secondDecimalLength ? firstDecimalLength : secondDecimalLength;
      const baseMultiSize = Math.pow(10, maxDecimalLength);
      const addNumber = (type === arithmeticType.sub) ? -secondNumber : secondNumber;

      if (type === arithmeticType.add || type === arithmeticType.sub) {
          result = (firstNumber * baseMultiSize + addNumber * baseMultiSize) / baseMultiSize;
          return Number(result.toFixed(maxDecimalLength || fixLength));
      }

      const newFirstNumber = Number(String(firstNumber).replace('.', ''));
      const newSecondNumber = Number(String(secondNumber).replace('.', ''));
      if (type === arithmeticType.multi) {
          result = (newFirstNumber * newSecondNumber) / Math.pow(10, firstDecimalLength + secondDecimalLength);
      }
      if (type === arithmeticType.divide) {
          result = ((newFirstNumber / newSecondNumber) * Math.pow(10, secondDecimalLength - firstDecimalLength));
          result = Number(result.toFixed(fixLength));
      }
      return result;
  }
  // 正常计算
  if (type === arithmeticType.add) {
    result = firstNumber + secondNumber;
  }
  if (type === arithmeticType.sub) {
    result = firstNumber - secondNumber;
  }
  if (type === arithmeticType.multi) {
    result = firstNumber * secondNumber;
  }
  if (type === arithmeticType.divide) {
    result = Number((firstNumber / secondNumber).toFixed(fixLength));// 还是会出现无理数
  }

  return result;
};
