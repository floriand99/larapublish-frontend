import axios from 'axios'

export const ArticleService ={
    getAll(url){
        return axios.get(url)
    },
    get(id){
        return axios.get('/articles/' + id)
    },
    store(articleData){
        return axios.post('/articles', articleData)
    },
    delete(id){
        return axios.delete('/articles/' + id)
    }
}

export const UserService ={
    get(id){
        return axios.get('/users/' + id)
    },
    update(id, data){
        return axios.put('/users/' + id, data)
    },
    register(data){
        return axios.post('/auth/register', data)
    }
}

export const ImageService = {
    delete(imagePath){
        return axios.delete('/image-upload/', {
            image: imagePath
        })
    }
}

export const LikeService = {
    store(articleId){
        return axios.post(`/articles/${articleId}/likes`)
    }
}