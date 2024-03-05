export const filterList = (list, atribut) => {
  if (atribut === "date") {
    return list;
  }
  const sortByMixedType = (a, b) => {
    if (isNaN(a[atribut]) || isNaN(b[atribut])) {
      return String(a[atribut]).localeCompare(String(b[atribut]));
    } else {
      return parseFloat(a[atribut]) - parseFloat(b[atribut]);
    }
  };
  return list.sort(sortByMixedType);
};
