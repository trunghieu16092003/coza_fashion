import React, { useEffect, useState } from "react";

import InputField from "../../components/InputField";
import useCheckoutForm from "../../hooks/useCheckoutForm";
import { checkoutServices } from "../../services";
import { getProvince, getDistrict, getWard } from "../../services/address";
import { useAppDispatch } from "../../redux/hooks";
import { addToOrder } from "../../redux/order/asyncAction";
import local from "../../constants/local";
import { useNavigate } from "react-router-dom";
import path from "../../constants/path";

const Checkout = () => {
  const cartItems: any = localStorage.getItem(local.carts);
  const checkouts = JSON.parse(cartItems);

  const [provinces, setProvinces] = useState([]);
  const [provinceId, setProvinceId] = useState<string>("");

  const [districts, setDistricts] = useState([]);
  const [districtId, setDistrictId] = useState<string>("");

  const [wards, setWards] = useState([]);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const totalAmount = checkouts.reduce((total: number, checkout: any) => {
    const itemPrice =
      checkout.p_price - (checkout.p_price * checkout.discount) / 100;
    const itemTotalPrice = itemPrice * checkout.quantity;
    return total + itemTotalPrice;
  }, 0);

  const { register, handleSubmit, formState } = useCheckoutForm();
  const onSubmit = async (data: any) => {
    if (data.payment_method === "momo") {
      handleMomo();
    }
    const request = { ...data, checkouts, total_all: totalAmount };
    dispatch(addToOrder(request));
    localStorage.removeItem(local.carts);
    navigate(path.THANKYOU);
  };

  const handleMomo = async () => {
    const res = await checkoutServices.momoPayment({ total_all: totalAmount });
    window.location.href = res.url[0];
  };

  const fetchProvince = async () => {
    const res: any = await getProvince();
    setProvinces(res.data.results);
  };

  const handleChangeProvince = (provinceName: string) => {
    const selectedProvince: any = provinces.find(
      (province: any) => province.province_name === provinceName
    );
    if (selectedProvince) {
      setProvinceId(selectedProvince.province_id);
    }
  };

  const fetchDistrict = async () => {
    const res: any = await getDistrict(provinceId);
    setDistricts(res.data.results);
  };

  const handleChangeDistrict = (districtName: string) => {
    const selectedDistrict: any = districts.find(
      (district: any) => district.district_name === districtName
    );
    if (selectedDistrict) {
      setDistrictId(selectedDistrict.district_id);
    }
  };

  const fetchWard = async () => {
    const res: any = await getWard(districtId);
    setWards(res.data.results);
  };

  useEffect(() => {
    fetchProvince();
  }, []);

  useEffect(() => {
    if (provinceId) {
      fetchDistrict();
    }
  }, [provinceId]);

  useEffect(() => {
    if (districtId) {
      fetchWard();
    }
  }, [districtId]);
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-8 mt-6">Checkout</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <h2 className="text-lg font-semibold px-6 py-4 border-b">
            Thông tin đơn hàng
          </h2>
          <div className="p-6">
            {checkouts.map((checkout: any, index: number) => (
              <div className="flex flex-col space-y-4">
                <div key={index} className="flex items-center border-b pb-2">
                  <div className="w-1/4">
                    <img
                      src="https://via.placeholder.com/150"
                      alt="Product"
                      className="w-full"
                    />
                  </div>
                  <div className="flex-grow px-4">
                    <h3 className="font-semibold">{checkout?.p_name}</h3>
                    <p className="text-gray-600">
                      Giá:
                      {checkout.p_price -
                        (checkout.p_price * checkout.discount) / 100}
                      VND
                    </p>
                    <p className="text-gray-600">
                      Số lượng: {checkout.quantity}
                    </p>
                  </div>
                  <div className="w-1/4 text-right">
                    <p className="font-semibold">
                      {+(
                        checkout.p_price -
                        (checkout.p_price * checkout.discount) / 100
                      ) * +checkout.quantity}
                      VND
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Tổng cộng</h3>
              <p className="text-gray-600">Tổng tiền: {totalAmount} VND</p>
            </div>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <h2 className="text-lg font-semibold px-6 py-4 border-b">
            Thông tin thanh toán
          </h2>
          <div className="p-6">
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <InputField
                label="Tên người nhận"
                type="text"
                id="recipient_name"
                errors={formState.errors.name?.message}
                register={register("name")}
              />

              <InputField
                label="Số điện thoại"
                type="text"
                id="phone"
                errors={formState.errors.phone?.message}
                register={register("phone")}
              />

              <div className="flex flex-col">
                <label htmlFor="">Tỉnh</label>
                <select
                  {...register("province")}
                  id="province"
                  className="mt-1 p-2 border border-gray-300 rounded-md"
                  onChange={(e: any) => handleChangeProvince(e.target.value)}
                >
                  <option value="">---Chọn tỉnh---</option>
                  {provinces.map((province: any, index) => (
                    <option key={index} value={province.province_name}>
                      {province.province_name}
                    </option>
                  ))}
                </select>
                <span className="text-red-600 block">
                  {formState.errors.province?.message}
                </span>
              </div>

              <div className="flex flex-col">
                <label htmlFor="district">Thành phố, Quận, Huyện</label>
                <select
                  {...register("district")}
                  id="district"
                  className="mt-1 p-2 border border-gray-300 rounded-md"
                  onChange={(e: any) => handleChangeDistrict(e.target.value)}
                >
                  <option value="">---Chọn Thành phố, Quận, Huyện---</option>
                  {districts.map((district: any, index) => (
                    <option key={index} value={district.district_name}>
                      {district.district_name}
                    </option>
                  ))}
                </select>
                <span className="text-red-600 block">
                  {formState.errors.district?.message}
                </span>
              </div>

              <div className="flex flex-col">
                <label htmlFor="ward">Xã, phường, thị trấn</label>
                <select
                  {...register("ward")}
                  id="district"
                  className="mt-1 p-2 border border-gray-300 rounded-md"
                >
                  <option value="">---Chọn Xã, phường, thị trấn---</option>
                  {wards.map((ward: any, index) => (
                    <option key={index} value={ward.ward_name}>
                      {ward.ward_name}
                    </option>
                  ))}
                </select>
                <span className="text-red-600 block">
                  {formState.errors.ward?.message}
                </span>
              </div>

              <div className="flex flex-col">
                <InputField
                  label="Địa chỉ"
                  type="text"
                  id="address"
                  errors={formState.errors.address?.message}
                  register={register("address")}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="email" className="font-semibold">
                  Phương thức thanh toán
                </label>
                <div>
                  <input
                    type="radio"
                    id="cash"
                    {...register("payment_method")}
                    value="tiền mặt"
                  />
                  <label htmlFor="cash">Thanh toán khi nhận hàng</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="momo"
                    {...register("payment_method")}
                    value="momo"
                  />
                  <label htmlFor="momo">Momo</label>
                </div>
                <span className="text-red-600 block">
                  {formState.errors.payment_method?.message}
                </span>
              </div>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Hoàn tất đơn hàng
              </button>
            </form>
            {/* <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <InputField
                  label="Số lượng hàng tồn kho"
                  type="text"
                  id="quantity_buy"
                  errors={formState.errors.quantity_buy?.message}
                  register={register("quantity_buy")}
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Thêm
                </button>
              </div>
            </form> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
