import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Game from "./pages/Game";
import GameOver from "./pages/GameOver";
import HighScores from "./pages/HighScores";
import Home from "./pages/Home";

import Navbar from "./components/Navbar";

import Global from "./styled/Global";
import { Container } from "./styled/container";
import { Main } from "./styled/Main";

function App() {
  return (
    <Router>
      <Main>
        <Global />
        <Container>
          <Navbar />
          <Switch>
            <Route path="/game" component={Game} />
            <Route path="/highscores" component={HighScores} />
            <Route path="/gameover" component={GameOver} />
            <Route path="/" component={Home} />
          </Switch>
        </Container>
      </Main>
    </Router>
  );
}

export default App;
