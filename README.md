# Discord - Purple 🚀

📜 Chat built using GitHub accounts with secure OAuth authentication

<img width="1300" height="530" alt="image" src="https://github.com/user-attachments/assets/89d34a27-67fe-467f-984a-a9ab56859878" />

### <p align="center"> <a href="https://discordpurple.vercel.app/">Click here to see my project!</a> </p>

## 💬 About
A real-time chat application inspired by Discord. Users authenticate securely with GitHub OAuth, ensuring no one can impersonate another user. Send messages and stickers instantly, and see other users' messages in real-time. The app features a modern UI with a space-themed background, custom scrollbar, and GitHub profile integration.

## ✅ Features

- 🔐 **Secure GitHub OAuth authentication** - No impersonation possible
- ✨ **Real-time chat** - Powered by Firebase Realtime Database
- ✏️ **Edit messages** - 3-dot menu with edit/delete options
- 🗑️ **Delete messages** - Only your own messages
- 📝 **Edited indicator** - Shows when a message was edited with timestamp
- ⏱️ **Message timestamps** - See when each message was sent
- 😊 **Stickers** - Local SVG stickers for fast loading
- 🚦 **Rate limiting** - 3 seconds between messages (anti-flood)
- 📏 **Character limit** - 200 characters per message with live counter
- 📱 **Responsive design** - Works on mobile and desktop
- 🎨 **Custom ScrollBar** - Beautiful purple-themed UI
- ⚡ **Optimized performance** - No external image requests for stickers

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
- npm
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
```

6. **Access**
```
http://localhost:3000
```
---

Made with 💜 by [Luan Fernando](https://www.linkedin.com/in/luan-fernando/).
