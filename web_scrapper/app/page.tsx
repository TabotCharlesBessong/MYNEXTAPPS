import { HeroCarousel, ProductCard, Searchbar } from "@/components";
import { getAllProducts } from "@/lib/actions";
import Image from "next/image";
import React from "react";

const page = async ()  => {
  const allProducts = await getAllProducts()
  return (
    <>
      <section className="px-6 md:px-20 py-24">
        <div className="flex max-xl:flex-col gap-16">
          <div className="flex flex-col justify-center">
            <p className="small-text">
              Smart Shopping start here
              <Image
                src="/assets/icons/arrow-right.svg"
                width={16}
                height={16}
                alt="arrow-right"
              />
            </p>
            <h1 className="head-text">
              Unleash the power of
              <span className="text-primary"> Pricewise</span>
            </h1>
            <p className="mt-6">
              Powerful, self-serve product and growth analytics to help you
              convert, engage, and retain more.
            </p>
            <Searchbar />
          </div>
          <HeroCarousel />
        </div>
      </section>
      <section className="trending-section">
        <h2 className="section-text">Trending</h2>
        <div className="flex flex-wrap gap-x-8 gap-y-16">
          {allProducts?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
          {/* {allProducts?.map((product:any) => (
            <div>{product.title}</div>
          ))} */}
        </div> 
      </section>
    </>
  );
};

export default page;
