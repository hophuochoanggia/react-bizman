import { graphql } from 'react-apollo';
import { compose, mapProps, branch, renderComponent } from 'recompose';

import ReferralList from '../../_components/List/ReferralList';

import WithSpinnerError from '../../_components/HOC/SpinnerError';
import ReduxCredential from '../../_components/HOC/ReduxCredential';

import { VIEWER_REFERRALS_QUERY } from '../../graphql/viewer';
import { REFERRALS_QUERY } from '../../graphql/referral';

import { DOCTOR } from '../../config';

const DoctorReferralList = compose(
  graphql(VIEWER_REFERRALS_QUERY),
  WithSpinnerError,
  mapProps(({ data, history }) => ({
    data: data.viewer.edges[0].node.referrals.edges,
    history
  }))
)(ReferralList);

const AdminReferralList = compose(
  graphql(REFERRALS_QUERY),
  WithSpinnerError,
  mapProps(({ data, history }) => ({
    data: data.referrals.edges,
    history
  }))
)(ReferralList);

export default compose(
  ReduxCredential,
  branch(({ credential: { role } }) => role === DOCTOR, renderComponent(DoctorReferralList))
)(AdminReferralList);
