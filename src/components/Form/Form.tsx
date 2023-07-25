import { useRef } from 'react';
import ReactDOM from 'react-dom';

interface IForm {
  setFormOpen: (value: React.SetStateAction<boolean>) => void;
  comment: string;
  commentIndex: number;
}

export function Form({ setFormOpen, comment, commentIndex }: IForm) {
  const ref = useRef<HTMLDivElement>(null);

  function handleClick(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault();
    if(event.target === ref.current) {
      setFormOpen(false);
    }
  }

  const modalRoot = document.getElementById('modal-root');
  if(!modalRoot) return null;

  return ReactDOM.createPortal((
    <div onClick={handleClick} style={{ backgroundColor:  'rgba(0, 0, 0, 0.5)', }} className="position-fixed fixed-top d-flex align-items-center justify-content-center w-100 h-100" ref={ref}>
      <form className="bg-white p-5 rounded w-25">
        <div className="mb-3">
          <label htmlFor="value" className="form-label">Редактировать комментарий</label>
          <input type="text" id="value" className="form-control" value={comment}/>
        </div>
        <button type="submit" className="btn btn-success">Подтвердить</button>
      </form>
    </div>
  ), modalRoot);
}
