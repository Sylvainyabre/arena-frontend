//import axios from 'axios';
import { API } from '../api';

export const setAuthToken = (token) =>{
    if(token){
        //applying the token to every request
        API.defaults.headers.common['Authorization'] = token;

    }else{
        //Remove the headers
        delete API.defaults.headers.common['Authorization']
    }
    
}
