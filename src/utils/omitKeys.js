export default (input, keys) => {
  const data = { ...input };
  keys.forEach(element => {
    delete data[element];
  });
  Object.keys(data).map(key => {
    if (data[key] === null) {
      delete data[key];
    }
  });
  return data;
};
