import styled from 'styled-components';
import userIcon from './img/user-icon.png';
import chatbotIcon from './img/chatbot-icon.png';
import { getBotMessage } from "../../hooks/api";

const Wrapper = styled.div`
  display: flex;
  margin-top: 15px;
`;

const TagWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  gap: 10px;
  margin-left: 10px;
  margin-right: 10px;
`;

const ChatbotTag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  border: solid 1px #add8e6;
  padding: 6px;
  color: #7092aa;
  background-color: #ffffff;
  padding: 8px;
  cursor: pointer;
`;

const tags = [
    { text: '男裝推薦 👗', type: 'men' },
    { text: '熱門產品推薦 🔥', type: 'hot' },
    { text: '女裝推薦 👖', type: 'women' },
    { text: '優惠活動詢問 🎁', type: 'divination' },
    { text: '最新流行服飾推薦 ✨', type: 'new' },
];

export function Tag({ setMessages }) {
    async function getBotMsg(tag) {
        const data = await getBotMessage(tag.type);
        // const data = {
        //     id: [1],
        //     title: ["日系上衣"],
        //     description: ["厚薄：薄 彈性：無"],
        //     main_image: ["https://campus4.s3.ap-northeast-1.amazonaws.com/1699954879116-dress.png"],
        //     texture: ["棉 100%"],
        //     place: ["中國"]
        // };
        console.log("data",data);
        await setMessages(draft => {
            draft.characters.push('chatbot');
            draft.texts.push([undefined]);
            draft.style.push({
                alignItems: 'flex-start',
                avatar: chatbotIcon,
                backgroundColor: '#ffffff',
                color: '#000000',
            });
            draft.id.push(data.id);
            draft.title.push(data.title);
            draft.description.push(data.description);
            draft.image.push(data.main_image);
            draft.texture.push(data.texture);
            draft.place.push(data.place);
            draft.campaignId.push(undefined);
            draft.campaignImage.push(undefined);
            draft.campaignPath.push(undefined);
            //   draft.campaignId.push(data.campaign);
            //   draft.campaignImage.push(data.image);
            //   draft.campaignPath.push(data.url);
            return draft;
        });
    }

    return (
        <Wrapper>
            <TagWrapper>
                {tags.map((tag, idx) => {
                    return (
                        <ChatbotTag
                            key={idx}
                            onClick={() => {
                                setMessages(draft => {
                                    draft.characters.push('user');
                                    draft.texts.push([tag.text]);
                                    draft.style.push({
                                        alignItems: 'flex-end',
                                        avatar: userIcon,
                                        backgroundColor: '#1F75FE',
                                        color: '#ffffff',
                                    });
                                    draft.id.push(undefined);
                                    draft.title.push(undefined);
                                    draft.image.push(undefined);
                                    draft.description.push(undefined);
                                    draft.texture.push(undefined);
                                    draft.place.push(undefined);
                                    draft.campaignId.push(undefined);
                                    draft.campaignImage.push(undefined);
                                    draft.campaignPath.push(undefined);
                                    return draft;
                                });

                                getBotMsg(tag);
                            }}>
                            {tag.text}
                        </ChatbotTag>
                    );
                })}
            </TagWrapper>
        </Wrapper>
    );
}