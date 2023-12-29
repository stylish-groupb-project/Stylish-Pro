import { useContext, useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useTappay from "../../hooks/useTappay";
import { CartCountContext } from "../../contexts/CartCountManager";
import styled from 'styled-components';
const elasticIp = process.env.REACT_APP_ELASTIC_IP;
/* global TPDirect */

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    margin-left: 2rem;
    @media (min-width: 1024px) {
        margin-top: 50px;
    }
`;
const Section = styled.div`
    margin-bottom: 4rem;
    padding-top: 25px;
    border-top: 1px solid #3F3A3A;
`;

const SectionTitle = styled.p`
  font-family: sans-serif;
  color: #3F3A3A;
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const FormRow = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;

    &:last-child {
        margin-bottom: 0;
    }

    @media (min-width: 1024px) {
        display: flex;
    }
`;

const LabelSection = styled.label`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 8px;
  align-items: center;

  @media (max-width: 1280px){
    flex-direction: column;
    align-items: flex-start;
  }
  
`;

const Input = styled.input`
    font-size: 1rem; 
    font-family: sans-serif;
    border: 1px solid #3F3A3A;
    border-radius: 0.375rem;
    outline: none;
    padding: 0.5rem 0;
    height: 1rem;
    margin-top: 0.4rem;
    width: 100%;

    color: ${(props) => (props.isError ? 'red' : 'black')}
    
    @media (min-width: 1024px) {
        width: 36rem;
        padding: 0.5rem 0.5rem;
        margin-top: 0;
    }

`;

const ErrorText = styled.span`
    border-color: red;
    color: red;
`;

const RadioButtonLabel = styled.label`
  margin-right: 1rem;
  display: flex;
  align-items: center;
`;

const SubmitButton = styled.button`
    display: block;
    padding: 0.5rem 1rem;
    background-color: black;
    color: white;
    margin-top: 10px;
    margin-left: auto;
    font-size: 1rem;
    cursor: pointer;
    width: 100%;
    @media (max-width: 1280px){
        display: none;
    }

  

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
`;
const MobileSubmitButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: black;
  color: white;
  margin-top: 10px;
  margin-left: auto;
  font-size: 1rem;
  cursor: pointer;
  width: 100%;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  @media (min-width: 1280px){
        display: none;
    }
`;

const MaxWidthContainer = styled.div`
  @media (min-width: 1024px) {
    max-width: 43.5rem;
  }
`;
const WarningMessage = styled.span`
  color: brown;
  margin-top: 10px;
  margin-bottom: 1.875rem;
  text-align: right;
`;
const PaySection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 1.5rem;

  @media (max-width: 1280px){
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
`;
const PayInput = styled.div`
    font-size: 1rem;
    font-family: sans-serif;
    border: 1px solid;
    border-radius: 0.375rem;
    outline: none;
    padding: 0.5rem 0;
    height: 1rem;
    width: 100%;
    margin-top: 1rem;

    @media (min-width: 1024px) {
        width: 36rem;
        margin-top: 0;
    }
`;

const PaymentSummary = styled.div`
  min-width: 240px;
  margin-top: 2.5rem; /* mt-10 */
  margin-left: auto;
  width: 25%;
`;

const SummaryRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.625rem; /* mb-2.5 */
`;

const PriceDetails = styled.div`
  display: flex;
  align-items: center;
`;

const PriceLabel = styled.span`
    font-size: 1rem;
`;

const PriceAmount = styled.span`
  margin-left: 0.5rem; /* ml-2 */
  font-size: 1.875rem; /* text-3xl */
`;

const TotalRow = styled(SummaryRow)`
  border-top: 1px solid #3F3A3A;
  padding-top: 0.625rem;
  margin-bottom: 3.125rem;
`;

const EachOrderLabel = styled.span`
    text-wrap: nowrap;
    width: 20%;

    @media (max-width: 1280px){
        
        margin-bottom: 1rem;

    }
`;

const DeliverySection = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    @media (max-width: 1280px){
        flex-direction: column;
        align-items: flex-start;
    }
`;
const MobileDeliverySection = styled.div`

    display: flex;
    flex-direction: row;
    align-items: center;

    @media (max-width: 1280px){
        margin-top: 1rem;
    }

`;



const emailRegex =
    /(?<zipcode>(^\d{5}|^\d{3})?)(?<city>\D+[縣市])(?<district>\D+?(市區|鎮區|鎮市|[鄉鎮市區]))(?<others>.+)/;

const schema = z.object({
    name: z
        .string()
        .min(2)
        .max(255)
        .default(Cookies.get("user_name") || ""),
    phoneNumber: z
        .string()
        .length(10, "手機格式不正確")
        .regex(/^09\d{8}$/, "手機格式不正確"),
    address: z.string().regex(emailRegex, "請輸入正確的地址格式"),
    email: z
        .string()
        .email()
        .default(Cookies.get("user_email") || ""),
    time: z.enum(["08:00-12:00", "14:00-18:00", "不指定"]),
});

const OrderForm = ({ cartUpdate, setCartUpdate }) => {
    const navigate = useNavigate();
    const { count } = useContext(CartCountContext);
    const [totalAmount, setTotalAmount] = useState(0);
    const [loading, setLoading] = useState(false);
    useTappay();
    useEffect(() => {
        const handleStorageChange = () => {
            const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
            let newTotalAmount = 0;
            if (cartItems) {
                cartItems.forEach((item) => {
                    newTotalAmount += item.price * item.quantity;
                });
            }
            setTotalAmount(newTotalAmount);
        };
        handleStorageChange();
        setCartUpdate(false);
    }, [count, cartUpdate, setCartUpdate]);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: zodResolver(schema) });
    const freight = 0;

    const transformCartItems = (cartItems) => {
        //只有colorname
        console.log("cartItems",cartItems);
        const transformedList = cartItems.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            color: {
                code: item.color.colorCode,
                name: item.color.colorName,
            },
            size: item.size,
            qty: item.quantity,
        }));
        return transformedList;
    }



    const onSubmit = async (values) => {
        setLoading(true);
        const tappayStatus = TPDirect.card.getTappayFieldsStatus();
        console.log("status:"+tappayStatus);

        if (tappayStatus.canGetPrime === false) {
            alert("can not get prime");
            setLoading(false);
        }

        try {
            console.log(values);
            const prime = await new Promise((resolve) => {
                TPDirect.card.getPrime((result) => {
                    if (result.status !== 0) {
                        alert('取得 Prime 失敗');
                    }
                    console.log("result.card.prime:"+result.card.prime);
                    resolve(result.card.prime);
                });
            });
            console.log("prime:"+prime);

            const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
            console.log("test:"+cartItems);
            
            const list = transformCartItems(cartItems);

            const requestBody = {
                prime,
                order: {
                    userId: Cookies.get("user_id"),
                    shipping: "delivery",
                    payment: "credit_card",
                    subtotal: totalAmount,
                    freight,
                    total: totalAmount + freight,
                    recipient: {
                        name: values.name,
                        phone: values.phoneNumber,
                        email: values.email,
                        address: values.address,
                        time: values.time,
                    },
                    list,
                },
            };

            console.log(requestBody);
            //TODO: login 
            const response = await axios.post(`https://${elasticIp}/api/1.0/order/checkout`, requestBody, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                },
            });
            console.log(response.data.data);
            //response.data.data.time
            navigate(`/thankyou?order_id=${response.data.data.number}&time=${values.time}`);
            // navigate(`/thankyou?order_id=${1}&time=${values.time}`);

        } catch (error) {
            console.error(error);
            alert('訂單提交失敗');
        }
        setLoading(false);
    }
    const disabled = !Cookies.get("token") || totalAmount === 0;
    // const disabled = totalAmount === 0;
    return (
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
            {disabled && <ErrorText>請先登入並選擇商品</ErrorText>}
            <div>
                <SectionTitle>訂購資料</SectionTitle>
                <Section>
                    <MaxWidthContainer>
                        <FormRow>
                            <LabelSection htmlFor="name">
                                <EachOrderLabel>收件人姓名</EachOrderLabel>
                                <Input
                                    type="text"
                                    {...register("name")}
                                    disabled={disabled}
                                    defaultValue={Cookies.get("user_name") || ""}
                                    isError={errors.name}
                                />
                            </LabelSection>
                            {errors.name && <ErrorText>{errors.name.message}</ErrorText>}
                            <WarningMessage>務必填寫完整收件人姓名，避免包裹無法順利簽收</WarningMessage>
                        </FormRow>
                        <FormRow>
                            <LabelSection htmlFor="phone-number">
                                <EachOrderLabel>手機</EachOrderLabel>
                                <Input
                                    type="text"
                                    {...register("phoneNumber")}
                                    placeholder="0912345678"
                                    disabled={disabled}
                                    isError={errors.phoneNumber}
                                />
                            </LabelSection>
                            {errors.phoneNumber && <ErrorText>{errors.phoneNumber.message}</ErrorText>}
                        </FormRow>
                        <FormRow>
                            <LabelSection htmlFor="address">
                                <EachOrderLabel>地址</EachOrderLabel>
                                <Input
                                    type="text"
                                    {...register("address")}
                                    disabled={disabled}
                                    isError={errors.address}
                                />
                            </LabelSection>
                            {errors.address && <ErrorText>{errors.address.message}</ErrorText>}
                        </FormRow>
                        <FormRow>
                            <LabelSection htmlFor="email">
                                <EachOrderLabel>Email</EachOrderLabel>
                                <Input
                                    type="email"
                                    {...register("email")}
                                    disabled={disabled}
                                    isError={errors.email}
                                    defaultValue={Cookies.get("user_email") || ""}
                                />
                            </LabelSection>
                            {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
                        </FormRow>
                        <FormRow>
                            <DeliverySection>
                                <EachOrderLabel>配送時間</EachOrderLabel>
                                <MobileDeliverySection>
                                    <RadioButtonLabel>
                                        <input type="radio" value="08:00-12:00" {...register("time")} disabled={disabled} />
                                        <span>08:00-12:00</span>
                                    </RadioButtonLabel>
                                    <RadioButtonLabel>
                                        <input type="radio" value="14:00-18:00" {...register("time")} disabled={disabled} />
                                        <span>14:00-18:00</span>
                                    </RadioButtonLabel>
                                    <RadioButtonLabel>
                                        <input type="radio" value="不指定" {...register("time")} disabled={disabled} />
                                        <span>不指定</span>
                                    </RadioButtonLabel>
                                </MobileDeliverySection>

                            </DeliverySection>

                        </FormRow>
                    </MaxWidthContainer>

                </Section>
                <SectionTitle>付款資料</SectionTitle>
                <Section>
                    <MaxWidthContainer>
                        <PaySection>
                            <EachOrderLabel>信用卡號碼</EachOrderLabel>
                            <PayInput id="card-number" />
                        </PaySection>
                        <PaySection>
                            <EachOrderLabel>有效期限</EachOrderLabel>
                            <PayInput id="card-expiration-date" />
                        </PaySection>
                        <PaySection>
                            <EachOrderLabel>安全碼</EachOrderLabel>
                            <PayInput id="card-ccv" />
                        </PaySection>
                    </MaxWidthContainer>
                </Section>
                <PaymentSummary>
                    <SummaryRow>
                        <PriceLabel>總金額</PriceLabel>
                        <PriceDetails>
                            <PriceLabel>NT.</PriceLabel>
                            <PriceAmount>{totalAmount}</PriceAmount>
                        </PriceDetails>
                    </SummaryRow>
                    <SummaryRow>
                        <PriceLabel>運費</PriceLabel>
                        <PriceDetails>
                            <PriceLabel>NT.</PriceLabel>
                            <PriceAmount>{freight}</PriceAmount>
                        </PriceDetails>
                    </SummaryRow>
                    <TotalRow>
                        <PriceLabel>應付金額</PriceLabel>
                        <PriceDetails>
                            <PriceLabel>NT.</PriceLabel>
                            <PriceAmount>{totalAmount + freight}</PriceAmount>
                        </PriceDetails>
                    </TotalRow>
                    <SubmitButton
                        type="submit"
                        disabled={disabled && loading}
                    >
                        確認付款
                    </SubmitButton>
                </PaymentSummary>
                <MobileSubmitButton
                    type="submit"
                    disabled={disabled && loading}
                >
                    確認付款
                </MobileSubmitButton>
            </div>
        </FormContainer>
    )

};
export default OrderForm;