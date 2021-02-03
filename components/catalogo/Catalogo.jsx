import { useEffect, useState } from 'react'
import Film from './Film'
import getCart from '../../utils/localStorage'
import config from '../../config/config'

const Catalogo = () => {
  const [data, setData] = useState(null)
  const [cesta, setCesta] = useState([])
  useEffect(() => {
    if (window) {
      const cart = getCart()
      const filmsIds = cart && cart.films ? cart.films.map(({ id }) => id) : []
      setCesta(filmsIds)
      fetch(`${config.urlApi}films`)
        .then((res) => res.json())
        .then((response) => {
          if (response.status === 'OK') {
            setData(response.data)
          } else {
            setData([])
          }
        })
        .catch((e) => console.log(e))
    }
  }, [])

  const addToCart = (id) => {
    const newCesta = [...cesta]
    newCesta.push(id)
    setCesta(newCesta)
  }

  return (
    <div className="mx-auto container">
      <div className="w-full m-5 text-4xl text-left">
        <h1>Catálogo</h1>
      </div>

      <div className="flex flex-wrap justify-center mx-4">
        {data &&
          data.map((item) => <Film key={item.id} data={item} cart={cesta.includes(item.id)} setCart={addToCart} />)}
      </div>
    </div>
  )
}

export default Catalogo
