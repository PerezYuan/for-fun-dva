import request from '../../../utils/request';
import { API_LOCATION } from '../../../constants';

export function shoplist() {
  return request(`${API_LOCATION}/api/shop/list`);
}

export function titlelist() {
  return request(`${API_LOCATION}/api/title/list`);
}