import { compose, withState, withHandlers } from 'recompose';

export default compose(
  withState('input', 'setInput', ({ input }) => input || {}),
  withHandlers({
    handleInput: ({ input, setInput }) => key => event => {
      console.log(key, event.target.value);
      setInput({ ...input, [key]: event.target.value });
    }
  })
);
