import React, { useEffect, useState } from 'react'
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { Modal } from 'antd';
import CommentForm from '../../forms/CommentForm';
import axios from 'axios';
import CommentCard from '../../card/CommentCard';

function Comment({postId}) {

  const [isModal, setIsModal] = useState(false);
  const [comment, setComment] = useState("");
  const [showComments, setShowComment] = useState([]);

  const commentSubmit = async () =>{
    // console.log(comment, postId);
    try {
      const {data} = await axios.put("/add-comment",{comment, postId});
      // console.log(data.comments);
      setShowComment(data.comments);
      console.log(showComments);
      setComment("");
    } catch (error) {
      console.log("commentSubmit =>", error);
    }
  }

  // const handleDelete = async (postId, comment) =>{
  //     console.log(postId, comment)
  // }

  return (
    <>
    <div onClick={() => setIsModal(true)} className='pointer'>
      <ChatBubbleOutlineIcon className="text-danger mx-1" />
      <span className="mx-2"> {showComments.length} comments</span>
    </div>
    <Modal
      title="Comments"
      open={isModal}
      onCancel={() => setIsModal(false)}
      footer={null}
    >
      {/* { <span className='text-dark'>{postId}</span> } */}
      <CommentForm comment={comment} setComment={setComment} commentSubmit={commentSubmit} />
      <br />
      <CommentCard posts={showComments} />
      
    </Modal>
    </>
  )
}

export default Comment
