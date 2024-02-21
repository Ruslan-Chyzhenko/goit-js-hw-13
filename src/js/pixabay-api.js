import axios from 'axios';

import { searchQuery } from '../main';
import { pageOf } from '../main';

export const Per_Page = 15;
export async function getImages() {
    
    axios.defaults.baseURL = 'https://pixabay.com/api/';
    const response = await axios.get('', {
    params: {
    key: '42262858-7b31826aafbc45fb5436f2ee9',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    q: searchQuery,
    page: pageOf,
    per_page: Per_Page,
    }
    });
    return response.data;
}