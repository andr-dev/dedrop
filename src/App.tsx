import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from "styled-components"

import { AppRouter } from './AppRouter';
import theme from "./styles/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
