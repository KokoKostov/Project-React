import * as request from './requester'
const baseUrl = 'http://localhost:3030/jsonstore/drawings'
export const getAll =  async ()=>{
    const result= await request.get(baseUrl)
   
    const drawings = Object.values(result)
    
    return drawings
}