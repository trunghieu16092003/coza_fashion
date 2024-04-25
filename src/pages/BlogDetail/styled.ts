import styled from "styled-components";

export const Wrapper = styled.div`
  background-color: #f2f2f2;
`;

export const Container = styled.div`
  display: flex;
  padding-top: 80px;
`;

export const ContentRight = styled.div`
  margin-left: 65px;
  background-color: #ffffff;
  padding: 30px;
  margin-right: 90px;
  width: 900px;
`;

export const Subtitle = styled.span`
  font-size: 16px;
  background-color: #ffcc00;
  color: #231900;
  padding: 4px 15px;
  display: inline-block;
  border-radius: 0px;
  margin-bottom: 10px;
  font-weight: 600;
  font-family: "Nunito";
`;

export const Title = styled.h3`
  font-size: 36px;
  font-weight: 900;
  color: #000;
  word-break: break-word;
  margin: 0px;
  margin-bottom: 10px;
  font-family: "Monsterat";
`;

export const Notifi = styled.span`
  margin-right: 10px;
  align-items: center;
  display: inline-block;
  color: #777777;
  line-height: 1.8;
  span {
    margin-right: 5px;
  }
  font-family: "Nunito";
`;

export const Img = styled.div`
  margin-top: 35px;
  margin-bottom: 10px;

  img {
    height: auto;
    max-width: 100%;
    clear: both;
  }
`;

export const Desc = styled.p`
  line-height: 1.8;
  margin-bottom: 1rem;
  font-family: "Nunito";
  color: #4e4e4e;
  font-weight: 400;
`;

export const View = styled.span`
  color: #757575;
  font-family: "Nunito";
  span {
    display: inline-block;
    margin-right: 5px;
  }
`;

export const CommentDesc = styled.h3`
  margin: 20px 0;
  font-size: 26px;
  font-weight: 700;
  text-align: left;
  font-family: "Montserrat";
  color: #231900;
  margin-bottom: 70px;
`;

export const CommentForm = styled.form`
  border: 1px solid #e9e9e9;
  padding: 20px;
  overflow: hidden;

  .form-item {
    padding: 0px 12px;
    margin-bottom: 20px;
  }

  label {
    display: block;
    margin-bottom: 15px;
    font-size: 16px;
    font-weight: 600;
    color: #000;
    line-height: 26px;
    text-transform: capitalize;
    font-family: "Nunito";
  }

  input {
    width: 100%;
    height: 52px;
    font-size: 13px;
    background-color: #f3f5ff;
    border: 1px solid #f3f5ff;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    background-clip: padding-box;
  }

  textarea {
    width: 100%;
    background-color: #f3f5ff;
    border: 1px solid #f3f5ff;
    display: block;
    width: 100%;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    background-clip: padding-box;
  }
`;

export const User = styled.div`
  display: flex;
  div {
    flex-basis: 50%;
  }
`;

export const Button = styled.div`
  display: flex;
  justify-content: flex-end;

  button {
    background-color: #ffcc00;
    font-size: 14px;
    color: #231900;
    padding: 8px 26px;
    border: 1px solid #ffcc00;
    font-family: "Nunito";
    font-weight: 800;
    cursor: pointer;
    margin-right: 12px;
    transition: all 0.4s ease-in-out 0.1s;
    border: none;
  }

  button:hover {
    color: #ffffff;
    background: #000000;
  }
`;
