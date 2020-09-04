import React from "react";
import { tsxList } from "../assets/data";
import StockRecommender from "./StockRecommender";

const TSX = () => {
  //check against list of stock symbols on the TSX

  return <StockRecommender symbolsList={tsxList} name={"TSX"} />;
};

export default TSX;
