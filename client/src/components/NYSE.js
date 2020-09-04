import React from "react";
import styled from "styled-components";
import { nyseList } from "../assets/data";
import Header from "./Header";
import { format, subDays, differenceInCalendarDays, addDays } from "date-fns";

const NYSE = () => {
  const [stockSymbol, setStockSymbol] = React.useState("");
  const [activeSocial, setActiveSocial] = React.useState("");
  const [validSymbol, setValidSymbol] = React.useState(true);

  const [stockPriceArray, setStockPriceArray] = React.useState([]);
  const [recommendation, setRecommendation] = React.useState("");

  const [showResults, setShowResults] = React.useState(false);

  const endDate = new Date();
  const startDate = subDays(endDate, 9);

  const socialMediaCountGenerator = (symbol, social) => {
    return Math.round(Math.random() * 5000);
  };

  const stockPriceGenerator = (stockSymbol, startDate, endDate) => {
    for (let i = 0; i <= differenceInCalendarDays(endDate, startDate); i++) {
      stockPriceArray.push({
        date: format(addDays(startDate, i), "MMM d yyyy"),
        price: Math.round(Math.random() * 50000) / 100,
        socialMediaCount: socialMediaCountGenerator(stockSymbol, activeSocial),
      });
    }
  };

  let stockPriceArrayInOrder = [];

  if (stockPriceArray.length > 0) {
    stockPriceArrayInOrder = stockPriceArray.sort(function compare(a, b) {
      const timeA = new Date(a.date);
      const timeB = new Date(b.date);
      return timeA - timeB;
    });
  }

  React.useEffect(() => {
    setStockPriceArray([]);
    setShowResults(false);
  }, [stockSymbol]);

  React.useEffect(() => {
    setStockPriceArray([]);
    setShowResults(false);
  }, [activeSocial]);

  const showRecommendation = async () => {
    if (!nyseList.includes(stockSymbol.toUpperCase())) {
      setValidSymbol(false);
    } else {
      setValidSymbol(true);
      await stockPriceGenerator(stockSymbol, startDate, endDate);
      recommendationAlgorithm(stockPriceArray);
    }
  };

  const recommendationAlgorithm = (stockPriceArray) => {
    setShowResults(true);
    const stockStartPrice = stockPriceArray.find(
      (entry) => entry.date === format(startDate, "MMM d yyyy")
    ).price;
    const stockEndPrice = stockPriceArray.find(
      (entry) => entry.date === format(endDate, "MMM d yyyy")
    ).price;

    const stockLowPrice = stockPriceArray.sort((a, b) =>
      a.price > b.price ? 1 : b.price > a.price ? -1 : 0
    )[0].price;

    const stockHighPrice = stockPriceArray.sort((a, b) =>
      a.price > b.price ? -1 : b.price > a.price ? 1 : 0
    )[0].price;

    const tenDayChange = (stockEndPrice - stockStartPrice) / stockStartPrice;
    const tenDayFluctuation =
      (stockHighPrice - stockLowPrice) / stockStartPrice;

    let totalSocialMentions = 0;
    stockPriceArray.forEach((entry) => {
      totalSocialMentions = totalSocialMentions + entry.socialMediaCount;
    });

    if (
      tenDayChange > 0.1 &&
      tenDayFluctuation < 2 &&
      totalSocialMentions > 20000
    ) {
      setRecommendation("BUY");
    } else if (
      tenDayChange > 0 &&
      tenDayFluctuation < 3 &&
      totalSocialMentions > 10000
    ) {
      setRecommendation("HOLD");
    } else {
      setRecommendation("SELL");
    }
  };

  return (
    <>
      {" "}
      <Header />
      <PageDiv>
        <InputSection>
          <TitleDiv>
            <PageTitle>NYSE Recommendations</PageTitle>
            <PageTitle2>based on price and social media performance</PageTitle2>
          </TitleDiv>
          <InputDiv>
            <SymbolDiv>
              <InputLabel htmlFor="stockSymbol">
                Please enter the NYSE Stock Symbol here:
              </InputLabel>
              <SymbolInput
                type="text"
                name="stockSymbol"
                id="stockSymbol"
                value={stockSymbol}
                onChange={(ev) => setStockSymbol(ev.target.value)}
                required
              />
            </SymbolDiv>
            {!validSymbol && (
              <NotFound>
                We can't find that symbol on the NYSE! Please try again.
              </NotFound>
            )}
            <DateDiv>
              View data from {format(new Date(startDate), "MMM d yyyy")} to{" "}
              {format(new Date(endDate), "MMM d yyyy")}
            </DateDiv>
            <SymbolDiv>
              <InputLabel htmlFor="social">
                Please select a Social Network
              </InputLabel>
              <SocialSelect
                onChange={(ev) => setActiveSocial(ev.target.value)}
                defaultValue={activeSocial}
                id="social"
                name="social"
                placeholder="social"
                required
              >
                <option id="default-option" value="default-option">
                  Select below
                </option>
                <option value="facebook">Facebook</option>
                <option value="instagram">Instagram</option>
                <option value="linkedIn">LinkedIn</option>
                <option value="twitter">Twitter</option>
              </SocialSelect>
            </SymbolDiv>

            <RecoButton
              type="submit"
              onClick={(ev) => {
                ev.preventDefault();
                showRecommendation();
              }}
            >
              SHOW RECOMMENDATION
            </RecoButton>
          </InputDiv>
        </InputSection>
        {showResults && (
          <ResultsSection>
            {/* <Recommendation
            stockPriceArray={stockPriceArray}
            socialMediaArray={socialMediaArray}
          /> */}
            <ResultsTable>
              <ResultsTableBody>
                <ResultsTR>
                  <ResultsTH>Date</ResultsTH>
                  <ResultsTH>
                    {activeSocial.charAt(0).toUpperCase() +
                      activeSocial.slice(1)}{" "}
                    Mentions
                  </ResultsTH>
                  <ResultsTH>Stock Price</ResultsTH>
                </ResultsTR>
                {stockPriceArrayInOrder.map((entry, index) => {
                  return (
                    <ResultsTR key={index}>
                      <ResultsTD>{entry.date}</ResultsTD>
                      <ResultsTD>{entry.socialMediaCount}</ResultsTD>
                      <ResultsTD>$ {entry.price}</ResultsTD>
                    </ResultsTR>
                  );
                })}
              </ResultsTableBody>
            </ResultsTable>
            <RecommendationResult>
              {recommendation.length > 0 && (
                <div>Recommendation: {recommendation}!</div>
              )}
            </RecommendationResult>
          </ResultsSection>
        )}
      </PageDiv>
    </>
  );
};

