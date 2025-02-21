import { useState, useContext } from "react";
import { createPost } from "../api/postApi";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [post, setPost] = useState({ title: "", content: "" });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // Get user context

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!user) {
        setErrorMessage("Please log in to create a post");
        return;
      }

      const result = await createPost(post);
      if (result) {
        setSuccessMessage("✅ Your post has been created!");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        setErrorMessage("Please log in to create a post");
      } else {
        setErrorMessage(
          error.response?.data?.error ||
            "Error creating post. Please try again."
        );
      }
      console.error("Create post error:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Create New Post</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6 border border-gray-200"
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={post.title}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        />
        <textarea
          name="content"
          placeholder="Content"
          value={post.content}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={post.author}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        />
        <button
          type="submit"
          className="w-full bg-gray-800 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300 cursor-pointer"
        >
          Create Post
        </button>
      </form>

      {successMessage && (
        <p className="mt-4 text-green-600 text-lg font-semibold">
          {successMessage}
        </p>
      )}
    </div>
  );
};

export default CreatePost;
