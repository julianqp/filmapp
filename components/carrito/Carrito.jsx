import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { FaStripeS, FaPaypal, FaTrashAlt } from 'react-icons/fa'
import { MdPayment } from 'react-icons/md'
import axios from 'axios'
import Swal from 'sweetalert2'
import { loadStripe } from '@stripe/stripe-js'
import calcPrice from '../../utils/calcPrice'
import Message from '../Message'
import config from '../../config/config'
import getCart from '../../utils/localStorage'

const stripePromise = loadStripe(config.stripe_pk)

const paymentIcon = (payment) => {
  switch (payment) {
    case 'stripe':
      return (
        <div className="text-5xl">
          <FaStripeS />
        </div>
      )
    case 'mercadopago':
      return (
        <div className="text-5xl">
          <MdPayment />
        </div>
      )
    case 'paypal':
      return (
        <div className="text-5xl">
          <FaPaypal />
        </div>
      )
    default:
      return null
  }
}

const Carrito = () => {
  const [cesta, setCesta] = useState([])
  const [loading, setLoading] = useState(false)
  const [paymentMethod, setPaymentMehod] = useState('')
  const [errorPaymentMehod, setErrorPaymentMehod] = useState(false)
  const formik = useFormik({
    initialValues: {
      name: 'Julian',
      lastName: 'Querol',
      email: 'querol1993@gmail.com',
      observation: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('El nombre es obligatorio'),
      lastName: Yup.string().required('Los apellidos son obligatorios'),
      email: Yup.string().email().lowercase().required('El email es obligatorio'),
      observation: Yup.string(),
    }),
    onSubmit: async (values) => {
      if (paymentMethod !== '') {
        setErrorPaymentMehod(true)
      } else {
        setLoading(true)
        const { name, lastName, email, observation } = values
        let total = 0
        const items = cesta.films.map(({ title, id, price, poster }) => {
          total += price
          return { title, id, price, poster }
        })

        const [subtotal, iva] = calcPrice(total)

        const newOrder = {
          name,
          lastName,
          email,
          observation,
          paymentMethod,
          items,
          total,
          subtotal,
          iva,
        }

        const { data } = await axios.post(`${config.urlApi}orders/new`, {
          ...newOrder,
        })
        if (data.status === 'OK') {
          const stripe = await stripePromise
          const stripeResponse = await axios.post(`${config.urlApi}payment/stripe/new`, {
            id: data.data.id,
            items,
            email,
          })
          if (stripeResponse.data && stripeResponse.data.id) {
            await stripe.redirectToCheckout({
              sessionId: stripeResponse.data.id,
            })
          } else {
            Swal.fire('Cancelado', stripeResponse.data.message, 'error')
            setLoading(false)
          }
        } else {
          Swal.fire('Cancelado', data.message, 'error')
          setLoading(false)
        }
      }
    },
  })
  let total = 0

  useEffect(() => {
    if (window) {
      const cart = getCart()
      setCesta(cart)
    }
  }, [])

  const deleteItem = (id) => {
    const copy = { ...cesta, films: cesta.films.filter((x) => id !== x.id) }
    localStorage.setItem('cart', JSON.stringify(copy))
    setCesta(copy)
  }

  return (
    <div className="flex justify-center ">
      <div className="container m-5">
        <h1 className="text-center">Carrito</h1>
        <div className="">
          {cesta && cesta.films
            ? cesta.films.map(({ id, title, poster, price }) => {
                total += 9
                return (
                  <div key={id} className="flex flex-row items-center py-3 border-b-2">
                    <div>
                      <img src={`${config.posterUrl}${poster}`} className="h-40 w-28" />
                    </div>
                    <div className="flex w-full">
                      <p className="mx-2 w-1/2">{title}</p>
                      <button type="button" onClick={() => deleteItem(id)} className="mx-2 w-1/4 text-red-500">
                        <FaTrashAlt />
                      </button>
                      <p className="mx-2 w-1/4"> {price} €</p>
                    </div>
                  </div>
                )
              })
            : null}
        </div>

        <div className="flex justify-end w-full my-2">
          <div className=" flex w-1/4">
            <p className="mx-2">Total:</p>
            <p className="mx-2">{total} €</p>
          </div>
        </div>
        <p className="w-full">Formulario compra</p>
        <form
          className="flex flex-wrap "
          onSubmit={(e) => {
            e.preventDefault()
            formik.handleSubmit()
          }}
        >
          <div className="p-2 w-1/2">
            <div className="relative">
              <label htmlFor="name" className="leading-7 text-sm text-gray-600">
                Nombre
              </label>
              <input
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
                id="name"
                name="name"
                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
              {formik.touched.name && formik.errors.name && <Message msn={formik.errors.name} />}
            </div>
          </div>
          <div className="p-2 w-1/2">
            <div className="relative">
              <label htmlFor="lastName" className="leading-7 text-sm text-gray-600">
                Apellidos
              </label>
              <input
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
                id="lastName"
                name="lastName"
                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
              {formik.touched.lastName && formik.errors.lastName && <Message msn={formik.errors.lastName} />}
            </div>
          </div>
          <div className="p-2 w-1/2">
            <div className="relative">
              <label htmlFor="email" className="leading-7 text-sm text-gray-600">
                Email
              </label>
              <input
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="email"
                id="email"
                name="email"
                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
              {formik.touched.email && formik.errors.email && <Message msn={formik.errors.email} />}
            </div>
          </div>
          <div className="p-2 w-full">
            <div className="relative">
              <label htmlFor="observation" className="leading-7 text-sm text-gray-600">
                Observaciones
              </label>
              <textarea
                id="observation"
                name="observation"
                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
          <div className="flex flex-col w-full">
            <p className="">Métodos de pago</p>
            <div className="flex w-full">
              {config.payments.map((payment) => (
                <label
                  key={payment.slug}
                  className="flex flex-col rounded-xl items-center w-1/3 p-5 border m-1 hover:border-blue-500"
                  htmlFor={payment.slug}
                >
                  <input
                    type="radio"
                    className="form-radio h-6 w-6"
                    name="paymentMethod"
                    id={payment.slug}
                    autoComplete="off"
                    value={paymentMethod}
                    onChange={() => {
                      setPaymentMehod(payment.slug)
                      setErrorPaymentMehod(false)
                    }}
                  />
                  <span className="flex flex-col items-center">
                    <p className="my-3">{payment.name}</p>
                    {paymentIcon(payment.slug)}
                  </span>
                </label>
              ))}
            </div>
            {errorPaymentMehod && (
              <div className="text-center">
                <Message msn="Seleccione una modalidad de pago" />
              </div>
            )}
          </div>
          <div className="w-full my-4 flex justify-center">
            <button
              type={loading ? 'button' : 'submit'}
              className={`px-5 py-1 bg-indigo-200 rounded-xl ${
                loading ? ' cursor-not-allowed disabled:opacity-50 ' : ''
              }`}
            >
              {loading ? (
                <svg
                  className="animate-spin m-1 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              ) : (
                'Enviar'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Carrito
