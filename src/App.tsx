import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './styles/theme';
import GlobalStyle from './styles/globalstyle';
import Home from './pages/Home';
import Container from 'react-bootstrap/Container'
import { NavBar } from './Components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import styled from 'styled-components';
import { Session } from './types';
import { subtractHours } from './helpers/utils';

const StyledSpinnerDiv = styled.div`
  display: flex; 
  justify-content: center;
  height: 90vh;
  align-items: center;
`;


const App = () => {

  const [loading, setLoading] = useState<boolean>(true);
  const [session, setSession] = useState<Session>({
    activeSession: false,
    started: new Date(),
    userId: ""
  });

  useEffect(() => {
    setTimeout(() => {
      const dummySession: Session = {
        userId: "18941294781",
        activeSession: true,
        started: subtractHours(2, new Date())
      }

      setLoading(false);
      setSession(dummySession);
    }, 1000)
  }, [setLoading]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <NavBar />
      <Container>
        {!loading && (
          <BrowserRouter>
            <Routes>
              <Route index element={<Home session={session} setSession={setSession} />} />
            </Routes>
          </BrowserRouter>)}
        {loading && (
          <StyledSpinnerDiv>
            <Spinner animation="border" />
          </StyledSpinnerDiv>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
