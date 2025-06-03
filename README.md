# 📅 College Timetable Generator (MERN Stack)

A web-based **timetable generator** that automates college scheduling by ensuring conflict-free and synchronized allocations for classes and faculty. Designed to save time, reduce human error, and optimize academic resource planning.

---

## 🚀 Features

- ✅ Automated Timetable Generation  
- 👥 Class & Teacher Synchronization  
- 📂 Excel (.xlsx) Data Import & Parsing  
- 🧠 Conflict-Free Scheduling Algorithm  
- 💻 Intuitive Web-Based Interface  
- 🔒 Secure Authentication with JWT  

---

## 🛠️ Tech Stack

**Frontend**  
- React.js  
- React Bootstrap  

**Backend**  
- Node.js  
- Express.js  

**Database**  
- MongoDB (with Mongoose)  

**Tools & Libraries**  
- Multer (File Uploads)  
- xlsx (Excel File Handling)  
- JSON Web Token (JWT Authentication)  
- Postman (API Testing)  

---

## 📥 Input Format

Upload an `.xlsx` Excel file containing:

- 👨‍🏫 **Teacher Information** (Name, Subject, Availability)  
- 🏫 **Classroom Data** (Room Capacities, Assigned Grades)  
- 📘 **Subject Distribution** (Mapping of Teachers to Classes)  

The system processes this data and generates a timetable based on predefined scheduling logic.

---

## 📸 Screenshots *(Optional)*

<!-- Include screenshots here when available -->
<!-- 
![Upload Excel](./screenshots/upload_excel.png)
![Generated Timetable](./screenshots/generated_timetable.png)
-->

---

## 📦 Installation

> Ensure you have Node.js, npm, and MongoDB installed locally.

```bash
# Clone the repository
git clone https://github.com/yourusername/timetable-generator.git
cd timetable-generator

# Install backend dependencies
cd server
npm install
npm start

# Install frontend dependencies
cd ../client
npm install
npm start
```

The frontend will typically run at `http://localhost:3000` and the backend at `http://localhost:5000`.

---

## ✅ Usage

1. Log in or register (if authentication is enabled).  
2. Upload your `.xlsx` Excel file.  
3. The system parses the data and validates it.  
4. Click **"Generate Timetable"** to produce optimized results.  
5. View or download the generated timetables.  

---

## 📁 Folder Structure

```
timetable-generator/
├── client/          # React frontend
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       └── utils/
├── server/          # Node.js backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── utils/
└── README.md
```

---

## 🧠 Benefits

- 🧩 Eliminates manual scheduling overhead  
- 🔁 Ensures resource optimization and fair workload distribution  
- ⚡ Saves time and reduces administrative errors  
- 📊 Scalable for small and large institutions  

---

## 📄 License

This project is licensed under the **MIT License**.  
© 2025 [Mandora Manmeetsinh](https://github.com/Mandora-Manmeetsinh)

---

## 🙋‍♂️ Author

**Mandora Manmeetsinh**  
🌐 [GitHub](https://github.com/Mandora-Manmeetsinh)  
🔗 [LinkedIn](https://www.linkedin.com/in/yourprofile)  
☕ [Buy Me a Coffee](https://buymeacoffee.com/mandora)

---

> _“If you automate the boring stuff, you get more time for creative work.”_
