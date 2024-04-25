import styled from "styled-components";

export const Container = styled.div`
  background-color: #ffffff;
  padding: 30px 40px;
`;

export const Form = styled.form`
  label {
    display: block;
    color: #20292f;
    font-weight: 700;
    font-size: 20px;
  }

  input {
    border: 1px solid #949494;
    flex-grow: 1;
    margin-left: 0;
    margin-right: 0;
    width: 17rem;
    height: 3rem;
    padding: 8px;
    text-decoration: unset !important;
  }

  button {
    display: inline-block;
    margin-left: 10px;
    font-family: inherit;
  }
`;
