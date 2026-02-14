import Head from 'next/head';

export function SEOHead({ 
  title = 'Discord Purple - Real-Time Chat',
  description = 'Real-time chat inspired by Discord. Chat with your friends using stickers and instant messages.',
  image = 'https://user-images.githubusercontent.com/79935555/151719904-53c2a721-0976-46d8-be29-cd0508997af5.png',
  url = 'https://discordpurple.vercel.app'
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Theme Color */}
      <meta name="theme-color" content="#763DE1" />
    </Head>
  );
}
