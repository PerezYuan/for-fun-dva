import request from '../../../utils/request';
import { seralizeQuery } from '../../../utils/URL';

export function get() {
  return request(`/api/banner/list`);
}

export function edit(id, values) {
  return request(`/api/banner/modify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
    body: `id=${id}&${seralizeQuery(values)}`,
  });
}