import React, { useState, useRef } from 'react';
import axios from 'axios';


const PostCard = (props) => {
    const [comments, setComments] = useState([]);
    const [showComments, setShowComments] = useState(false);
    const [commentsStatus, setCommentsStatus] = useState('empty');
    const [loading, setLoading] = useState(true);
    const inputCommentRef = useRef();
    const userId = props.userId;

    const data = props.postData;
    const seeCommentsHandler = async () => {
        if (showComments) {
            setShowComments(false);
        } else {
            setShowComments(true);
            if (comments.length === 0 || commentsStatus === "error") {
                try {
                    const url = `https://dummyapi.io/data/v1/post/${data.id}/comment?limit=5`;
                    const response = await axios.get(url, {
                        headers: {
                            'app-id': '628c349e8a3a1d57ffc8437f'
                        }
                    });
                    if (response && response.data && response.data.data) {
                        setComments(response.data.data);
                        setCommentsStatus("loaded");
                    } else {
                        setCommentsStatus("error");
                    }
                } catch (error) {
                    setCommentsStatus("error");
                } finally {
                    setLoading(false);
                }
            }
        }

    };

    const addCommentsHandler = async () => {
        //add comments for this post (using axios)
        const comment = inputCommentRef.current.value;
        if (comment && comment !== "") {
            try {
                const body = {
                    message: comment,
                    owner: data.owner.id,
                    post: data.id
                };
                const response = await axios.post('https://dummyapi.io/data/v1/comment/create', body, {
                    headers: {
                        'app-id': '628c349e8a3a1d57ffc8437f'
                    }
                })
                if (response && response.data && response.data.message) {
                    if (commentsStatus === "loaded") {
                        const originalComments = [...comments];
                        originalComments.push(response.data);
                        setComments(originalComments);
                    }
                } else {
                    console.log("Added comment failed");
                }
            } catch (error) {
                console.log("Added comment failed");
            } 
        }
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
                    <div className="ui small image">
                        <img alt="post pic" src={data.image} />
                    </div>
                    <div className="text">
                        {data.text}
                    </div>
                    <div className="metadata">
                        <span className="date">{new Date(data.publishDate).toDateString()}</span>
                        <span><i className="heart outline icon"></i>{data.likes}</span>
                    </div>
                    <div>
                        <div>
                            <button className="ui button" onClick={seeCommentsHandler}>
                                {showComments ? "Hide Comments" : "See Comments"}
                            </button>
                        </div>
                        {
                            userId !== "" &&
                            <div className="ui input">
                                <input 
                                    type="text" 
                                    placeholder="Add a comment..." 
                                    ref={inputCommentRef}
                                
                                />
                                <button className="mini ui button" onClick={addCommentsHandler}>
                                    Post comment
                                </button>
                            </div>
                        }
                        {showComments && <div>
                            {
                                loading ? "Loading..." :
                                    commentsStatus === "error" ? commentsErrorMsg :
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