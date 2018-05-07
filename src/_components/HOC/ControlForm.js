import { compose, withState, withHandlers } from 'recompose';

export const ControlForm = compose(
  // for dropdown
  withState('input', 'setInput', ({ input }) => input || {}),
  withHandlers({
    handleJSON: ({ input, setInput }) => key => value => {
      setInput({
        ...input,
        [key]: value
      });
    },
    handleInput: ({ input, setInput }) => key => event => {
      if (event.target.value === '-- select an option --') {
        delete input[key];
        setInput(input);
      } else {
        setInput({ ...input, [key]: parseInt(event.target.value, 10) });
      }
    }
  })
);

export default compose(
  withState('input', 'setInput', ({ input }) => input || {}),
  withHandlers({
    handleInput: ({ input, setInput }) => key => event => {
      console.log(key, event.target.value);
      setInput({ ...input, [key]: event.target.value });
    }
  })
);
