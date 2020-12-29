import React from "react";
import CTA from "../styled/CTA";
import { Accent, StyledTitle } from "../styled/Common";

export default function Home() {
  return (
    <div>
      <h1>
        <StyledTitle>Ready to type?</StyledTitle>
        <CTA to="/game">
          Click or type <Accent>'s'</Accent> to start playing!
        </CTA>
      </h1>
    </div>
  );
}
