import { createGlobalStyle } from "styled-components";
import { IDefaultTheme } from "./theme";

const GlobalStyle = createGlobalStyle<{ theme: IDefaultTheme }>`

* {
  margin: 0; 
  padding: 0; 
}

  body {
    background: ${(props) =>
      `linear-gradient(45deg, ${props.theme.bgGradOne}, ${props.theme.bgGradTwo})`};
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
`;

export default GlobalStyle;
