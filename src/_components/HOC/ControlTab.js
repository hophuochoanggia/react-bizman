import { withState } from 'recompose';

export default withState('tab', 'setTab', ({ activeTab }) => activeTab || 0);
