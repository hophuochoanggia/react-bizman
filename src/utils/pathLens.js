// This file store path to get data from Relay response
import { path } from 'ramda';

const pathProps = ['edges', 0, 'node'];
export const configLens = obj => path(pathProps, obj).setting;
