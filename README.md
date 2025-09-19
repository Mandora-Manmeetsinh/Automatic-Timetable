# 📅 Automatic Timetable  
*Time, Automated. Conflicts, Destroyed.*  

Forged by **Kevan** (the architect of chaos-free logic) and **Manmeet** (the master of foundations and polish).  
One brings raw genius, the other ensures it actually ships. Together? **Unstoppable.**  

---

## ⚡ Why This Exists  

Because timetables done by hand are for amateurs.  
**Kevan** and **Manmeet’s Automatic Timetable** guarantees:  
- **Zero conflicts**  
- **Optimized resource use**  
- **Time management beyond human limits**  

---

## 🚀 Features  

- ✅ **Automated Timetable Generation** – Kevan wipes out manual scheduling forever  
- 👥 **Multi-Teacher per Subject** – Even Manmeet approved  
- 🏫 **Limited Classroom Handling** – Smart allocation under scarcity  
- 📂 **Excel Uploads** – Teachers, Subjects, Rooms, Fixed Slots  
- ⚖ **Workload Balancing** – No HOD overworked, no TA underused  
- 🔄 **FastAPI Microservice (Python DSA Logic)** – Kevan’s brilliance in action  
- 🧠 **Conflict-Free Scheduling** – Teacher, room, subject: flawless every time  
- 📊 **Multiple Views**  
  - Division-wise timetables  
  - Teacher-wise timetables  
  - Class-wise overviews  
- 🔎 **Real-time Conflict Detection** – Manmeet made sure it’s bulletproof  
- 🌐 **Web Dashboard** – Manmeet’s skeleton, Kevan’s soul  
- 📤 **Export Options** – PDF / Excel for your empire  

---

## 🛠 Tech Stack  

**Frontend**  
- React.js + Vite  
- Tailwind CSS + shadcn/ui  

**Backend**  
- Node.js + Express.js  
- FastAPI (Python microservice for timetable logic)  

**Database**  
- MongoDB (Mongoose ORM)  

**Libraries & Tools**  
- Multer (file uploads)  
- xlsx (Excel parsing)  
- JWT (authentication & security)  
- Axios (API communication)  

---

## 📂 Input Format  

Upload 4 Excel files:  

### 👨‍🏫 Teachers.xlsx  
| mis_id | name     | email         | designation | subject_preferences |
| ------ | -------- | ------------- | ----------- | ------------------- |
| T1     | Rumi Jha | rumi@abc.edu  | HOD         | CS101,CS102,CS103   |

### 📘 Subjects.xlsx  
| code  | name              | department | semester | weekly_load |
| ----- | ----------------- | ---------- | -------- | ------------ |
| CS101 | Operating Systems | CSE        | 3        | 3,1          |

### 🏫 Rooms.xlsx  
| room_no | capacity | room_type | equipment            |
| ------- | -------- | --------- | -------------------- |
| LAB-1   | 30       | Lab       | Computers,Projector  |

### 📌 FixedSlots.xlsx  
| division | day | period | teacher | room | subject |
| -------- | --- | ------ | ------- | ---- | ------- |
| CSE-A    | 1   | 2      | T1      | 101  | CS101   |

---

## ⚡ Installation & Setup  

```bash
# 1️⃣ Clone Repository
git clone https://github.com/yourusername/timetable-generator.git
cd timetable-generator

# 2️⃣ Backend Setup
cd server
npm install
npm start   # http://localhost:5000

# 3️⃣ Frontend Setup
cd ../client
npm install
npm run dev # http://localhost:3000
