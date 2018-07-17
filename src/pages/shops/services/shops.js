import request from '../../../utils/request';
import { seralizeQuery } from '../../../utils/URL';

export function list() {
  return request(`/api/shop/list`);
}

export function get(id) {
  return request(`/api/shop/get/${id}`);
}

export function update(id, values) {
  return request(`/api/shop/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `id=${id}&${seralizeQuery(values)}`
  });
}

export function create(values) {
  return request('/api/shop/add', {
    method: 'POST'
  });
}
