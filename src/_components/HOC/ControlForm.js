import { compose, withState, withHandlers } from 'recompose';
import { lensPath, set } from 'ramda';

// export const ControlForm = compose(
//  // for dropdown
//  withState('input', 'setInput', ({ input }) => ({ ...input })),
//  withHandlers({
//    handleInput: ({ input, setInput }) => key => value => {
//      setInput({
//        ...input,
//        [key]: value
//      });
//    },
//    handleSelect: ({ input, setInput }) => key => event => {
//      if (event.target.value === '-- select an option --') {
//        delete input[key];
//        setInput(input);
//      } else {
//        setInput({ ...input, [key]: parseInt(event.target.value, 10) });
//      }
//    }
//  })
// );

export default compose(
  withState('input', 'setInput', ({ input }) => input),
  withHandlers({
    handleInput: ({ input, setInput }) => key => event => {
      setInput({ ...input, [key]: event.target.value });
    },
    handleInputAsValue: ({ input, setInput }) => key => value => {
      setInput({ ...input, [key]: value });
    },
    handleInputNested: ({ input, setInput }) => group => key => event => {
      const lens = lensPath(['data', group, key]);
      const newInput = set(lens, event.target.value, input);
      setInput(newInput);
    },
    handleSchemaForm: ({ input, setInput }) => formData => {
      const newInput = {
        ...input,
        data: {
          ...input.data,
          ...formData
        }
      };
      setInput(newInput);
    },
    handleSelect: ({ input, setInput }) => key => event => {
      if (event.target.value === '-- select an option --') {
        delete input[key];
        setInput(input);
      } else {
        setInput({ ...input, [key]: parseInt(event.target.value, 10) });
      }
    }
  })
);
