import request from '../../../utils/request';
import { seralizeQuery } from '../../../utils/URL';
import { API_LOCATION } from '../../../constants';

export function list() {
  return request(`${API_LOCATION}/api/shop/list`);
}

export function get(id) {
  return request(`${API_LOCATION}/api/shop/get/${id}`);
}

export function update(id, values) {
  return request(`${API_LOCATION}/api/shop/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `id=${id}&${seralizeQuery(values)}`
  });
}

export function create(values) {
  return request(`${API_LOCATION}/api/shop/add`, {
    method: 'POST'
  });
}
