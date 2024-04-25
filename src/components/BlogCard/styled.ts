import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-right: 20px;
  margin-bottom: 20px;
  width: 400px;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 0 solid rgba(0, 0, 0, 0.125);
  border-radius: 1rem;
  box-shadow: 0 20px 27px 0 rgba(0, 0, 0, 0.05);
`;

export const Img = styled.div`
  margin: 10px 10px 0 10px;
  background-color: #fff;
  width: 380px;
  height: 200px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 1rem;
  }
`;

export const Content = styled.div`
  padding: 25px;
`;

export const SubTitle = styled.p`
  margin-bottom: 10px;
  font-family: "Nunito", sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: #ffcc00;
  text-transform: uppercase;
`;

export const Title = styled.h3`
  margin-bottom: 15px;
  font-family: "Montserrat";
  color: #231900;
  font-weight: 400;
  font-size: 24px;
  text-transform: capitalize;
`;

export const Desc = styled.p`
  margin-bottom: 20px;
  font-size: 18px;
  line-height: 1.8;
  font-family: "Nunito", sans-serif;
`;

export const Author = styled.div`
  display: flex;

  img {
    color: #fff;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    border-radius: 0.75rem !important;
    height: 48px;
    width: 48px;
    transition: all 0.2s ease-in-out;
    box-shadow:
      0 0.25rem 0.375rem -0.0625rem hsla(0, 0%, 8%, 0.12),
      0 0.125rem 0.25rem -0.0625rem;
  }
`;

export const AuthorInfo = styled.div`
  padding-left: 1rem;
  font-family: "Nunito";

  p {
    line-height: 1.571;
    font-weight: 700;
    font-size: 1rem;
    color: #231900;
    text-transform: capitalize;
  }

  span {
    font-size: 15px;
  }
`;
