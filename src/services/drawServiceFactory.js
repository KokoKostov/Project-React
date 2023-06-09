import { requestFactory } from './requester';

const baseUrl = 'http://localhost:3030/data/drawings';

export const drawServiceFactory = (token) => {
    const request = requestFactory(token);

    const getAll = async () => {
        const result = await request.get(baseUrl);
        
        const drawings = Object.values(result);
        return drawings;
    };
    
    const getOne = async (drawingId) => {
        const result = await request.get(`${baseUrl}/${drawingId}`);
    
        return result;
    };
    
    const create = async (drawingData) => {
        const result = await request.post(baseUrl, drawingData);
    
       
    
        return result;
    };
    
    

    const edit = (drawingId, data) => request.put(`${baseUrl}/${drawingId}`, data);

    const deleteDrawing = (drawingId) => request.delete(`${baseUrl}/${drawingId}`);


    return {
        getAll,
        getOne,
        create,
        edit,
        
        delete: deleteDrawing,
    };
}