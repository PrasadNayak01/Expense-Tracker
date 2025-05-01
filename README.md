# Expense Tracker

A simple and responsive web-based Expense Tracker to manage your personal income and expenses with real-time balance updates and persistent local storage.

## 📸 Preview

![App Preview](assets/preview.png)

## 🚀 Features

- Add income or expense transactions
- Auto-calculates:
  - 💵 Total Income
  - 💸 Total Expenses
  - 💰 Current Balance
- Transaction history with styling based on type
- Persists data using `localStorage`
- Simple, intuitive user interface

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript (Vanilla)

## 📂 Project Structure

```plaintext
Expense-Tracker/
│
├── assets/
│   └── preview.png
├── index.html
├── README.md
├── script.js
└── style.css
```

## 📋 How to Use

1. **Clone the Repository**
   ```bash
   git clone https://github.com/PrasadNayak01/Expense-Tracker.git
   cd Expense-Tracker
   ```

2. **Open the App**
   - Double-click `index.html`, or
   - Open it via Live Server in VS Code

3. **Start Tracking**
   - Select entry type (`income` or `expense`)
   - Enter a name and amount
   - Click **Add**
   - Your transaction will be saved and displayed in the history

## 🧠 How It Works

- App listens for a button click event
- Validates and stores transactions in an array
- Calculates and displays totals dynamically
- Stores transaction data in `localStorage` to persist across sessions

## 🧼 Resetting Data

To clear saved transactions:
- Open Developer Tools → Application → Local Storage
- Clear the data

---
Made by [Prasad Nayak](https://github.com/PrasadNayak01)