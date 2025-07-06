# Expense-Tracker

A simple and responsive web application that helps users keep track of their personal expenses efficiently. Built using HTML, CSS, and JavaScript, this app allows users to manage their daily spending, categorize expenses, and view useful insights like the highest, lowest, and average weekly expenses — all within their browser.
This project is especially useful for students, beginners learning web development, or anyone aiming to showcase a frontend development project in their portfolio.

## 🚀 Features

- ✅ Add new expense entries with amount and category.
- 📊 Display total and filtered expenses by category.
- 📈 Show highest and lowest recorded expenses
- 📆 Calculate and display average weekly expense
- 🧮 Real-time calculation of total spend
- 🗃️ LocalStorage integration — persists data even after page refresh
- 📱 Responsive design — mobile and desktop friendly

## 🛠️ Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Storage:** Browser's LocalStorage API

## 🔧 How It Works

1. **Add Expense:**
   - The user enters the amount, selects a category (like Food, Travel, Bills), date, and an optional description.
   - On submit, this data is stored in LocalStorage and displayed in a table or card format.

2. **Storage:**
   - All data is stored using `localStorage.setItem()` and retrieved using `localStorage.getItem()`.
   - This allows persistent data across page reloads.

3. **Insights:**
   - The app displays:
     - 🔺 **Highest expense**
     - 🔻 **Lowest expense**
     - 📅 **Average weekly expense**
   - These values are automatically calculated based on user input.



