import React from "react";
import styled from "styled-components";
import CountdownTimer from "./CountdownTimer";

const TitleContainer = styled.div`
  text-align: center;
  margin-top: 2rem;
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #333;
  margin-bottom: 0.5rem; /* Decreased margin for the title */
`;

const CountdownTitle = ({ targetTime }) => {
  return (
    <TitleContainer>
      <Title>距離下一波搶購</Title>
      {targetTime && <CountdownTimer targetTime={targetTime} />}
    </TitleContainer>
  );
};

export default CountdownTitle;
