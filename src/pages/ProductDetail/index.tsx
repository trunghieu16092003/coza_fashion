import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { CiHeart } from "react-icons/ci";
import { useParams } from "react-router-dom";
import { getProduct } from "../../redux/product/asyncAction";
import { getProductImages } from "../../redux/productImage/asyncAction";
import sizeImg from "../../assets/8d94633b1760bd3ee471.jpg";
import { addToCart, getCart } from "../../redux/cart/asyncAction";
import { productInventory } from "../../services";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.product);
  const { images } = useAppSelector((state) => state.productImage);
  const { carts } = useAppSelector((state) => state.cart);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isDescriptionTruncated, setIsDescriptionTruncated] = useState(true);
  const [productInventories, setProductInventories] = useState([]);
  const [activeTab, setActiveTab] = useState("description");
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const setActiveTabAndToggle = (tab: string) => {
    setActiveTab(tab);
  };

  const toggleDescription = () => {
    setIsDescriptionTruncated(!isDescriptionTruncated);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDescrease = () => {
    setQuantity(quantity - 1);
  };

  const handleAddToCart = () => {
    const data = {
      pid: +id,
      quantity: quantity,
      size: selectedSize,
      color: selectedColor,
    };
    dispatch(addToCart(data));
    dispatch(getCart());
  };

  const getProductInventory = async () => {
    const res: any = await productInventory.getIntventory(id);
    setProductInventories(res.data);
  };

  useEffect(() => {
    dispatch(getProduct({ id: id }));
    dispatch(getProductImages(id));
    getProductInventory();
  }, []);

  const handleThumbnailClick = (imagePath: string) => {
    setSelectedImage(imagePath);
  };

  const handleSelectSize = (size: string) => {
    setSelectedSize(size);
  };

  const handleSelectColor = (color: string) => {
    setSelectedColor(color);
  };

  return (
    <div className="flex md:flex-row gap-4 p-5 lg:p-20 sm:p-3 flex-col">
      <div className="md:w-1/2 w-full flex gap-4">
        <div className="w-full h-[400px]">
          {selectedImage && (
            <div className="h-full">
              <img
                src={`http://127.0.0.1:8000/uploads/${selectedImage}`}
                alt=""
                className="w-full h-full"
              />
            </div>
          )}
        </div>
        <div className="w-full h-32">
          {images?.length > 1 && (
            <ul className="h-full w-1/2 overflow-x-auto whitespace-nowrap">
              {images.slice(1).map((image: any, index) => (
                <li
                  key={index}
                  className={`inline-block relative h-30 mb-5 ${
                    selectedImage === image.path
                      ? "border-gray-500 border-2"
                      : ""
                  }`}
                  onClick={() => handleThumbnailClick(image.path)}
                >
                  <img
                    // src={`http://127.0.0.1:8000/uploads/${image.path}`}
                    src=""
                    alt=""
                    className="w-full h-full cursor-pointer"
                    style={{ objectFit: "cover" }}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="md:w-1/2 w-full lg:ml-4">
        {products?.map((product: any, index) => (
          <div key={index} className="mb-8">
            <h2 className="text-3xl uppercase">{product.p_name}</h2>
            <p className="mt-4 font-bold">
              Giá gốc:{" "}
              <span className="line-through font-bold text-gray-400">
                {product.p_price} VNĐ
              </span>
            </p>
            <p className="mt-2 font-bold">
              Giá đã giảm:{" "}
              {product.p_price - (product.p_price * product.discount) / 100} VNĐ
            </p>

            <div className="mt-4">
              <p>Kích cỡ:</p>
              {productInventories.map((productInventory: any, index) => (
                <div
                  key={index}
                  onClick={() => handleSelectSize(productInventory.size_id)}
                  className={`inline-block mr-2 p-2 cursor-pointer border-2 ${
                    selectedSize === productInventory.size ? "bg-gray-300" : ""
                  }`}
                >
                  {productInventory.size}
                </div>
              ))}
            </div>

            <div className="mt-4">
              <p>Màu sắc</p>
              {productInventories.map((productInventory: any, index) => (
                <div
                  key={index}
                  style={{
                    border: `1px solid ${productInventory.code}`,
                    padding: "2px",
                  }}
                  onClick={() => handleSelectColor(productInventory.color_id)}
                  className={`inline-block mr-2 p-2 cursor-pointer ${
                    selectedColor === productInventory.color
                      ? "bg-gray-300"
                      : ""
                  }`}
                >
                  {productInventory.color}
                </div>
              ))}
            </div>

            <div className="flex mt-6 text-lg">
              <p className="">Số lượng: </p>
              <p className="ml-4">
                <span
                  className="inline-block px-4 cursor-pointer border border-gray-400 rounded-full"
                  onClick={handleDescrease}
                >
                  -
                </span>
                {quantity}
                <span
                  className="inline-block px-4 cursor-pointer border border-gray-400 rounded-full"
                  onClick={handleIncrease}
                >
                  +
                </span>
              </p>
            </div>

            <div className="mt-8 flex items-center text-xl">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md mr-4"
                onClick={handleAddToCart}
              >
                Thêm vào giỏ
              </button>
              <button className="px-4 py-2 mr-4 transition duration-300 ease-in-out hover:bg-purple-500 hover:text-white rounded-full">
                Mua hàng
              </button>
              <CiHeart className="inline-block" />
            </div>
            <div className="mt-6">
              <div className="text-base text-gray-500 font-medium uppercase">
                <p className="flex">
                  <span
                    className={`mr-4 cursor-pointer ${
                      activeTab === "description"
                        ? "border-b-2 border-black"
                        : ""
                    }`}
                    onClick={() => setActiveTabAndToggle("description")}
                  >
                    Chi tiết sản phẩm
                  </span>
                  <span
                    className={`cursor-pointer ${
                      activeTab === "sizeChart" ? "border-b-2 border-black" : ""
                    }`}
                    onClick={() => setActiveTabAndToggle("sizeChart")}
                  >
                    Bảng Size
                  </span>
                </p>
              </div>
              <div className="mt-4">
                {activeTab === "description" ? (
                  <div>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: isDescriptionTruncated
                          ? `${product?.p_desc.slice(0, 500)}...`
                          : product?.p_desc,
                      }}
                    ></p>
                    {product?.p_desc.length > 500 && (
                      <div className="flex justify-center">
                        <button
                          className="text-gray-500 uppercase cursor-pointer"
                          onClick={toggleDescription}
                        >
                          {isDescriptionTruncated ? "Xem thêm" : "Thu gọn"}
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <img src={sizeImg} alt="" />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetail;
