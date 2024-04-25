import React, { useState } from "react";
import { Rate } from "antd";
import { CiHeart } from "react-icons/ci";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { wishlistServices } from "../../services";

interface IProps {
  id: number;
  images: [];
  rate: number;
  name: string;
  price: number;
  discount: number;
  slug: string;
}

const Product = (props: IProps) => {
  const navigate = useNavigate();
  const [isWishlistActive, setIsWishlistActive] = useState(false);

  const handleAddWishlist = async (id: number) => {
    const res = await wishlistServices.addToWishlist({ product_id: id });
    console.log(res);
    setIsWishlistActive(!isWishlistActive);
    console.log(isWishlistActive);
  };

  const handleProductClick = () => {
    navigate(`/san-pham/${props.slug}/${props.id}`);
  };

  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-4">
      <div className="bg-white p-4 shadow-md rounded-md">
        <div className="h-[300px]">
          {Array.isArray(props.images) && props.images.length > 0 && (
            <img
              src={`http://127.0.0.1:8000/uploads/${props.images[0]}`}
              alt={props.name}
              className="cursor-pointer w-full h-full"
              onClick={handleProductClick}
            />
          )}
        </div>

        <div className="text-center">
          <h2
            className="text-lg mt-4 font-semibold cursor-pointer"
            onClick={handleProductClick}
          >
            {props.name}
          </h2>
          <Rate allowHalf defaultValue={props.rate} disabled />
          <div className="mt-2">
            <span className="text-gray-500 text-sm line-through mr-2">
              {props.price} VNĐ
            </span>
            <span className="text-red-500 text-lg font-semibold">
              {props.price - (props.discount * props.price) / 100} VNĐ
            </span>
          </div>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <button
            className="text-gray-700 hover:text-gray-900"
            onClick={() => {
              handleAddWishlist(props.id);
            }}
          >
            <CiHeart
              size={20}
              style={{ color: isWishlistActive ? "red" : "gray" }}
            />
          </button>
          <button
            className="text-gray-700 hover:text-gray-900"
            onClick={() => {
              // Handle click event
            }}
          >
            <FaShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
