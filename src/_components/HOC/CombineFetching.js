import { mapProps } from 'recompose';

const isFalse = v => !v;
const isDefined = v => v !== undefined;
export default keys =>
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
