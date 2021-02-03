import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import Item from '../../components/compras/Item'

const Compras = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <Layout>
      <div className="mx-auto container">
        <div className="w-full m-5 text-4xl text-left">
          <h1>Pedido</h1>
        </div>
        <div className="">
          <Item id={id} />
        </div>
      </div>
    </Layout>
  )
}

export default Compras
