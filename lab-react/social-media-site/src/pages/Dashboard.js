import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import PostCard from '../components/PostCard';
import FetchDataError from '../components/FetchDataError';
import Loader from '../components/Loader';
  
const Dashboard = (props) => {
  const [posts, setPosts] = useState([]);
  const [postsError, setPostsError] = useState(false);
  const [loading, setLoading] = useState(true);
  const firstRun = useRef(true);
  const userId = props.userId;

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
        setPostsError(true);
      }
    } catch (error) {
      setPostsError(true);
    } finally {
      setLoading(false);
    }

  }

  // load posts info (axios)
  useEffect(() => {
    if (posts.length === 0 && firstRun.current) {
      firstRun.current = false;
      getPosts();
    }
  }, [posts]);

  const postsCard = posts.map((singlePost) => <PostCard key={singlePost.id} postData={singlePost} userId={userId}/>);
  const noPostsFound = <div><p>No posts found.</p></div>;

  // load list of post
  return (
      <div>
        {
          loading ? <Loader /> : 
          postsError ? <FetchDataError /> : 
          posts.length ? postsCard : 
          noPostsFound
        }
      </div>
  );
};
  
export default Dashboard;