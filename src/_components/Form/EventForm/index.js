import { mapProps, branch, renderComponent, compose } from 'recompose';
import Study from './STUDY';
import Cpap from './CPAP';
import Invalid from './InvalidType';

export default compose(
  mapProps(props => ({
    type: props.input.type || props.match.params.type,
    ...props
  })),
  branch(({ type }) => type === 'CPAP', renderComponent(Cpap)),
  branch(({ type }) => type === 'STUDY', renderComponent(Study))
)(Invalid);
