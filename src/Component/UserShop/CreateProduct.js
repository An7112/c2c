import React, { Component, useEffect, useState } from 'react'
import axios from 'axios'
import { getCurrentUser } from '../Auth/Services/AuthService'
import MessageLogin from '../MessageLogin'
function withRouter(Component) {
    function ComponentWithRouter(props) {
        const [user, setUser] = useState('')
        useEffect(() => {
            setUser(getCurrentUser())
        }, [])
        return <Component {...props} user={user} idUser={user._id}/>
    }
    return ComponentWithRouter
}
class CreateProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ProductName: "",
            ProductTitle: "",
            ProductDetail: "",
            IMG:""
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.onProductName = this.onProductName.bind(this)
        this.onProductTitle = this.onProductTitle.bind(this)
        this.onProductDetail = this.onProductDetail.bind(this)
        this.onFileChange = this.onFileChange.bind(this);
    }
    onFileChange(e) {
        this.setState({
            ProductImg: e.target.files[0],
            IMG: URL.createObjectURL(e.target.files[0])
        })
    }
    onProductName(e) {
        this.setState({
            ProductName: e.target.value
        })
    }
    onProductTitle(e) {
        this.setState({
            ProductTitle: e.target.value
        })
    }
    onProductDetail(e) {
        this.setState({
            ProductDetail: e.target.value
        })
    }
    onSubmit(e) {
        e.preventDefault()
        const CreatePr = new FormData()
        CreatePr.append('ProductImg', this.state.ProductImg)
        CreatePr.append('IdSeller', this.props.user._id)
        CreatePr.append('ProductName', this.state.ProductName)
        CreatePr.append('ProductTitle', this.state.ProductTitle)
        CreatePr.append('ProductDetail', this.state.ProductDetail)
        axios.post('http://localhost:9000/api/seller', CreatePr).then(res => console.log(res.data))
        this.setState({
            ProductName: "",
            ProductTitle: "",
            ProductDetail: ""
        })
    }
    render() {
        return (
            <div>
                {this.props.user &&(
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Choose a photo for the product</label>
                            <input type='file' onChange={this.onFileChange}/>
                        </div>
                        <div>
                            <img src={this.state.IMG} alt=""/>
                        </div>
                        <div className="form-group">
                            <label>Choose a name for the product</label>
                            <input value={this.state.ProductName} onChange={this.onProductName}/>
                        </div>
                        <div className="form-group">
                            <label>Choose a title for the product</label>
                            <input value={this.state.ProductTitle} onChange={this.onProductTitle}/>
                        </div>
                        <div className="form-group">
                            <label>Choose a detail for the product</label>
                            <input value={this.state.ProductDetail} onChange={this.onProductDetail}/>
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Register Product" className="btn btn-primary" />
                        </div>
                    </form>
                )}
                {!this.props.user && (
                    <MessageLogin/>
                )}
            </div>
        )
    }
}

export default withRouter(CreateProduct)