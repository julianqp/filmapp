import axios from 'axios'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import config from '../../config/config'

const Item = ({ id }) => {
  const [order, setOrder] = useState(null)

  useEffect(() => {
    fetch(`${config.urlApi}orders/${id}`)
      .then((res) => res.json())
      .then((response) => {
        if (response.status === 'OK') {
          setOrder(response.data)
        }
      })
      .catch((e) => console.log(e))
  }, [])

  const reimbur = async () => {
    const url = `${config.urlApi}payment/${order.paymentMethod}/refund/${order.id}`
    await fetch(url, { method: 'POST' })
      .then((res) => res.json())
      .then((response) => {
        if (response.status === 'OK') {
          window.location.reload()
        }
      })
      .catch((e) => console.log(e))
  }

  const partialReimbur = async (title, price) => {
    const url = `${config.urlApi}payment/${order.paymentMethod}/partialrefund/${order.id}`

    const data = await axios.post(url, { title, price })

    if (data.status === 'OK') {
      window.location.reload()
    }
  }

  if (!order) return <h1>Cargando...</h1>

  return (
    <div className="rounded-md bg-gray-100 p-3 shadow-sm border-t-2 border-green-400 my-2 flex">
      <div className="my-2 w-full">
        <div className="flex items-center my-1 w-full font-semibold border-b-2 border-blue-300">
          <span className="w-4/6">Item</span>
          <span className="w-1/6">Precio</span>
          <span className="w-1/6">Acciones</span>
        </div>
        <div className="w-full divide-y-2 divide-blue-100">
          {order.items.map(({ id, title, price, status, pendingRefund }) => (
            <div key={`${id}-${title}`} className="flex items-center w-full">
              <p className="w-4/6">{title}</p>
              <p className="w-1/6"> {price}€</p>
              {status === 'paid' && !pendingRefund ? (
                <button
                  type="button"
                  onClick={() => partialReimbur(title, price)}
                  className="bg-yellow-400 rounded-md px-2"
                >
                  Reembolso parcial
                </button>
              ) : (
                <p className="w-1/6">{config.status[status]}</p>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-around items-center py-2 border-t-2 border-blue-300">
          <p>
            Total: <span>{order.total} €</span>
          </p>
          <p>
            Subtotal: <span>{order.subtotal} €</span>
          </p>
          <p>
            IVA: <span>{order.iva} €</span>
          </p>
          <div className="flex">
            <p>
              Estado: <span>{config.status[order.status]}</span>
            </p>
          </div>
          {order.status === 'paid' ? (
            <button type="button" onClick={() => reimbur()} className="bg-yellow-400 rounded-md px-2">
              Reembolso total
            </button>
          ) : (
            <p className="w-1/6">{config.status[order.status]}</p>
          )}
        </div>
      </div>
    </div>
  )
}

Item.propTypes = {
  id: PropTypes.string.isRequired,
}

export default Item
