export default {
  async fetch(request, env) {
    if (request.method !== "POST") {
      return new Response("Telegram Task Bot is running!");
    }

    try {
      const update = await request.json();

      console.log("Telegram update:", JSON.stringify(update));

      if (update.message) {
        const chatId = update.message.chat.id;
        const text = update.message.text || "";

        console.log("Chat ID:", chatId);
        console.log("Text:", text);

        if (text === "/start") {
          const telegramResponse = await fetch(
            `https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                chat_id: chatId,
                text: "👋 Welcome!\n\nTask Bot চালু হয়েছে।"
              })
            }
          );

          const result = await telegramResponse.text();

          console.log("Telegram API response:", result);

          return new Response(result, {
            status: telegramResponse.status
          });
        }
      }

      return new Response("OK");

    } catch (error) {
      console.log("Worker error:", error);

      return new Response(
        JSON.stringify({
          ok: false,
          error: error.message
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }
  }
};
