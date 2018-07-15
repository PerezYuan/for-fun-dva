import URI from 'urijs'

export function seralizeQuery(obj) {
  return URI('').search(obj).query()
}