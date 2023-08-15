import React, { useContext } from "react";
import { Button } from "antd";
import { UserContext } from "../../context";
import "./form.css";

const CommentForm = ({ comment, setComment, commentSubmit }) => {
  const [state, setState] = useContext(UserContext);

  return (
    <div className="comment-form card p-2 border border-dark" style={{ backgroundColor: "#041633" }}>
      <form name="createPostForm" className="d-flex align-items-center">
        <textarea
          className="form-control flex-grow-1"
          placeholder="What's happening?"
          rows={3}
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          style={{
            backgroundColor: "#040c25",
            color: "white",
            border: "none",
            resize: "none",
          }}
        />
        <Button
          type="primary"
          className="ms-2 custom-placeholder-color"
          style={{ color: "#666", height: "100%" }}
          disabled={comment.trim() === ""}
          onClick={commentSubmit}
        >
          Comment
        </Button>
      </form>
    </div>
  );
};

export default CommentForm;
