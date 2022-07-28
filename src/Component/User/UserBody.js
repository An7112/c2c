import React, { useState, useEffect, Component } from "react";
import HeaderMain from "../Header";
import { getCurrentUser } from "../Auth/Services/AuthService";
import axios from "axios";
import "./Userbody.css";
import UpdateUser from "./UpdateUser";
import CreateUser from "./CreateUser";
import moment from "moment";
import ReactPaginate from "react-paginate";
import {ethers} from 'ethers'
function withRouter(Component) {
  function ComponentWithRouter(props) {
    const [user, setUser] = useState("");
    useEffect(() => {
      setUser(getCurrentUser());
    }, []);
    console.log(user)
    const [Data, setData] = useState([]);
    useEffect(() => {
      axios
        .get("http://localhost:9000/api/data")
        .then((response) => {
          console.log(response.data)
          setData(response.data)
        })
        .catch(function (error) {
          console.log(error);
        });
    }, []);
    const filterid = Data.filter((element) => {
      return element.idUser === user._id
    })
    console.log(Data)
    return <Component {...props} user={user} filterid={filterid} />;
  }
  return ComponentWithRouter;
}
class UserBody extends Component {

  constructor(props) {
    super(props)

    this.state = {
      edit: false,
      data: null,
      address:'',
      Balance:null,
      addressState:""
    }
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
      if (window.ethereum) {
        window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then((res) => {accountChangeHandler(res[0]); this.setState({addressState: res[0]})});
      }
    const getbalance = (address) => {
      window.ethereum
        .request({ 
          method: "eth_getBalance", 
          params: [address, "latest"] 
        })
        .then((balance) => {
          this.setState({
            Balance: ethers.utils.formatEther(balance),
          });
        });
    };
    const accountChangeHandler = (account) => {
      this.setState({
        address: account,
      });
      getbalance(account);
    };
  }
  onSubmit(){
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((res) => accountChangeHandler(res[0]));
        
    } else {
      alert("install metamask extension!!");
    }
  const getbalance = (address) => {
    window.ethereum
      .request({ 
        method: "eth_getBalance", 
        params: [address, "latest"] 
      })
      .then((balance) => {
        this.setState({
          Balance: ethers.utils.formatEther(balance),
        });
      });
  };
  const accountChangeHandler = (account) => {
    this.setState({
      address: account,
    });
    getbalance(account);
  };
  }
  render() {
    console.log(this.state.address)
    const UserID = this.props.filterid.map((userD) => (
      userD.userId
    ))
    console.log(this.state.data)
    return (
      <div className="home_content">
        <HeaderMain />
        {this.props.user && (
          <div className="UserBody">
            <div className="user_detail_Information">
              <div className="table_user">
                {this.state.edit === false ? (
                  <div className="Avatar_user">
                    {this.props.filterid.map((userD) => (
                      <div className="Avatar" key={userD._id}>
                        <img className="avataruser" src={userD.avatar} alt=""></img>
                      </div>
                    ))}
                    <i class="bx bxs-edit-alt" onClick={() => this.setState({
                      edit: true
                    })}></i>
                    <div className="username_box">
                      <i class="bx bx-user"></i>
                      <h4>{this.props.user.name}</h4>
                    </div>
                  </div>
                ) : (
                  <div className="Avatar_user">
                    <i
                      class="bx bx-window-close"
                      onClick={() => this.setState({
                        edit: false
                      })}
                    ></i>
                    {UserID.length > 0 ? <UpdateUser /> : <CreateUser />}
                  </div>
                )}
                <div className="list_box_user"></div>
                <div className="list_box_user"></div>
                <div className="list_box_user"></div>
              </div>
            </div>

            <div className="user_detail_earn">
              <div className="list_earn">
                <div className="list_earn_child">
                  {this.state.address === this.state.addressState ? <i class="bx bxs-credit-card" onClick={this.onSubmit} ></i> :  <i class="bx bxs-credit-card" onClick={this.onSubmit} style={{color:'red'}}></i>}
                  <h5>{this.state.address}</h5>
                </div>
                <div className="list_earn_child">
                  <i class="bx bxs-wallet-alt"></i>
                  <h5>{this.state.Balance} ETH</h5>
                </div>
                <div className="list_earn_child">
                  <i class="bx bxs-color"></i>
                </div>
              </div>
              <div className="purchase_box">
                <div className="pay_history_header"><h3>Payment History</h3></div>
                <div className="pay_history"></div>
              </div>
            </div>
          </div>
        )}
        {!this.props.user && (
          <div className="UserBody">
            <div className="user_detail_Information">
              <div className="table_user">
                {this.state.edit == false ? (
                  <div className="Avatar_user">
                    <div className="Avatar"></div>
                    <i class="bx bxs-edit-alt" onClick={() => this.setState({
                      edit: true
                    })}></i>
                    <div className="username_box">
                      <i class="bx bx-user"></i>
                    </div>
                  </div>
                ) : (
                  <div className="Avatar_user">
                    <i
                      class="bx bx-window-close"
                      onClick={() => this.setState({
                        edit: false
                      })}
                    ></i>
                    <input type="file" name="file" id="file" class="inputfile" />
                    <label for="file">
                      <i class="bx bx-folder-open"></i>Choose a file
                    </label>
                  </div>
                )}

                <div className="list_box_user"></div>
                <div className="list_box_user"></div>
                <div className="list_box_user"></div>
              </div>
            </div>
            <div className="user_detail_earn">
              <div className="list_earn">
                <div className="list_earn_child">
                  <i class="bx bxs-credit-card"></i>
                 
                </div>
                <div className="list_earn_child">
                  <i class="bx bxs-wallet-alt"></i>
                </div>
                <div className="list_earn_child">
                  <i class="bx bxs-color"></i>
                </div>
              </div>
              <div className="purchase_box"></div>
            </div>
          </div>
        )}
      </div>
    );
  }
};

export default withRouter(UserBody);
