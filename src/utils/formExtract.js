export default (formData, fields) => {
  const result = {};
  fields.forEach(field => {
    const { value } = formData.target[field];
    if (value) result[field] = value;
  });
  return result;
};
