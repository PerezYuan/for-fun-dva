import request from '../../../utils/request';

export function list() {
  return request(`/api/shop/list`);
}

export function get(id) {
  return request(`/api/shop/get/${id}`);
}

export function update(id) {
  console.log(id)
  return request(`/api/shop/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `id=${id}`
  });
}

export function remove(id) {
  let formData = new FormData();
  formData.append("id",id);
  return request(`/api/shop/delete`, {
    method: 'post',
    body: formData
  });
}

export function patch(id, values) {
  return request(`/api/users/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(values),
  });
}

export function create(values) {
  return request('/api/users', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}
