import PropTypes from "prop-types";
import React from "react";
import "./header.css";
const Header = ({
    profile,
    cart,
    split,
    search,
    logo,
    circle,
    profileHover,
    cartHover
}) => {
    return (
        <div className="header">
            <div className="header_left">
                <img className="logo" alt="Logo" src={logo} />
                <div className="rwdHeaderContainer">
                    <img className="rwdLogo" alt="Logo" src={logo} />
                    <img className="rwdSearchImg" src={search} />
                </div>
                <div className="categories">
                    <div className="single">女裝</div>
                    {/* <img className="split" alt="Split" src={split} height={20} /> */}
                    <div className="single">男裝</div>
                    {/* <img className="split" alt="Split" src={split} height={20} /> */}
                    <div className="single">配件</div>
                </div>
            </div>
            <div className="header_right">
                <div className="search">
                    <div className="overlap-group">
                        <input type="text" placeholder="西裝" className="search-input" />
                        <img className="searchImg" alt="searchImg" src={search} />
                    </div>
                </div>
                <div className="header_bottom">
                    <div className="cartBox">
                        <div className="cartLabelContainer">
                            <div className="cart-container">
                                <picture>
                                    <source media="(max-width: 1279px)" srcset="./img/cart-mobile.png" />
                                    <img className="cart" alt="Cart" src={cart} />
                                    <img className="cart-hover" alt="Cart" src={cartHover} />
                                </picture>

                            </div>
                            <img className="circle" alt="Circle" src={circle} />
                            <div className="cartNumber">1</div>
                            <div className="cartLabel">購物車</div>
                        </div>
                    </div>

                    <div class="profile-container">
                        <picture>
                            <source media="(max-width: 1279px)" srcset="./img/member-mobile.png" />
                            <img className="profile" alt="Profile" src={profile} />
                            <img className="profile-hover" alt="Profile" src={profileHover} />
                        </picture>
                        <div className="memberLabel">會員</div>

                    </div>
                </div>

            </div>


        </div>
    );
};

Header.propTypes = {
    profile: PropTypes.string,
    cart: PropTypes.string,
    split: PropTypes.string,
    search: PropTypes.string,
    logo: PropTypes.string,
};
export default Header;
