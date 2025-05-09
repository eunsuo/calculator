import React, { useState } from "react";
import { overseasMarkets } from "../data/mallFeeList";

const OverseasCalculator = () => {
  const [profit, setProfit] = useState("0");
  const [profitRate, setProfitRate] = useState("0");
  const [usdRate, setUsdRate] = useState("1300");
  const [cnyRate, setCnyRate] = useState("180");
  const [jpyRate, setJpyRate] = useState("9.1");

  const parsedProfit = parseFloat(profit) || 0;
  const parsedRate = parseFloat(profitRate) / 100 || 0;
  const parsedUsd = parseFloat(usdRate) || 0;
  const parsedCny = parseFloat(cnyRate) || 0;
  const parsedJpy = parseFloat(jpyRate) || 0;

  const calculateSalePrice = (feeRate) => {
    const denominator = 1 - feeRate - parsedRate;
    return denominator > 0 ? parsedProfit / denominator : null;
  };

  return (
    <div className="calc-overseas">
      <h2>해외 판매가 계산기</h2>

      <div className="calc-input-wrap">
        <div className="calc-input-group">
          <label htmlFor="profit">원가 (₩)</label>
          <input
            id="profit"
            type="number"
            value={profit}
            onChange={(e) => setProfit(e.target.value)}
          />
        </div>
        <div className="calc-input-group">
          <label htmlFor="profitRate">희망 순이익률 (%)</label>
          <input
            id="profitRate"
            type="number"
            value={profitRate}
            onChange={(e) => setProfitRate(e.target.value)}
          />
        </div>
      </div>

      <div className="calc-input-wrap">
        <div className="calc-input-group">
          <label htmlFor="usdRate">USD 환율 (₩/달러)</label>
          <input
            id="usdRate"
            type="number"
            value={usdRate}
            onChange={(e) => setUsdRate(e.target.value)}
          />
        </div>
        <div className="calc-input-group">
          <label htmlFor="cnyRate">CNY 환율 (₩/위안)</label>
          <input
            id="cnyRate"
            type="number"
            value={cnyRate}
            onChange={(e) => setCnyRate(e.target.value)}
          />
        </div>
        <div className="calc-input-group">
          <label htmlFor="jpyRate">JPY 환율 (₩/엔)</label>
          <input
            id="jpyRate"
            type="number"
            value={jpyRate}
            onChange={(e) => setJpyRate(e.target.value)}
          />
        </div>
      </div>

      <div className="calc-content-wrapper">
        <div className="calc-left-table">
          <table className="calc-table">
            <thead>
              <tr>
                <th>쇼핑몰</th>
                <th>수수료율</th>
                <th>희망 순이익률</th>
                <th>계산된 판매가</th>
              </tr>
            </thead>
            <tbody>
              {overseasMarkets.map((market) => {
                const salePrice = calculateSalePrice(market.feeRate);
                return (
                  <tr key={market.name}>
                    <td>{market.name}</td>
                    <td>{(market.feeRate * 100).toFixed(1)}%</td>
                    <td>{(parsedRate * 100).toFixed(1)}%</td>
                    <td>{salePrice ? `${Math.round(salePrice).toLocaleString()}원` : "불가능"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="calc-right-table">
          <table className="calc-table">
            <thead>
              <tr>
                <th>쇼핑몰</th>
                <th>USD</th>
                <th>CNY</th>
                <th>JPY</th>
              </tr>
            </thead>
            <tbody>
              {overseasMarkets.map((market) => {
                const salePrice = calculateSalePrice(market.feeRate);
                return (
                  <tr key={market.name}>
                    <td>{market.name}</td>
                    <td>{parsedUsd > 0 && salePrice ? `$${(salePrice / parsedUsd).toFixed(2)}` : "-"}</td>
                    <td>{parsedCny > 0 && salePrice ? `¥${(salePrice / parsedCny).toFixed(2)}` : "-"}</td>
                    <td>{parsedJpy > 0 && salePrice ? `¥${(salePrice / parsedJpy).toFixed(2)}` : "-"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OverseasCalculator;
