import EventForm from '../../_components/Form/EventForm';
import { compose, withState, withHandlers } from 'recompose';

const WithState = compose(
  withState('input', 'setInput', ({ data }) => (data ? { ...data.event.edges[0].node } : {})),
  withState('spinner', 'setSpinner', false),
  withHandlers({
    handleSpinner: ({ spinner, setSpinner }) => () => {
      setSpinner(!spinner);
    },
    handleInput: ({ input, setInput }) => key => value => {
      setInput({ ...input, [key]: value });
    }
  })
);

export default WithState(EventForm);
