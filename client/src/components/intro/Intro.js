import React from "react";
import "./intro.css";

const Intro = () => {
  return (
    <>
      <div className="i-left-wrapper">
        <h2 className="i-intro">Hello, My name is</h2>
        <h1 className="i-name">
          LEE PIING CHE <span className="ch-name">李秉哲</span>
        </h1>
        <div className="i-title">
          <div className="i-title-wrapper">
            <div className="i-title-item">攝影師</div>
            <div className="i-title-item">平面設計師</div>
            <div className="i-title-item">動態錄影師</div>
          </div>
        </div>
        <p className="i-desc">
          擁有4年平面設計、攝影等工作經驗，曾在DV籃球部落擔任設計總監，兼職許多攝影的工作，如:婚宴、動態錄影、網紅業配、空間攝影、商品攝影等工作經歷。
        </p>
      </div>
    </>
  );
};

export default Intro;
