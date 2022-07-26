import React, { useState, useEffect } from 'react'
import '../Main.css'
import './Order.css'
import axios from 'axios'
import Collectibles from './Collectibles';
import { getCurrentUser } from '../Auth/Services/AuthService'
import Utility from './Utility';
import Banner from '../../Image/banner.jpg'
import Banner2 from '../../Image/banner2.jpg'
import { useSelector, useDispatch } from 'react-redux';
import { setProducts } from "../../redux/actions/productsActions";
import { BiMinusCircle, BiPlusCircle } from "react-icons/bi";
const OrderBody = () => {
  const [user, setUser] = useState("");
  useEffect(() => {
    setUser(getCurrentUser());
  }, []);
  const [Data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:9000/api/data")
      .then((response) => {
        setData(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  const filterid = Data.filter((element) => {
    return element.idUser === user._id
  })
  const filter = filterid.map((element) => {
    return element.avatar
  })
  const [ClickBut, SetClickBut] = useState("Collectibles")
  const [StateBan, setStateBan] = useState(false)
  setTimeout(() => {
    setStateBan(!StateBan);
  }, 5000)
  const [filSearch, setfilSearch] = useState("")
  const [btn, setBtn] = useState(false)
  const products = useSelector((state) => state.allReducer.products);
  const dispatch = useDispatch();
  const fetchProducts = async () => {
    const response = await axios
      .get("http://localhost:9000/api/seller")
      .catch((err) => {
        console.log("Err: ", err);
      });
    dispatch(setProducts(response.data));
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  const [Carts, setCarts] = useState([])
  const callbackFunction = (childData) => {
    setCarts(childData)
  }
  const [none, setNone] = useState("none")

  const [cartItems, setCartItems] = useState([]);
  const onAdd = (product) => {
    const exist = cartItems.find((x) => x._id === product._id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x._id === product._id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };
  const onRemove = (product) => {
    const exist = cartItems.find((x) => x._id === product._id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x._id !== product._id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x._id === product._id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };
  const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.Price, 0);
  const taxPrice = itemsPrice * 0.11;
  const shippingPrice = itemsPrice > 2000 ? 0 : 10;
  const totalPrice = itemsPrice + taxPrice + shippingPrice;
  return (
    <div className='Oder_Content'>
      <div className='Detail_Order'>
        <div className='Explore_BoxUser'>
          <div className='Explore'>
            <img src={StateBan == true ? Banner : Banner2} alt=""></img>
          </div>
          <div className='BoxUser'>
            <div className='boxed-child'>
              <img src={filter[0]} alt=""></img>
            </div>
          </div>
        </div>
        <div className='Order'>
          <div className='OrderSelect'>
            <li onClick={() => SetClickBut("Collectibles")} className={ClickBut === "Collectibles" ? "Coll" : "Col"}>
              <i class='bx bxl-react' ></i>
              <span className="links_name">Collectibles</span>
            </li>
            <li onClick={() => SetClickBut("Utility")} className={ClickBut === "Utility" ? "Utility" : null}>
              <i class='bx bxl-react' ></i>
              <span className="links_name">Utility</span>
            </li>

            <div id='overlay' style={{ display: none }}>
              <div id='cart__modal'>
                <div className='cart'>
                  <div className='cart__head'>
                    <p className='cart__head-title'>Cart</p>
                    <p className='cart__head-title'>Items Price: {itemsPrice} $</p>
                    <p className='cart__head-title'>Tax Price: {taxPrice} $</p>
                    <p className='cart__head-title'>Shipping Price: {shippingPrice} $</p>
                    <p className='cart__head-title' style={{ color: "#4d8796" }}>Total Price: {totalPrice} $</p>
                    <h5 className='close__btn' onClick={() => setNone("none")}>
                      X
                    </h5>
                  </div>
                  <div className='cart__list'>
                    {cartItems.map((element) => (
                      <div className='item_cart' key={element._id}>
                        <img src={element.ProductImg} alt="" />
                        <h5>Product Name: {element.ProductName}</h5>
                        <h5> {element.qty} x {element.Price} $</h5>
                        <h5>Total amount: {element.qty * element.Price} $</h5>
                        <div className='iconPM'>
                          <h5 onClick={() => onAdd(element)}>{<BiPlusCircle />}</h5>
                          <h5 onClick={() => onRemove(element)}>{<BiMinusCircle />}</h5>
                        </div>

                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className='Cart_shop'>
              <i class='bx bx-cart-alt' onClick={() => setNone("block")}></i>
              <h5>{cartItems.length}</h5>
            </div>

            <div className='Search_box'>
              <input className={btn === true ? "inputSearch active" : "inputSearch"} type='text' placeholder='Search ...' onChange={(e) => setfilSearch(
                e.target.value
              )} />
              <i onClick={() => {
                setBtn(!btn);
              }} class='bx bx-search-alt'></i>
            </div>

          </div>
          <div className='OrderNum'>
            {ClickBut === "Collectibles" && <Collectibles SearchData={filSearch} parentCallback={callbackFunction} onAdd={onAdd} />}
            {ClickBut === "Utility" && <Utility SearchData={filSearch} />}
          </div>
        </div>
      </div>
      <div className='Top_Artist'>
        <div className='TopSeller'></div>
        <div className='TopSeller'></div>
        <div className='TopSeller'></div>
        <div className='TopSeller'></div>
        <div className='TopSeller'></div>
      </div>
    </div>
  )
}

export default OrderBody