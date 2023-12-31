import styled from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import { useImmer } from 'use-immer';
// import Message from './Message';
import { SocketMessage } from './SocketMessage.js';
import { io } from 'socket.io-client';
import chatBotImg from '../../assets/images/chatbot-icon.png';
import inputBtnImg from '../../assets/images/input-btn.png';
// const socket = io('https://emmalinstudio.com/');
// const socket = io('http://localhost', { path: '/api/socket.io'});
const socketUrl = process.env.REACT_APP_SOCKET_URL;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  // width: 80%;
  // padding-left: 10rem;
  align-items: center;
  padding: 2rem 15rem 0 15rem;
  // justify-content: center;
  // box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
`;
const HeadWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
`;
const IconWrapper = styled.div`
  position: relative;
`;

const Icon = styled.img`
  width: 60px;
  margin-left: 10px;
`;

const GreenCircle = styled.div`
  width: 5px;
  height: 5px;
  position: absolute;
  top: 30px;
  right: 8px;
  border-radius: 9999px;
  background-color: #90ee90;
`;
const NextBtn = styled.button`
    width: 4rem;
    height: 2rem;
    background: #D2BAAC;
    border-radius: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    font-weight: bold;
    color: #FFFFFF; 
    transition: background-color 0.3s ease, color 0.3s ease, font-weight 0.3s ease; // 添加過渡效果

    &:hover {
        background: #BAA492; 
        color: black; 
        cursor: pointer;
    }
`;
const ChatRoom = styled.div`
  width: 100%;
  // height: 550px;
  background-color: #f4f4f4;
  box-shadow: 0 0 3em rgba(0, 0, 0, 0.15);
  // bottom: 122px;
  // right: 0;
  // z-index: 9999;
  border-radius: 18px;
`;
const RoomHeaderWrapper = styled.div`
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  border-radius: 18px;
  box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.1);
`;
const UserInfo = styled.div`
  width: 130px;
  text-align: center;
  color: #4a4a4a;
`;

// const MessageWrapper = styled.div`
//   display: flex;
//   flex-direction: row;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
//   justify-content: center;
//   align-items: center;

// `;
const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  position: relative;
  height: 550px;
`;
const MessageBox = styled.div`
  display: flex;
  flex-direction: column;
`;

// const UserWrapper = styled.ul`
//   width: 30%;
//   height: 600px;
//   display: flex;
//   flex-direction: column;
//   border: 1px solid #d3d3d3;
//   border-top: none;
// `;

// const User = styled.li`
//   height: 40px;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   border-bottom: 1px solid #d3d3d3;
//   cursor: pointer;
// `;

// const ChatRoom = styled.div`
//   width: 70%;
//   height: 600px;
//   border: 1px solid #d3d3d3;
//   border-top: none;
// `;

// const Form = styled.div`
//   background: rgba(0, 0, 0, 0.15);
//   padding: 0.25rem;
//   position: fixed;
//   bottom: 150px;
//   left: 0;
//   right: 0;
//   display: flex;
//   height: 3rem;
//   box-sizing: border-box;
//   backdrop-filter: blur(10px);
//   width: 100%;
// `;

// const Input = styled.input`
//   border: none;
//   padding: 0 1rem;
//   flex-grow: 1;
//   border-radius: 2rem;
//   margin: 0.25rem;

//   &:focus {
//     outline: none;
//   }
// `;

// const Button = styled.button`
//   background: #333;
//   border: none;
//   padding: 0 1rem;
//   margin: 0.25rem;
//   border-radius: 3px;
//   outline: none;
//   color: #fff;
//   cursor: pointer;
// `;
const InputWrapper = styled.div`
  width: 100%;
  height: 40px;
  position: absolute;
  bottom: 0;
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 0px 0px 0px 24px;
  padding: 0 47px 5px 14px;
  border: none;
  &:focus {
    outline: none;
  }
`;

const InputButton = styled.img`
  width: 27px;
  position: absolute;
  right: 0;
  top: 50%;
  margin-right: 8px;
  transform: translateY(-50%);
  cursor: pointer;
`;

function Backstage() {
  const [socketData, setSocketData] = useImmer([]);
  const [currUser, setCurrUser] = useState();
  const dummyRef = useRef();
  const inputRef = useRef();
  const socketRef = useRef(null);

  // const getUniqueUser = () => {
  //   return [
  //     ...new Set(
  //       socketData
  //         .filter(obj => (obj.from === 'admin' ? false : true))
  //         .map(obj => obj.from),
  //     ),
  //   ];
  // };


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
  const handleNextBtn = () => {
    socketRef.current.emit('consumeRequest');
  };

  useEffect(() => {
    // socketRef.current = io(`${socketUrl ? socketUrl : 'https://13.55.47.107'}`, { path: '/api/socket.io' });
    socketRef.current = io(`${socketUrl}`, { path: '/api/socket.io' });
    console.log(socketRef.current);
    socketRef.current.on('connect', () => {
      console.log('Connected to server');
    });
    socketRef.current.on('connect_error', (error) => {
      console.error('Connection error:', error);
    });
    socketRef.current.emit('registerAdmin');
    //觸發consume
    socketRef.current.emit('consumeRequest');
    socketRef.current.on('message', response => {
      console.log(response);
      setSocketData(draft => draft.concat(response));
      setCurrUser(response.from === 'admin' ? response.to : response.from);
    });
  }, []);
  useEffect(() => {
    dummyRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, [socketData]);



  return (
    <Wrapper>
      <HeadWrapper>
        <IconWrapper>
          <Icon src={chatBotImg} />
          <GreenCircle />
        </IconWrapper>
        <NextBtn onClick={handleNextBtn}>Next</NextBtn>
      </HeadWrapper>
      <ChatRoom>
        <RoomHeaderWrapper>
          <UserInfo>Test User</UserInfo>
        </RoomHeaderWrapper>
        <MessageWrapper>
          <ChatRoom>
            <SocketMessage
              threads={socketData}
              socketId={socketRef.current?.id}
            ></SocketMessage>
            <div ref={dummyRef}></div>
          </ChatRoom>
          <InputWrapper>
            <Input
              ref={inputRef}
              id="input"
              placeholder="    輸入訊息"
            />
            <InputButton
              src={inputBtnImg}
              onClick={() => {
                if (inputRef.current.value.trim() !== '') {
                  handleSend(inputRef.current.value);
                }
              }}
            />
          </InputWrapper>
          {/* <Form>
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
          </Form> */}
        </MessageWrapper>
      </ChatRoom>

    </Wrapper>
  );
}
export default Backstage;