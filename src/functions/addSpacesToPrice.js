export const addSpacesToPrice = (price) => {
  if (!price) {
    return;
  }

  let priceStr = price.toString();

  // Разделение строки на части по 3 символа с конца
  let chunks = [];
  for (let i = priceStr.length; i > 0; i -= 3) {
    chunks.unshift(priceStr.slice(Math.max(i - 3, 0), i));
  }

  // Объединение частей с пробелами
  let result = chunks.join(" ");

  return result;
};
