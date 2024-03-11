import React from "react";
import {
  Box,
  Button,
  Modal,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";

// function ModalThatShowsList({ listData, isOpen, onClose, listType }) {
//   return (
//     <Modal
//       open={isOpen}
//       onClose={onClose}
//       style={{
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <Box
//         style={{
//           backgroundColor: "#fff",
//           boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
//           padding: "20px",
//           width: "80vw",
//           height: "80vh",
//           outline: "none",
//           display: "flex",
//           flexDirection: "column",
//         }}
//       >
//         <Typography variant="h5" sx={{ marginBottom: 2 }}>
//           {listType === "followers" ? "Followers" : "Following"} List
//         </Typography>
//         <List style={{ flex: "1", overflowY: "auto" }}>
//           {listData.map((item, index) => (
//             <ListItem key={index} sx={{ borderBottom: "1px solid #ccc" }}>
//               <ListItemAvatar>
//                 <Avatar src={item.profilePic} />
//               </ListItemAvatar>
//               <ListItemText primary={item.username} />
//             </ListItem>
//           ))}
//         </List>
//         <Button
//           onClick={onClose}
//           variant="contained"
//           color="primary"
//           sx={{ marginTop: 2, alignSelf: "flex-end" }}
//         >
//           Close
//         </Button>
//       </Box>
//     </Modal>
//   );
// }

// export default ModalThatShowsList;
function ModalThatShowsList({ listData, listType, isOpen, onClose }) {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box
        style={{
          backgroundColor: "#fff",
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
          padding: "20px",
          width: "40vw",
          height: "60vh",
          outline: "none",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          {/* {listType === "followers" ? "Followers" : "Following"} List */}
          {listType} List
        </Typography>
        {listData && listData.length > 0 ? (
          <List style={{ flex: "1", overflowY: "auto" }}>
            {listData.map((item, index) => (
              <ListItem key={index} sx={{ borderBottom: "1px solid #ccc" }}>
                <ListItemAvatar>
                  <Avatar src={item.author ? item.author.profilePic: item.profilePic} />
                </ListItemAvatar>
                <ListItemText primary={item.author ? item.author.username : item.username} />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography>
            No {listType} to display
          </Typography>
        )}
        <Button
          onClick={onClose}
          variant="contained"
          color="primary"
          sx={{ marginTop: 2, alignSelf: "flex-end" }}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
}

export default ModalThatShowsList;
