import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./scenes/index";
import { theme, ThemeProvider } from "src/client/theme/index";
import registerServiceWorker from "./registerServiceWorker";
import "./styles";
import { EN, StringsContext } from "./strings/index";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    {/* TODO: should be filled dinamically based on browser language */}
    <StringsContext.Provider value={{ strings: EN }}>
      <App />
    </StringsContext.Provider>
  </ThemeProvider>,
  document.getElementById("root") as HTMLElement
);

registerServiceWorker();
