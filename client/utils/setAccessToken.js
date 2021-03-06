import axios from 'axios';

/**
 * Sets the token for use by ajax calls
 * @param {number} token
 */
export default function setAccessToken(token) {
  if (token) {
    axios.defaults.headers.common['x-access-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-access-token'];
  }
}
