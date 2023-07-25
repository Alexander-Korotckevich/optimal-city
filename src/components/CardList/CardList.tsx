import { useStoreon } from "storeon/react";
import { IEvents, IState } from "../../store/comments/comments";
import { Card } from "../Card";
import { useEffect } from "react";

export function CardList() {
  const { dispatch, comments } = useStoreon<IState, IEvents>('comments');

  useEffect(() => {
    dispatch('comments/get', comments);
  }, []);

  return (
    <ul className="container d-flex flex-wrap align-items-center justify-content-center py-4">
      { comments.error.length > 0 && <div>{comments.error}</div> }
      {comments.data.map((comment, index) => <Card data={comment} key={comment.id} index={index}/>)}
      { comments.loading && <div>Загрузка...</div> }
    </ul>
  );
}
