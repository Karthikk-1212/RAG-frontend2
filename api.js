import axios from 'axios'

const BASE_URL = 'http://localhost:8000'

export const processvideo = (url) => {
    return axios.post(`${BASE_URL}/process_video/`, null, {
        params: { url }
    })
}

export const AskQuestion = (question) => {
    return axios.post(`${BASE_URL}/ask`, null, {
        params: { question }
    })
}