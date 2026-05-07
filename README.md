# 🧠 Task Management Dashboard (React + Vite)

A modern **task management web application** built using **React + Vite+ Javascript**, where users can create, update, delete, and organize tasks in a Kanban-style dashboard.

It includes authentication (login/register), toast notifications, modal-based editing, and drag-like status movement system.


## 🚀 Features

### 🔐 Authentication
- Login / Register system
- Form validation (email, password, name rules)
- LocalStorage-based user session
- Redirect to dashboard after login


### 📊 Task Dashboard
- Trello-style board layout
- Multiple task columns:
  - To Do
  - Doing
  - Blocked
  - Code Review
  - QA
  - Done


### 📝 Task Management
- ➕ Add new task (with validation)
- ✏️ Edit existing task (modal)
- ❌ Delete task (confirmation modal)
- 🔄 Move tasks between columns
- 📌 Task status tracking


### 🔍 Search & Filter
- Search tasks by title or description
- Filter tasks by status (column-wise)


### 🎨 UI/UX Features
- Responsive dashboard layout
- Modal-based editing system
- Toast notifications for alerts
- Clean Kanban board design
- Loading skeleton UI


## 🧰 Tech Stack

- React (Vite)
- React Router DOM
- React Toastify (notifications)
- React Icons
- Styled Components / CSS
- LocalStorage (for persistence)
- Javascript


## 📦 Installation

### 1. Clone the repository
```bash
git clone https://github.com/Aditigithubsri/Edtech-Project.git

### 2. start Project
npm install
npm start