import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./DashboardScreen.css";
import { FaRegClone } from "react-icons/fa";

// To convert Unix timestamp to hours ago format
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'


const API_URL = "https://hacker-news.firebaseio.com/v0/topstories.json";

class DashboardScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      topposts: [],
      id: "",
      score: "",
      title: "",
      time: "",
      descendants: "",
      username: ""
    };
  }

  componentDidMount = () => this.getPosts();


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

              // Sorting the posts according to the upvotes score
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

  // Converting post time to hours ago format
  postTime = (time) => {
    const milliseconds = time * 1000

    const dateObject = new Date(milliseconds)

    TimeAgo.addLocale(en);

    const timeAgo = new TimeAgo('en-US');

    return (timeAgo.format(dateObject - 2 * 60 * 60 * 1000));
  }

  render() {
    return (
      <>
        <div className="data-screen">
          <div className="header">
            <span className="brandname">Hacker News Clone <span><FaRegClone /></span></span><span><Link to="/login" className="login-btn">Login</Link></span>
          </div>
          <div className='posts'>
            {this.state.topposts.map((post) => {
              return (
                <p className="details" key={post.id}><Link to="/login" className="upvote-btn"><img src="https://news.ycombinator.com/grayarrow.gif" alt="upvote button"></img></Link><a className="title" href={post.url} target="_blank" rel="noreferrer"> {post.title}</a><br />
                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{post.score} points by {post.username}&nbsp; {this.postTime(post.time)}&nbsp;|&nbsp;<Link to="/login" className="comments">{post.descendants}&nbsp;comments</Link>
                </p>
              );
            })}
          </div>
        </div>
      </>
    )
  }
};


export default DashboardScreen;








