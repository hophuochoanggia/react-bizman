export default (formData, fields) => {
  const result = {};
  fields.forEach(field => {
    if (formData.target[field] && formData.target[field].value !== '') {
      result[field] = formData.target[field].value;
    }
  });
  return result;
};
