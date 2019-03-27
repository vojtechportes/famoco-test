import * as React from "react";
import { AppBar } from "src/client/components/index";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Homepage from "./Homepage/index";
import Region from "./Region/index";
import EventDetail from "./Event/index";

class App extends React.Component {
  public render() {
    return (
      <>
        <Router>
          <>
            <AppBar />
            <Switch>
              <Route exact={true} path="/" component={Homepage} />
              <Route path="/region/:id/:name" component={Region} />
              <Route path="/event/:id" component={EventDetail} />
            </Switch>
          </>
        </Router>
      </>
    );
  }
}

export default App;
