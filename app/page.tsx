// "use client";

// import { useRouter } from "next/router";

// // import Image from "next/image";
// // import Chat from "./pages";

// export default function Home() {
//   const router = useRouter();
//   const handleClick = () => {
//     router.push("/chat");
//   };
//   return <button onClick={handleClick}>chat with assistant</button>;
//   // return <Chat />;
// }

"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true); // Make sure code runs only on the client
  }, []);

  const handleClick = () => {
    router.push("/chat"); // Navigate to /chat
  };

  if (!isClient) {
    return null; // Don't render the button on the server-side
  }

  return (
    <div className="  flex justify-center ">
      <button onClick={handleClick} className="w-40 border border-red-50 mt-72">
        Chat with Assistant
      </button>
    </div>
  );
}
