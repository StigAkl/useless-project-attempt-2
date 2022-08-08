import { createGlobalStyle } from "styled-components";
import { IDefaultTheme } from "./theme";

const GlobalStyle = createGlobalStyle<{ theme: IDefaultTheme }>`

* {
  margin: 0; 
  padding: 0; 
}

  body {
    background-color: ${(props) => props.theme.backgroundColor};
  }
`;

export default GlobalStyle;
