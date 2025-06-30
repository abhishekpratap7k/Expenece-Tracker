
# 💸 Expense Tracker – React.js Project

A feature-rich, responsive Expense Tracker built with React.js for managing personal finances. Users can log income and expenses, set monthly saving goals, and visualize spending trends with dynamic charts.

---

## 🚀 Features

- 🔐 **Multi-User Login** with Email + Password or PIN (via sessionStorage)
- 💰 **Add/Edit/Delete Income & Expenses** (per user, stored in localStorage)
- 📊 **Spending Summary** and **Balance Calculation**
- 📅 **Filter & Sort Transactions** by date or category
- 🎯 **Monthly Goal Setting** with progress tracking
- ♻️ **Auto-Renew Income Monthly** unless reset
- 📈 **Pie and Line Charts** (via Recharts)
- 🌙 **Dark Mode Toggle**
- 📤 **Export to CSV**
- 🧹 **Reset Transactions**
- 📱 Fully **Responsive UI** and animated interactions

---

## 🛠️ Tech Stack

- **Frontend:** React.js (Functional Components)
- **State Management:** useState, useEffect
- **Data Persistence:** localStorage & sessionStorage
- **Charts:** Recharts
- **Styling:** Tailwind CSS + Custom CSS Modules
- **Routing:** react-router-dom

---

## 📂 Folder Structure

```
src/
│
├── components/
│   ├── AddIncome.jsx
│   ├── AddExpense.jsx
│   ├── TransactionList.jsx
│   ├── Summary.jsx
│   ├── GoalSetting.jsx
│   ├── FilterBar.jsx
│   ├── SortBar.jsx
│   ├── SpendingChart.jsx
│   ├── ExportCSV.jsx
│   ├── DarkModeToggle.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   └── Logout.jsx
│
├── App.jsx
├── App.css
└── index.js
```

---

## 🧠 Key Concepts Used

- React Hooks: `useState`, `useEffect`
- Modular Component Design
- Form Handling & Validation
- Data Storage (session/local)
- Real-Time Chart Updates
- Authentication Logic without Backend

---

## 📦 Installation

```bash
git clone https://github.com/your-username/expense-tracker-react.git
cd expense-tracker-react
npm install
npm start
```

---

## ✅ Usage

1. Register or Login with Email + Password / PIN
2. Set Monthly Income
3. Add Expenses with Category + Amount
4. Track goals and progress
5. Export your records anytime!

---

## 📌 Note

- No backend required – purely frontend project
- Can be scaled using Firebase or any backend with authentication

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Abhishek Pratap**  
Java & React Developer  
[LinkedIn](https://www.linkedin.com/) • [GitHub](https://github.com/)
