import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {v4 as uuidv4} from 'uuid';

const MessageWrapper = styled.div`
  margin: 5px 20px;
  display: flex;
  flex-direction: column;
  align-items: ${props => props.alignItems};
`;

const Avatar = styled.img`
  width: 40px;
  display: ${props => props.display};
  margin: ${props => props.margin};
`;

const ContentBoxWrapper = styled.div`
  max-width: 100%;
  background-color: ${props => props.backgroundColor};
  color: ${props => props.color};
  border-radius: 24px;
  margin-top: ${props => props.marginTop};
`;

const Content = styled.div`
  line-height: 23px;
  display: ${props => props.display};
  padding: ${props => props.padding};
`;

const Title = styled.div`
  text-align: center;
  font-weight: 600;
`;

const Description = styled.div`
  display: flex;
  column-gap: 8px;
  margin-top: 7px;
`;

const ProdImg = styled.img`
  width: 160px;
  border-radius: 24px;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 15px;
`;

const GoDetail = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 8px;
`;

export function Message({messages}) {
  return (
    <>
      {messages.texts.map((textArray, idx) => {
        let messageCt = 0;
        return textArray.map(text => {
          messageCt += 1;
          return (
            <MessageWrapper
              key={uuidv4()}
              alignItems={messages.style[idx].alignItems}>
              <Avatar
                display={messageCt > 1 ? 'none' : 'block'}
                src={messages.style[idx].avatar}
                margin={messages.characters[idx] === 'user' ? '12px' : '0px'}
              />
              <ContentBoxWrapper
                backgroundColor={messages.style[idx].backgroundColor}
                color={messages.style[idx].color}
                onClick={() => {
                  console.log(idx);
                }}>
                <Content
                  display={text ? 'block' : 'none'}
                  padding={text && '8px'}>
                  {text}
                </Content>

                <Content
                  display={messages.id[idx] ? 'block' : 'none'}
                  padding={messages.id[idx] && '10px'}>
                  <Title>{messages.title[idx] && messages.title[idx]}</Title>
                  <Description>
                    <ProdImg src={messages.image[idx] && messages.image[idx]} />
                    <InfoWrapper>
                      <pre>
                        {messages.description[idx] && messages.description[idx]}
                        {'\n'}
                        {messages.texture[idx] &&
                          '材質：' + messages.texture[idx]}
                        {'\n'}
                        {messages.place[idx] && '產地：' + messages.place[idx]}
                      </pre>
                    </InfoWrapper>
                  </Description>
                  <GoDetail>
                    <Link
                      to={`/products/${messages.id[idx]}`}
                      style={{textDecoration: 'none'}}>
                      {'查看詳情'}
                    </Link>
                  </GoDetail>
                </Content>

                <Content
                  display={
                    messages.campaignId[idx] === 'divination' ? 'block' : 'none'
                  }>
                  <Link to={`/${messages.campaignId[idx]}`}>
                    <ProdImg
                      src={
                        messages.campaignImage[idx] &&
                        messages.campaignImage[idx]
                      }
                    />
                  </Link>
                </Content>
              </ContentBoxWrapper>
            </MessageWrapper>
          );
        });
      })}
    </>
  );
}