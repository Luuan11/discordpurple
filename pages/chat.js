import { Box, Text, TextField, Image, Button } from "@skynexui/components";
import React from "react";
import appConfig from "../config.json";
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import { ButtonSendSticker } from '../src/components/ButtonSendSticker';


//Conexão com o Supabase
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzMwNDE5NywiZXhwIjoxOTU4ODgwMTk3fQ.HPf0uCWVs3afk2B7g8yPlclAbe5BlEZngLaVEccvSXA';
const SUPABASE_URL = 'https://jcitvudrzoqrthydrepl.supabase.co';
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY );



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

export default function ChatPage() {

  const [message, setMessage] = React.useState("");
  const roteamento = useRouter();
  const usuarioLogado = roteamento.query.username;
  const [messageList, setMessageList] = React.useState([]);


  function MensagensRealtime(AdicionaMessage) {
    return supabaseClient
    .from('message')
    .on('INSERT', (respostaAuto) => {
      AdicionaMessage(respostaAuto.new)
    })
    .subscribe();
  }

  React.useEffect(() => {
    supabaseClient
        .from('message')
        .select('*')
        .order('id', { ascending: false })
        .then(({data}) => {
          // console.log("dados:", data);
          setMessageList(data);
        });

    MensagensRealtime((newMessage) => {
                setMessageList((valorAtualLista) => {
                  return[
                      newMessage, 
                      ...valorAtualLista,
                ]
            });
        });
  }, []);
  
  function handleNovaMensagem(newMessage) {
    const message = {
    // id: messageList.length + 1
      from: usuarioLogado,
      text: newMessage,
    };


  // nova mensagem 
  if (newMessage.length !== null && newMessage.trim()) {
  supabaseClient
      .from("message")
      .insert([
        message
      ])
      .then(({data}) => {
      console.log('Mensagem:' , data);
    });
   
    setMessage("");
  }}

  function handleDelMessage(id, mensagemfrom) {
    if (usuarioLogado === mensagemfrom) {
        supabaseClient
            .from('message')
            .delete()
            .match({ id: id })
            .then(({ data }) => {
                const listaDeMensagemFiltrada = messageList.filter((messageFiltered) => {
                    return messageFiltered.id != data[0].id;
                })
                setMessageList(listaDeMensagemFiltrada)
                alert('mensagem excluida com sucesso :)')
            })
    } else {
        alert('Não Apague as mensagens dos outros :(')
    }
}

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
          <MessageList messages={messageList} setMessageList={setMessageList} deleteMessage={handleDelMessage} /> 
            {/* {listaDeMensagens.map((mensagemAtual) => {
              return (
                <li key={mensagemAtual.id}>
                {mensagemAtual.de}: {mensagemAtual.texto}
                </li>
                )
              })} */}
                    
              {/* <MessageList messages={MessageList} /> */}
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
            {/* Callback */}
            <ButtonSendSticker 
              onStickerClick={(sticker) => {
                handleNovaMensagem(`:sticker: ${sticker}`);
              }}
            />

            <Button
              type="submit"
              label="Enviar"
              onClick={(event) => {
                event.preventDefault();
                if (message.length > 0) handleNovaMensagem(message);
              }}
              styleSheet={{
                top:"3px",
              }}
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[400],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600],
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
            marginBottom: "1px",
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
  // console.log("MessageList", props);

  const handleDelMessage = props.deleteMessage
  return (
    <Box
      tag="ul"
      styleSheet={{
        overflowY:"scroll",
        display: "flex",
        flexDirection: "column-reverse",
        flex: 1,
        // cor do texto do chat
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
                fontFamily:"Poppins",
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
                    fontFamily:"Poppins",
                    color: appConfig.theme.colors.neutrals[300],
                }}
                tag="span"
              >
                {(new Date().toLocaleDateString())}
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
                fontFamily:"Poppins",
                marginLeft: "58px",
              }}
              >
                {message.text.startsWith(':sticker:')
                ? (
                  <Image src={message.text.replace(':sticker:', '')} />
                )
                : (
                  message.text
                )}
                
            </Text>
            
          </Text>
        );
      })}
  </Box>
  );
}
