// Category.tsx

import React, { useEffect } from "react";
import SidebarRight from "../../components/SidebarRight";
import Product from "../../components/Product";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getProduct } from "../../redux/product/asyncAction";

const Category: React.FC = () => {
  const { products } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProduct({}));
  }, []);

  return (
    <div className="mx-auto lg:flex lg:justify-between p-4">
      <SidebarRight />
      <div className="container mx-auto flex flex-wrap ">
        {products &&
          products?.map((product: any, index: number) => (
            <Product
              key={index}
              id={product.pid}
              name={product.p_name}
              price={product.p_price}
              rate={product.rating}
              images={product.images}
              discount={product.discount}
              slug={product.slug}
            />
          ))}
      </div>
    </div>
  );
};

export default Category;
