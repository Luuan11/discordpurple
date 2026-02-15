import { Box, Text, TextField, Image, Button } from "@skynexui/components";
import React from "react";
import appConfig from "../config.json";
import { useRouter } from "next/router";
import { ButtonSendSticker } from "../src/components/ButtonSendSticker";
import { SEOHead } from "../src/components/SEOHead";
import { sendMessage, subscribeToMessages, deleteMessage } from "../src/services/firebase";
import { useAuth } from "../src/hooks/useAuth";

function Title(props) {
  const Tag = props.tag || "h1";
  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>{`
        ${Tag} {
          color: ${appConfig.theme.colors.primary["550"]};
          font-size: 25px;
          font-weight: 600;
          font-family: "Poppins", arial, sans-serif;
        }
      `}</style>
    </>
  );
}

function formatMessageTime(timestamp) {
  const messageDate = new Date(timestamp);
  const isToday = messageDate.toDateString() === new Date().toDateString();
  
  const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: false };

  if (isToday) {
    return messageDate.toLocaleTimeString('en-US', timeOptions);
  }

  return messageDate.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    ...timeOptions
  });
}

export default function ChatPage() {
  const [message, setMessage] = React.useState("");
  const [sendError, setSendError] = React.useState("");
  const roteamento = useRouter();
  const { user, loading: authLoading, logout, isAuthenticated } = useAuth();
  const usuarioLogado = user?.githubUsername || roteamento.query.username;
  const [messageList, setMessageList] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (sendError) {
      const timer = setTimeout(() => setSendError(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [sendError]);

  React.useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      roteamento.push('/');
    }
  }, [authLoading, isAuthenticated, roteamento]);

  React.useEffect(() => {
    if (!isAuthenticated) return;
    
    const unsubscribe = subscribeToMessages((messages) => {
      setMessageList(messages);
      setLoading(false);
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [isAuthenticated]);

  async function handleNovaMensagem(newMessage) {
    if (newMessage && newMessage.trim()) {
      try {
        await sendMessage(usuarioLogado, newMessage.trim());
        setMessage("");
        setSendError("");
      } catch (error) {
        console.error('Error sending message:', error);
        setSendError(error.message || 'Error sending message. Please try again.');
      }
    }
  }

  async function handleDelMessage(id, mensagemfrom) {
    if (usuarioLogado === mensagemfrom) {
      try {
        await deleteMessage(id);
      } catch (error) {
        console.error('Error deleting message:', error);
        alert('Error deleting message.');
      }
    } else {
      alert("Don't delete other people's messages :(");
    }
  }

  if (authLoading) {
    return (
      <Box
        styleSheet={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          backgroundColor: appConfig.theme.colors.neutrals[900],
        }}
      >
        <Text
          styleSheet={{
            color: appConfig.theme.colors.primary[400],
            fontSize: "18px",
          }}
        >
          Loading...
        </Text>
      </Box>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <SEOHead 
        title={`Chat - ${usuarioLogado || 'Discord Purple'}`}
        description="Real-time chat with messages and stickers"
      />
      <Box
        styleSheet={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        backgroundImage: `url(https://c4.wallpaperflare.com/wallpaper/690/675/807/digital-art-space-universe-pixels-wallpaper-preview.jpg)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundBlendMode: "multiply",
        color: appConfig.theme.colors.neutrals["000"],
      }}
    >
      <Box
        styleSheet={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
          borderRadius: "5px",
          backgroundColor: "rgba( 0, 0, 0, 0.6)",
          height: "100%",
          maxWidth: "95%",
          maxHeight: "95vh",
          padding: "15px",
        }}
      >
        <Header onLogout={logout} />
        <Box
          styleSheet={{
            position: "relative",
            display: "flex",
            flex: 1,
            height: "80%",
            backgroundColor: "rgba( 0, 0, 0, 0.6)",
            flexDirection: "column",
            borderRadius: "5px",
            padding: "16px",
          }}
        >
          <MessageList
            messages={messageList}
            setMessageList={setMessageList}
            deleteMessage={handleDelMessage}
          />
          <Box
            as="form"
            styleSheet={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Image
              styleSheet={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                display: "inline-block",
                marginRight: "10px",
              }}

              src={`https://github.com/${usuarioLogado}.png`}
            />

            <TextField
              value={message}
              onChange={(event) => {
                const value = event.target.value;
                setMessage(value);
              }}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  if (message.length > 0) handleNovaMensagem(message);
                }
              }}
              placeholder="Type here..."
              outlined
              type="textarea"
              wrap="hard"
              styleSheet={{
                width: "100%",
                border: "0",
                resize: "none",
                borderRadius: "5px",
                marginTop: "20px",
                padding: "6px 8px",
                backgroundColor: appConfig.theme.colors.neutrals[800],
                marginRight: "12px",
                fontFamily: "Poppins",
                color: appConfig.theme.colors.neutrals[200],
              }}
            />
            <ButtonSendSticker
              onStickerClick={(sticker) => {
                handleNovaMensagem(`:sticker: ${sticker}`);
              }}
            />

            <Button
              type="submit"
              label="Send"
              onClick={(event) => {
                event.preventDefault();
                if (message.length > 0) handleNovaMensagem(message);
              }}
              styleSheet={{
                top: "3px",
              }}
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[400],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600],
              }}
            />
          </Box>
          {sendError && (
            <Text
              styleSheet={{
                color: "#ff6b6b",
                fontSize: "12px",
                padding: "8px",
                marginTop: "4px",
                backgroundColor: "rgba(255, 107, 107, 0.1)",
                borderRadius: "4px",
                textAlign: "center",
              }}
            >
              {sendError}
            </Text>
          )}
        </Box>
      </Box>
    </Box>
    </>
  );
}

