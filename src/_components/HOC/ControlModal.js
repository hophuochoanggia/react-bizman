import { compose, withState, withHandlers } from 'recompose';

export default compose(
  withState('isModalOpen', 'toggle', false),
  withHandlers({
    toggleModal: ({ isModalOpen, toggle }) => () => {
      toggle(!isModalOpen);
    }
  })
);
