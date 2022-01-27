import { Box, Text, TextField, Image, Button } from "@skynexui/components";
import React from "react";
import appConfig from "../config.json";

function Title(props) {
  const Tag = props.tag || "h1";
  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>{`
        @import url("ttps://fonts.googleapis.com/css2?family=Poppins&display=swap");
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

export default function ChatPage() {
  // Sua lógica vai aqui
  const [message, setMessage] = React.useState("");
  const [messageList, setMessageList] = React.useState([]);

  function handleNovaMensagem(newMessage) {
    const message = {
      id: messageList.length + 1,
      from: "Luuan",
      text: newMessage,
    };
    setMessageList([message, ...messageList]);
    setMessage("");
  }

  function handleDeleteMessage(event) {
    const messageId = Number(event.target.dataset.id);
    const messageListFiltered = messageList.filter((messageFiltered) => {
      return messageFiltered.id != messageId;
    });

    setMessageList(messageListFiltered);
  }
  // ./Sua lógica vai aqui
  return (
    <Box
      styleSheet={{
        display: "flex", alignItems: "center", justifyContent: "center",
        backgroundImage: `url(https://c4.wallpaperflare.com/wallpaper/690/675/807/digital-art-space-universe-pixels-wallpaper-preview.jpg)`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundBlendMode: "multiply", color: appConfig.theme.colors.neutrals["000"],
      }}
    >
      <Box
        styleSheet={{
            display: "flex", flexDirection: "column", flex: 1,
            boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
            borderRadius: "5px",
            backgroundColor: "rgba( 0, 0, 0, 0.6)",
            height: "100%",
            maxWidth: "95%",
            maxHeight: "95vh",
            padding: "15px",
        }}
      >
        <Header />
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
          <MessageList messages={messageList} setMessageList={setMessageList} />
            {/* {listaDeMensagens.map((mensagemAtual) => {
                        return (
                            <li key={mensagemAtual.id}>
                                {mensagemAtual.de}: {mensagemAtual.texto}
                            </li>
                        )
                    })} */}
          <Box
            as="form"
            styleSheet={{
                display: "flex",
                alignItems: "center",
            }}
          >
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
              placeholder="Digite aqui..."
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
                fontFamily: "poppins",
                color: appConfig.theme.colors.neutrals[200],
              }}
            />
            <Button
              type="submit"
              label="Enviar"
              onClick={(event) => {
                event.preventDefault();
                if (message.length > 0) handleNewMessage(message);
              }}
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["999"],
                mainColor: appConfig.theme.colors.primary[550],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[500],
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function Header() {
  return (
    <>
      <Box
        styleSheet={{
            width: "100%",
            marginBottom: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
        }}
      >
        <Title>Chat</Title>
        <Button
          type="submit"
          label="Sair"
          buttonColors={{
            contrastColor: appConfig.theme.colors.neutrals["000"],
            mainColor: appConfig.theme.colors.primary[550],
            mainColorLight: appConfig.theme.colors.primary[500],
            mainColorStrong: appConfig.theme.colors.primary[500],
          }}
          href="/"
        />
      </Box>
    </>
  );
}

function MessageList(props) {
  function removeMessage(id) {
    const mensagemRemovida = props.messages.filter(
      (message) => id !== message.id
    );
    props.setMessageList(mensagemRemovida);
  }
  console.log("MessageList", props);
  return (
    <Box
      tag="ul"
      styleSheet={{
        overflow: "hidden",
        display: "flex",
        flexDirection: "column-reverse",
        flex: 1,
        // cor do texto do chat
        color: appConfig.theme.colors.neutrals["000"],
        marginBottom: "16px",
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
                wordBreak: "break-word",
                borderWidth: "0px",
                borderStyle: "solid",
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
                src={`https://github.com/Luuan11.png`}
              />
              <Text
                styleSheet={{
                fontSize: "20px",
                color: appConfig.theme.colors.primary[500],
                }}
                tag="strong"
              >
                {message.from}
              </Text>
              <Text
                styleSheet={{
                    fontSize: "14px",
                    marginLeft: "8px",
                    color: appConfig.theme.colors.neutrals[100],
                }}
                tag="span"
              >

              </Text>

              <Button
                iconName="trash"
                onClick={(event) => {
                  event.preventDefault();
                  removeMessage(message.id);
                }}
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
                    marginLeft: "58px",
            }}
            >
              {message.text}
            </Text>
          </Text>
        );
      })}
    </Box>
  );
}
