import React, { useState } from 'react';
import axios from 'axios';


const PostCard = (props) => {
    const [comments, setComments] = useState([]);
    const [showComments, setShowComments] = useState(false);
    const [commentsError, setCommentsError] = useState(false);
    const [loading, setLoading] = useState(true);
    const userId = props.userId;

    const data = props.postData;
    const seeCommentsHandler = async () => {
        if (showComments) {
            setShowComments(false);
        } else {
            setShowComments(true);
            if (comments.length === 0 || commentsError) {
                try {
                    const url = `https://dummyapi.io/data/v1/post/${data.id}/comment?limit=5`;
                    const response = await axios.get(url, {
                        headers: {
                            'app-id': '628c349e8a3a1d57ffc8437f'
                        }
                    });
                    if (response && response.data && response.data.data) {
                        setComments(response.data.data);
                    } else {
                        setCommentsError(true);
                    }
                } catch (error) {
                    setCommentsError(true);
                } finally {
                    setLoading(false);
                }
            }
        }

    };

    const addCommentsHandler = () => {
        //add comments for this post (using axios or fetch)
    };

    const commentsErrorMsg = <p>Something went wrong.</p>;
    const noCommentsFound = <p>This post has no comments yet.</p>;

    const commentsList = comments.map((comment) => {
        return <p>{comment.message}</p>
    });

    return (
        <div className="ui container comments">
            <div className="comment">
                <a href="/" className="avatar">
                    <img alt="avatar" src={data.owner.picture} />
                </a>
                <div className="content">
                    <h3 className="author">
                        {`${data.owner.firstName} ${data.owner.lastName}`}
                    </h3>
                    <div class="ui small image">
                        <img alt="post pic" src={data.image} />
                    </div>
                    <div className="text">
                        {data.text}
                    </div>
                    <div className="metadata">
                        <span className="date">{new Date(data.publishDate).toDateString()}</span>
                        <span>add likes count</span>
                    </div>
                    {/* add likes count somewhere */}
                    <div>
                        <div>
                            <button class="ui button" onClick={seeCommentsHandler}>
                                {showComments ? "Hide Comments" : "See Comments"}
                            </button>
                            <button class="ui button" onClick={addCommentsHandler}>Add comment</button>
                        </div>
                        {showComments && <div>
                            {
                                loading ? "Loading..." : 
                                commentsError ? commentsErrorMsg : 
                                comments.length === 0 ? noCommentsFound : 
                                commentsList
                            }
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostCard;