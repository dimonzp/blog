import axios from "axios";

const withAuth = () => {
  return {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };
};

const instanse = axios.create({
  withCredentials: true,
  baseURL: "/api/v1",
});

export const authAPI = {
  async postAuth(email, password) {
    const res = await instanse.post("/auth", { email, password });
    return res.data;
  },

  async getAuthUser() {
    const res = await instanse.get(`/auth/user`, withAuth());
    return res && res.data;
  },
};

export const usersAPI = {
  async postUser(email, password, name) {
    const res = await instanse.post("/users", { email, password, name });
    return res.data;
  },
  async getAllUsers() {
    const res = await instanse.get(`/users`);
    return res.data;
  },
  async getUserById(id) {
    const res = await instanse.get(`/users/${id}`);
    return res.data;
  },
  async deleteUser(id) {
    const res = await instanse.delete(`/users/${id}`, withAuth());
    return res.data;
  },
  async patchUserById(id, name) {
    const res = await instanse.patch(`/users/${id}`, { name }, withAuth());
    return res.data;
  },
  async updateAvatar(id, avatar) {
    const formData = new FormData();
    formData.append("avatar", avatar);
    const res = await instanse.put(
      `/users/upload/${id}`,
       formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return res.data;
  },
};

export const postAPI = {
  async newPost(title, fullText, description) {
    const res = await instanse.post(
      `/posts`,
      {
        title,
        fullText,
        description,
      },
      withAuth()
    );
    return res.data;
  },

  async getAllPosts() {
    const res = await instanse.get(`/posts`);
    return res.data;
  },
  async getPostsById(id) {
    const res = await instanse.get(`/posts/${id}`);
    return res.data;
  },
  async deletePostById(id) {
    const res = await instanse.delete(`/posts/${id}`, withAuth());
    return res.data;
  },
  async updatePostById(id, title, fullText, description) {
    const res = await instanse.patch(
      `/posts/${id}`,
      { title, fullText, description },
      withAuth()
    );
    return res.data;
  },
  async updatePostImageById(id) {
    const res = await instanse.put(`/posts/upload/${id}`, withAuth());
    return res.data;
  },
};
