import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import config from '../../config/config'
import Message from '../Message'

const Payment = ({ id }) => {
  const [order, setOrder] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`${config.urlApi}orders/${id}`)
      .then((res) => res.json())
      .then((response) => {
        if (response.status === 'OK') {
          setOrder(response.data)
        } else {
          setError(response.message)
        }
      })
      .catch((e) => setError(e.message))
  }, [])

  if (!order) return <p className="text-center">Cargando...</p>
  return (
    <div className="flex justify-center ">
      <div className="container m-5">
        <div>
          <h1>Resumen</h1>
          {error && <Message msn={error} />}
          <div>
            {order.items.map(({ poster, title, price }) => (
              <div className="flex flex-row items-center py-3 border-b-2">
                <div>
                  <img src={`${config.posterUrl}${poster}`} className="h-40 w-28" />
                </div>
                <div className="flex w-full">
                  <p className="mx-2 w-3/4">{title}</p>
                  <p className="mx-2 w-1/4"> {price} €</p>
                </div>
              </div>
            ))}
            <div className="flex justify-end w-full my-2 ">
              <div className="flex flex-col w-1/4">
                <div className="flex w-full">
                  <p className="mx-2">Total:</p>
                  <p className="mx-2">{order.total} €</p>
                </div>
                <div className="flex w-full">
                  <p className="mx-2">Subtotal:</p>
                  <p className="mx-2">{order.subtotal} €</p>
                </div>
                <div className="flex w-full">
                  <p className="mx-2">Iva:</p>
                  <p className="mx-2">{order.iva} €</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Payment.propTypes = {
  id: PropTypes.string.isRequired,
}

export default Payment
