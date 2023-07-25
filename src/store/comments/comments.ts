import axios from 'axios';
import { StoreonModule } from 'storeon';

export interface ICommentsData {
  loading: boolean;
  data: Array<IComment> | Array<never>,
  error: '',
}

export interface ICommentData {
  postId: string;
  id: string;
  name: string;
  email: string;
  body: string;
}

export interface IComment {
  name: string;
  value: string;
  id: string;
}

export interface IState {
  comments: ICommentsData;
}

export interface IEvents {
  '@init': IState;
  'comments/set': ICommentsData;
  'comments/get': ICommentsData;
}

export const initialState: ICommentsData = {
  loading: false,
  data: [],
  error: '',
}

export const comments: StoreonModule<IState, IEvents> = (store) => {
  store.on('@init', () => ({ comments: initialState }));

  store.on('comments/set', ({ comments }, data) => ({ comments: { ...comments, ...data } }));

  store.on('comments/get', () => {
    axios({
      method: 'GET',
      url: 'https://jsonplaceholder.typicode.com/comments',
      params: {
        limit: 10,
      },
    })
      .then((response) => {
        console.log(response.data);
        
        const data: Array<IComment> = response.data.map(
          (comment: ICommentData) => ({
            name: comment.email,
            value: comment.body,
            id: comment.id,
          })
        );

        store.dispatch('comments/set', { loading: false, data: data, error: '', });
      })
      .catch((error) => {
        console.log(error);
        store.dispatch('comments/set', { loading: false, data: [], error: error.message.toString(), });
      });
  });

  store.on('comments/change', ({ comments }, data) => {
    comments.data[data.commentIndex] = data.value;

    return comments;
  })
};
