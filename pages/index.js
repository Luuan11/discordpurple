//Importações
import appConfig from "../config.json";

//Skynex
import React from "react";
import { Box, Button, Text, TextField, Image } from "@skynexui/components";

//Roteamento do Next
import { useRouter } from "next/router";

function Titulo(props) {
  const Tag = props.tag || "h1";
  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>
        {`
          @import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");
          ${Tag} {
            color: ${appConfig.theme.colors.neutrals["000"]};
            font-size: 24px;
            font-weight: 600;
            font-family: "Poppins", arial, san-serif;
          }
        `}
      </style>
    </>
  );
}

export default function PaginaInicial() {
  // const username = "Luuan11";
  // Coloca o usuário;

  const [username, setUsername] = React.useState("");

  //Roteamento do Next
  const roteamento = useRouter();

  //Imagem de erro ao busco o usuário
  const defaultProfileImg =
    "https://imgur.com/ihI1j4f.png";

  //Informações adicionais do usuário usando a API do github
  const [githubData, setGithubData] = React.useState("");

  fetch(`https://api.github.com/users/${username}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      setGithubData(data);
    });

  return (
    <>
      <Box
        styleSheet={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          //Imagem para erro de carregamento
          backgroundImage:
            "url(https://c4.wallpaperflare.com/wallpaper/690/675/807/digital-art-space-universe-pixels-wallpaper-preview.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundBlendMode: "multiply",
        }}
      >
        <Box
          styleSheet={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            width: "100%",
            maxWidth: "700px",
            borderRadius: "30px 5px",
            padding: "32px",
            margin: "16px",
            opacity: "0.96",
            boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
            backgroundColor: appConfig.theme.colors.neutrals[700],
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            onSubmit={function (stoprefresh) {
              stoprefresh.preventDefault();
              
              //Para as ações defaults como recarregar a página após apertar o button
              console.log("Alguém submeteu o form");

              //Passa ao Chat o username 
              roteamento.push(`/chat?username=${username}`);
            }}
            styleSheet={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: { xs: "100%", sm: "50%" },
              textAlign: "center",
              marginBottom: "32px",
            }}
          >
            <Titulo tag="h2">Boas vindas viajante &#128640; </Titulo>
            <Text
              variant="body3"
              styleSheet={{
                marginBottom: "32px",
                color: appConfig.theme.colors.neutrals[300],
              }}
            >
              {appConfig.name}
            </Text>

            {/* <input 
              type="text"
              value={username}
              onChange={function (name) {
                console.log("Usuário digitou", name.target.value);
                // Ação de trocar de valor
                const newname = name.target.value;
                //Valor do novo nick name
                //Através do React 
                setUsername(newname);
              }}
            /> */}

            <TextField
            required
              value={username}
              onChange={function (name) {
                console.log("Usuário digitou", name.target.value);

                // Ação de trocar de valor
                const newname = name.target.value;

                //Valor do novo nick name
                //Através do React
                setUsername(newname);
              }}

              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[200],
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorHighlight: appConfig.theme.colors.primary[500],
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                },
              }}
              placeholder='Digite seu username'
            />
            <Button
              type="submit"
              label="Entrar"
              fullWidth
              disabled={username.length < 3}
              required
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[400],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600],
              }}
            />
          </Box>
          {/* Formulário */}

          {/* Photo Area */}
          <Box
            styleSheet={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxWidth: "200px",
              padding: "16px",
              backgroundColor: appConfig.theme.colors.neutrals[800],
              border: "1px solid",
              borderColor: appConfig.theme.colors.neutrals[999],
              borderRadius: "20px 0px",
              flex: 1,
              minHeight: "240px",
            }}
          >
            <Image
              styleSheet={{
                borderRadius: "50%",
                marginBottom: "16px",
              }}
              src={
                username.length > 2
                  ? `https://github.com/${username}.png`
                  : defaultProfileImg
              }
            />
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.primary[400],
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: "3px 10px",
                fontSize:"1.30em",
                marginBottom:"5px",
                borderRadius: "1000px",
              }}>

              {username}
            </Text>
            {/* Condição */}
            {username.length > 2 && (
              <Box
                styleSheet={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  maxWidth: "200px",
                  padding: "16px",
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                  flex: 1,
                }}>
                <Text
                  variant="body5"
                  styleSheet={{
                    color: appConfig.theme.colors.primary[400],
                    backgroundColor: appConfig.theme.colors.neutrals[900],
                    padding: "3px 10px",
                    marginBottom:"5px",
                    borderRadius: "1000px",


                  }}
                >
                {/* <a href={`https://github.com/${username}`} target="_blank">{username}</a> */}

                  {/* Api do github */}
                  {githubData.name}

                </Text>
                <Text
                  variant="body6"
                  styleSheet={{
                    color: appConfig.theme.colors.primary[400],
                    backgroundColor: appConfig.theme.colors.neutrals[900],
                    padding: "3px 10px",
                    marginTop:"3px",
                    borderRadius: "1000px",
                  }}
                >
                  {/* Api do github */}
                  {githubData.location}

                </Text>
              </Box>
            )}
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}
