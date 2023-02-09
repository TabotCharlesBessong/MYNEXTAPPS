import { Layout, ProductItem } from "../components";
import data from '../utils/data'

export default function Home() {
  return (
    <Layout title='Home page' >
      <div className='grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4' >
        {
          data.products.map((product) => (
            <ProductItem key={product.slug} product={product} />

          ))
        }
      </div>
    </Layout>
  );
}


