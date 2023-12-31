import styled from 'styled-components';
import {v4 as uuidv4} from 'uuid';

const MessageWrapper = styled.div`
  margin: 5px 20px;
  display: flex;
  flex-direction: column;

  ${props =>
    props.$source === 'admin'
      ? 'align-items: flex-start'
      : 'align-items: flex-end'};

  // height: 550px;
`;

const ChatbotAvatar = styled.img`
  width: 40px;
`;

const ContentBoxWrapper = styled.div`
  max-width: 80%;
  background-color: ${props => props.backgroundColor};
  background-color: #ffffff;
  color: #000;

  ${props =>
    props.$source !== 'admin'
      ? 'background-color:#1877F2; color:#ffffff;'
      : null};

  border-radius: 24px;
`;

const Content = styled.div`
  padding: 10px;
  line-height: 23px;
`;


export function SocketMessage({threads, socketId}) {
  console.log("SocketComponent: ",threads);
  console.log("socketID:",socketId);
  return (
    <>
      {threads
        ?.filter(thread => thread.from == socketId || (thread.from == 'admin' && thread.to == socketId ))
        ?.map(thread => {
        return (
          <MessageWrapper key={uuidv4()} $source={thread.from}>
            <ContentBoxWrapper $source={thread.from}>
              <Content>{thread.message}</Content>
            </ContentBoxWrapper>
          </MessageWrapper>
        );
      })}
    </>
  );
}