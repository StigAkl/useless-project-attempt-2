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
import Login from './pages/Login';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebase/config';
import { getAuth } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs, updateDoc } from "firebase/firestore";
import { addHoursAndMinutse, shouldAutoStop } from './helpers/utils';

const StyledContentDiv = styled.div`
  margin-top: 10%;
  text-align: center;
`;

initializeApp(firebaseConfig);

const App = () => {

  const auth = getAuth();
  const firestore = getFirestore();

  const [loading, setLoading] = useState<boolean>(true);
  const [uid, setUid] = useState<string>("");
  const [session, setSession] = useState<Session>({
    finished: true,
    startTime: new Date(),
    uid: "",
    endTime: undefined
  });

  useEffect(() => {
    const fetchData = async (uid: string) => {
      const activeSessionQuery = query(collection(firestore, "sessions"), where("uid", "==", uid), where("finished", "==", false));
      const activeSessionSnapshot = await getDocs(activeSessionQuery);

      if (activeSessionSnapshot.docs.length === 1) {
        const sessionData = activeSessionSnapshot.docs[0].data();
        const sess = {
          endTime: undefined,
          finished: false,
          startTime: sessionData.startTime.toDate(),
          uid: uid
        };

        if (shouldAutoStop(sessionData.startTime.toDate())) {
          await updateDoc(activeSessionSnapshot.docs[0].ref, {
            endTime: addHoursAndMinutse(7, 30, sessionData.startTime.toDate()),
            finished: true
          });

          sess.finished = true;
        }
        setSession(sess);
        setLoading(false);
      } else {
        setLoading(false);
      }
    }

    auth.onAuthStateChanged(async (user) => {
      if (user) {
        await fetchData(user.uid);
        setUid(user.uid);
      } else {
        setUid("");
        setLoading(false);
      }
    })
  }, [auth, firestore]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      {uid && <NavBar uid={uid} />}
      <Container>
        <StyledContentDiv>

          {(!uid && !loading) &&
            <Login />
          }

          {(!loading && uid) && (
            <BrowserRouter>
              <Routes>
                <Route index element={<Home session={session} uid={uid} setSession={setSession} />} />
              </Routes>
            </BrowserRouter>)}
          {loading && (
            <Spinner animation="border" />
          )}
        </StyledContentDiv>
      </Container>
    </ThemeProvider>
  );
}

export default App;
