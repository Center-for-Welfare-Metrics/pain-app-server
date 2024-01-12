export const removeAll_ids = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map((item) => removeAll_ids(item));
  }
  if (typeof obj === "object") {
    const newObj = {};
    for (const key in obj) {
      if (key !== "_id" && key !== "id") {
        newObj[key] = removeAll_ids(obj[key]);
      }
    }
    return newObj;
  }
  return obj;
};

export const removeAllWhereValueIsNull = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map((item) => removeAllWhereValueIsNull(item));
  }
  if (typeof obj === "object") {
    const newObj = {};
    for (const key in obj) {
      if (obj[key] !== null) {
        newObj[key] = removeAllWhereValueIsNull(obj[key]);
      }
    }
    return newObj;
  }
  return obj;
};
