import { useEffect, useState, useContext } from "react";
import { getPosts, deletePost } from "../api/postApi";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Loading from "../components/Loading";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedPost, setExpandedPost] = useState(null);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const maxLength = 200;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await deletePost(id);
        setPosts(posts.filter((post) => post._id !== id));
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  const handleExpandedToggle = (postId) => {
    setExpandedPost(expandedPost === postId ? null : postId);
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 dark:bg-gray-900 p-6">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-6">
        Blog Posts
      </h1>

      {posts.length > 0 ? (
        posts.map((post) => (
          <div
            key={post._id}
            className="w-full max-w-2xl bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-6 
                     border border-gray-200 dark:border-gray-700 transition duration-200"
          >
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              {post.title}
            </h2>

            <div className="prose dark:prose-invert max-w-none">
              <p
                className={`text-gray-600 dark:text-gray-300 mb-4 whitespace-pre-wrap
                ${expandedPost === post._id ? "" : "line-clamp-3"}`}
              >
                {post.content}
              </p>
            </div>

            {post.content.length > maxLength && (
              <button
                onClick={() => handleExpandedToggle(post._id)}
                className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 
                         transition duration-200 cursor-pointer mb-4"
              >
                {expandedPost === post._id ? "Show Less" : "Show More"}
              </button>
            )}

            <div className="flex items-center justify-between mt-4 border-t dark:border-gray-700 pt-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                By {post.author?.username || "Unknown Author"}
              </div>

              {user && user.id === post.author?._id && (
                <div className="flex space-x-3">
                  <button
                    onClick={() => navigate(`/edit/${post._id}`)}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md 
                             transition duration-200 cursor-pointer text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md 
                             transition duration-200 cursor-pointer text-sm"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          No posts found. Be the first to create one!
        </p>
      )}
    </div>
  );
};

export default Home;
