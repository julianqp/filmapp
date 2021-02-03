import PropTypes from 'prop-types'
import Link from 'next/link'

const selected = 'text-blue-600'

const MenuMobile = ({ onClose, route }) => {
  document.documentElement.style.overflow = 'hidden'
  document.body.scroll = 'no'
  const cerrar = () => {
    document.documentElement.style.overflow = 'scroll'
    document.body.scroll = 'yes'
    onClose()
  }
  return (
    <div className="absolute overflow-auto top-0 left-0 bg-white w-full h-screen flex flex-col pt-5">
      <button
        type="button"
        onClick={() => {
          cerrar()
        }}
        className="flex justify-center p-5"
      >
        <svg
          className="w-10 h-10 text-white p-2 bg-black rounded-full"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <Link href="/">
        <button
          type="button"
          className={`hover:text-gray-900 text-center mx-12 my-1 p-2 rounded-md border border-blue-500 ${
            route === '/' ? selected : ''
          }`}
        >
          Compras
        </button>
      </Link>
      <Link href="/catalogo">
        <button
          type="button"
          className={`hover:text-gray-900 text-center mx-12 my-1 p-2 rounded-md border border-blue-500 ${
            route === '/catalogo' ? selected : ''
          }`}
        >
          Catálogo
        </button>
      </Link>
    </div>
  )
}

MenuMobile.propTypes = {
  onClose: PropTypes.func.isRequired,
  route: PropTypes.string.isRequired,
}

export default MenuMobile
