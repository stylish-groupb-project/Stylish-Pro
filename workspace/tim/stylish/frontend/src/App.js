
// import './app.css';
import Header from './components/Header';
import { Footer } from './components/Footer';
import Main from './components/Main';

function App() {
  return (
    <div>
      <Header
        profile="./img/member.png"
        cart="./img/cart.png"
        split="./img/split.svg"
        search="./img/search.png"
        logo="./img/logo.png"
        circle="./img/circle.svg"
        profileHover="./img/member-hover.png"
        cartHover="./img/cart-hover.png"
      />
      <Main />
      <Footer 
        facebook="./img/facebook.png"
        line="./img/line.png"
        twitter="./img/twitter.png"
        split="./img/split.svg"
      />
    </div>

  );
}

export default App;
