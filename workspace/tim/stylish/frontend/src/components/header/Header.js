import React,{useState} from "react";
import "./header.css";
import { useNavigate } from 'react-router-dom';
import { CategoryBtn } from "../../styled-components/CategoryBtn";
const Header = ({ refetch, onSearchChange}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

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
                <img className="logo" alt="Logo" src={"img/logo.png"} />
                <div className="rwdHeaderContainer">
                    <img className="rwdLogo" alt="Logo" src={"img/logo.png"} />
                    <img className="rwdSearchImg" src={"img/search.png"} />
                </div>
                <div className="categories">
                    <CategoryBtn onClick={() => handleCategory("women")} ><span className="single">女裝</span></CategoryBtn>
                    <CategoryBtn onClick={() => handleCategory("men")} ><span className="single">男裝</span></CategoryBtn>
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
                        <img className="searchImg" alt="searchImg" src={"img/search.png"} />
                    </div>
                </div>
                <div className="header_bottom">
                    <div className="cartBox">
                        <div className="cartLabelContainer">
                            <div className="cart-container">
                                <picture>
                                    <source media="(max-width: 1279px)" srcset="./img/cart-mobile.png" />
                                    <img className="cart" alt="Cart" src={"img/cart.png"} />
                                    <img className="cart-hover" alt="Cart" src={"img/cart-hover.png"} />
                                </picture>

                            </div>
                            <img className="circle" alt="Circle" src={"img/circle.svg"} />
                            <div className="cartNumber">1</div>
                            <div className="cartLabel">購物車</div>
                        </div>
                    </div>

                    <div class="profile-container">
                        <picture>
                            <source media="(max-width: 1279px)" srcset="./img/member-mobile.png" />
                            <img className="profile" alt="Profile" src={"img/member.png"} />
                            <img className="profile-hover" alt="Profile" src={"img/member-hover.png"} />
                        </picture>
                        <div className="memberLabel">會員</div>

                    </div>
                </div>

            </div>


        </div>
    );
};

export default Header;
