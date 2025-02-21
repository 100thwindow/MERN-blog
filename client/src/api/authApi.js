import axios from "axios";

const API_URL = "http://localhost:5000/api/auth"; // Adjust if your backend runs elsewhere

export const registerUser = async (userData) => {
  try {
    // console.log("Sending registration data:", userData); // Debug log
    const response = await axios.post(
      "http://localhost:5000/api/auth/register",
      userData
    );
    //  console.log("Registration response:", response.data); // Debug log
    return response.data;
  } catch (error) {
    //  console.error("Registration error:", error.response?.data);
    throw error;
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      // If the response status is not OK (e.g., 401, 400), throw an error
      const errorData = await response.json();
      throw new Error(errorData.error || "Something went wrong");
    }

    return await response.json(); // Return the response data if successful
  } catch (error) {
    console.error("Error logging in:", error);
    return { error: error.message || "Something went wrong" }; // Return the error message
  }
};
