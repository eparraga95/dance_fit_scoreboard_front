import { createContext, useState, useContext } from "react";
import api from "../../services/api";
import * as React from "react";

export interface IScoreContext {

}

const ScoreContext = createContext<IScoreContext>({} as IScoreContext);

export const ScoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  

  return (
    <ScoreContext.Provider
      value={{
  
      }}
    >
      {children}
    </ScoreContext.Provider>
  );
};

export const useScore = () => useContext(ScoreContext);
