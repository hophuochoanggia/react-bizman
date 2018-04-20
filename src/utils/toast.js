import { toast } from 'react-toastify';

const position = toast.POSITION.BOTTOM_RIGHT;
export default {
  success: message => toast.success(message, { position }),
  error: message => toast.error(message, { position })
};
