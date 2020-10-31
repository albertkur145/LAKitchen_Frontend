import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import routes from './routes';

const mock = new MockAdapter(axios);
const methods = {
  GET: 'onGet',
  POST: 'onPost',
  PUT: 'onPut',
  DELETE: 'onDelete',
};

routes.forEach((val) => {
  mock[methods[val.method]](val.url, val.params).reply(val.status, val.response);
});
