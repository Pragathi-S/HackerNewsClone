import React from "react";
import axios from "axios";
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import "./PrivateScreen.css";
import { Link } from "react-router-dom";
import { FaRegClone } from "react-icons/fa";

// api for post data
const API_URL = "https://hacker-news.firebaseio.com/v0/topstories.json";

class PrivateScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      topposts: [],
      id: "",
      score: "",
      title: "",
      time: "",
      descendants: "",
      username: "",
      url: "",
      disableUpvote: false,
      disableUnvote: true,
    };
  }

  getPosts = async () => {
    // API Call to server and get all posts
    await axios.get(API_URL)
      .then(result => {
        this.results = result.data.slice(0, 30);
        const posts = [];
        this.results.forEach(element => {
          axios
            .get(
              "https://hacker-news.firebaseio.com/v0/item/" + element + ".json"
            )
            .then(result => {
              posts.push({
                id: result.data.id,
                title: result.data.title,
                score: result.data.score,
                username: result.data.by,
                time: result.data.time,
                descendants: result.data.descendants,
                url: result.data.url
              })

              // sorting posts according to number of upvotes
              const sortedposts = posts.sort((a, b) => (a.score < b.score) ? 1 : ((b.score < a.score) ? -1 : 0));
              this.setState({ topposts: sortedposts });
            })
            .catch(err => {
              console.log(err);
            });
        });
      })
      .catch(err => {
        console.log(err);
      });
  };


  componentDidMount = () => this.getPosts();


  // converting unix time to hours ago format
  postTime = (time) => {
    const milliseconds = time * 1000

    const dateObject = new Date(milliseconds)

    TimeAgo.addLocale(en);

    const timeAgo = new TimeAgo('en-US');

    return (timeAgo.format(dateObject - 2 * 60 * 60 * 1000));
  }


  // handling vote buttons
  upvote = () => {
    this.setState({ disableUpvote: true });
    this.setState({ disableUnvote: false });
    console.log("Upvoted");
  }

  unvote = () => {
    this.setState({ disableUnvote: true });
    this.setState({ disableUpvote: false });
    console.log("Unvoted");
  }


  render() {
    return (
      <>
        <div className="data-screen">

          <div className="header">
            <span className="brandname">Hacker News Clone <span><FaRegClone /></span></span><span className="logout-btn"><Link className="logout-btn" to="/dashboard" >Logout</Link></span>
          </div>

          <div className='posts' >
            {this.state.topposts.map((post) => {
              return (
                <p className="details" key={post.id}> <button className="upvote-btn" disabled={this.state.disableUpvote} onClick={this.upvote}><img src="https://news.ycombinator.com/grayarrow.gif" alt="upvote button"></img></button><a href={post.url} className="title" target="_blank" rel="noreferrer"> {post.title}</a><br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{post.score} points by {post.username}&nbsp;{this.postTime(post.time)} <button className="unvote-btn" disabled={this.state.disableUnvote} onClick={this.unvote}>| unvote</button>|&nbsp;<a href={`https://news.ycombinator.com/item?id=${post.id}`} target="_blank" rel="noreferrer" className="comments">{post.descendants}&nbsp;comments</a>
                </p>
              );
            })}
          </div>

        </div>
      </>
    )
  }
};

export default PrivateScreen;

