import request from '../../../utils/request';
import { seralizeQuery } from '../../../utils/URL';

export function get() {
  return request(`/api/banner/list`);
}

export function remove(id) {
  return request(`/api/service/delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
    body: `id=${id}`
  });
}

export function edit(id, values) {
  return request(`/api/service/modify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
    body: `id=${id}&${seralizeQuery(values)}`,
  });
}

export function create(values) {
  return request('/api/service/insert', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
    body: seralizeQuery(values),
  });
}
