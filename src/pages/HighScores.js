import React, { useState, useEffect } from "react";

import { ScoresList, ScoreLi } from "../styled/HighScores";

export default function HighScores() {
  const [scores, setHighScores] = useState([]);
  useEffect(() => {
    const loadHighScores = async () => {
      try {
        const res = await fetch("/.netlify/functions/getHighScores");
        const scores = await res.json();
        setHighScores(scores);
      } catch (err) {
        console.error(err);
      }
    };
    loadHighScores();
  }, []);
  return (
    <div>
      <h1>HIgh Scores</h1>
      <ScoresList>
        {scores.map((score) => (
          <ScoreLi key={score.id}>
            {score.fields.name} - {score.fields.score}
          </ScoreLi>
        ))}
      </ScoresList>
    </div>
  );
}
