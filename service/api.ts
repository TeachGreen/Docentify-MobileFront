import axios from 'axios';

const api = axios.create({
  baseURL: 'http://wa-docentify-api-c8cddtecgqgueudb.brazilsouth-01.azurewebsites.net/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;