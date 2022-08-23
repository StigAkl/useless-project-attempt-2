import styled from "styled-components";
import firebaseService from "../firebase/firebaseService";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { convertMsToTime, totalWorkTime } from "../helpers/utils";
import { Session } from "../types";

const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 30px;
`;

const SummaryDiv = styled.div`
  text-align: left;
  width: 300px;
  font-size: 16px;
`;

const Heading = styled.span`
  font-weight: 600;
`;

const Item = styled.span`
  font-weight: 400;
`;

const StyledRow = styled.span`
    display: flex; 
    justify-content: space-between;
`;
const HoursSummary = () => {

  const [lastSessions, setLastSessions] = useState<Session[]>([]);

  const auth = getAuth();

  useEffect(() => {
    const getSessions = async () => {
      if (auth.currentUser) {
        setLastSessions(await firebaseService.getLastSessions(auth.currentUser.uid, 30));
      }
    }

    getSessions();
  }, [auth.currentUser, setLastSessions])


  const summary = totalWorkTime(lastSessions)

  return (
    <FlexContainer>
      <SummaryDiv>
        <StyledRow><Heading>Total worked: </Heading> <Item>{convertMsToTime(summary.totalMsWorked)}</Item></StyledRow>
        <StyledRow><Heading>Should have worked: </Heading><Item>{convertMsToTime(summary.totalMsShouldWork)}</Item></StyledRow>
        <StyledRow><Heading>Days worked: </Heading><Item>{summary.numDaysWorked}</Item></StyledRow>
      </SummaryDiv>
    </FlexContainer>
  )
}

export default HoursSummary