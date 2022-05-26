import React, { Fragment, useEffect, useState, useRef } from 'react';
import axios from 'axios';
import PostCard from '../components/PostCard';
  
const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const firstRun = useRef(true);

  const getPosts = async () => {
    try {
      const response = await axios.get('https://dummyapi.io/data/v1/post?limit=15', {
        headers: {
          'app-id': '628c349e8a3a1d57ffc8437f'
        }
      })
      if (response && response.data && response.data.data) {

        setPosts(response.data.data);
      } else {

        // setUserData();
      }
    } catch (error) {
      // const userInfo = {
      //   ...userData,
      //   status: "error",
      // };
      // setUserData(userInfo);
      console.log(error);
    }

  }

  // load user profile info (axios)
  useEffect(() => {
    if (posts.length === 0 && firstRun.current) {
      firstRun.current = false;
      getPosts();
    }
  }, [posts]);

  // load list of post
  return (
      <div>
        {posts.map((singlePost) => <PostCard postData={singlePost}/>)}
      </div>
  );
};
  
export default Dashboard;