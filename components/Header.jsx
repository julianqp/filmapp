import { useState, useEffect } from 'react'
import { FaReact, FaShoppingCart } from 'react-icons/fa'
import { GiHamburgerMenu } from 'react-icons/gi'
import Link from 'next/link'
import { useRouter } from 'next/router'
import MenuMobile from './MenuMobile'

const selected = 'text-blue-600'

const Header = () => {
  const [view, setView] = useState(false)
  const { route } = useRouter()

  return (
    <div className="bg-gray-100 sticky top-0  w-full">
      {view && <MenuMobile route={route} onClose={() => setView(false)} />}
      <div className="flex m-2 items-center justify-between">
        <div className="flex items-center ">
          <span className="text-xl mx-1 sm:hidden">
            <button type="button" onClick={() => setView(!view)}>
              <GiHamburgerMenu />
            </button>
          </span>
          <h1 className="text-3xl font-semibold text-blue-600">
            <FaReact />
          </h1>
        </div>
        <div className="hidden sm:flex">
          <ul className="flex">
            <li className="mx-1">
              <Link href="/">
                <button type="button" className={`${route === '/' ? selected : ''}`}>
                  Catálogo
                </button>
              </Link>
            </li>
            <li className="mx-1">
              <Link href="/compras">
                <button type="button" className={`${route === '/compras' ? selected : ''}`}>
                  Compras
                </button>
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center">
          <Link href="/cart">
            <button type="button" className="mx-2 flex items-center border rounded rounder-md px-2 py-1 bg-green-200">
              <ItemsCesta />
              <FaShoppingCart />
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

const ItemsCesta = () => {
  const [cesta, setCesta] = useState(0)
  useEffect(() => {
    const numberItems = () => {
      const cart = JSON.parse(localStorage.getItem('cart'))
      const items = cart && cart.films ? cart.films.length : 0
      if (items !== cesta) {
        setCesta(items)
      }
    }
    const interval = setInterval(() => {
      numberItems()
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return <span className="rounded-full h-5 w-5 text-sm flex justify-center items-center">{cesta}</span>
}

export default Header
