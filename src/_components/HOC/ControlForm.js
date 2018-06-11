import { compose, withState, withHandlers } from 'recompose';
import { lensPath, set, pathOr } from 'ramda';
import { server } from '../../config';

export default compose(
  withState('input', 'setInput', ({ input }) => input),
  withHandlers({
    handleInput: ({ input, setInput }) => key => event => {
      setInput({ ...input, [key]: event.target.value });
    },
    handleInputAsValue: ({ input, setInput }) => key => value => {
      setInput({ ...input, [key]: value });
    },
    handleFile: ({ input, setInput }) => group => ([file], folder) => {
      const lens = lensPath(['data', group, 'files']);
      const oldValue = pathOr([], ['data', group, 'files'], input);
      let formData = new FormData();
      formData.append(folder, file);
      fetch(`${server}/${folder}`, {
        method: 'POST',
        body: formData
      })
        .then(res => res.json())
        .then(data => {
          const newInput = set(lens, [...oldValue, data], input);
          setInput(newInput);
        });
    },
    handleInputNested: ({ input, setInput }) => group => key => event => {
      const lens = lensPath(['data', group, key]);
      const newInput = set(lens, event.target.value, input);
      setInput(newInput);
    },
    handleInputNestedAsValue: ({ input, setInput }) => group => key => value => {
      const lens = lensPath(['data', group, key]);
      const newInput = set(lens, value, input);
      setInput(newInput);
    },
    handleInputNestedCheckbox: ({ input, setInput }) => group => key => ({
      target: { checked }
    }) => {
      const lens = lensPath(['data', group, key]);
      const newInput = set(lens, checked, input);
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
