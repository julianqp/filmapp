import Link from 'next/link'
import PropTypes from 'prop-types'
import config from '../../config/config'

const ItemBought = ({ order }) => (
  <div className="rounded-md bg-gray-100 p-3 shadow-sm border-t-2 border-green-400 my-2 flex">
    <div className="my-2 w-5/6">
      <div className="flex items-center my-1 w-full font-semibold border-b-2 border-blue-300">
        <span className="w-4/5">Item</span>
        <span className="w-1/5">Precio</span>
      </div>
      <div className="w-full divide-y-2 divide-blue-100">
        {order.items.map(({ id, title, price }) => (
          <div key={id} className="flex items-center w-full">
            <p className="w-4/5">{title}</p>
            <p className="w-1/5"> {price}€</p>
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
      </div>
    </div>
    <div className="w-1/6 flex justify-center items-center">
      <Link href={`/compras/${order.id}`}>
        <button type="button" className="bg-green-200 hover:bg-green-400 rounded-lg px-8 py-2 my-1">
          Ver
        </button>
      </Link>
    </div>
  </div>
)

ItemBought.propTypes = {
  order: PropTypes.shape().isRequired,
}

export default ItemBought
