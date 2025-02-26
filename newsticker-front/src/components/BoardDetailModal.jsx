import { useEffect, useState } from "react";
import styled from "styled-components";
import api from "../api/axios.jsx";

function BoardDetailModal({ board, onClose, user }) {
  if (!board) return null;
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editedComment, setEditedComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const newsId = board.id;
  
  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };
  const fetchComments = async () => {
    try {
      const response = await api.get(`/api/comment/news/${newsId}`);
      // 댓글 목록에 isReplyVisible을 각 댓글에 추가
      const commentsWithReplies = response.data.map(comment => ({
        ...comment,
        isReplyVisible: false, // 초기값은 false
      }));
      setComments(commentsWithReplies);
    } catch (error) {
      console.log("댓글 조회 실패", error);
    }
  };
  
  useEffect(() => {
    if (newsId) {
      fetchComments();
    }
    
  }, [newsId]);

  const handleSubmit = async () => {
    if (newComment.trim()) {
      try {
        await api.post(`/api/comment/${newsId}`, {
          content: newComment, // 입력된 댓글 내용
        });
        setNewComment(""); // 댓글 작성 후 입력창 비우기
        fetchComments(); // 댓글 목록 새로고침
      } catch (error) {
        console.log("댓글 작성 실패", error);
      }
    } else {
      alert("댓글 내용을 입력해주세요.");
    }
  };

  const deleteBoard = async () => {
    if (!window.confirm("정말 삭제하시겠습니다?")) return;

    try {
      await api.delete(`/news/${newsId}`);
      alert("게시글이 삭제되었습니다.");
      onDelete(newsId);
      onClose();
    } catch (error) {
      console.log("게시글 삭제 실패", error);
      alert("게시글 삭제에 실패했습니다.");
    }
  };

  const handleDeleteComment = async (commentId) => {
    try{
      await api.delete(`/api/comment/?commentId=${commentId}`);
      fetchComments();
    }catch(error){
      console.log("댓글 삭제 실패", error);
    }
  };
  const handleEditComment = (commentId) => {
    const commentToEdit = comments.find(comment => comment.commentId === commentId);
    setEditingCommentId(commentId);  // 현재 수정 중인 댓글 ID 설정
    setEditedComment(decodeURIComponent(commentToEdit.content));  // 수정할 댓글 내용 설정
  };
  const handleUpdateComment = async () => {
    if (editedComment.trim()) {
      try {
        await api.post(`/api/comment/?commentId=${editingCommentId}`, {
          content: editedComment,
        });
        setEditedComment("");  // 수정 후 입력창 비우기
        setEditingCommentId(null);  // 수정 모드 종료
        fetchComments();  // 댓글 목록 새로고침
      } catch (error) {
        console.log("댓글 수정 실패", error);
      }
    } else {
      alert("댓글 내용을 입력해주세요.");
    }
  };

  const toggleReplyVisibility = (commentId) => {
    setComments(prevComments =>
      prevComments.map(comment =>
        comment.commentId === commentId ? { ...comment, isReplyVisible: !comment.isReplyVisible }
          : comment
      )
    );
    console.log(comments)
  };

  return (
    <Modal onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <Header>
          <NewsTitle>{board.title}</NewsTitle>
          <Badge onClick={deleteBoard}>게시글 삭제</Badge>
        </Header>
        <DateText>{new Date(board.date).toLocaleString()}</DateText>
        <SubInfo>{board.userName}</SubInfo>

        <AnalysisButton>"감정 분석 결과 📊"</AnalysisButton>

        <SectionTitle>기사 본문 요약</SectionTitle>
        <ContentBox>{board.content}</ContentBox>

        <Form>
          <TextArea placeholder="댓글을 남겨주세요" value={newComment} onChange={handleCommentChange} />
          <SubmitButton type="button" onClick={handleSubmit}>
            등록하기
          </SubmitButton>
        </Form>

        <CommentSection>
          {comments.map((comment) => (
            // console.log(comment),
            <Comment key={comment.commentId}>
              <CommentAuthor>{comment.username}</CommentAuthor>
              <CommentText>{decodeURIComponent(comment.content)}</CommentText>
              
              { user?.id == comment.userId ? 
              <EditButton onClick={() => handleEditComment(comment.commentId)}>수정</EditButton>
               : null
              }
              { user?.id == comment.userId ?
                <DeleteButton onClick={() => handleDeleteComment(comment.commentId)}>삭제</DeleteButton>
                : null
              }
              {editingCommentId === comment.commentId && (
                <Form>
                  <TextArea
                    placeholder="Edit Comment"
                    value={editedComment}
                    onChange={(e) => setEditedComment(e.target.value)}
                  />
                  <SubmitButton type="button" onClick={handleUpdateComment}>
                    수정하기
                  </SubmitButton>
                </Form>
              )}
              
              {/* <ToggleReplyButton onClick={() => toggleReplyVisibility(comment.commentId)}>
                {comment.isReplyVisible ? "Hide Replies" : "Show Replies"}
              </ToggleReplyButton> */}

              {/* {comment.isReplyVisible && (
                <ReplySection>
                  <CommentAuthor>관리자</CommentAuthor>
                  <CommentText>감사합니다!</CommentText>
                  <Form>
                    <TextArea placeholder="Reply" />
                    <SubmitButton type="button" onClick={handleSubmit}>
                      등록하기
                    </SubmitButton>
                  </Form>
                </ReplySection>
              )} */}
            </Comment>
          ))}
        </CommentSection>

        <CloseButton onClick={onClose}>X</CloseButton>
      </ModalContent>
    </Modal>
  );
}

