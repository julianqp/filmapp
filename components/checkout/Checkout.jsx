import { useEffect } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

const Checkout = ({ id }) => {
  useEffect(() => {
    if (process.browser) {
      localStorage.removeItem('cart')
    }
  }, [])
  return (
    <div className="flex justify-center ">
      <div className="container m-5">
        <div className="p-10">
          <h1 className="text-3xl">Pago finalizado con éxito</h1>
          <div className="p-5 my-5 rounded-xl bg-blue-50">
            <p>Muchas gracias por realizar la compra.</p>
            <p>
              Su pedido, con identificador
              <span className="font-bold">#{id}</span>, ha sido pagado correctamente, en unos minutos recibirá un correo
              con el contenido.
            </p>
            <p className="">Espero que disfrute.</p>
            <div className="text-center">
              <Link href="/">
                <button type="button" className="hover:underline hover:text-purple-400">
                  Volver al catálogo
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
Checkout.propTypes = {
  id: PropTypes.string.isRequired,
}

export default Checkout
