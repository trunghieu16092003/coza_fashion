import React from "react";

import BlogSidebarRight from "../../components/BlogSidebarRight";
import * as Styles from "./styled";
import { FaRegCalendarAlt, FaComment } from "react-icons/fa";
import { BsBarChartFill } from "react-icons/bs";
import jpg1 from "../../assets/jpg1.jpg";

const BlogDetail = () => {
  return (
    <Styles.Wrapper>
      <Styles.Container>
        <Styles.ContentRight>
          <div>
            <Styles.Subtitle>Subtitle</Styles.Subtitle>
            <Styles.Title>Amazing Decadent Pecan PIE Best Cake</Styles.Title>
            <div>
              <Styles.Notifi>
                <span>
                  <FaRegCalendarAlt style={{ color: "#FFCC00" }} />
                </span>
                March 22, 2021
              </Styles.Notifi>
              <Styles.Notifi>
                <span>
                  <FaComment style={{ color: "#FFCC00" }} />
                </span>
                No comment
              </Styles.Notifi>
            </div>
            <Styles.Img>
              <img src={jpg1} alt="" />
            </Styles.Img>
            <Styles.Desc>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
              nostrum est, atque, exercitationem delectus quo eveniet eaque, eos
              doloremque ab veritatis nam ut obcaecati error eligendi commodi!
              Rerum autem cum nulla quod aliquam, harum delectus, debitis omnis
              dolorem numquam expedita sequi facere quibusdam minus earum ab quo
              deserunt? Laboriosam amet modi totam consequatur, ipsa debitis
              quod, iusto obcaecati possimus dolor accusantium expedita cum
              rerum officiis labore nesciunt tempore ea dolores voluptas vitae!
              Laborum est tempore porro temporibus? Modi, esse, laboriosam quo
              illum sunt quia magnam expedita deserunt perferendis molestias
              quaerat nihil dolore iste ab eos obcaecati aperiam ratione?
              Asperiores vero sunt cumque quos consequuntur ut neque inventore.
              Adipisci ea corporis sit numquam facere suscipit, eveniet, vero
              quia eaque nisi consequatur autem assumenda enim dolorem nemo,
              temporibus molestiae quod rem provident aliquam nobis tenetur
              architecto non. Architecto quo veritatis modi facilis veniam
              voluptates impedit aut iste odit dolores, cumque adipisci delectus
              placeat eligendi non, ipsam maxime quidem quis! Possimus illum
              eius quas itaque, architecto nemo quo quod libero, placeat dolores
              nostrum nobis? Dolor ex suscipit, veniam quidem maiores doloribus
              quo natus repellendus accusantium fugiat. Reiciendis consequatur
              vel vero commodi odit minus a debitis quis iste sint officiis
              atque asperiores totam quo, nam sequi! Est velit consequatur,
              asperiores quam veniam odit tempora sunt totam, quas eius
              voluptatibus! Fugiat adipisci sequi quas quibusdam illum minima
              numquam tenetur veniam ipsa molestias, obcaecati nesciunt iure
              vitae laboriosam magni pariatur harum nulla deleniti voluptatem
              architecto atque. Repellat quas ea ex magni temporibus assumenda
              suscipit asperiores officia ratione autem? Expedita magnam quae
              exercitationem nobis veniam, dicta maiores asperiores ex,
              molestias dolorem, atque cumque minima voluptate. Reprehenderit
              tenetur quidem quis iste, delectus quod numquam esse a corporis
              minus sed! Doloribus fugit commodi, at quos repellendus vero
              corporis sint, iste debitis exercitationem consectetur minima
              provident, ab laborum animi. Nam libero aspernatur, nesciunt ipsam
              voluptatibus vero, quasi fugiat laudantium perspiciatis veritatis
              quo mollitia culpa nobis iure eveniet earum laborum. Id velit aut
              reiciendis iure omnis, expedita tempore consequuntur enim quas
              doloribus eveniet incidunt repellendus perferendis quasi cumque!
              Fugiat aspernatur cupiditate, dolor totam quos voluptatum quis
              neque error similique et a aperiam molestiae tempore architecto
              rerum sed quas! Dolorum quos quibusdam ea at, omnis officiis
              veritatis magnam vero? Deleniti consequuntur officiis doloribus,
              dolore laboriosam nesciunt eum assumenda blanditiis earum nisi
              veritatis cumque possimus provident ipsa tenetur excepturi, neque
              ipsum. Doloremque, quam! Non aut dolores quibusdam quas quam
              placeat earum! Culpa, vel!
            </Styles.Desc>
            <Styles.View>
              <span>
                <BsBarChartFill style={{ color: "#757575" }} />
              </span>
              Post Views: 158
            </Styles.View>
          </div>
          <div>
            <Styles.CommentDesc>Leave your comment</Styles.CommentDesc>
            <Styles.CommentForm>
              <Styles.User>
                <div className="form-item">
                  <label htmlFor="name">Your Name*</label>
                  <input type="text" />
                </div>
                <div className="form-item">
                  <label htmlFor="name">Your Email*</label>
                  <input type="text" />
                </div>
              </Styles.User>
              <div className="form-item">
                <label htmlFor="name">Your Number*</label>
                <input type="text" />
              </div>
              <div className="form-item">
                <label htmlFor="name">Your Comment</label>
                <textarea name="" id="" cols={30} rows={10}></textarea>
              </div>
              <Styles.Button>
                <button>Post Comment</button>
              </Styles.Button>
            </Styles.CommentForm>
          </div>
        </Styles.ContentRight>
        <BlogSidebarRight />
      </Styles.Container>
    </Styles.Wrapper>
  );
};

export default BlogDetail;
