import request from '../../../utils/request';

export function shoplist() {
  return request(`/api/shop/list`);
}

export function titlelist() {
  return request(`/api/title/list`);
}