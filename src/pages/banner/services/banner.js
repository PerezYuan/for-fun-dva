import request from '../../../utils/request';
import { seralizeQuery } from '../../../utils/URL';
import { API_LOCATION } from '../../../constants';

export function get() {
  return request(`${API_LOCATION}/api/banner/list`);
}

export function edit(id, values) {
  return request(`${API_LOCATION}/api/banner/modify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
    body: `id=${id}&${seralizeQuery(values)}`,
  });
}