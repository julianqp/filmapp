import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs'
import PropTypes from 'prop-types'
import config from '../../config/config'

const Film = ({ data, cart, setCart }) => {
  const buildRange = (avg) => {
    const starts = []
    for (let i = 1; i <= 10; i += 1) {
      if (i <= avg) starts.push(<BsStarFill key={`${i}-star`} className="text-yellow-400" />)
      else if (i - 0.5 <= avg) {
        starts.push(<BsStarHalf key={`${i}-star`} className="text-yellow-400" />)
      } else {
        starts.push(<BsStar key={`${i}-star`} className="text-yellow-400" />)
      }
    }
    return starts
  }

  const addToCart = () => {
    let cart = localStorage.getItem('cart')
    if (cart) {
      cart = JSON.parse(cart)
      cart.films.push({
        title: data.title,
        poster: data.poster,
        id: data.id,
        price: data.price,
      })
    } else {
      cart = {
        films: [
          {
            title: data.title,
            poster: data.poster,
            id: data.id,
            price: data.price,
          },
        ],
      }
    }
    localStorage.removeItem('cart')
    localStorage.setItem('cart', JSON.stringify(cart))
    setCart(data.id)
  }

  return (
    <div className="flex flex-col shadow-sm w-1/1 md:w-1/3 lg:w-1/4 xl:w-1/5 h-100">
      <div className="bg-gray-100 rounded-md p-3 my-2 mx-1">
        <h1 className="text-center my-1 italic font-semibold">{data.title}</h1>
        <div className="flex flex-col items-center">
          <img src={`${config.posterUrl}${data.poster}`} />
          <div className="p-3 my-2 rounded-xl bg-white">{data.overview}</div>
        </div>
        <div>
          <div className="flex justify-center my-2">{buildRange(data.vote_average)}</div>
          <div className="flex justify-center my-2">
            <p className="rounded-full bg-blue-200 px-3">{data.price} €</p>
          </div>
          <div className="flex justify-center my-2">
            {cart ? (
              <p className="rounded-full bg-yellow-200 px-3">En la cesta</p>
            ) : (
              <button
                type="button"
                className="rounded-full bg-green-200 hover:bg-green-300 px-3"
                onClick={() => addToCart()}
              >
                Comprar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

Film.propTypes = {
  data: PropTypes.shape().isRequired,
  cart: PropTypes.bool.isRequired,
  setCart: PropTypes.func.isRequired,
}

export default Film
