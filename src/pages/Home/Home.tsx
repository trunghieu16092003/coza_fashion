import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import Product from "../../components/Product";
import { productServices } from "../../services";
import burger from "../../assets/burger.png";
import path from "../../constants/path";
import Slider from "../../components/Slider";
import Banner from "../../components/Banner";
import FeartureProducts from "../../components/FeatureProducts";
import Header from "../../components/Header";

const Home = () => {
  return (
    <div>
      <Slider />
      <Banner />
      <FeartureProducts />
      <section className="pt-20 container mx-auto px-12 pb-[50px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <h1>Our blog</h1>
      </section>
    </div>
  );
};

export default Home;
