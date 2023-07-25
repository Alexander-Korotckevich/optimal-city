import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { useStoreon } from 'storeon/react';
import { IEvents, IState } from '../../store/comments/comments';

interface IForm {
  setFormOpen: (value: React.SetStateAction<boolean>) => void;
  comment: string;
  index: number;
}

export function Form({ setFormOpen, comment, index }: IForm) {
  const ref = useRef<HTMLDivElement>(null);
  const refInput = useRef<HTMLInputElement>(null);
  const { dispatch } = useStoreon<IState, IEvents>('comments');
  const [commentValue, setCommentValue] = useState(comment);
  const [isDisabled, setDisabled] = useState(true);

  useEffect(() => {
    if (refInput.current) {
      refInput.current.focus();
    }
  }, [refInput]);

  function handleClick(event: React.MouseEvent<HTMLElement>) {
    if (event.target === ref.current) {
      setFormOpen(false);
    }
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    dispatch('comments/change', { commentValue, index });
    setFormOpen(false);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setCommentValue(event.target.value);
    setDisabled(false);
  }

  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <div
      onClick={handleClick}
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      className="position-fixed fixed-top d-flex align-items-center justify-content-center w-100 h-100"
      ref={ref}>
      <form
        className="bg-white p-5 rounded w-50"
        onSubmit={handleSubmit}>
        <div className="mb-3">
          <label
            htmlFor="value"
            className="form-label">
            Редактировать комментарий
          </label>
          <input
            type="text"
            id="value"
            className="form-control"
            value={commentValue}
            onChange={handleChange}
            ref={refInput}
          />
        </div>
        <button
          type="submit"
          disabled={isDisabled}
          className="btn btn-success">
          Подтвердить
        </button>
      </form>
    </div>,
    modalRoot
  );
}