const DateDiv = styled.div`
  padding: 10px;
`;

const InputDiv = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputLabel = styled.label`
  padding: 10px;
`;
const InputSection = styled.div`
  border: 1px solid var(--lavender);
  border-radius: 20px;
  padding: 20px;
  margin: 10px 0;
  box-shadow: 2px 2px 5px 2px var(--mint-green);
`;

const NotFound = styled.div`
  color: red;
  padding: 5px;
`;

const PageDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PageTitle = styled.h2`
  margin-bottom: 10px;
  text-align: center;
`;

const PageTitle2 = styled.h3`
  text-align: center;
`;

const RecoButton = styled.button`
  margin-top: 10px;
  padding: 10px;
  background-color: var(--forest-green);
  color: white;
  border: none;
  outline: none;
  border-radius: 5px;
  &:hover {
    background-color: var(--mint-green);
    color: var(--forest-green);
    cursor: pointer;
    transform: scale(1.05);
  }
  &:focus {
    border: 1px solid var(--lavender);
    background-color: var(--mint-green);
    color: var(--forest-green);
  }
`;

const RecommendationResult = styled.h3`
  margin-top: 20px;
  padding: 10px;
  background-color: var(--forest-green);
  color: white;
  border-radius: 5px;
  text-align: center;
`;

const ResultsSection = styled.div`
  border: 1px solid var(--lavender);
  border-radius: 20px;
  padding: 20px;
  margin: 10px 0;
  box-shadow: 2px 2px 5px 2px var(--mint-green);
`;

const ResultsTable = styled.table`
  border: 1px solid black;
`;

const ResultsTableBody = styled.tbody``;
const ResultsTR = styled.tr`
  padding: 5px;
  border: 1px solid black;
  text-align: center;
`;

const ResultsTH = styled.th`
  padding: 5px;
  border: 1px solid black;
  background-color: var(--mint-green);
`;

const ResultsTD = styled.td`
  padding: 5px;
  border: 1px solid black;
  text-align: center;
`;

const SocialSelect = styled.select`
  font-family: "Spartan";
  padding: 5px;
`;

const SymbolDiv = styled.div`
  padding: 10px;
`;

const SymbolInput = styled.input`
  width: 50px;
`;

const TitleDiv = styled.div`
  padding: 10px;
  background-color: var(--mint-green);
  border-radius: 5px;
  margin-bottom: 10px;
`;

export default NYSE;
