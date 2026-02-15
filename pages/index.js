//Importações
import appConfig from "../config.json";

//Skynex
import React from "react";
import { Box, Button, Text, Image } from "@skynexui/components";

//Roteamento do Next
import { useRouter } from "next/router";

import { SEOHead } from "../src/components/SEOHead";
import { useAuth } from "../src/hooks/useAuth";

function Titulo(props) {
  const Tag = props.tag || "h1";
  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>
        {`
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
  const { user, loading, error, login, isAuthenticated } = useAuth();
  const [loginError, setLoginError] = React.useState("");
  const [isLoggingIn, setIsLoggingIn] = React.useState(false);

  //Roteamento do Next
  const roteamento = useRouter();

  const defaultProfileImg = "https://imgur.com/ihI1j4f.png";

  React.useEffect(() => {
    if (isAuthenticated && user?.githubUsername) {
      roteamento.push(`/chat?username=${user.githubUsername}`);
    }
  }, [isAuthenticated, user, roteamento]);

  const handleGitHubLogin = async () => {
    setIsLoggingIn(true);
    setLoginError("");
    
    try {
      const authData = await login();
      if (authData?.githubUsername) {
        roteamento.push(`/chat?username=${authData.githubUsername}`);
      }
    } catch (err) {
      console.error("Login error:", err);
      if (err.code === "auth/popup-closed-by-user") {
        setLoginError("Login cancelled");
      } else if (err.code === "auth/account-exists-with-different-credential") {
        setLoginError("Account already exists with different credentials");
      } else {
        setLoginError(err.message || "Failed to sign in with GitHub");
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  if (loading) {
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

  return (
    <>
      <SEOHead 
        title="Discord Purple - Join the Chat"
        description="Sign in with GitHub and start chatting in real time"
      />
      <Box
        styleSheet={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage:
            "url(/wallpaper/wallpaper.jpg)",
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
          <Box
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
            <Titulo tag="h2">Welcome traveler {String.fromCodePoint(0x1F680)}</Titulo>
            <Text
              variant="body3"
              styleSheet={{
                marginBottom: "32px",
                color: appConfig.theme.colors.neutrals[300],
              }}
            >
              {appConfig.name}
            </Text>

            <Text
              variant="body4"
              styleSheet={{
                marginBottom: "16px",
                color: appConfig.theme.colors.neutrals[200],
                textAlign: "center",
              }}
            >
              Sign in with your GitHub account to verify your identity
            </Text>

            <Button
              onClick={handleGitHubLogin}
              label={isLoggingIn ? "Signing in..." : "Sign in with GitHub"}
              fullWidth
              disabled={isLoggingIn}
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: "#24292e",
                mainColorLight: "#2f363d",
                mainColorStrong: "#1b1f23",
              }}
              styleSheet={{
                marginBottom: "16px",
              }}
            />

            {loginError && (
              <Text
                variant="body4"
                styleSheet={{
                  color: "#ff6b6b",
                  marginTop: "8px",
                }}
              >
                {loginError}
              </Text>
            )}

            <Text
              variant="body5"
              styleSheet={{
                marginTop: "16px",
                color: appConfig.theme.colors.neutrals[400],
                fontSize: "12px",
              }}
            >
              {String.fromCodePoint(0x1F512)} Secure authentication via GitHub OAuth
            </Text>
          </Box>

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
              justifyContent: "center",
            }}
          >
            <Image
              styleSheet={{
                borderRadius: "50%",
                marginBottom: "16px",
                width: "100px",
                height: "100px",
              }}
              src={defaultProfileImg}
            />
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.primary[400],
                textAlign: "center",
                marginBottom: "8px",
              }}
            >
              Why GitHub OAuth?
            </Text>
            <Text
              variant="body5"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[300],
                textAlign: "center",
                fontSize: "11px",
              }}
            >
              Ensures no one can impersonate another user. Your identity is verified by GitHub.
            </Text>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}
