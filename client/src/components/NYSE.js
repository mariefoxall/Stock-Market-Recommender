import React from "react";
import { nyseList } from "../assets/data";
import StockRecommender from "./StockRecommender";

const NYSE = () => {
  //check against list of stock symbols on the NYSE
  return <StockRecommender symbolsList={nyseList} name={"NYSE"} />;
};

export default NYSE;
