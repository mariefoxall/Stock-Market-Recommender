import React from "react";
import { tsxList } from "../assets/data";
import StockRecommender from "./StockRecommender";

const TSX = () => {
  return <StockRecommender symbolsList={tsxList} name={"TSX"} />;
};

export default TSX;
