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
