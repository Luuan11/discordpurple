# Discord - Purple 🚀

📜 Discord Chat built using github accounts

![disc](https://user-images.githubusercontent.com/79935555/151719904-53c2a721-0976-46d8-be29-cd0508997af5.png)

## <p align="center"> <a href="https://discordpurple.vercel.app/">Click here to see my project!</a> </p>

## 💬 About
A real-time chat application inspired by Discord. Users can log in with their GitHub username, send messages and stickers instantly, and see other users' messages in real-time. The app features a modern UI with a space-themed background, custom scrollbar, and GitHub profile integration that displays the user's avatar, name, and location.

## 💡 Technologies

This project was developed with the following technologies:

- HTML, CSS
- ReactJS
- Next.js 15
- Firebase Realtime Database

## 💡 Tools

- Skynexui
- Firebase (Realtime Database)
- VS Code
- Vercel
- npm/Yarn

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or Yarn
- Firebase account (for the database)

### Step by Step

1. **Clone the repository**
```bash
git clone https://github.com/Luuan11/discordpurple.git
cd discordpurple
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Configure environment variables**
```bash
# Copy the example file
cp .env.example .env.local

NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://your_project.firebaseio.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

4. **Run the project**
```bash
npm run dev
# or
yarn dev
```

5. **Access**
```
http://localhost:3000
```

## ✅ Features

- ✨ Real-time chat
- 🗑️ Delete message button (only your own messages)
- 😊 Stickers/Emojis
- 🔄 Real-time connection with Firebase
- 📱 Responsive design
- 🎨 Custom ScrollBar
- 🔍 GitHub user search with preview
- ⚡ Optimized performance
- 🛡️ Enhanced security
- 🐛 No known bugs

---

Made with 💜 by [Luan Fernando](https://www.linkedin.com/in/luan-fernando/).
