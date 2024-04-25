import styled, { keyframes } from "styled-components";

export const CardContainer = styled.div`
  padding: 30px 15px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: #ffffff;
  border: 1px solid #f1f1f1;
  border-radius: 5px;
  margin-top: 30px;
  width: 300px;
`;

export const ProductImage = styled.img`
  width: 100%;
  height: auto;
  z-index: 10;
  transition: transform 0.3s ease; /* Thêm hiệu ứng phóng to */

  ${CardContainer}:hover & {
    transform: scale(1.1); /* Phóng to 110% khi hover */
  }
`;

export const Transition = styled.div`
  width: 100%;
  height: 30%;
  background: rgba(255, 204, 0, 0.1);
  position: absolute;
  top: 90px;
  left: 0;
  overflow: hidden;
  transition: background-color 0.5s ease-in-out;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    width: 0%; /* Bắt đầu với chiều rộng 0% */
    height: 100%;
    background-color: #ffcc00; /* Màu nền ban đầu */
    transition: 0.5s ease-in-out;
  }

  &::after {
    content: "";
    position: absolute;
    right: 0;
    width: 0%; /* Bắt đầu với chiều rộng 0% */
    height: 100%;
    background-color: #ffcc00; /* Màu nền ban đầu */
    transition: 0.5s ease-in-out;
  }

  ${CardContainer}:hover &::before,
  ${CardContainer}:hover &::after {
    width: 50%; /* Thay đổi chiều rộng sang 50% khi hover */
  }
`;

export const ProductName = styled.p`
  font-size: 1.25em;
  font-weight: 600;
  margin: 10px 0;
  font-family: "Montserrat";
`;

export const Price = styled.div`
  font-size: 1em;

  .original {
    font-size: 13px;
    line-height: 15px;
    color: #808080;
    text-decoration: line-through;
    font-family: "Nunito";
  }

  .discounted {
    font-size: 18px;
    line-height: 18px;
    color: #c70909;
    font-family: "Nunito";
    font-weight: 400;
  }
`;

export const ShoppingCartIcon = styled.svg`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 24px;
  height: 24px;
  cursor: pointer;
`;
