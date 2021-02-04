import { useEffect, useState } from 'react'
import ItemBought from './ItemBought'
import config from '../../config/config'
import Titulo from '../Titulo'

const Compras = () => {
  const [orders, setOrders] = useState(null)
  useEffect(() => {
    fetch(`${config.urlApi}orders`)
      .then((res) => res.json())
      .then((response) => {
        if (response.data) {
          setOrders(response.data)
        }
      })
      .catch((e) => console.log(e))
  }, [])
  return (
    <div className="mx-auto container">
      <Titulo title="Compras" />

      <div className="">
        {orders && orders.length > 0 ? (
          orders.map((order) => <ItemBought key={order.id} order={order} />)
        ) : (
          <p className="text-center text-xl">Actualmente no hay compras</p>
        )}
      </div>
    </div>
  )
}

export default Compras
