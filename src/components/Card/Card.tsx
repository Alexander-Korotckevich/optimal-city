import { useState } from 'react';
import { IComment } from '../../store/comments/comments';
import { Form } from '../Form';

interface ICardData {
  data: IComment;
  index: number;
}

export function Card({ data, index }: ICardData) {
  const [isFormOpen, setFormOpen] = useState<boolean>(false);

  function handleClick(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault();
    setFormOpen(true);
  }

  return (
    <li className="card mb-2 w-75 p-2">
      <div className="card-body">
      <h3 className="card-title">{data.name}</h3>
        <p className="cart-text">{data.value}</p>
        <button className="btn btn-primary" onClick={handleClick}>Редактировать</button>
      </div>

      {isFormOpen && <Form setFormOpen={setFormOpen} comment={data.value} commentIndex={index}/>}
    </li>

  );
}
