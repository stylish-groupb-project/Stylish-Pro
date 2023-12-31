import styled from 'styled-components';
import chatbotIcon from './img/chatbot-icon.png';
import inputBtn from './img/input-btn.png';
import { Message } from './Message.js';
import { SocketMessage } from './SocketMessage.js';
import { Tag } from './Tag.js';
import { useState, useEffect, useRef } from 'react';
import { useImmer } from 'use-immer';
import { io } from 'socket.io-client';
// import Cookies from "js-cookie";
// const socket = io('https://emmalinstudio.com/');
// const socket = io('https://13.55.47.107', { path: '/api/socket.io' });
// const token = Cookies.get('token');
// const socket = io('https://localhost', { 
//   path: '/api/socket.io',
//   extraHeaders: {
//     Authorization: `Bearer ${token}`,
//   },
// });
// const socket = io('http://localhost', { path: '/api/socket.io'});

const Wrapper = styled.div``;
// socket.on('connect', () => {
//   console.log("socket.id",socket.id);
// });
const ChatbotBtn = styled.img`
  width: 80px;
  position: fixed;
  bottom: 140px;
  right: 0px;
  cursor: pointer;
  transform: ${props => props.transform};
  transition: transform 200ms cubic-bezier(0.5, 0, 0.5, 1);

  @media screen and (max-width: 1279px) {
    width: 80px;
    position: fixed;
    bottom: 220px;
    right: 0px;
    cursor: pointer;
    background-color: #fafafa;
    border-radius: 9999px;
    box-shadow: -9px 10px 30px rgba(112, 112, 112, 0.35);
  }
`;

const Chatroom = styled.div`
  width: 350px;
  height: 550px;
  position: fixed;
  background-color: #f4f4f4;
  box-shadow: 0 0 3em rgba(0, 0, 0, 0.15);
  bottom: 122px;
  right: 0;
  z-index: 9999;
  transform: ${props => props.transform};
  transition: transform 500ms cubic-bezier(0.5, 0, 0.5, 1);
  border-radius: 18px;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  border-radius: 18px;
  box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.1);
`;

const CloseBtn = styled.button`
  width: 20px;
  height: 20px;
  position: relative;
  background-color: transparent;
  border: none;
  margin-right: 15px;
  cursor: pointer;
`;

const StyledLine = styled.div`
  width: 100%;
  height: 3px;
  background-color: #939393;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
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

const Title = styled.div`
  width: 130px;
  text-align: center;
  color: #4a4a4a;
`;

const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  position: relative;
  height: 430px;
`;

const MessageBox = styled.div`
  display: flex;
  flex-direction: column;
`;

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

const Chatbot = () => {
  const socketUrl = process.env.REACT_APP_SOCKET_URL;
  const [chatBtnShow, setChatBtnShow] = useState(true);
  const [chatRoomShow, setChatRoomShow] = useState(false);
  const socketRef = useRef(null);

  const inputRef = useRef();
  const dummyRef = useRef();
  const [threads, setThreads] = useImmer([]);
  const [messages, setMessages] = useImmer({
    characters: ['chatbot'],
    texts: [
      [
        '您好～ 我是你的購物小幫手，同時也是一個精通時尚的機器人喔！🤖',
        '有什麼可以為您服務嗎？',
      ],
    ],
    style: [
      {
        alignItems: 'flex-start',
        avatar: chatbotIcon,
        backgroundColor: '#ffffff',
        color: '#000000',
      },
    ],
    id: [undefined],
    title: [undefined],
    image: [undefined],
    description: [undefined],
    texture: [undefined],
    place: [undefined],
    campaignId: [undefined],
    campaignImage: [undefined],
    campaignPath: [undefined],
  });
  // console.log("socket:", socket.id)

  const handleSend = message => {
    const data = {
      from: socketRef.current.id,
      to: 'admin',
      message,
    };
    console.log("socket:", socketRef.current.id)
    // socket.emit('message', data);
    socketRef.current.emit('message', data);
    inputRef.current.value = '';
  };
  useEffect(() => {
    // socketRef.current = io(`${socketUrl ? socketUrl : 'https://13.55.47.107'}`, { path: '/api/socket.io'});
    socketRef.current = io(`${socketUrl}`, { path: '/api/socket.io' });
    console.log(socketRef.current);
    socketRef.current.on('connect', () => {
      console.log('Connected to server');
      // syncData();
    });
    socketRef.current.on('connect_error', (error) => {
      console.error('Connection error:', error);
    });
    console.log("io after");
    socketRef.current.on('message', response => {
      console.log("threads:",response);
      setThreads(draft => draft.concat(response));
    });
    socketRef.current.on('busy', response => {
      console.log("Busy Thread:",response);
      const data = {
        from: 'admin',
        to: socketRef.current.id,
        response,
      };
      setThreads(draft => draft.concat(data));
    });
    socketRef.current.on('waiting', response => {
      console.log("Waiting Thread:",response);
      const data = {
        from: 'admin',
        to: socketRef.current.id,
        response,
      };
      setThreads(draft => draft.concat(data));
    });


  }, []);

  useEffect(() => {
    dummyRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, [threads]);

  return (
    <Wrapper>
      <ChatbotBtn
        src={chatbotIcon}
        transform={chatBtnShow ? 'translateX(0%)' : 'translateX(100%)'}
        onClick={() => {
          setChatBtnShow(false);
          window.setTimeout(() => setChatRoomShow(true), 400);
        }}
      />
      <Chatroom
        transform={chatRoomShow ? 'translateX(0%)' : 'translateX(100%)'}>
        <HeaderWrapper>
          <IconWrapper>
            <Icon src={chatbotIcon} />
            <GreenCircle />
          </IconWrapper>
          <Title>STYLiSH Chatbot</Title>
          <CloseBtn
            onClick={() => {
              setChatRoomShow(false);
              // TODO: socket關閉連線
              window.setTimeout(() => setChatBtnShow(true), 600);
            }}>
            <StyledLine style={{ transform: 'rotate(-45deg)' }} />
            <StyledLine style={{ transform: 'rotate(45deg)' }} />
          </CloseBtn>
        </HeaderWrapper>
        <MessageWrapper>
          <MessageBox>
            <Message messages={messages} />
            <Tag setMessages={setMessages} />
            <SocketMessage
              threads={threads}
              socketId={socketRef.current?.id}></SocketMessage>
            <div ref={dummyRef}></div>
          </MessageBox>
        </MessageWrapper>
        <InputWrapper>
          <Input ref={inputRef} placeholder="    輸入訊息" />
          <InputButton
            src={inputBtn}
            onClick={() => {
              if (inputRef.current.value.trim() !== '') {
                handleSend(inputRef.current.value);
              }
            }}
          />
        </InputWrapper>
      </Chatroom>
    </Wrapper>
  );
}
export default Chatbot;