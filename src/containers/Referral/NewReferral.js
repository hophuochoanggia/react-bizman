import { graphql } from 'react-apollo';
import { withHandlers, compose, mapProps } from 'recompose';

import { CREATE_REFERRAL_MUTATION } from '../../graphql/referral';
import { CONFIG_QUERY } from '../../graphql/config';

import ReferralForm from '../../_components/Form/ReferralForm';
import toast from '../../utils/toast';
import ControlForm from '../../_components/HOC/ControlForm';
import ControlSpinner from '../../_components/HOC/ControlSpinner';
import WithSpinnerError from '../../_components/HOC/SpinnerError';
import RouteGuard from '../../_components/HOC/RouteGuard';
import ReduxCredential from '../../_components/HOC/ReduxCredential';

import { configLens } from '../../utils/pathLens';

export const LoadConfig = graphql(CONFIG_QUERY, {
  options: () => ({
    variables: {
      name: 'REFERRAL-METADATA'
    }
  })
});

const defaultInput = {
  data: {}
};

export default compose(
  ReduxCredential,
  RouteGuard,
  LoadConfig,
  WithSpinnerError,
  mapProps(props => ({ ...props, ...configLens(props.data.config), input: defaultInput })),
  ControlForm,
  ControlSpinner,
  graphql(CREATE_REFERRAL_MUTATION),
  withHandlers({
    handleSubmit: ({
      input, history, mutate, handleSpinner, credential: { id }
    }) => ref => {
      handleSpinner();
      delete input.data.BANG; // BANG is derived from other fields, no need to store
      input.data.signature = ref;
      input.doctorId = id;
      mutate({ variables: { input } })
        .then(() => {
          history.push('/referral');
          toast.success('Referral created');
        })
        .catch(e => {
          toast.error(e.message);
          handleSpinner();
        });
    }
  })
)(ReferralForm);
