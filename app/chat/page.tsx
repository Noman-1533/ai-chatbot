// "use client"; // Mark this as a Client Component
// import { ChangeEvent, FormEvent, useState } from "react";
// import axios from "axios";

// interface MessageType {
//   role: string;
//   content: string;
// }

// export default function Chat() {
//   const [messages, setMessages] = useState<MessageType[]>([]);
//   const [input, setInput] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const newMessage: MessageType = {
//       role: "user",
//       content: input,
//     };
//     setMessages((prev) => [...prev, newMessage]);
//     setInput("");
//     setIsLoading(true);
//     try {
//       const payload = [...messages, newMessage];
//       const response = await axios.post("/api/chat", { messages: payload });
//       const eventSource = new EventSource("/api/chat");
//       eventSource.onmessage = (event) => {
//         const data = JSON.parse(event.data);
//         const content = data.content;
//         setMessages((prev) => {
//           const lastMessage = prev[prev.length - 1];
//           if (lastMessage.role === "assistant") {
//             return [...prev.slice(0, -1), { role: "assistant", content }];
//           } else {
//             return [...prev, { role: "assistant", content }];
//           }
//         });
//       };
//       eventSource.onerror = () => {
//         eventSource.close();
//         setIsLoading(false);
//       };
//     } catch (error) {
//       // const payload: MessageType[] = [newMessage];
//       // console.log("Sending payload:", payload);

//       // try {
//       //   const response = await axios.post("/api/chat", payload, {
//       //     headers: {
//       //       "Content-Type": "application/json",
//       //     },
//       //   });
//       //   console.log("response", response);
//       //   // Add the user message and AI response to the state
//       //   setMessages((prev) => [
//       //     ...prev,
//       //     newMessage,
//       //     { role: "assistant", content: response.data.content },
//       //   ]);

//       //   // Clear the input field
//       //   setInput("");
//       // }
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

"use client"; // Mark this as a Client Component
import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";

interface MessageType {
  role: string;
  content: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newMessage: MessageType = {
      role: "user",
      content: input,
    };

    // Add the user message to the state
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Create a payload for the API
      const payload = [...messages, newMessage];

      // Call the API to start the SSE stream
      const response = await axios.post("/api/chat", { messages: payload });
      console.log("current response", response);
      // Create an EventSource to listen for SSE events
      const eventSource = new EventSource("/api/chat");

      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        const content = data.content;

        // Update the state with the latest AI message
        setMessages((prev) => {
          const lastMessage = prev[prev.length - 1];
          if (lastMessage.role === "assistant") {
            return [...prev.slice(0, -1), { role: "assistant", content }];
          } else {
            return [...prev, { role: "assistant", content }];
          }
        });
      };

      eventSource.onerror = () => {
        eventSource.close();
        setIsLoading(false);
      };
    } catch (error) {
      console.error("Failed to send message:", error);
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {messages.map((message, index) => (
        <div key={index} className="whitespace-pre-wrap">
          {message.role === "user" ? "User: " : "AI: "}
          {message.content}
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <input
          className="fixed dark:bg-zinc-900 bottom-0 w-full max-w-md p-2 mb-8 border border-zinc-300 dark:border-zinc-800 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
          disabled={isLoading}
        />
      </form>
    </div>
  );
}
