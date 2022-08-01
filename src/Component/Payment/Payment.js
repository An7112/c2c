import React, { useEffect, useState } from 'react'
import HeaderMain from '../Header'
import MainMenu from '../Main'
import BoxSeller from '../UserShop/BoxSeller'
import axios from 'axios'
import { useParams } from "react-router-dom"
import './Pay.css'
import Countdown from "react-countdown";
import buyerAva from '../../Image/pet8.png'
import { ethers } from "ethers";
import calculateCountdownFromNow from "./utils";
import CommentBox from './CommentBox'
import { useSelector } from 'react-redux'
const countdownDate = "2022-07-28 22:00";
const startPayment = async ({ setError, setTxs, ether, addr }) => {
    try {
        if (!window.ethereum)
            throw new Error("No crypto wallet found. Please install it.");
        await window.ethereum.send("eth_requestAccounts");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        ethers.utils.getAddress(addr);
        const tx = await signer.sendTransaction({
            to: addr,
            value: ethers.utils.parseEther(ether),
        });
        console.log({ ether, addr });
        console.log("tx", tx);
        setTxs([tx]);
    } catch (err) {
        setError(err.message);
    }
};
function Payment() {
    const user = useSelector((state) => state.allReducer.user);
    const [error, setError] = useState();
    const [txs, setTxs] = useState([]);
    const [DataPay, setDataPay] = useState([])
    const { _id } = useParams();
    useEffect(() => {
        axios.get('http://localhost:9000/api/seller/' + _id).then(res => setDataPay(res.data))
    })
    const PriceDo = DataPay.Price * 145653
    const [
        {
            expired,
            values: { days, hours, minutes, seconds }
        },
        setResult
    ] = useState(() => calculateCountdownFromNow(countdownDate));

    useEffect(() => {
        if (expired) return undefined;
        const intervalId = setInterval(
            () => setResult(calculateCountdownFromNow(countdownDate)),
            1000
        );
        return () => {
            clearInterval(intervalId);
        };
    }, [expired]);

    const [Address, setaddress] = useState('')
    useEffect(() => {
        window.ethereum.request({ method: "eth_requestAccounts" })
            .then((res) => setaddress(res[0]));
    })
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        setError();
        await startPayment({
            setError,
            setTxs,
            ether: data.get("ether"),
            addr: data.get("addr"),
        });
    };
    return (
        <div>
            <MainMenu />
            <div className="home_content">
                <HeaderMain />
                <div className='shop_content'>
                    <div className='box_detail'>
                        <div className='box_img'>
                            <img src={DataPay.ProductImg} alt="" />
                            <div className='box_img_left'>
                                <div className='detail_text'>
                                    <i class='bx bxl-sketch'></i>
                                    <h3>{DataPay.ProductName}</h3>
                                </div>
                                <div className='detail_text'>
                                    <i class='bx bxl-sketch'></i>
                                    <h5>{DataPay.ProductTitle}</h5>
                                </div>
                                <div className='detail_text'>
                                    <i class='bx bxl-sketch'></i>
                                    <h5>{DataPay.ProductDetail}</h5>
                                </div>
                                <button>View Shop</button>
                                <div className='box_text'>
                                    <h5>42K +</h5>
                                    <p>Interested users</p>
                                </div>
                                <div className='box_text'>
                                    <h5>42K +</h5>
                                    <p>Interested users</p>
                                </div>
                                <div className='box_text'>
                                    <h5>42K +</h5>
                                    <p>Interested users</p>
                                </div>
                            </div>
                            <form className='box_img_right' onSubmit={handleSubmit}>

                                <div className='box_img_right_detail'>
                                    <input name='ether' value={DataPay.Price} style={{ display: 'none' }} />
                                    <p>Price Item</p>
                                    <h3>{DataPay.Price} ETH</h3>
                                    <h5>= {PriceDo} $</h5>
                                    <input name='addr' value={"0x196b5AEb4a7d8894B753A9810F4BFd909e5E9C39"} style={{ display: 'none' }} />
                                </div>
                                <div className='box_img_right_detail borderEdge'>
                                    <p>flash sale ends later</p>
                                    <h5> {expired ? "The End!" : `${days}d ${hours}h ${minutes}m ${seconds}s`}</h5>
                                </div>
                                <div className='box_img_right_detail buttonBuy'>
                                    <button type="submit">Buy now</button>
                                </div>
                            </form>
                        </div>
                        <div className='box_comment'>
                            <div className='header_review'>
                                <h5>US PRODUCT REVIEW </h5>
                                <i class='bx bx-pencil'></i>
                            </div>
                            <div className='box_review'>
                                <CommentBox user={user.name} productId={_id}/>
                            </div>
                        </div>
                    </div>
                </div>
                {error && (
                    <div class="alert alert-danger" role="alert">
                        <i class='bx bx-message-error'></i>
                        {error}
                    </div>
                )}
                {!error && null}
                {txs.length !== 0 ? <div class="alert alert-success" role="alert">
                    <i class='bx bx-message-error'></i>
                    {txs}
                </div> : null}

            </div>
        </div >
    )
}

export default Payment