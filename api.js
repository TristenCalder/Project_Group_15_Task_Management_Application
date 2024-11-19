import axios from 'axios';

export const createPost = async (data) => {
    const response = await axios.post('http://localhost:8000/api/create-post', data);
    return response.data;
};

export const fetchPosts = async () => {
    const response = await axios.get('http://localhost:8000/api/blogs');
    return response.data;
};

export const fetchPostById = async (id) => {
    const response = await axios.get(`http://localhost:8000/api/blog/${id}`);
    return response.data;
};

export const updatePost = async (id, data) => {
    const response = await axios.put(`http://localhost:8000/api/edit-post/${id}`, data);
    return response.data;
};

export const deletePost = async (id) => {
    const response = await axios.delete(`http://localhost:8000/api/delete-post/${id}`);
    return response.data;
};

export const signIn = async (data) => {
    try {
        const response = await axios.post('http://localhost:8000/api/signin', data);
        return response.data;
    } catch (error) {
        return {success: false, message: 'FAIL'};
    }
};

export const signUp = async (data) => {
    const response = await axios.post('http://localhost:8000/api/signup', data);
    return response.data;
};
