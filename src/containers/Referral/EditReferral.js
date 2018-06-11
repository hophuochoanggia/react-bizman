import { graphql } from 'react-apollo';
import { withHandlers, compose, mapProps, branch, renderComponent } from 'recompose';
import { path } from 'ramda';

import {
  REFERRAL_BY_ID_QUERY,
  EDIT_REFERRAL_BY_ID_MUTATION,
  DELETE_REFERRAL_BY_ID_MUTATION
} from '../../graphql/referral';
import { CREATE_PATIENT_MUTATION, PATIENT_BY_LICENSE_QUERY } from '../../graphql/patient';
import { VIEWER_REFERRAL_BY_ID_QUERY } from '../../graphql/viewer';

import ReferralForm from '../../_components/Form/ReferralForm';

import ControlForm from '../../_components/HOC/ControlForm';
import ControlSpinner from '../../_components/HOC/ControlSpinner';
import WithSpinnerError from '../../_components/HOC/SpinnerError';
import NotFoundGuard from '../../_components/HOC/NotFoundGuard';
import ReduxCredential from '../../_components/HOC/ReduxCredential';

import toast from '../../utils/toast';
import omitKeys from '../../utils/omitKeys';
import { DOCTOR } from '../../config';

const ReferralDetail = compose(
  ControlForm,
  ControlSpinner,

  graphql(EDIT_REFERRAL_BY_ID_MUTATION),
  graphql(DELETE_REFERRAL_BY_ID_MUTATION, {
    options: ({ match: { params: { id } } }) => ({
      variables: {
        id
      }
    }),
    name: 'remove'
  }),
  graphql(CREATE_PATIENT_MUTATION, { name: 'createPatient' }),

  withHandlers({
    handleSubmit: ({ input, mutate, handleSpinner }) => () => {
      handleSpinner();
      const keys = ['_id', '__typename', 'fullName', 'doctor', 'BANG'];
      const data = omitKeys(input, keys);
      mutate({ variables: { id: input._id, data } })
        .then(() => {
          toast.success('Referral updated');
        })
        .catch(e => {
          toast.error(e.message);
        })
        .finally(handleSpinner);
    },

    handleDelete: ({ history, remove, handleSpinner }) => () => {
      handleSpinner();
      remove()
        .then(() => {
          history.push('/referral');
          toast.warn('Referral deleted');
        })
        .catch(e => {
          toast.error(e.message);
          handleSpinner();
        });
    },

    createEvent: ({
      history,
      input,
      createPatient,
      handleSpinner,
      data: { patient }
    }) => async () => {
      handleSpinner();
      if (patient.edges.length === 0) {
        const keys = ['_id', '__typename', 'doctor', 'data', 'status', 'fullName'];
        const data = omitKeys(input, keys);
        try {
          await createPatient({ variables: { input: data } });
          toast.success('Referral updated');
        } catch (e) {
          return toast.error(e.message);
        }
      }
      history.push({
        pathname: `/event/${patient.edges[0].node._id}/new/STUDY`,
        state: { referral: input }
      });
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
  WithSpinnerError,
  NotFoundGuard(props => path(viewerProps, props).length === 0),
  mapProps(props => ({
    ...props,
    input: path(viewerProps, props)[0].node
  }))
)(ReferralDetail);

const referralProps = ['data', 'referral', 'edges'];
const AdminReferralDetail = compose(
  graphql(REFERRAL_BY_ID_QUERY, {
    options: ({ match: { params: { id } } }) => ({
      variables: {
        id
      }
    })
  }),
  WithSpinnerError,
  NotFoundGuard(props => path(referralProps, props).length === 0),
  mapProps(props => ({
    ...props,
    input: path(referralProps, props)[0].node
  })),
  graphql(PATIENT_BY_LICENSE_QUERY, {
    options: ({ input: { drivingLicense } }) => ({
      variables: { drivingLicense }
    })
  }),
  WithSpinnerError
)(ReferralDetail);

export default compose(
  ReduxCredential,
  branch(({ credential: { role } }) => role === DOCTOR, renderComponent(DoctorReferralDetail))
)(AdminReferralDetail);
