export default {
  async fetch(request, env) {
    if (request.method !== "POST") {
      return new Response("Telegram Task Bot is running!");
    }

    try {
      const update = await request.json();

      if (update.message) {
        const chatId = update.message.chat.id;
        const text = update.message.text || "";

        if (text === "/start") {
          await fetch(
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
        }
      }

      return new Response("OK");
    } catch (error) {
      return new Response("Error", { status: 500 });
    }
  }
};
