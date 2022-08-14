import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import { getLastSessions } from '../firebase/firebaseService';
import { dateToTime, timeDiffToString } from '../helpers/utils';

const StyledContainer = styled.div`
    margin-top: 50px;
    width: 100%;
`;

const Items = styled.div`
display: flex;
align-items: stretch;
`;

const Item = styled.div`
  flex: 1; 
  flex-wrap: nowrap;
  border-bottom: 1px solid grey;
  padding: 10px;
  line-height: 1.5;
  align-items: flex-end;
`;

const StyledButton = styled(Button)`
  margin-bottom: 3px !important;
  line-height: 0;
`;

interface Props {
  uid: string;
  newSession: boolean;
}

const LastSessions = ({ uid, newSession }: Props) => {

  const [sessions, setSessions] = useState<any[]>();

  useEffect(() => {
    const getSessions = async () => {
      const sessions = await getLastSessions(uid);
      setSessions(sessions);
    }
    getSessions();
  }, [uid, newSession]);

  let sessionsList = sessions?.map((s, i) => {
    return (
      <Items key={i}>
        <Item>{s.date}</Item>
        <Item>{dateToTime(s.startTime.toDate())}</Item>
        <Item>{dateToTime(s.endTime.toDate())}</Item>
        <Item>{timeDiffToString(s.startTime.toDate(), s.endTime.toDate())}</Item>
        <Item><StyledButton variant="link" size="sm">X</StyledButton></Item>
      </Items>
    )
  })

  return (
    <StyledContainer>
      <hr />
      <h2>Last sessions</h2>

      <Items>
        <Item>Date</Item>
        <Item>Check In</Item>
        <Item>Check Out</Item>
        <Item>Duration</Item>
        <Item>Delete</Item>
      </Items>
      {sessionsList?.length && sessionsList}
    </StyledContainer>
  )
};

export default LastSessions;