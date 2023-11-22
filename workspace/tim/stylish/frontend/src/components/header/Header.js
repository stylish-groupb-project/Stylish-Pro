import React,{useState , useContext} from "react";
import "./header.css";
import { useNavigate } from 'react-router-dom';
import { CategoryBtn } from "../../styled-components/CategoryBtn";
import logo from '../../assets/images/logo.png';
import searchImg from '../../assets/images/search.png'
import cartMobileImg from '../../assets/images/cart-mobile.png';
import cartImg from '../../assets/images/cart.png';
import cartHoverImg from '../../assets/images/cart-hover.png'
import circleImg from '../../assets/images/circle.svg';
import memberMobileImg from '../../assets/images/member-mobile.png';
import memberImg from '../../assets/images/member.png';
import memberHoverImg from '../../assets/images/member-hover.png'

import { CartCountContext } from "../../contexts/CartCountManager";


const Header = ({ refetch, onSearchChange}) => {
    const { count } = useContext(CartCountContext);
    
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    console.log(count)
    const handleCategory = (category) => {
        navigate(`/${category}`);
    };
    const handleEnterPress = (e) => {
        if (e.key === "Enter") {
            onSearchChange(searchTerm);
            navigate(`/search`);
        }
    };
    return (
        <div className="header">
            <div className="header_left">
                {/* <img className="logo" alt="Logo" src={"img/logo.png"} /> */}
                <img className="logo" alt="Logo" src={logo} />
                <div className="rwdHeaderContainer">
                    <img className="rwdLogo" alt="Logo" src={logo} />
                    <img className="rwdSearchImg" src={searchImg} />
                </div>
                <div className="categories">
                    <CategoryBtn onClick={() => handleCategory("women")} ><span className="single">女裝</span></CategoryBtn>
                    <span className="category-spliter">|</span>
                    <CategoryBtn onClick={() => handleCategory("men")} ><span className="single">男裝</span></CategoryBtn>
                    <span className="category-spliter">|</span>
                    <CategoryBtn onClick={() => handleCategory("accessories")} ><span className="single">配件</span></CategoryBtn>
                </div>
            </div>
            <div className="header_right">
                <div className="search">
                    <div className="overlap-group">
                        <input 
                            type="text" 
                            placeholder="西裝" 
                            className="search-input" 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleEnterPress}
                        />
                        <img className="searchImg" alt="searchImg" src={searchImg} />
                    </div>
                </div>
                <div className="header_bottom">
                    <div className="cartBox">
                        <div className="cartLabelContainer">
                            <div className="cart-container">
                                <picture>
                                    <source media="(max-width: 1279px)" srcSet={cartMobileImg} />
                                    <img className="cart" alt="Cart" src={cartImg} />
                                    <img className="cart-hover" alt="Cart" src={cartHoverImg} />
                                </picture>

                            </div>
                            <img className="circle" alt="Circle" src={circleImg} />
                            <div className="cartNumber">{count}</div>
                            <div className="cartLabel">購物車</div>
                        </div>
                    </div>

                    <div className="profile-container">
                        <picture>
                            <source media="(max-width: 1279px)" srcSet={memberMobileImg} />
                            <img className="profile" alt="Profile" src={memberImg} />
                            <img className="profile-hover" alt="Profile" src={memberHoverImg} />
                        </picture>
                        <div className="memberLabel">會員</div>

                    </div>
                </div>

            </div>


        </div>
    );
};

export default Header;
