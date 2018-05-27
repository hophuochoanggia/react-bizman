import { graphql } from 'react-apollo';
import { withHandlers, compose, mapProps, branch, renderComponent } from 'recompose';
import { path } from 'ramda';

import { REFERRAL_BY_ID_QUERY, EDIT_REFERRAL_BY_ID_MUTATION } from '../../graphql/referral';
import { CONFIG_QUERY } from '../../graphql/config';
import { VIEWER_REFERRAL_BY_ID_QUERY } from '../../graphql/viewer';

import ReferralForm from '../../_components/Form/ReferralForm';

import ControlForm from '../../_components/HOC/ControlForm';
import ControlSpinner from '../../_components/HOC/ControlSpinner';
import WithSpinnerError from '../../_components/HOC/SpinnerError';
import CombineFetching from '../../_components/HOC/CombineFetching';
import NotFoundGuard from '../../_components/HOC/NotFoundGuard';
import ReduxCredential from '../../_components/HOC/ReduxCredential';

import toast from '../../utils/toast';
import { configLens } from '../../utils/pathLens';

import { DOCTOR } from '../../config';

const LoadReferralConfig = graphql(CONFIG_QUERY, {
  options: () => ({
    variables: {
      name: 'REFERRAL-METADATA'
    }
  }),
  name: 'config'
});

const ReferralDetail = compose(
  ControlForm,
  ControlSpinner,
  graphql(EDIT_REFERRAL_BY_ID_MUTATION),
  withHandlers({
    handleSubmit: ({ input, mutate, handleSpinner }) => () => {
      handleSpinner();
      const data = { ...input };
      delete data._id;
      delete data.__typename;
      delete data.fullName;
      delete data.doctor;
      delete data.BANG; // BANG is derived from other fields, no need to store
      mutate({ variables: { id: input._id, data } })
        .then(() => {
          toast.success('Referral updated');
        })
        .catch(e => {
          toast.error(e.message);
        })
        .finally(handleSpinner);
    }
  })
)(ReferralForm);

const viewerProps = ['referral', 'viewer', 'edges', 0, 'node', 'referrals', 'edges'];
const DoctorReferralDetail = compose(
  graphql(VIEWER_REFERRAL_BY_ID_QUERY, {
    options: ({ match: { params: { id } } }) => ({
      variables: {
        id
      }
    }),
    name: 'referral'
  }),
  LoadReferralConfig,
  CombineFetching(['referral', 'config']),
  WithSpinnerError,
  NotFoundGuard(props => path(viewerProps, props).length === 0),
  mapProps(props => ({
    ...props,
    ...configLens(props.config.config),
    input: path(viewerProps, props)[0].node
  }))
)(ReferralDetail);

const referralProps = ['referral', 'referral', 'edges'];
const AdminReferralDetail = compose(
  graphql(REFERRAL_BY_ID_QUERY, {
    options: ({ match: { params: { id } } }) => ({
      variables: {
        id
      }
    }),
    name: 'referral'
  }),
  LoadReferralConfig,
  CombineFetching(['referral', 'config']),
  WithSpinnerError,
  NotFoundGuard(props => path(referralProps, props).length === 0),
  mapProps(props => ({
    ...props,
    ...configLens(props.config.config),
    input: path(referralProps, props)[0].node
  }))
)(ReferralDetail);

export default compose(
  ReduxCredential,
  branch(({ credential: { role } }) => role === DOCTOR, renderComponent(DoctorReferralDetail))
)(AdminReferralDetail);