function Header({ onLogout }) {
  const roteamento = useRouter();
  
  const handleLogout = async () => {
    try {
      await onLogout();
      roteamento.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  
  return (
    <>
      <Box
        styleSheet={{
          width: "100%",
          marginBottom: "1px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Title>Chat</Title>
        <Button
          onClick={handleLogout}
          label="Logout"
          buttonColors={{
            contrastColor: appConfig.theme.colors.neutrals["000"],
            mainColor: appConfig.theme.colors.primary[550],
            mainColorLight: appConfig.theme.colors.primary[500],
            mainColorStrong: appConfig.theme.colors.primary[500],
          }}
        />
      </Box>
    </>
  );
}

function MessageList(props) {
  const handleDelMessage = props.deleteMessage;
  return (
    <Box
      tag="ul"
      styleSheet={{
        overflowY: "scroll",
        display: "flex",
        flexDirection: "column-reverse",
        flex: 1,
        color: appConfig.theme.colors.neutrals["000"],
        marginBottom: "10px",
      }}
    >
      {props.messages.map((message) => {
        return (
          <Text
            key={message.id}
            tag="li"
            styleSheet={{
              borderRadius: "5px",
              padding: "6px",
              marginBottom: "12px",
              borderColor: appConfig.theme.colors.primary[400],
              hover: {
                backgroundColor: "rgba( 0, 0, 0, 0.6)",
              },
            }}
          >
            <Box
              styleSheet={{
                position: "relative",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Image
                styleSheet={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  display: "inline-block",
                  marginRight: "8px",
                  marginTop: "20px",
                }}
                src={`https://github.com/${message.from}.png`}
              />
              <Text
                styleSheet={{
                  fontSize: "18px",
                  fontFamily: "Poppins",
                  color: appConfig.theme.colors.primary[500],
                }}
                tag="strong"
              >
                {message.from}
              </Text>
              <Text
                styleSheet={{
                  fontSize: "11px",
                  marginLeft: "10px",
                  fontFamily: "Poppins",
                  color: appConfig.theme.colors.neutrals[300],
                }}
                tag="span"
              >
                {message.createdAt 
                  ? formatMessageTime(message.createdAt)
                  : 'just now'
                }
              </Text>

              <Button
                iconName="trash"
                onClick={() => handleDelMessage(message.id, message.from)}
                tag="span"
                data-id={message.id}
                styleSheet={{
                  fontSize: "20px",
                  marginLeft: "auto",
                  display: "flex",
                }}
                buttonColors={{
                  contrastColor: "#763DE1",
                  mainColor: "rgba( 0, 0, 0, 0)",
                }}
              />
            </Box>
            <Text
              styleSheet={{
                fontFamily: "Poppins",
                marginLeft: "58px",
              }}
            >
              {message.text.startsWith(":sticker:") ? (
                <Image
                  src={message.text.replace(":sticker:", "")}
                  styleSheet={{
                    maxWidth: "100px",
                    maxHeight: "100px",
                  }}
                />
              ) : (
                message.text
              )}
            </Text>
          </Text>
        );
      })}
    </Box>
  );
}
