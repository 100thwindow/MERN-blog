import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPosts, updatePost } from "../api/postApi";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({ title: "", content: "" }); // Removed author
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPosts();
        const currentPost = data.find((p) => p._id === id);
        if (currentPost) {
          setPost({
            title: currentPost.title,
            content: currentPost.content,
          });
        }
      } catch (error) {
        setMessage("Error fetching post");
        console.error("Error:", error);
      }
    };
    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePost(id, post);
      setMessage("Post updated successfully!");
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      setMessage(error.message || "Error updating post");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 dark:bg-gray-900 p-6">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-6">
        Edit Post
      </h1>
      {message && (
        <div
          className={`mb-4 text-center ${
            message.includes("successfully") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 border border-gray-200 dark:border-gray-700"
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={post.title}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg mb-4 
                   bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                   placeholder-gray-500 dark:placeholder-gray-400"
        />
        <textarea
          name="content"
          placeholder="Content"
          value={post.content}
          onChange={handleChange}
          required
          rows="6"
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg mb-4
                   bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                   placeholder-gray-500 dark:placeholder-gray-400"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg 
                   font-semibold transition duration-200 cursor-pointer"
        >
          Update Post
        </button>
      </form>
    </div>
  );
};

export default EditPost;
