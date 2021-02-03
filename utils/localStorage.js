const getCart = () => {
  const cart = localStorage.getItem('cart')
  return JSON.parse(cart)
}

export default getCart
