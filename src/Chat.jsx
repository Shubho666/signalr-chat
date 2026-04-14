import { useEffect, useState } from "react";
import connection from "./signalr";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState("");
  const [message, setMessage] = useState("");
  const [group, setGroup] = useState("room1");

  useEffect(() => {
    connection.start()
      .then(() => {
        console.log("Connected");

        // 🔥 join default group
        connection.invoke("JoinGroup", group);
      })
      .catch(console.error);

    connection.on("ReceiveMessage", (user, message) => {
      setMessages(prev => [...prev, { user, message }]);
    });

    return () => {
      connection.off("ReceiveMessage");
    };
  }, []);

  const joinGroup = async () => {
    await connection.invoke("JoinGroup", group);
    setMessages([]); // clear chat
  };

  const sendMessage = async () => {
    if (!user || !message) return;

    await connection.invoke("SendMessageToGroup", group, user, message);
    setMessage("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>💬 Group Chat</h2>

      <input
        placeholder="Your name"
        value={user}
        onChange={e => setUser(e.target.value)}
      />

      <input
        placeholder="Room name"
        value={group}
        onChange={e => setGroup(e.target.value)}
      />

      <button onClick={joinGroup}>Join Room</button>

      <br /><br />

      <input
        placeholder="Message"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />

      <button onClick={sendMessage}>Send</button>

      <div style={{ marginTop: 20 }}>
        {messages.map((m, i) => (
          <div key={i}>
            <b>{m.user}:</b> {m.message}
          </div>
        ))}
      </div>
    </div>
  );
}