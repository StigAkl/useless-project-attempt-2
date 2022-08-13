import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import { getAuth, signInWithPopup, GithubAuthProvider } from "firebase/auth";

const LoginDiv = styled.div`
  padding: 10px;
  margin-top: 30%;
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

  const auth: any = getAuth();

  const signInWithGithub = () => {
    setLoggingIn(true);
    signInWithPopup(auth, new GithubAuthProvider()).then(res => {
    }).catch(err => {
      console.log("Error:", err);
      setLoggingIn(false);
    })
  }

  return <>
    <LoginDiv>
      <h1>Sign in</h1>
      <div>
        <StyledButton variant="success" onClick={() => signInWithGithub()} disabled={loggingIn}>Sign in with GitHub</StyledButton>
      </div>
    </LoginDiv>
  </>
}

export default Login; 