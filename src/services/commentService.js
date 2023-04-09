import { requestFactory } from './requester';

const baseUrl = 'http://localhost:3030/data/comments';
const request = requestFactory();

export const getAll = async (drawingId) => {
    const searchQuery = encodeURIComponent(`drawingId="${drawingId}"`);
    const relationQuery = encodeURIComponent(`author=_ownerId:users`);
    const result = await request.get(`${baseUrl}?where=${searchQuery}&load=${relationQuery}`);
    const comments = Object.values(result);

    return comments;
};

export const create = async (drawingId, comment) => {

    const result = await request.post(baseUrl, { drawingId, comment });

    return result;
};