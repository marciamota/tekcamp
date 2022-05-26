import React from 'react';

const PostCard = () => {
    const seeCommentsHandler = () => {
        //fetch comments for this post
    };

    const addCommentsHandler = () => {
        //add comments for this post (using axios or fetch)
    };

    return (
        <div className="ui container comments">
            <div className="comment">
                <a href="/" className="avatar">
                    <img alt="avatar" />
                </a>
                <div className="content">
                    <a href="/" className="author">
                        Sam
                    </a>
                    <div className="metadata">
                        <span className="date">Today at 6 p.m.</span>
                    </div>
                    <div className="text">
                        Nice blog post
                    </div>
                    {/* add likes count somewhere */}
                    <div>
                        <div>
                            <button onClick={seeCommentsHandler}>See comments</button>
                            <button onClick={addCommentsHandler}>Add comment</button>
                        </div>

                        comments...
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostCard;