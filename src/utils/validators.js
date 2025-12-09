export function isEmail(value){
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export function minLength(value, n){
  return typeof value === 'string' && value.length >= n
}
