import { useEffect } from "react";
/* global TPDirect */
import $ from 'jquery';


// const { VITE_TAPPAY_APPID, VITE_TAPPAY_APPKEY, VITE_TAPPAY_SERVER_TYPE } = import.meta.env;
const appId = process.env.REACT_APP_VITE_TAPPAY_APPID;

const VITE_TAPPAY_APPKEY = process.env.REACT_APP_VITE_TAPPAY_APPKEY;
const VITE_TAPPAY_SERVER_TYPE = process.env.REACT_APP_VITE_TAPPAY_SERVER_TYPE;
const useTappay = () => {
    console.log(`tappay: ${appId} ,${VITE_TAPPAY_APPKEY}, ${VITE_TAPPAY_SERVER_TYPE}`);
    useEffect(() => {
        TPDirect.setupSDK(appId, VITE_TAPPAY_APPKEY, VITE_TAPPAY_SERVER_TYPE);
        TPDirect.card.setup({
            fields: {
                number: {
                    element: "#card-number",
                    placeholder: "**** **** **** ****",
                },
                expirationDate: {
                    element: document.getElementById("card-expiration-date"),
                    placeholder: "MM / YY",
                },
                ccv: {
                    element: "#card-ccv",
                    placeholder: "後三碼",
                },
            },
            isMaskCreditCardNumber: true,
            maskCreditCardNumberRange: {
                beginIndex: 0,
                endIndex: 16,
            },
        });
        TPDirect.card.onUpdate((update) => {
            const newType = update.cardType === "unknown" ? "" : update.cardType;
            $("#cardtype").text(newType);
            // document.getElementById("cardtype").textContent = newType;

        });
    }, []);
};

export default useTappay;