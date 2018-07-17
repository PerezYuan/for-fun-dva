import request from '../../../utils/request';
import { PAGE_SIZE } from '../../../constants';
import { seralizeQuery } from '../../../utils/URL';

export function fetch({ page }) {
  return request(`/api/employee/list?page=${page}&limit=${PAGE_SIZE}`);
}

export function remove(id) {
  return request(`/api/employee/out`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
    body: `id=${id}`
  });
}

export function edit(id, values) {
  return request(`/api/employee/modify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
    body: `id=${id}&${seralizeQuery(values)}`,
  });
}

export function create(values) {
  console.log(values)
  return request(`/api/employee/insert`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
    body: seralizeQuery(values),
  });
}
