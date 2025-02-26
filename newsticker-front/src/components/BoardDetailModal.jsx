import { useEffect, useState } from "react";
import styled from "styled-components";
import api from "../api/axios.jsx";

function BoardDetailModal({ board, onClose, onDelete,user }) {
  if (!board) return null;
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editedComment, setEditedComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const newsId = board.id;
  
  
  const fetchComments = async () => {
    try {
      const response = await api.get(`/api/comment/news/${newsId}`);
      // 댓글 목록에 isReplyVisible을 각 댓글에 추가
      const commentsWithReplies = response.data.map((comment) => ({
        ...comment,
        content: comment.content.replace(/\+/g, " "), // 띄어쓰기 변환
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
  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const deleteBoard = async () => {

    console.log("현재 사용자 정보:", user);

    const isAdmin = user?.role === "ROLE_ADMIN";
    console.log("isAdmin 조건 결과:", isAdmin);

    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      const deleteUrl = isAdmin
          ? `/admin/users/news/${newsId}`  // 관리자 삭제 경로
          : `/news/${newsId}`;  // 일반 사용자 삭제 경로

      await api.delete(deleteUrl);
      alert("게시글이 삭제되었습니다.");
      onDelete(newsId);
      onClose();
    } catch (error) {
      console.log("게시글 삭제 실패", error);
      alert("게시글 삭제에 실패했습니다.");
    }
  };


  /*
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
  */

  const handleDeleteComment = async (commentId, commentUserId) => {
    try {
      const isAdmin = user?.role === "ROLE_ADMIN";
      console.log("isAdmin 조건 결과:", isAdmin);

      const deleteUrl = isAdmin
          ? `/admin/users/${commentUserId}/comments/${commentId}`
          : `/api/comment/?commentId=${commentId}`;

      await api.delete(deleteUrl);
      alert("댓글이 삭제되었습니다.");
      fetchComments(); // 댓글 목록 새로고침
    } catch (error) {
      console.log("댓글 삭제 실패", error);
      alert("댓글 삭제에 실패했습니다.");
    }
  };


  /*
  const handleDeleteComment = async (commentId) => {
    try {
      await api.delete(`/api/comment/?commentId=${commentId}`);
      fetchComments();
    } catch (error) {
      console.log("댓글 삭제 실패", error);
    }
  };
  */
  const handleEditComment = (commentId) => {
    const commentToEdit = comments.find(
      (comment) => comment.commentId === commentId
    );
    setEditingCommentId(commentId); // 현재 수정 중인 댓글 ID 설정
    setEditedComment(decodeURIComponent(commentToEdit.content)); // 수정할 댓글 내용 설정
  };
  const handleUpdateComment = async () => {
    if (editedComment.trim()) {
      try {
        await api.post(`/api/comment/?commentId=${editingCommentId}`, {
          content: editedComment,
        });
        setEditedComment(""); // 수정 후 입력창 비우기
        setEditingCommentId(null); // 수정 모드 종료
        fetchComments(); // 댓글 목록 새로고침
      } catch (error) {
        console.log("댓글 수정 실패", error);
      }
    } else {
      alert("댓글 내용을 입력해주세요.");
    }
  };

  const toggleReplyVisibility = (commentId) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.commentId === commentId
          ? { ...comment, isReplyVisible: !comment.isReplyVisible }
          : comment
      )
    );
    console.log(comments);
  };

  const analyzeSentiment = async (newsContent) => {
    setIsAnalyzing(true);
    setAnalysisResult(null);

    try {
      const response = await api.post("/news/analysis", { summary: newsContent });
      console.log("감정 분석 응답:", response.data);
      setAnalysisResult(response.data);
    } catch (error) {
      console.error("감정 분석 실패:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
        <Modal onClick={onClose}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <HeaderContainer>
              <Badge onClick={deleteBoard}>게시글 삭제</Badge>
              <CloseButton onClick={onClose}>X</CloseButton>
            </HeaderContainer>

        <Header>
          <NewsTitle>{board.title}</NewsTitle>
        </Header>
        <DateText>{new Date(board.date).toLocaleString()}</DateText>
        <SubInfo>{board.userName}</SubInfo>
        <analysisBox>
          <button
            className="analysis-btn"
            onClick={() => analyzeSentiment(board.description)}
            disabled={isAnalyzing}
          >
            {isAnalyzing ? "분석 중..." : "주가 영향 분석 결과 📊"}
          </button>
          {analysisResult && <p className="analysis-text">결과: {analysisResult}</p>}
        </analysisBox>

        <SectionTitle>기사 본문 요약</SectionTitle>
        <ContentBox>{board.description}</ContentBox>
        
        <SectionBoard>📌 내가 작성한 내용</SectionBoard>
        <ContentBox>{board.content}</ContentBox>
        
        <Form>
          <TextArea
            placeholder="댓글을 남겨주세요"
            value={newComment}
            onChange={handleCommentChange}
          />
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

              {user?.id == comment.userId ? (
                <EditButton
                  onClick={() => handleEditComment(comment.commentId)}
                >
                  수정
                </EditButton>
              ) : null}

              {(user?.id == comment.userId || user?.role === "ROLE_ADMIN") && (
                <DeleteButton onClick={() => handleDeleteComment(comment.commentId, comment.userId)}>
                  삭제
                </DeleteButton>
              )}

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
  z-index: 100;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between; /* 좌우 정렬 */
  align-items: center; /* 수직 정렬 */
  width: 100%;
`;

const ModalContent = styled.div`
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
  margin-bottom: 0;
`;

const DateText = styled.p`
  font-size: 14px;
  color: #6b7684;
  margin: 4px 0 4px;
`;

const SubInfo = styled.p`
  font-size: 13px;
  color: #9e9e9e;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #ccc; /* 아래쪽 선 */
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
const analysisBox = styled.button`
  background-color: #dfe8ff;
  color: #304ffe;
  padding: 8px 16px;
  font-size: 14px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
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
  padding: 16px;
  border-radius: 8px;
  font-size: 15px;
  line-height: 1.6;
  border: 1px solid #c4c4c4;
`;
const SectionBoard = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-top: 20px;
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
  background-color: #a62639;
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
  color: gray;
  border: none;
  padding: 5px;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  background-color: #fff;
`;
const EditButton = styled.button`
  font-size: 13px;
  background: none;
  border: none;
  color: #007bff;
  padding : 0;
  margin-right : 5px;
`;

const DeleteButton = styled.button`
  font-size: 13px;
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  padding: 0;
`;
