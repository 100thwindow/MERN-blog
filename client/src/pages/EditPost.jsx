import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPosts, updatePost } from "../api/postApi";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({ title: "", content: "", author: "" });

  useEffect(() => {
    const fetchPost = async () => {
      const data = await getPosts();
      const currentPost = data.find((p) => p._id === id);
      if (currentPost) {
        setPost(currentPost);
      }
    };
    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updatePost(id, post);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Edit Post</h1>
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
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
        >
          Update Post
        </button>
      </form>
    </div>
  );
};

export default EditPost;
