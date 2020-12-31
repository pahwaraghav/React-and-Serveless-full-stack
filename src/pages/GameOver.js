import React, { useEffect, useState } from "react";
import { useScore } from "../context/ScoreContext";
import { StyledLink } from "../styled/Navbar";
import { StyledCharacter } from "../styled/Game";
import { StyledTitle } from "../styled/Common";
import { useAuth0 } from "../auth";

export default function GameOver({ history }) {
  const [score] = useScore();
  const [scoreMessage, setScoreMessage] = useState("");
  const { getTokenSilently, isAuthenticated } = useAuth0();

  if (score === -1) {
    history.push("/");
  }

  useEffect(() => {
    const saveHighScore = async () => {
      try {
        const token = await getTokenSilently();
        const options = {
          method: "POST",
          body: JSON.stringify({ name: "Ragh", score }),
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const res = await fetch("/.netlify/functions/saveHighScore", options);
        const data = await res.json();
        if (data.id) {
          setScoreMessage("Congrats! You got a score in Top 10!");
        } else {
          setScoreMessage(
            "Sorry, you weren't able to get a score in top 10. Better luck next time!"
          );
        }
      } catch (err) {
        console.error(err);
      }
    };
    if (isAuthenticated) {
      saveHighScore();
    }
  }, [getTokenSilently, isAuthenticated, score]);
  return (
    <div>
      <StyledTitle>Game Over</StyledTitle>
      <h2>{scoreMessage}</h2>
      {!isAuthenticated && (
        <h2>You should login or signup to compete for high scores.</h2>
      )}

      <StyledCharacter>{score}</StyledCharacter>
      <div>
        <StyledLink to="/">Go Home</StyledLink>
      </div>
      <div>
        <StyledLink to="/game">Play Again</StyledLink>
      </div>
    </div>
  );
}
