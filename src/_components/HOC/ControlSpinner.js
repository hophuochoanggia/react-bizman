import { compose, withState, withHandlers } from 'recompose';

export default compose(
  withState('spinner', 'setSpinner', false),
  withHandlers({
    handleSpinner: ({ spinner, setSpinner }) => () => {
      setSpinner(!spinner);
    }
  })
);
