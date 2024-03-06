import React, { useState } from "react";
import { Box, TextField, Button, InputLabel } from "@mui/material";
import MyContext from "../context/ContextProvider";
import { usePostFormData } from "../utils/usePostFormData";
import { useNavigate } from "react-router-dom";


function EditProfile({ userName, setUserName }) {
  const navigate = useNavigate(); // Initialize useHistory

 

  const [avatar, setAvatar] = useState(null);
  const [newUserName , setNewUserName] = useState(userName);
  const postFormData = usePostFormData();

  const handleUsernameChange = (event) => {
    const newName = event.target.value;
    setNewUserName(newName);
  };

  const handleAvatarChange = (event) => {
    setAvatar(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("username", newUserName);
    formData.append("file", avatar);

    try {
      const response = await postFormData(`/user/${userName}/editprofile`, formData);
      console.log("Profile updated successfully:", response.data);
      // Redirect user to profile page or display success message
    } catch (error) {
      console.error("Failed to update profile:", error);
      // Display error message to user
    }
  };

  const handleGoBack = () => {
     navigate(-1)
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "auto", marginTop: "100px" }}>
      <Button variant="contained" onClick={handleGoBack} sx={{ marginBottom: "20px" }}>
        Back
      </Button>
      <form onSubmit={handleSubmit}>
        <InputLabel
          shrink
          htmlFor="username-input"
          sx={{ fontSize: "1.3rem", color: "black", marginBottom: "-13px" }}
        >
          Username
        </InputLabel>
        <TextField
          id="username-input"
          fullWidth
          value={userName}
          onChange={handleUsernameChange}
          margin="normal"
          variant="outlined"
          size="large"
          sx={{ marginBottom: "20px" }}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
          style={{ marginBottom: "20px", display: "block" }}
          required
        />
        <Button type="submit" variant="contained" fullWidth size="large">
          Save Changes
        </Button>
      </form>
    </Box>
  );
}

export default EditProfile;
