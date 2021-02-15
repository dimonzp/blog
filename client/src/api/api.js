import axios from "axios";
const instance = axios.create({
  withCredentials: true,
  baseURL: "/api/v1",
});

//=============================================intersepter

instance.interceptors.request.use(
  (request) => {
    request.headers["Authorization"] =
      "Bearer " + localStorage.getItem("token");

    return request;
  },
   (error) => {
    console.log("request Err");
    return Promise.reject(error);
  }
);
//=================================


export const authAPI = {
  async postAuth(email, password) {
    const res = await instance.post("/auth", { email, password });
    return res.data;
  },

  async getAuthUser() {
    const res = await instance.get(`/auth/user`);
    return res && res.data;
  },
};

export const usersAPI = {
  async postUser(email, password, name) {
    const res = await instance.post("/users", { email, password, name });
    return res.data;
  },
  async getAllUsers() {
    const res = await instance.get(`/users`);
    return res.data;
  },
  async getUserById(id) {
    const res = await instance.get(`/users/${id}`);
    return res.data;
  },
  async deleteUser(id) {
    const res = await instance.delete(`/users/${id}`);
    return res.data;
  },
  async patchUserById(id, name) {
    const res = await instance.patch(`/users/${id}`, { name });
    return res.data;
  },
  async updateAvatar(id, avatar) {
    const formData = new FormData();
    formData.append("avatar", avatar);
    const res = await instance.put(`/users/upload/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  },
};

export const postAPI = {
  async newPost(title, fullText, description) {
    const res = await instance.post(`/posts`, {
      title,
      fullText,
      description,
    });
    return res.data;
  },

  async getAllPosts() {
    const res = await instance.get(`/posts`);
    return res.data;
  },
  async getPostsById(id) {
    const res = await instance.get(`/posts/${id}`);
    return res.data;
  },
  async deletePostById(id) {
    const res = await instance.delete(`/posts/${id}`);
    return res.data;
  },
  async updatePostById(id, title, fullText, description) {
    const res = await instance.patch(`/posts/${id}`, {
      title,
      fullText,
      description,
    });
    return res.data;
  },
  async updatePostImageById(id, picture) {
    
    const formData = new FormData();
    formData.append("image", picture);
    const res = await instance.put(`/posts/upload/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  },
};
