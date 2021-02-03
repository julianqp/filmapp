import config from '../config/config'

const calcPrice = (price) => {
  const iva = Math.round(((price * config.iva) / 100) * 100) / 100
  const subtotal = price - iva
  return [subtotal, iva]
}

export default calcPrice
