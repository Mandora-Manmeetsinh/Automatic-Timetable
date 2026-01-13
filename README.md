# 📅 Automatic Timetable Generator  
*Time, Automated. Conflicts, Eliminated.*

A full-stack system for generating **conflict-free academic timetables** with real-world constraints such as limited classrooms, multiple teachers per subject, fixed slots, and workload balancing.

---

## 👥 Contributors  

### **[Kevan Tamboli](https://github.com/KevanK1)** — Backend & System Architecture  
- Designed and implemented the **core timetable generation engine**
- Built the **conflict-resolution logic** (teacher, room, subject, division)
- Developed the **FastAPI microservice** for scheduling (Python + DSA)
- Implemented **workload balancing**, fixed-slot enforcement, and optimization rules
- Built the **Node.js + Express backend**, APIs, and database schema
- Implemented Excel ingestion, validation, and processing pipelines
- Responsible for **system correctness, performance, and scalability**

### **[Manmeet](https://github.com/ManmeetsinhMandora)** — Frontend Development  
- Developed the **web-based dashboard UI**
- Implemented timetable views and client-side interactions
- Integrated frontend with backend APIs

> This project follows a clear separation of concerns:  
> **Backend logic & system architecture by Kevan**, **Frontend interface by Manmeet**.

---

## ⚡ Why This Exists  

Manual timetable creation is error-prone, time-consuming, and does not scale.

This system guarantees:
- **Zero scheduling conflicts**
- **Optimized use of teachers, rooms, and time**
- **Deterministic and repeatable timetable generation**
- **Export-ready outputs for institutional use**

---

## 🚀 Features  

- ✅ Automated Timetable Generation  
- 👥 Multiple Teachers per Subject  
- 🏫 Limited Classroom Allocation  
- 📂 Excel-Based Input System  
- ⚖ Teacher Workload Balancing  
- 🧠 Conflict-Free Scheduling Engine  
  - Teacher conflicts  
  - Room conflicts  
  - Subject clashes  
  - Fixed-slot enforcement  
- 📊 Multiple Views  
  - Division-wise  
  - Teacher-wise  
  - Room-wise  
- 🌐 Web Dashboard  
- 📤 Export to PDF & Excel  

---

## 🛠 Tech Stack  

### Frontend  
- React.js + Vite  
- Tailwind CSS  
- shadcn/ui  

### Backend  
- Node.js + Express.js  
- FastAPI (Python microservice for timetable logic)  

### Database  
- MongoDB (Mongoose ORM)  

### Tools & Libraries  
- Multer — File uploads  
- xlsx — Excel parsing  
- JWT — Authentication  
- Axios — API communication  

---

## 📂 Input Format  

The system accepts **four structured Excel files**:

### 👨‍🏫 Teachers.xlsx  
| mis_id | name     | email        | designation | subject_preferences |
|-------|----------|--------------|-------------|---------------------|
| T1    | Rumi Jha | rumi@abc.edu | HOD         | CS101,CS102         |

### 📘 Subjects.xlsx  
| code  | name              | department | semester | weekly_load |
|------|-------------------|------------|----------|-------------|
| CS101 | Operating Systems | CSE        | 3        | 3,1         |

### 🏫 Rooms.xlsx  
| room_no | capacity | room_type | equipment |
|--------|----------|-----------|-----------|
| LAB-1  | 30       | Lab       | Computers |

### 📌 FixedSlots.xlsx  
| division | day | period | teacher | room | subject |
|---------|-----|--------|---------|------|---------|
| CSE-A   | 1   | 2      | T1      | 101  | CS101   |

---

## ⚙ Installation & Setup  

```bash
# Clone repository
git clone https://github.com/yourusername/timetable-generator.git
cd timetable-generator

# Backend
cd server
npm install
npm start   # http://localhost:5000

# Frontend
cd ../client
npm install
npm run dev # http://localhost:3000
