import { useState } from "react";
import { createPost } from "../api/postApi";

const CreatePost = () => {
  const [post, setPost] = useState({ title: "", content: "", author: "" });
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createPost(post);
    setPost({ title: "", content: "", author: "" }); // Reset form
    setSuccessMessage("✅ Your post has been created!"); // Show success message

    // Hide message after 3 seconds
    setTimeout(() => setSuccessMessage(""), 3000);
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
