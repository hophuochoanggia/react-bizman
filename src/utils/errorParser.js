export const graphqlErrorParser = operationName => e => {
  const { message } = e.graphQLErrors[0];
  const [title, ...errors] = message.split(`${operationName}.`);
  return errors.map(m => m.split(',')[0]).join(', ');
};
