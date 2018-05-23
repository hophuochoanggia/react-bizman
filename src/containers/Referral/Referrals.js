import { graphql } from 'react-apollo';
import { compose, mapProps } from 'recompose';

import WithSpinnerError from '../../_components/HOC/SpinnerError';
import ReferralList from '../../_components/List/ReferralList';
import { VIEWER_REFERRAL_LIST } from '../../graphql/viewer';

export default compose(
  graphql(VIEWER_REFERRAL_LIST),
  WithSpinnerError,
  mapProps(({ data, history }) => ({
    data: data.viewer.edges[0].node.referrals.edges,
    history
  }))
)(ReferralList);
