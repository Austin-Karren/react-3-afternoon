import React, { Component } from 'react';

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import Axios from 'axios';
import Post from './Post/Post'

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    Axios.get('https://practiceapi.devmountain.com/api/posts')
    .then(results => {
      this.setState({ posts: results.data })
    });
  }

  updatePost( id, text ) {
    Axios.put(`https://practiceapi.devmountain.com/api/posts?id=${ id }`, {text})
    .then( results => {
      this.setState({ posts: results.data });
    });
  }

  deletePost( id ) {
    Axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${ id }`)
    .then(results => {
      this.setState({ posts: results.data })
    })
  }

  createPost( text ) {
    Axios.post('https://practiceapi.devmountain.com/api/posts', { text })
    .then(results => {
      this.setState({ posts: results.data })
    })
  }

  render() {
    const { posts } = this.state;
    let displayPosts = posts.map(post => (
      <Post key={post.id} 
            text={post.text}
            date={post.date}
            id={post.id}
            updatePostFn={this.updatePost}
            deletePostFn={this.deletePost}/>
    ))

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose createPostFn={ this.createPost }/>

          {displayPosts}

        </section>
      </div>
    );
  }
}

export default App;
