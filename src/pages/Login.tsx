import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import { getAuth, signInWithPopup, GithubAuthProvider, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const LoginDiv = styled.div`
  padding: 10px;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const StyledButton = styled(Button)`
  margin-top: 10px;
  min-width: 300px;
`;

const Login = () => {
  const [loggingIn, setLoggingIn] = useState<boolean>(false);

  const navigate = useNavigate();
  const auth: any = getAuth();

  useEffect(() => {
    auth.onAuthStateChanged((user: any) => {
      if (user) {
        console.log("Logged in");
      } else {
        console.log("Not logged in");
      }
    })
  }, [auth])

  const signInWithGithub = () => {
    setLoggingIn(true);
    signInWithPopup(auth, new GithubAuthProvider()).then(res => {
      navigate("/");
    }).catch(err => {
      console.log("Error:", err);
      setLoggingIn(false);
    })
  }

  const logOut = () => {
    signOut(auth).then(() => {
      console.log("Logged out");
    }).catch(error => {
      console.log("Error signing out: ", error);
    });
  }

  return <>
    <h1>Login page</h1>
    <LoginDiv>
      <div>
        <StyledButton variant="success" onClick={() => signInWithGithub()} disabled={loggingIn}>Sign in with GitHub</StyledButton>
      </div>
      <div>
        <StyledButton variant="danger" onClick={() => logOut()} >Sign out</StyledButton>
      </div>
    </LoginDiv>
  </>
}

export default Login; 