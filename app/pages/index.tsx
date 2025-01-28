// import { useChat } from "ai/react";
// import axios from "axios";
// import { ChangeEvent, FormEvent, useState } from "react";
// export interface MessageType {
//   role: string;
//   content: string;
// }
// export interface MessageResponse extends MessageType {
//   id: string;
// }
// const BASE_URL = `http://localhost:3000/api`;
// // const apiClient=axios.create({
// //     baseUrl:BASE_URL
// // })
// const apiClient = axios.create({
//   baseURL: BASE_URL,
//   timeout: 10000,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });
// const getMessages = async (messages: MessageType[]) => {
//   try {
//     // Make the API call and wait for the response
//     const response = await axios.post(
//       "http://localhost:3000/api/chat",
//       messages,
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     // Log the response
//     console.log("Response is:", response.data);

//     // Return the response data
//     return response.data;
//   } catch (error) {
//     // Handle errors
//     console.error("Error calling API:", error);
//     throw error; // Re-throw the error if needed
//   }
// };
// export default function Chat() {
//   //   const { messages, input, handleInputChange, handleSubmit } = useChat();
//   const [messages, setMessages] = useState<MessageType[]>([]);
//   const [input, setInput] = useState("");
//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const newMessage: MessageType = {
//       role: "user",
//       content: input,
//     };
//     const response = await getMessages([...messages, newMessage]);
//     console.log("response from the api", response);
//     setMessages((pre) => [...pre, newMessage]);
//   };
//   const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setInput(e.target.value);
//   };
//   return (
//     <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
//       {messages.map((message, index) => (
//         <div key={index} className="whitespace-pre-wrap">
//           {message.role === "user" ? "User: " : "AI: "}
//           {message.content}
//         </div>
//       ))}
//       <form onSubmit={(e) => handleSubmit(e)}>
//         <input
//           className="fixed dark:bg-zinc-900 bottom-0 w-full max-w-md p-2 mb-8 border border-zinc-300 dark:border-zinc-800 rounded shadow-xl "
//           value={input}
//           placeholder="Say something..."
//           onChange={(e) => handleInputChange(e)}
//         />
//       </form>
//     </div>
//   );
// }

// import { ChangeEvent, FormEvent, useState } from "react";
// import axios from "axios";

// export interface MessageType {
//   role: string;
//   content: string;
// }

// const getMessages = async (messages: MessageType[]) => {
//   try {
//     const response = await axios.post(
//       "http://localhost:3000/api/chat",
//       messages,
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     console.log("Response is:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("Error calling API:", error);
//     throw error;
//   }
// };

// export default function Chat() {
//   const [messages, setMessages] = useState<MessageType[]>([]);
//   const [input, setInput] = useState("");

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     // Create a new user message
//     const newMessage: MessageType = {
//       role: "user",
//       content: input,
//     };

//     try {
//       // Send the updated messages (including the new user message) to the API
//       const response = await getMessages([...messages, newMessage]);

//       // Add the user message to the state
//       setMessages((prev) => [...prev, newMessage]);

//       // Add the AI's response to the state
//       if (response && response.content) {
//         const aiMessage: MessageType = {
//           role: "assistant",
//           content: response.content,
//         };
//         setMessages((prev) => [...prev, aiMessage]);
//       }

//       // Clear the input field
//       setInput("");
//     } catch (error) {
//       console.error("Failed to send message:", error);
//     }
//   };

//   const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setInput(e.target.value);
//   };

//   return (
//     <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
//       {messages.map((message, index) => (
//         <div key={index} className="whitespace-pre-wrap">
//           {message.role === "user" ? "User: " : "AI: "}
//           {message.content}
//         </div>
//       ))}
//       <form onSubmit={handleSubmit}>
//         <input
//           className="fixed dark:bg-zinc-900 bottom-0 w-full max-w-md p-2 mb-8 border border-zinc-300 dark:border-zinc-800 rounded shadow-xl"
//           value={input}
//           placeholder="Say something..."
//           onChange={handleInputChange}
//         />
//       </form>
//     </div>
//   );
// }
