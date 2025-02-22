import axios from "axios";

const API_URL = process.env.BACKEND_API; // Backend URL

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No authentication token found");
  }

  // Check if token is expired
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    if (payload.exp * 1000 < Date.now()) {
      localStorage.removeItem("token"); // Remove expired token
      window.location.href = "/login"; // Redirect to login
      throw new Error("Token expired");
    }
  } catch (error) {
    localStorage.removeItem("token");
    throw new Error("Invalid token");
  }

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Get all posts
export const getPosts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};

// Get a single post by ID
export const getPostById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
};

// Create a new post

export const createPost = async (postData) => {
  try {
    const config = getAuthHeader();
    console.log("Sending request with headers:", config); // Debug log
    const response = await axios.post(API_URL, postData, config);
    console.log("Server response:", response.data);
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      console.error("Authentication error:", error.response.data);
    } else {
      console.error("Error creating post:", error);
    }
    throw error;
  }
};

// Update a post
export const updatePost = async (id, updatedData) => {
  try {
    const response = await axios.put(
      `${API_URL}/${id}`,
      updatedData,
      getAuthHeader()
    );
    return response.data;
  } catch (error) {
    if (error.response?.status === 403) {
      throw new Error("You can only edit your own posts");
    }
    throw error;
  }
};

// Delete a post
export const deletePost = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`, getAuthHeader());
    return true;
  } catch (error) {
    if (error.response?.status === 403) {
      throw new Error("You can only delete your own posts");
    }
    throw error;
  }
};
