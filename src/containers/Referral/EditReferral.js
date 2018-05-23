import { graphql } from 'react-apollo';
import { withHandlers, compose, mapProps, branch, renderComponent } from 'recompose';
import { path } from 'ramda';

import { EDIT_REFERRAL_BY_ID_MUTATION } from '../../graphql/referral';
import { CONFIG_QUERY } from '../../graphql/config';
import { VIEWER_REFERRAL_BY_ID } from '../../graphql/viewer';

import ReferralForm from '../../_components/Form/ReferralForm';

import ControlForm from '../../_components/HOC/ControlForm';
import ControlSpinner from '../../_components/HOC/ControlSpinner';
import WithSpinnerError from '../../_components/HOC/SpinnerError';
import CombineFetching from '../../_components/HOC/CombineFetching';
import NotFoundGuard from '../../_components/HOC/NotFoundGuard';

import toast from '../../utils/toast';
import { configLens } from '../../utils/pathLens';
import { WithRedux } from './NewReferral';

const pathProps = ['referral', 'viewer', 'edges', 0, 'node', 'referrals', 'edges'];

export default compose(
  graphql(VIEWER_REFERRAL_BY_ID, {
    options: ({ match: { params: { id } } }) => ({
      variables: {
        id
      }
    }),
    name: 'referral'
  }),
  graphql(CONFIG_QUERY, {
    options: () => ({
      variables: {
        name: 'REFERRAL-METADATA'
      }
    }),
    name: 'config'
  }),
  CombineFetching(['referral', 'config']),
  WithSpinnerError,
  NotFoundGuard(props => path(pathProps, props).length === 0),
  mapProps(props => ({
    ...props,
    ...configLens(props.config.config),
    input: props.referral.viewer.edges[0].node.referrals.edges[0].node
  })),
  ControlForm,
  ControlSpinner,
  WithRedux,
  graphql(EDIT_REFERRAL_BY_ID_MUTATION),
  withHandlers({
    handleSubmit: ({ input, mutate, handleSpinner }) => () => {
      const data = { ...input };
      delete data._id;
      delete data.doctor;
      delete data.__typename;
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
