import React from "react";
import "./footer.css";

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
                        <img className="social-media-image" alt="Line" src={"img/line.png"} />
                    </a>
                    <a href="#" target="_blank">
                        <img className="social-media-image" alt="Twitter" src={"img/twitter.png"} />
                    </a>
                    <a href="#" target="_blank">
                        <img className="social-media-image" alt="Facebook" src={"img/facebook.png"} />
                    </a>
                </div>
            </div>
            <p className="copy-right">© 2018. All rights reserved.</p>
        </div>
    );
};
