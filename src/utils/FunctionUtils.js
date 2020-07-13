export function setTwoDigits(month) {
  return month < 10 ? `0${month}` : `${month}`;
}

export const getDate = () => {
  return new Promise((resolve, reject) => {
    const date = new Date();
    const day = setTwoDigits(date.getDate());
    const month = setTwoDigits(date.getMonth() + 1);
    resolve({day: `${day}`, month: `${month}`, year: `${date.getFullYear()}`});
  });
};

export const formatMoney = (value) => {
  let amount = value / 100;
  let decimalCount = 2;
  let decimal = ',';
  let thousands = '.';
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? '-' : '';

    let i = parseInt(
      (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)),
    ).toString();
    let j = i.length > 3 ? i.length % 3 : 0;

    return (
      negativeSign +
      (j ? i.substr(0, j) + thousands : '') +
      i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) +
      (decimalCount
        ? decimal +
          Math.abs(amount - i)
            .toFixed(decimalCount)
            .slice(2)
        : '')
    );
  } catch (e) {
    console.log(e);
  }
};
