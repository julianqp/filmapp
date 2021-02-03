import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import CheckoutInfo from '../../components/checkout/Checkout'

const Checkout = () => {
  const router = useRouter()
  const { id } = router.query
  return (
    <Layout>
      <CheckoutInfo id={id} />
    </Layout>
  )
}

export default Checkout
