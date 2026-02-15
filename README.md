# Discord - Purple 🚀

📜 Discord Chat built using GitHub accounts with secure OAuth authentication

![disc](https://user-images.githubusercontent.com/79935555/151719904-53c2a721-0976-46d8-be29-cd0508997af5.png)

## <p align="center"> <a href="https://discordpurple.vercel.app/">Click here to see my project!</a> </p>

## 💬 About
A real-time chat application inspired by Discord. Users authenticate securely with GitHub OAuth, ensuring no one can impersonate another user. Send messages and stickers instantly, and see other users' messages in real-time. The app features a modern UI with a space-themed background, custom scrollbar, and GitHub profile integration.

## 💡 Technologies

This project was developed with the following technologies:

- HTML, CSS
- ReactJS
- Next.js 15
- Firebase (Realtime Database + Authentication)

## 💡 Tools

- Skynexui
- Firebase (Realtime Database + GitHub OAuth)
- VS Code
- Vercel
- npm/Yarn

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or Yarn
- Firebase account
- GitHub OAuth App

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

3. **Configure Firebase**
```bash
# Copy the example file
cp .env.example .env.local

# Add your Firebase configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://your_project.firebaseio.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

4. **Configure GitHub OAuth**
   
   a. **Firebase Console:**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Navigate to Authentication > Sign-in method
   - Enable GitHub provider
   - Copy the callback URL provided
   
   b. **GitHub Developer Settings:**
   - Go to [GitHub Developer Settings](https://github.com/settings/developers)
   - Create a new OAuth App
   - Set Homepage URL: `https://your-domain.vercel.app`
   - Set Authorization callback URL: (paste the Firebase callback URL)
   - Copy the Client ID and Client Secret
   
   c. **Back to Firebase:**
   - Paste the Client ID and Client Secret in Firebase Console
   - Save

5. **Run the project**
```bash
npm run dev
# or
yarn dev
```

6. **Access**
```
http://localhost:3000
```

## ✅ Features

- 🔐 Secure GitHub OAuth authentication
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
