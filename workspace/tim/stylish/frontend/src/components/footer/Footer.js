import React from "react";
import "./footer.css";
import lineImg from '../../assets/images/line.png';
import twitterImg from '../../assets/images/twitter.png'
import fbImg from '../../assets/images/facebook.png'


export const Footer = () => {
    return (
        <div className="footer">
            <div className="footerContainer">
                <div className="links">
                    <div className="linkContainer">
                        <a href="#">
                            <div className="text-wrapper">關於 STYLiSH</div>
                        </a>
                        <a href="#">
                            <div className="text-wrapper">
                                服務條款
                            </div>
                        </a>
                        <a href="#">
                            <div className="text-wrapper">
                                隱私政策
                            </div>
                        </a>
                    </div>
                    <div className="linkContainer">
                        <a href="#">
                            <div className="text-wrapper">
                                聯絡我們
                            </div>
                        </a>
                        <a href="#">
                            <div className="text-wrapper">
                                FAQ
                            </div>
                        </a>
                    </div>
                </div>

                <div className="icons">
                    <a href="#" target="_blank">
                        <img className="social-media-image" alt="Line" src={lineImg} />
                    </a>
                    <a href="#" target="_blank">
                        <img className="social-media-image" alt="Twitter" src={twitterImg} />
                    </a>
                    <a href="#" target="_blank">
                        <img className="social-media-image" alt="Facebook" src={fbImg} />
                    </a>
                </div>
            </div>
            <p className="copy-right">© 2018. All rights reserved.</p>
        </div>
    );
};
