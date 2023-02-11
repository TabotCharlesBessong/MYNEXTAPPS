import { Layout, ProductItem } from "../components";
import Product from "../models/Product";
import db from "../utils/db";
import dynamic from 'next/dynamic'

const  Home= ({products }) =>{
  return (
    <Layout title='Home page' >
      <div className='grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4' >
        {
          products.map((product) => (
            <ProductItem key={product.slug} product={product} />

          ))
        }
      </div>
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(Home),{ssr:false})

export async function getServerSideProps() {
	await db.connect();
	const products = await Product.find().lean();
	// const featuredProducts = await Product.find({ isFeatured: true }).lean();
	return {
		props: {
			// featuredProducts: featuredProducts.map(db.convertDocToObj),
			products: products.map(db.convertDocToObj),
		},
	};
}
