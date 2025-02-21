import { useEffect, useState, useContext } from "react";
import { getPosts, deletePost } from "../api/postApi";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Loading from "../components/Loading";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedPost, setExpandedPost] = useState(null); // State for tracking which post is expanded
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const maxLength = 200; // Maximum length before showing "Show More"

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await getPosts();
      setPosts(data);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      await deletePost(id);
      setPosts(posts.filter((post) => post._id !== id));
    }
  };

  const handleExpandedToggle = (postId) => {
    setExpandedPost((prevState) => (prevState === postId ? null : postId));
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6 dark:bg-gray-900">
      <h1 className="text-4xl font-bold text-gray-800 mb-6 dark:text-white">
        Blog Posts
      </h1>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div
            key={post._id}
            className="break-words w-full max-w-2xl bg-white shadow-md rounded-lg p-6 border border-gray-200 mb-4 dark:bg-gray-900"
          >
            <h2 className="text-4xl mb-4 font-semibold text-gray-800 dark:text-white">
              {post.title}
            </h2>
            <p
              className={`text-gray-600 dark:text-white break-words ${
                expandedPost === post._id ? "" : "line-clamp-3"
              }`}
            >
              {post.content}
            </p>

            {post.content.length > maxLength && (
              <button
                className="text-blue-500 mt-2 cursor-pointer"
                onClick={() => handleExpandedToggle(post._id)}
              >
                {expandedPost === post._id ? "Show Less" : "Show More"}
              </button>
            )}

            <p className="text-gray-500 text-sm mt-2 dark:text-white">
              By {post.author?.username || "Unknown Author"}
            </p>

            {/* Only show edit/delete buttons if user is the author */}
            {user && user.id === post.author?._id && (
              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => navigate(`/edit/${post._id}`)}
                  className="bg-green-900 text-white px-2 py-1 rounded-lg hover:bg-green-600 transition cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post._id)}
                  className="bg-red-900 text-white px-2 py-1 rounded-lg hover:bg-red-600 transition cursor-pointer"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-500">No posts found</p>
      )}
    </div>
  );
};

export default Home;
