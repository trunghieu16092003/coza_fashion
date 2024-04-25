import styled from "styled-components";

export const Wrapper = styled.div`
  width: 200px;
  height: 100%;
  padding: 30px 0px;
  background-color: #ffcc00;
`;

export const Img = styled.img`
  width: 100%;
`;

export const ListItem = styled.li`
  transition: all 0.5s ease-out;
  .list-item {
    display: block;
    width: 100%;
    padding: 10px;
    text-decoration: none;
    font-size: 20px;
    font-weight: 900;
    color: #000000;
  }

  &:hover .list-item {
    background-color: #000000;
    color: #ffffff;
  }
`;
