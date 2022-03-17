import React, { useState } from "react";
import CommentItem from "../CommentItem/CommentItem";
import { useDispatch } from "react-redux";
import { actionCreators as commentActions } from "../../redux/modules/comment";

import {
  CommentListWrap,
  CancleBtn,
  CommentBtn,
  CommentInputWrap,
  CommnetInput,
  UserImg,
} from "./style";
import { useSelector } from "react-redux";

const CommentList = (props) => {
  const dispatch = useDispatch();

  const { comment_list } = props;
  const user = useSelector(state => state.user.user_info);
  const is_login = useSelector(state => state.user.is_login);

  const [comment, setComment] = useState("");

  const changeComment = (e) => {
    setComment(e.target.value);
  }

  const clickComment = () => {
    if(!comment) {
      window.alert("댓글을 작성해주세요!")
      return;
    }
    setComment("");
    dispatch(commentActions.addCommentDB(props.port_id, comment));
  }

  return (
    <CommentListWrap>
      <CommentInputWrap>
        { is_login ?
          <UserImg userImg={user.profile_img} />:
          <UserImg userImg="" />
        }
        <CommnetInput 
          type="text"
          placeholder="댓글을 입력해주세요"
          onChange={changeComment} 
          value={comment}
        />
        <CommentBtn 
          onClick={clickComment}
        >
          완료
        </CommentBtn>
        <CancleBtn
          onClick={() => {
            setComment("");
          }}
        >
          취소
        </CancleBtn>
      </CommentInputWrap>

      {comment_list.map((c, i) => {
        return <CommentItem key={i} {...c} />;
      })}
    </CommentListWrap>
  );
};

export default CommentList;