import styled from 'styled-components';
import {useState, useEffect, useRef} from 'react';
import {useImmer} from 'use-immer';
import Message from './Message';
import {io} from 'socket.io-client';
// const socket = io('https://emmalinstudio.com/');
// const socket = io('http://localhost', { path: '/api/socket.io'});
const socketUrl = process.env.REACT_APP_SOCKET_URL;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  // width: 80%;
  // padding-left: 10rem;
  // align-items: center;
  justify-content: center;
  // box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
`;

const MessageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  justify-content: center;
  align-items: center;

`;

const UserWrapper = styled.ul`
  width: 30%;
  height: 600px;
  display: flex;
  flex-direction: column;
  border: 1px solid #d3d3d3;
  border-top: none;
`;

const User = styled.li`
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #d3d3d3;
  cursor: pointer;
`;

const ChatRoom = styled.div`
  width: 70%;
  height: 600px;
  border: 1px solid #d3d3d3;
  border-top: none;
`;

const Form = styled.div`
  background: rgba(0, 0, 0, 0.15);
  padding: 0.25rem;
  position: fixed;
  bottom: 150px;
  left: 0;
  right: 0;
  display: flex;
  height: 3rem;
  box-sizing: border-box;
  backdrop-filter: blur(10px);
  width: 100%;
`;

const Input = styled.input`
  border: none;
  padding: 0 1rem;
  flex-grow: 1;
  border-radius: 2rem;
  margin: 0.25rem;

  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  background: #333;
  border: none;
  padding: 0 1rem;
  margin: 0.25rem;
  border-radius: 3px;
  outline: none;
  color: #fff;
  cursor: pointer;
`;

function Backstage() {
  const [socketData, setSocketData] = useImmer([]);
  const [currUser, setCurrUser] = useState();
  const inputRef = useRef();
  const socketRef = useRef(null);
  // useEffect(() => {
  //   socketRef.current = io('http://localhost', { path: '/api/socket.io'});
  //   console.log(socketRef.current);
  //   socketRef.current.on('connect', () => {
  //     console.log('Connected to server');
  //     // syncData();
  //   });
  //   socketRef.current.on('connect_error', (error) => {
  //     console.error('Connection error:', error);
  //   });
  //   console.log("io after");
  //   socketRef.current.on('message', response => {
  //     console.log("threads:",response);
  //     setThreads(draft => draft.concat(response));
  //   });

  // }, []);
  const getUniqueUser = () => {
    return [
      ...new Set(
        socketData
          .filter(obj => (obj.from === 'admin' ? false : true))
          .map(obj => obj.from),
      ),
    ];
  };


  const handleSend = message => {
    const data = {
      from: 'admin',
      to: currUser,
      message,
    };

    // socket.emit('message', data);
    socketRef.current.emit('message', data);
    inputRef.current.value = '';
  };

  useEffect(() => {
    socketRef.current = io(`${socketUrl ? socketUrl : 'https://13.55.47.107'}`, { path: '/api/socket.io'});
    console.log(socketRef.current);
    socketRef.current.on('connect', () => {
      console.log('Connected to server');
      // syncData();
    });
    socketRef.current.on('connect_error', (error) => {
      console.error('Connection error:', error);
    });
    socketRef.current.emit('registerAdmin');
    socketRef.current.on('message', response => {
      console.log(response);
      setSocketData(draft => draft.concat(response));
    });
  }, []);

  return (
    <Wrapper>
      <MessageWrapper>
        <UserWrapper>
          {getUniqueUser().map(user => {
            return (
              <User
                key={user}
                onClick={() => {
                  setCurrUser(user);
                }}>
                {user}
              </User>
            );
          })}
        </UserWrapper>
        <ChatRoom>
          <Message socketData={socketData} currUser={currUser} />
        </ChatRoom>
      </MessageWrapper>
      <Form>
        <Input
          ref={inputRef}
          id="input"
          placeholder="請輸入訊息"
          autocomplete="off"
        />
        <Button
          onClick={() => {
            if (inputRef.current.value.trim() !== '') {
              handleSend(inputRef.current.value);
            }
          }}>
          Send
        </Button>
      </Form>
    </Wrapper>
  );
}

export default Backstage;