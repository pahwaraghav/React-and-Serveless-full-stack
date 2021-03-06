import React, { useState, useEffect, useCallback } from "react";
import { commonWords } from "../utils/wordsArray";
import {
  StyledGame,
  StyledScore,
  StyledTimer,
  StyledCharacter,
  StyledInput,
} from "../styled/Game";

import { Strong } from "../styled/Common";
import { useScore } from "../context/ScoreContext";

export default function Game({ history }) {
  const MAX_SECONDS = 60;
  //const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  const [currentString, setCurrentString] = useState("");
  const [score, setScore] = useScore(0);
  const [desiredString, setDesiredString] = useState("");
  const [ms, setMs] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    setRandomCharacter();
    setScore(0);
    const currentTime = new Date();
    const interval = setInterval(() => updateTime(currentTime), 1);
    return () => clearInterval(interval);
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateTime = (startTime) => {
    const endTime = new Date();
    const msPassedStr = (endTime.getTime() - startTime.getTime()).toString();
    const formattedMsString = ("0000" + msPassedStr).slice(-5);

    const updatedSeconds =
      MAX_SECONDS - parseInt(formattedMsString.substring(0, 2)) - 1;
    const updatedMs =
      1000 -
      parseInt(formattedMsString.substring(formattedMsString.length - 3));

    setSeconds(addLeadingZeros(updatedSeconds, 2));
    setMs(addLeadingZeros(updatedMs, 3));
  };

  const addLeadingZeros = (num, length) => {
    let zeros = "";
    for (let i = 0; i < length; i++) {
      zeros += "0";
    }
    return (zeros + num).slice(-length);
  };

  useEffect(() => {
    if (seconds <= -1) {
      history.push("/gameOver");
    }
  }, [seconds, ms, history]);

  const keyUpHandler = useCallback(
    (e) => {
      if (e.key === "Escape") {
        if (score > 0) {
          setScore((prevScore) => prevScore - 1);
        }
        setRandomCharacter();
        setCurrentString("");
      } else if (desiredString === currentString) {
        setScore((prevScore) => prevScore + 1);
        setRandomCharacter();
        setCurrentString("");
      }
      // } else {
      //   if (score > 0) {
      //     setScore((prevScore) => prevScore - 1);
      //   }
      // }
      console.log(currentString);
    },
    [currentString, score]
  );

  useEffect(() => {
    document.addEventListener("keyup", keyUpHandler);
    return () => {
      document.removeEventListener("keyup", keyUpHandler);
    };
  }, [keyUpHandler]);

  const setRandomCharacter = () => {
    const randomInt = Math.floor(Math.random() * commonWords.length);
    setDesiredString(commonWords[randomInt]);
  };

  const onChange = (event) => {
    setCurrentString(event.target.value.toLowerCase());
  };

  return (
    <StyledGame>
      <StyledScore>
        Score:<Strong>{score}</Strong>
      </StyledScore>
      <StyledCharacter>{desiredString}</StyledCharacter>
      <StyledTimer>
        Time:{" "}
        <StyledInput
          autoFocus
          value={currentString}
          onChange={onChange}
        ></StyledInput>
        <Strong>
          {seconds}: {ms}
        </Strong>
      </StyledTimer>
    </StyledGame>
  );
}
