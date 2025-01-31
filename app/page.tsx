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

  const handleClick = (pathName: string) => {
    router.push(pathName); // Navigate to /chat
  };

  if (!isClient) {
    return null; // Don't render the button on the server-side
  }

  return (
    <div className="  absolute top-[40%] left-[40%]">
      <div className="flex flex-col gap-5">
        <button
          onClick={() => handleClick("assistant-one")}
          className="w-72 border border-red-50 "
        >
          Chat with Assistant 1
        </button>
        <button
          onClick={() => handleClick("assistant-two")}
          className="w-72 border border-red-50"
        >
          Chat with Assistant 2
        </button>
      </div>
    </div>
  );
}
