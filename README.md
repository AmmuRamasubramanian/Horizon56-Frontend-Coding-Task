# Horizon56-Frontend-Coding-Task
A Vue 3 application built as part of the Horizon56 frontend coding task. The project implements a reusable step flow component and demonstrates its dynamic usage within an assignment management interface.

Live Features:
Reusable StepFlow component — vertical step indicator with active/inactive states
Dynamic usage — same component reused inside an assignment popup, driven by real store data
Assignment page — searchable table of assignments with status and remarks
Responsive layout — full sidebar on desktop, collapsed icons on tablet, bottom tab bar on mobile

Tech Stack:
Vue 3 — Framework
TypeScript — Type safety throughout
SCSS — Styling with BEM methodology
Pinia — Global state management
Vite — Build tool

Styling Conventions:
BEM naming throughout: block__element--modifier
All colors defined as CSS variables in _variables.scss
All font families defined as CSS variables and loaded via @font-face
Scoped SCSS per component, global resets in main.scss

The task required a reusable step component. Additionally:
A full Assignment management page was built to demonstrate the component in a real-world context
The same StepFlow component is reused in a popup, driven by live store data
Clicking a step in the popup updates the assignment status in the global store, which reflects immediately in the table
Remarks are editable per step and persisted to the store
Full mobile support with a bottom navigation tab bar

🚀 Project Setup Guide:
This project is built using Vue.js. Follow the steps below to clone and run it locally.

📦 Prerequisites:
Make sure you have the following installed:
1.Git
2.Node.js (Recommended: v16 or above)
3.npm (comes with Node.js) or yarn

🔽 Clone the Repository:
https://github.com/AmmuRamasubramanian/Horizon56-Frontend-Coding-Task.git

📁 Navigate to Project Folder:
cd Horizon56-Frontend-Coding-Task

📥 Install Dependencies:
npm install or yarn

▶️ Run the Project:
npm run dev

🌐 Open in Browser:
After running, open:
http://localhost:5173
(or the port shown in your terminal)

🛠️ Build for Production:
npm run build
