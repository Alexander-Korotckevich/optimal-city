import { createStoreon } from 'storeon';
import { comments } from './comments/comments';

export const store = createStoreon([comments]);