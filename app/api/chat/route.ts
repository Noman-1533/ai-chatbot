// // import { openai } from "@ai-sdk/openai";
// import ollama from "ollama";
// // import { streamText } from "ai";
// export const maxDuration = 30;
// export async function POST(req: Request) {
//   console.log("request", req);
//   const { messages } = await req.json();
//   //   const result = streamText({
//   //     model: openai("o1-mini"),
//   //     messages,
//   //   });
//   console.log("messages", messages);
//   const result = await ollama.chat({
//     model: "llama3.1",
//     messages,
//   });
//   console.log("messages", messages);
//   //   console.log("results", result);
//   return result;
// }

// import ollama from "ollama";

// // Set maximum duration for the API route
// export const maxDuration = 30;

// export async function POST(req: Request) {
//   try {
//     // Parse the request body
//     const { messages } = await req.json();
//     console.log("Received messages:", messages);

//     // Validate the messages array
//     if (!messages || !Array.isArray(messages)) {
//       return new Response(
//         JSON.stringify({ error: "Invalid or missing messages array" }),
//         {
//           status: 400,
//           headers: { "Content-Type": "application/json" },
//         }
//       );
//     }

//     // Call the Ollama API
//     const result = await ollama.chat({
//       model: "llama3.2", // Ensure this model is correct and available
//       messages,
//     });

//     console.log("Ollama response:", result);

//     // Return the result as JSON
//     return new Response(JSON.stringify(result), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error) {
//     console.error("Error in API route:", error);

//     // Return an error response
//     return new Response(JSON.stringify({ error: "Internal server error" }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// }

// import ollama from "ollama";

// export const maxDuration = 30;

// export async function POST(req: Request) {
//   try {
//     // Parse the request body
//     const { messages } = await req.json();
//     console.log("Received messages:", messages);

//     // Validate the messages array
//     if (!messages || !Array.isArray(messages)) {
//       return new Response(
//         JSON.stringify({ error: "Invalid or missing messages array" }),
//         {
//           status: 400,
//           headers: { "Content-Type": "application/json" },
//         }
//       );
//     }
//     const stream = new TransformStream();
//     const writer = stream.writable.getWriter();
//     const response = await ollama.chat({
//       model: "llama3.2",
//       messages,
//       stream: true,
//     });
//     (async () => {
//       for await (const chunk of response) {
//         const content = chunk.message.content;
//         await writer.write(
//           new TextEncoder().encode(`data:${JSON.stringify({ content })}\n\n`)
//         );
//       }
//       await writer.close();
//     })();
//     return new Response(stream.readable, {
//       headers: {
//         "Content-Type": "text/event-stream",
//         "Cache-Control": "no-cache",
//         Connection: "keep-alive",
//       },
//     });

//     // const stream = new ReadableStream({
//     //   async start(controller) {
//     //     const response = await ollama.chat({
//     //       model: "llama3.2",
//     //       messages,
//     //       stream: true,
//     //     });

//     //     for await (const chunk of response) {
//     //       const content = chunk.message.content;
//     //       controller.enqueue(
//     //         new TextEncoder().encode(`data:${JSON.stringify({ content })}\n\n`)
//     //       );
//     //     }
//     //     controller.close();
//     //   },
//     // });

//     // return new Response(stream, {
//     //   headers: {
//     //     "Content-Type": "text/event-stream",
//     //     "Cache-Control": "no-cache",
//     //     Connection: "keep-alive",
//     //   },
//     // });
//     // Call the Ollama API
//     // const result = await ollama.chat({
//     //   model: "llama3.2",
//     //   messages,
//     // });

//     // console.log("Ollama response:", result);

//     // // Return the result as JSON
//     // return new Response(JSON.stringify(result.message), {
//     //   status: 200,
//     //   headers: { "Content-Type": "application/json" },
//     // });
//   } catch (error) {
//     console.error("Error in API route:", error);

//     // Return an error response
//     return new Response(JSON.stringify({ error: "Internal server error" }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// }

import { NextResponse } from "next/server";
import ollama from "ollama";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    console.log("Received messages:", messages);

    // Validate the messages array
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid or missing messages array" },
        { status: 400 }
      );
    }

    // Create a transform stream for SSE
    const stream = new TransformStream();
    const writer = stream.writable.getWriter();

    // Call the Ollama API with streaming
    const response = await ollama.chat({
      model: "llama3.2",
      messages,
      stream: true, // Enable streaming
    });

    // Stream each chunk of the response
    (async () => {
      for await (const chunk of response) {
        const content = chunk.message.content;
        await writer.write(
          new TextEncoder().encode(`data: ${JSON.stringify({ content })}\n\n`)
        );
      }
      await writer.close();
    })();

    // Return the stream with the appropriate headers
    return new Response(stream.readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