export default BoardDetailModal;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  position: relative;
  background: white;
  padding: 24px 28px;
  border-radius: 16px;
  width: 650px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NewsTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 4px;
`;

const DateText = styled.p`
  font-size: 14px;
  color: #6b7684;
  margin-bottom: 4px;
`;

const SubInfo = styled.p`
  font-size: 13px;
  color: #9e9e9e;
  margin-bottom: 8px;
`;

const Badge = styled.button`
  background-color: #a62639;
  color: white;
  padding: 6px 12px;
  font-size: 13px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
`;

const AnalysisButton = styled.button`
  background-color: #dfe8ff;
  color: #304ffe;
  padding: 8px 16px;
  font-size: 14px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  margin: 16px 0;
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin: 20px 0 10px;
  display: flex;
  align-items: center;

  &::before {
    content: "📌";
    margin-right: 6px;
  }
`;

const ContentBox = styled.div`
  background-color: #6b7684;
  color: white;
  padding: 16px;
  border-radius: 10px;
  font-size: 15px;
  line-height: 1.6;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 12px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 90px;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #c4c4c4;
  font-size: 14px;
  resize: none;
  margin-top: 8px;
`;

const SubmitButton = styled.button`
  margin-top: 10px;
  padding: 10px;
  background-color: #007bff;
  color: white;
  font-size: 14px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

const CommentSection = styled.div`
  margin-top: 24px;
  border-top: 1px solid #e0e0e0;
  padding-top: 16px;
`;

const Comment = styled.div`
  margin-bottom: 14px;
  padding: 12px;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CommentAuthor = styled.p`
  font-weight: bold;
  font-size: 14px;
`;

const CommentText = styled.p`
  font-size: 14px;
  margin-top: 4px;
`;

const ToggleReplyButton = styled.button`
  margin-top: 6px;
  font-size: 13px;
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
`;

const ReplySection = styled.div`
  margin-top: 12px;
  padding-left: 16px;
  border-left: 2px solid #dfe6e9;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: none;
  border: none;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  color: #6b7684;
`;

const EditButton = styled.button`
  margin-top: 6px;
  font-size: 13px;
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
`;

const DeleteButton = styled.button`
margin-top: 6px;
  font-size: 13px;
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
`;