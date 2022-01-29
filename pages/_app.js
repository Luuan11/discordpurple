function GlobalStyle() {
    return (
      <style global jsx>
        {`
@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap"

          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            list-style: none;
          }
          body {
            font-family: "Poppins", "Arial", sans-serif;
          }
          /* App fit Height */
          html,
          body,
          #__next {
            min-height: 100vh;
            display: flex;
            flex: 1;
          }
          #__next {
            flex: 1;
          }
          #__next > * {
            flex: 1;
          }
          /* ./App fit Height */

          ::-webkit-scrollbar {
            width: 10px;
            }

            ::-webkit-scrollbar-track {
            background: #232424;
            border-radius: 10px;
            }
            
            ::-webkit-scrollbar-thumb {
            background: #763DE1;
            border-radius: 10px;
            }
        `}
      </style>
    );
  }

export default function CustomApp({ Component, pageProps }) {
    console.log('Roda em todas as páginas!');
    return (
    <>
        <Component {...pageProps} />
        <GlobalStyle />
    </>
    );
}