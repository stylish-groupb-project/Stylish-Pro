import PropTypes from "prop-types";
import React from "react";
import "./style.css";
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
            <img className="logo" alt="Logo" src={logo} />
            <div className="categories">
                <div className="single">女裝</div>
                <img className="split" alt="Split" src={split} height={20} />
                <div className="single">男裝</div>
                <img className="split" alt="Split" src={split} height={20} />
                <div className="single">配件</div>
            </div>
            <div className="search">
                <div className="overlap-group">
                    <input type="text" placeholder="西裝" className="search-input" />
                    <img className="searchImg" alt="searchImg" src={search} />
                </div>
            </div>
            <div className="cartBox">
                <div className="cart-container">
                    <img className="cart" alt="Cart" src={cart} />
                    <img className="cart-hover" alt="Cart" src={cartHover} />
                </div>
                <img className="circle" alt="Circle" src={circle} />
                <div className="cartNumber">1</div>
            </div>
            <div class="profile-container">
                <img className="profile" alt="Profile" src={profile} />
                <img className="profile-hover" alt="Profile" src={profileHover} />
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
