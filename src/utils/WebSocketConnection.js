

import { io } from "socket.io-client";








// export const getSocketConnection = async () => {
//   let connected = false;

//   const socket = await io("ws://localhost:5000"); // Corrected URL format

//  await socket.on("connect", () => {
//     console.log(socket.id);
//     connected = true;
//   });

//   socket.on("connect_error", (error) => {
//     console.error("Connection error aagaya hai :", error);
//     socket.close();
//     connected = false;
//     // Handle the error (e.g., display a message to the user)
//   });

//   if (connected) {
//     return socket;
//   } else {
//     return null;
//   }
// };





// export const getSocketConnection = async () => {
//   try {
//     const socket = io("ws://localhost:5000");

//     await new Promise((resolve, reject) => {
//       socket.on("connect", () => {
//         console.log("Socket connected with ID:", socket.id);
//         resolve();
//       });

//       socket.on("connect_error", (error) => {
//         console.error("Connection error:", error);
//         socket.close();
//         reject(error);
//       });
//     });

//     return socket;
//   } catch (error) {
//     console.error("Error connecting to socket:", error);
//     return null;
//   }
// };



//  export const getSocketConnection = ()=>{

//    const socket = io("wss://localhost:5000");

//    return socket


//  }

// // server-side
// socket.on("connect", () => {
//   console.log(socket.id); // x8WIv7-mJelg7on_ALbx
// });

// // client-side
// socket.on("connect", () => {
//   console.log(socket.id); // x8WIv7-mJelg7on_ALbx
// });

// socket.on("disconnect", () => {
//   console.log("Disconnected");
// });


