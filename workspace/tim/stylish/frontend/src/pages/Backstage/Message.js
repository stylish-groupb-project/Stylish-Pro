import styled from 'styled-components';
import {useState} from 'react';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Text = styled.div`
  display: flex;
  padding: 10px;
  justify-content: flex-start;
  border-bottom: 1px solid #d3d3d3;
`;

function Message({socketData, currUser}) {
  const getUserChat = user => {
    return socketData.filter(obj => obj.from === user || obj.to === user);
  };

  return (
    <Wrapper>
      {getUserChat(currUser).map(obj => {
        return (
          <Text>
            {obj.from}: {obj.message}
          </Text>
        );
      })}
    </Wrapper>
  );
}

export default Message;