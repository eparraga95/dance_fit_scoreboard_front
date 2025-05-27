import styled from "styled-components";

export const ScoreCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.background};
  margin-bottom: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem;
`;

export const ScoreInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;

  p {
    font-size: 0.9rem;
    color: #666;
    margin: 0;
  }
`;

export const ScoreDataContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const ScoreGradeAndPlating = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  gap: 0.3rem;
  padding: 0.4rem;
`;

export const ScoreDetailedContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  padding: 0.4rem;
`;

export const ScoreDetailDiscription = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0.4rem;
`;

export const ScoreDetailValues = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 0.4rem;
`;

export const ScoreValue = styled.p`
  color: ${(props) => props.theme.colors.text};
  font-weight: bold;
`;

export const Perfects = styled.p`
  color: #0cf;
  font-weight: bold;
`;

export const Greats = styled.p`
  color: #0f0;
  font-weight: bold;
`;

export const Goods = styled.p`
  color: #ee0;
  font-weight: bold;
`;

export const Bads = styled.p`
  color: #f9f;
  font-weight: bold;
`;

export const Misses = styled.p`
  color: #f66;
  font-weight: bold;
`;

export const MaxCombo = styled.p`
  color: ${(props) => props.theme.colors.text};
  font-weight: bold;
`;

export const ScoreGradeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 41.8px;
`;

export const ScoreGrade = styled.img`
  width: 64px;
`;

export const ScorePlate = styled.img`
  width: 96px;
`;
