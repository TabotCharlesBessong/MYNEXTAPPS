/* eslint-disable @next/next/no-img-element */
// eslint-disable @next/next/no-img-element
// import Image from 'next/image'
import Link from 'next/link'
import React, { useContext } from "react";
import {Store} from '../utils/Store'
import axios from 'axios'
<<<<<<< HEAD
import {toast} from 'react-toastify'
=======
>>>>>>> 4d0f6504c1406c99a8b59b7c69218ce033a972a8

const ProductItem = ({product}) => {
	const {state , dispatch } = useContext(Store);
	const addToCartHandler = async () => {
		const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
		const quantity = existItem ? existItem.quantity + 1 : 1;

		const { data } = await axios.get(`/api/products/${product._id}`);
		if (data.countInStock < quantity) {
<<<<<<< HEAD
			toast.error("Product is out of stock");
			return;
		}
		dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
		toast.success('Product added to Cart')
=======
			alert("Product is out of stock");
			return;
		}
		dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
>>>>>>> 4d0f6504c1406c99a8b59b7c69218ce033a972a8
	};


  return (
		<div className="card">
			<Link href={`/products/${product.slug}`}>
				<img
					src={product.image}
					alt={product.name}
					className="rounded shadow"
				/>
			</Link>
			<div className="flex flex-col items-center justify-center p-5">
				<Link href={`/products/${product.slug}`}>
					<h2 className="text-lg">{product.name}</h2>
				</Link>
				<p className='mb-2' >{product.brand}</p>
				<p>${product.price}</p>
        <button onClick={addToCartHandler} className='primary-button' type='button'>
          Add to cart
        </button>
			</div>
		</div>
	);
}

export default ProductItem