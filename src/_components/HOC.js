import { branch, renderComponent, compose, mapProps, withState, withHandlers } from 'recompose';

import { Spinner, Error } from '../_components/common';

const withSpinner = test => branch(test, renderComponent(Spinner));
const withError = test => branch(test, renderComponent(Error));
const isFalse = v => !v;
const isDefined = v => v !== undefined;

export const combineFetching = keys =>
  mapProps(props => {
    const loadingTest = keys.map(key => props[key].loading);
    const errorTest = keys.map(key => props[key].error);
    const e = errorTest.filter(isDefined);
    return {
      ...props,
      data: {
        loading: !loadingTest.every(isFalse),
        error: e.length > 0 ? e.toString() : undefined
      }
    };
  });

export const withSpinnerError = compose(
  withSpinner(props => props.data.loading),
  withError(props => props.data.error)
);

export const dropdownToggle = compose(
  withState('isDropdownOpen', 'setDropdown', false),
  withHandlers({
    toggle: ({ isDropdownOpen, setDropdown }) => () => {
      setDropdown(!isDropdownOpen);
    }
  })
);
