import React, { useState, useEffect } from "react";
import { StyledTitle } from "../styled/Common";
import { ScoresList, ScoreLi } from "../styled/HighScores";

export default function HighScores() {
  const [scores, setHighScores] = useState([]);
  useEffect(() => {
    const loadHighScores = async () => {
      try {
        const res = await fetch("/.netlify/functions/getHighScores");
        const resJSON = await res.json();
        setHighScores(resJSON);
      } catch (err) {
        console.error(err);
      }
    };
    loadHighScores();
  }, []);
  return (
    <div>
      <StyledTitle>High Scores</StyledTitle>
      <ScoresList>
        {scores.map((score, index) => (
          <ScoreLi key={score.id}>
            {index + 1}. {score.fields.name} - {score.fields.score}
          </ScoreLi>
        ))}
      </ScoresList>
    </div>
  );
}
