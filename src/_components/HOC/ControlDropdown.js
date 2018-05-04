import { compose, withState, withHandlers } from 'recompose';

export default compose(
  withState('isDropdownOpen', 'setDropdown', false),
  withHandlers({
    toggle: ({ isDropdownOpen, setDropdown }) => () => {
      setDropdown(!isDropdownOpen);
    }
  })
);
