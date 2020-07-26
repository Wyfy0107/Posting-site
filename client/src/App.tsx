import React from "react";
import "./CSS/App.css";
import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";

const StatusBar = styled.div`
  display: flex;
  flex-flow: column;
  background: #242526;
  min-height: 100px;
  width: 500px;
  border-radius: 8px;
  margin: 3rem auto;
  align-items: center;
`;

const Input = styled.input`
  background: #4e4f50;
  height: 25px;
  width: 350px;
  border-radius: 8px;
  margin: auto;
  text-decoration: none;
  margin: auto;
`;

const Submit = styled.button`
  height: 20px;
  width: 50px;
  margin: 5px;
  background: #4294ff;
`;

const Delete = styled(Submit)`
  padding: 2px;
`;

const PostsArea = styled.div`
  margin: auto;
`;

const PostWrapper = styled.div`
  color: white;
  background: #242526;
  border-radius: 8px;
  width: 30vw;
  text-align: center;
  padding: 5px;
  margin: 0.7rem;
`;

function App() {
  const [posts, setPosts] = useState<any[]>([]);
  const [title, setTitle] = useState<string | null>(null);
  const [content, setContent] = useState<string | null>(null);

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = () => {
    axios
      .get("https://my-post-api.herokuapp.com/")
      .then((res) => setPosts(res.data))
      .catch((err) => console.log(err));
  };

  const submitPost = () => {
    if (title && content) {
      axios
        .post("https://my-post-api.herokuapp.com/", {
          title: title,
          content: content,
        })
        .then((res) => {
          console.log(res);
          fetchPost();
        })
        .catch((err) => console.log(err));
    } else {
      alert("please fill the Title and Content");
    }
  };

  const deletePost = (postID: string) => {
    axios
      .delete("https://my-post-api.herokuapp.com/", {
        data: { id: postID },
      })
      .then((res) => {
        console.log(res);
        fetchPost();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div style={{ display: "flex", flexFlow: "column" }}>
      <StatusBar>
        <Input
          placeholder='title'
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <Input
          placeholder='content'
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <Submit onClick={submitPost}>Post</Submit>
      </StatusBar>
      <PostsArea>
        {posts
          ? posts.map((post) => (
              <PostWrapper key={post._id}>
                <h2>{post.title}</h2>
                <p>{post.content}</p>
                <Delete onClick={() => deletePost(post._id)}>Delete</Delete>
              </PostWrapper>
            ))
          : null}
      </PostsArea>
    </div>
  );
}

export default App;
