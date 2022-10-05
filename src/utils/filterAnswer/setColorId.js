export const findID = (id, arr) => {
  const found = arr?.find((element) => element === id);
  return found ? true : false;
};

export const setColorId = (id, arr, color, color2) => {
  if (findID(id, arr)) return color;
  return color2;
};
