import React from "react";
import { Link } from "react-router-dom";

import { BiSolidRightArrow } from "react-icons/bi";
import * as Styles from "./styled";

const BlogSidebarRight = () => {
  return (
    <Styles.Container>
      <Styles.Form>
        <label htmlFor="">Search</label>
        <div>
          <input type="text" />
          <button>Search</button>
        </div>
      </Styles.Form>
      <div>
        <h1>Recent Posts</h1>
        <ul>
          <li>
            <Link>
              <BiSolidRightArrow />
              Amazing Decadent Pecan PIE Best Cake
            </Link>
          </li>
          <li>
            <Link>
              <BiSolidRightArrow />
              Amazing Decadent Pecan PIE Best Cake
            </Link>
          </li>
          <li>
            <Link>
              <BiSolidRightArrow />
              Amazing Decadent Pecan PIE Best Cake
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <h1>Recent Comment</h1>
      </div>
    </Styles.Container>
  );
};

export default BlogSidebarRight;
