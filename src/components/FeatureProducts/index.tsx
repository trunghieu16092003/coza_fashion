// FeartureProducts component
import React, { useEffect } from "react";
import Product from "../Product";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getProduct } from "../../redux/product/asyncAction";

const FeatureProducts = () => {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProduct({}));
  }, []);

  const featuredProducts = products?.slice(0, 8);

  return (
    <div className="mx-auto lg:flex flex-col lg:justify-between p-4">
      <h1 className="text-2xl font-bold my-4">Feature Products</h1>
      <div className="container mx-auto flex flex-wrap">
        {featuredProducts?.map((product: any, index) => (
          <Product
            key={index}
            id={product?.pid}
            rate={product.rating}
            images={product.images}
            name={product.p_name}
            price={product.p_price}
            discount={product.discount}
            slug={product.slug}
          />
        ))}
      </div>
      <div className="text-end">
        <button className="border px-4 py-2 text-xl hover:bg-black hover:text-white transition duration-300 ease-in-out">
          Tìm hiểu thêm
        </button>
      </div>
    </div>
  );
};

export default FeatureProducts;
