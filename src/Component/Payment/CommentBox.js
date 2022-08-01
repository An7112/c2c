import axios from "axios";
import React from "react";
import './Pay.css'
class CommentBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showComments: false,
      comments: [],
      username: this.props.user,
      productId: this.props.productId
    };
  }

  componentDidMount(e) {
    axios.get("http://localhost:9000/api/comments").then((res) => this.setState({ comments: res.data }))
    console.log(this.state.comments)
  }
  render() {
    const comments = this._getComments();
    let commentNodes;
    let buttonText = 'Show Comments';

    if (this.state.showComments) {
      buttonText = 'Hide Comments';
      commentNodes = <div className="comment-list">{comments}</div>;
    }
    const fill = this.state.comments.filter((element) => {
      return element.idProduct === this.state.productId
    })
    return (
      <div className="comment-box">
        <CommentForm addComment={this._addComment.bind(this)} username={this.state.username} productId={this.state.productId}/>
        <button id="comment-reveal" onClick={this._handleClick.bind(this)}>
          {buttonText}
        </button>
        <h4 className="comment-count">
          {this._getCommentsTitle(fill.length)}
        </h4>
        {commentNodes}
      </div>
    );
  }
  _addComment(author, content) {
    const comment = {
      id: this.state.comments.length + 1,
      author: this.state.username,
      content
    };
    this.setState({ comments: this.state.comments.concat([comment]) });
  }

  _handleClick() {
    this.setState({
      showComments: !this.state.showComments
    });
  }

  _getComments() {
    return this.state.comments.map((comment) => {
      if(comment.idProduct == this.state.productId){
        return (
          <Comment
            author={comment.author}
            body={comment.content}
          />
        );
      }else{
        return null

      }
      
    });
  }

  _getCommentsTitle(commentCount) {
    if (commentCount === 0) {
      return 'No comments yet';
    } else if (commentCount === 1) {
      return "1 comment";
    } else {
      return `${commentCount} comments`;
    }
  }
}

class CommentForm extends React.Component {

  render() {
    return (
      <form className="comment-form" onSubmit={this._handleSubmit.bind(this)}>
        <div className="comment-form-fields">
        <textarea placeholder="Comment" rows="4" required ref={(textarea) => this._body = textarea}></textarea>
        </div>
        <div className="comment-form-actions">
          <button type="submit">Post Comment</button>
        </div>
      </form>
    );
  }

  _handleSubmit(event) {
    event.preventDefault();
    let author = this.props.username;
    let body = this._body;
    this.props.addComment(author.value, body.value);
    let commentData = {
      author: this.props.username,
      content: body.value,
      idProduct: this.props.productId
    }
    axios.post("http://localhost:9000/api/comments", commentData)
  }
}
class Comment extends React.Component {
  render() {
    return (
      <div className="comment">
        
        <div className="comment-header">
        <i class='bx bxs-user-circle'></i>
          <p >{this.props.author}</p>
        </div>
        <div className="comment-body">
        <i class='bx bx-book-content'></i>
        <p >{this.props.body}</p>
        </div>
        
      </div>
    );
  }
}


export default CommentBox