# 📅 College Timetable Generator (MERN Stack)

A **web-based timetable generator** that automates college scheduling by ensuring conflict-free and synchronized allocations for classes, teachers, and rooms.  
Built with the **MERN stack**, this project reduces manual effort, eliminates scheduling conflicts, and optimizes academic resource planning.

---

## 🚀 Features
- ✅ **Automated Timetable Generation** – No more manual scheduling headaches  
- 👥 **Teacher & Class Synchronization** – Tracks availability, workloads, and preferences  
- 🏫 **Room & Equipment Management** – Assigns suitable classrooms/labs with constraints  
- 📂 **Excel (.xlsx) Import** – Teachers, Subjects, Rooms, and Fixed Slots  
- ⚖️ **Workload Balancing** – Load management by designation (HOD, Professor, etc.)  
- 📊 **Multiple Views**  
  - Division-wise timetable  
  - Teacher-wise timetable  
  - Class-wise overview  
- 🔎 **Real-time Conflict Detection** – Prevents overlaps in teacher, room, and slots  
- 🌐 **Intuitive Web Dashboard** – Upload, validate, and generate timetables with ease  

---

## 🛠️ Tech Stack
**Frontend**
- React.js + Vite  
- Tailwind CSS + shadcn/ui components  

**Backend**
- Node.js  
- Express.js
- Fast-API

**Database**
- MongoDB (Mongoose ORM)  

**Libraries & Tools**
- Multer (file uploads)  
- xlsx (Excel parsing)  
- JWT (secure authentication)  
- Axios (API communication)  

---

## 📂 Input Format

Upload **four Excel files** in the following schema:

### 👨‍🏫 Teachers.xlsx
| mis_id | name | email | designation | subject_preferences |
| ------ | ----- | ----- | ----------- | ------------------- |
| T1 | Rumi Jha | rumi@abc.edu | HOD | CS101,CS102,CS103 |

---

### 📘 Subjects.xlsx
| code  | name                 | department | semester | weekly_load |
| ----- | -------------------- | ---------- | -------- | ------------ |
| CS101 | Operating Systems    | CSE        | 3        | 3,1 |

---

### 🏫 Rooms.xlsx
| room_no | capacity | room_type | equipment            |
| ------- | -------- | --------- | -------------------- |
| LAB-1   | 30       | Lab       | Computers,Projector  |

---

### 📌 FixedSlots.xlsx
| division | day | period | teacher | room | subject |
| -------- | --- | ------ | ------- | ---- | ------- |
| CSE-A    | 1   | 2      | T1      | 101  | CS101   |

---

## ⚡ Installation & Setup

### 1️⃣ Clone Repository
```bash
git clone https://github.com/Mandora-Manmeetsnh/timetable-generator.git
cd timetable-generator
```

### 2️⃣ Backend Setup
```bash
cd server
npm install
npm start
```
Runs on [http://localhost:5000](http://localhost:5000)

### 3️⃣ Frontend Setup
```bash
cd ../client
npm install
npm run dev
```
Runs on [http://localhost:3000](http://localhost:3000)

---

## ✅ Usage
1. Log in / Register (if authentication enabled)  
2. Upload the 4 Excel files  
3. Preview parsed data in dashboard  
4. Run subject-teacher assignment → system auto-allocates based on load & preferences  
5. Generate timetables (Division-wise, Teacher-wise, Class-wise)  
6. Export timetable or share with faculty  

---

## 🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss.  

---
## 📜 License
This project is licensed under the MIT License.  
