// TimetableAlgorithm.js - Core timetable generation logic
class TimetableGenerator {
  constructor() {
    this.timeSlots = [
      { id: 1, time: '9:00-10:00', period: 1 },
      { id: 2, time: '10:00-11:00', period: 2 },
      { id: 3, time: '11:00-12:00', period: 3 },
      { id: 4, time: '12:00-1:00', period: 4 },
      { id: 5, time: '1:00-2:00', period: 5 }, // Lunch break
      { id: 6, time: '2:00-3:00', period: 6 },
      { id: 7, time: '3:00-4:00', period: 7 },
      { id: 8, time: '4:00-5:00', period: 8 }
    ];
    
    this.days = [
      { id: 1, name: 'Monday' },
      { id: 2, name: 'Tuesday' },
      { id: 3, name: 'Wednesday' },
      { id: 4, name: 'Thursday' },
      { id: 5, name: 'Friday' },
      { id: 6, name: 'Saturday' }
    ];
    
    this.breakPeriods = [5]; // Lunch break
    this.maxConsecutiveHours = 3;
    this.maxDailyHours = 6;
  }

  /**
   * Main timetable generation function
   */
  generateTimetable(teachers, subjects, rooms, batches, assignments, fixedSlots = []) {
    // Initialize timetable structure
    const timetable = this.initializeTimetable(batches);
    
    // Place fixed slots first
    this.placeFixedSlots(timetable, fixedSlots);
    
    // Generate subject sessions based on weekly load
    const sessions = this.generateSessions(subjects, assignments, batches);
    
    // Sort sessions by priority (lab sessions first, then theory)
    const prioritizedSessions = this.prioritizeSessions(sessions, teachers);
    
    // Place sessions using constraint satisfaction
    const result = this.placeSessions(timetable, prioritizedSessions, teachers, rooms);
    
    if (result.success) {
      return {
        success: true,
        timetable: result.timetable,
        statistics: this.generateStatistics(result.timetable, teachers, subjects, rooms),
        warnings: result.warnings
      };
    } else {
      return {
        success: false,
        errors: result.errors,
        partialTimetable: result.timetable
      };
    }
  }

  /**
   * Initialize empty timetable structure
   */
  initializeTimetable(batches) {
    const timetable = {};
    
    Object.keys(batches).forEach(batchKey => {
      timetable[batchKey] = {};
      this.days.forEach(day => {
        timetable[batchKey][day.name] = {};
        this.timeSlots.forEach(slot => {
          timetable[batchKey][day.name][slot.time] = {
            subject: null,
            teacher: null,
            room: null,
            type: this.breakPeriods.includes(slot.period) ? 'Break' : 'Free',
            batchMode: 'combined'
          };
        });
      });
    });
    
    return timetable;
  }

  /**
   * Place pre-defined fixed slots
   */
  placeFixedSlots(timetable, fixedSlots) {
    fixedSlots.forEach(slot => {
      const dayName = this.days[slot.day - 1]?.name;
      const timeSlot = this.timeSlots[slot.period - 1]?.time;
      
      if (dayName && timeSlot && timetable[slot.division]) {
        timetable[slot.division][dayName][timeSlot] = {
          subject: slot.subject,
          teacher: slot.teacher,
          room: slot.room,
          type: 'Fixed',
          batchMode: 'combined'
        };
      }
    });
  }

  /**
   * Generate all required sessions based on weekly load
   */
  generateSessions(subjects, assignments, batches) {
    const sessions = [];
    
    Object.keys(batches).forEach(batchKey => {
      subjects.forEach(subject => {
        const assignment = assignments[batchKey]?.[subject.code];
        if (!assignment || !assignment.teacher || !assignment.room) return;
        
        const [theory, lab] = subject.weekly_load.split(',').map(Number);
        
        // Create theory sessions
        for (let i = 0; i < theory; i++) {
          sessions.push({
            id: `${batchKey}-${subject.code}-T${i}`,
            batch: batchKey,
            subject: subject.code,
            subjectName: subject.name,
            teacher: assignment.teacher,
            room: assignment.room,
            type: 'Theory',
            duration: 1,
            batchMode: assignment.batches,
            priority: this.getSubjectPriority(subject),
            constraints: {
              preferredTimes: this.getPreferredTimes(subject, 'Theory'),
              notAfternoon: subject.semester <= 4, // Morning shift preference
              maxConsecutive: 2
            }
          });
        }
        
        // Create lab sessions
        for (let i = 0; i < lab; i++) {
          sessions.push({
            id: `${batchKey}-${subject.code}-L${i}`,
            batch: batchKey,
            subject: subject.code,
            subjectName: subject.name,
            teacher: assignment.teacher,
            room: assignment.room,
            type: 'Lab',
            duration: 2, // Labs are typically 2 hours
            batchMode: assignment.batches,
            priority: this.getSubjectPriority(subject) + 10, // Higher priority for labs
            constraints: {
              preferredTimes: this.getPreferredTimes(subject, 'Lab'),
              needsConsecutive: true,
              maxConsecutive: 2
            }
          });
        }
      });
    });
    
    return sessions;
  }

  /**
   * Prioritize sessions for optimal placement
   */
  prioritizeSessions(sessions, teachers) {
    return sessions.sort((a, b) => {
      // Lab sessions first
      if (a.type === 'Lab' && b.type !== 'Lab') return -1;
      if (b.type === 'Lab' && a.type !== 'Lab') return 1;
      
      // Higher priority subjects first
      if (a.priority !== b.priority) return b.priority - a.priority;
      
      // Teachers with fewer total hours first (for load balancing)
      const teacherALoad = teachers.find(t => t.mis_id === a.teacher)?.max_hours || 16;
      const teacherBLoad = teachers.find(t => t.mis_id === b.teacher)?.max_hours || 16;
      if (teacherALoad !== teacherBLoad) return teacherALoad - teacherBLoad;
      
      return 0;
    });
  }

  /**
   * Place sessions in timetable using constraint satisfaction
   */
  placeSessions(timetable, sessions, teachers, rooms) {
    const warnings = [];
    const errors = [];
    let placedSessions = 0;
    
    // Create availability tracking
    const teacherAvailability = this.initializeTeacherAvailability(teachers);
    const roomAvailability = this.initializeRoomAvailability(rooms);
    
    sessions.forEach(session => {
      const placement = this.findBestSlot(
        timetable, 
        session, 
        teacherAvailability, 
        roomAvailability,
        teachers, 
        rooms
      );
      
      if (placement.success) {
        this.placeSession(
          timetable, 
          session, 
          placement.day, 
          placement.time,
          teacherAvailability,
          roomAvailability
        );
        placedSessions++;
        
        if (placement.warnings) {
          warnings.push(...placement.warnings);
        }
      } else {
        errors.push({
          session: session.id,
          reason: placement.reason,
          suggestions: placement.suggestions
        });
      }
    });
    
    return {
      success: placedSessions === sessions.length,
      timetable,
      warnings,
      errors,
      placedSessions,
      totalSessions: sessions.length
    };
  }

  /**
   * Find the best available slot for a session
   */
  findBestSlot(timetable, session, teacherAvailability, roomAvailability, teachers, rooms) {
    const batch = timetable[session.batch];
    if (!batch) return { success: false, reason: 'Batch not found' };
    
    const possibleSlots = [];
    
    // Check each day and time slot
    this.days.forEach(day => {
      this.timeSlots.forEach((timeSlot, timeIndex) => {
        // Skip break periods
        if (this.breakPeriods.includes(timeSlot.period)) return;
        
        // Check if slot is available
        if (this.isSlotAvailable(
          timetable, 
          session, 
          day.name, 
          timeSlot.time,
          teacherAvailability,
          roomAvailability
        )) {
          const score = this.calculateSlotScore(
            session, 
            day.name, 
            timeSlot.time, 
            timeIndex,
            timetable,
            teachers
          );
          
          possibleSlots.push({
            day: day.name,
            time: timeSlot.time,
            timeIndex,
            score,
            warnings: []
          });
        }
      });
    });
    
    if (possibleSlots.length === 0) {
      return {
        success: false,
        reason: 'No available slots found',
        suggestions: this.generateSuggestions(session, timetable, teacherAvailability)
      };
    }
    
    // Sort by score (higher is better)
    possibleSlots.sort((a, b) => b.score - a.score);
    const bestSlot = possibleSlots[0];
    
    return {
      success: true,
      day: bestSlot.day,
      time: bestSlot.time,
      warnings: bestSlot.warnings
    };
  }

  /**
   * Check if a slot is available for a session
   */
  isSlotAvailable(timetable, session, day, time, teacherAvailability, roomAvailability) {
    // Check if batch slot is free
    const batchSlot = timetable[session.batch][day][time];
    if (batchSlot.subject !== null && batchSlot.type !== 'Free') return false;
    
    // Check teacher availability
    if (!teacherAvailability[session.teacher][day][time]) return false;
    
    // Check room availability
    if (!roomAvailability[session.room][day][time]) return false;
    
    // For lab sessions, check if consecutive slots are available
    if (session.duration > 1) {
      const currentTimeIndex = this.timeSlots.findIndex(slot => slot.time === time);
      for (let i = 1; i < session.duration; i++) {
        const nextSlot = this.timeSlots[currentTimeIndex + i];
        if (!nextSlot || this.breakPeriods.includes(nextSlot.period)) return false;
        
        const nextBatchSlot = timetable[session.batch][day][nextSlot.time];
        if (nextBatchSlot.subject !== null && nextBatchSlot.type !== 'Free') return false;
        
        if (!teacherAvailability[session.teacher][day][nextSlot.time]) return false;
        if (!roomAvailability[session.room][day][nextSlot.time]) return false;
      }
    }
    
    return true;
  }

  /**
   * Calculate score for a potential slot placement
   */
  calculateSlotScore(session, day, time, timeIndex, timetable, teachers) {
    let score = 100; // Base score
    
    // Preferred time bonuses
    if (session.constraints.preferredTimes) {
      if (session.constraints.preferredTimes.includes(timeIndex)) {
        score += 50;
      }
    }
    
    // Morning preference for lower semesters
    if (session.constraints.notAfternoon && timeIndex < 4) {
      score += 30;
    }
    
    // Avoid back-to-back classes for same teacher
    const teacherSessions = this.getTeacherSessionsOnDay(timetable, session.teacher, day);
    if (teacherSessions.some(s => Math.abs(s.timeIndex - timeIndex) === 1)) {
      score -= 20;
    }
    
    // Prefer clustering subjects for same batch
    const batchSessions = this.getBatchSessionsOnDay(timetable, session.batch, day);
    const adjacentSessions = batchSessions.filter(s => Math.abs(s.timeIndex - timeIndex) === 1);
    score += adjacentSessions.length * 10;
    
    // Penalty for late slots
    if (timeIndex > 6) score -= 15;
    
    // Bonus for optimal lab timing (afternoon preferred for labs)
    if (session.type === 'Lab' && timeIndex >= 4) {
      score += 25;
    }
    
    return score;
  }

  /**
   * Place a session in the timetable
   */
  placeSession(timetable, session, day, time, teacherAvailability, roomAvailability) {
    const timeIndex = this.timeSlots.findIndex(slot => slot.time === time);
    
    // Place for the duration of the session
    for (let i = 0; i < session.duration; i++) {
      const slotTime = this.timeSlots[timeIndex + i].time;
      
      // Update timetable
      timetable[session.batch][day][slotTime] = {
        subject: session.subjectName,
        teacher: session.teacher,
        room: session.room,
        type: session.type,
        batchMode: session.batchMode,
        sessionId: session.id
      };
      
      // Update availability
      teacherAvailability[session.teacher][day][slotTime] = false;
      roomAvailability[session.room][day][slotTime] = false;
    }
  }

  /**
   * Initialize teacher availability tracking
   */
  initializeTeacherAvailability(teachers) {
    const availability = {};
    
    teachers.forEach(teacher => {
      availability[teacher.mis_id] = {};
      this.days.forEach(day => {
        availability[teacher.mis_id][day.name] = {};
        this.timeSlots.forEach(slot => {
          availability[teacher.mis_id][day.name][slot.time] = !this.breakPeriods.includes(slot.period);
        });
      });
    });
    
    return availability;
  }

  /**
   * Initialize room availability tracking
   */
  initializeRoomAvailability(rooms) {
    const availability = {};
    
    rooms.forEach(room => {
      availability[room.room_no] = {};
      this.days.forEach(day => {
        availability[room.room_no][day.name] = {};
        this.timeSlots.forEach(slot => {
          availability[room.room_no][day.name][slot.time] = !this.breakPeriods.includes(slot.period);
        });
      });
    });
    
    return availability;
  }

  /**
   * Get subject priority for scheduling
   */
  getSubjectPriority(subject) {
    // Core subjects get higher priority
    const coreSubjects = ['Operating Systems', 'Database Systems', 'Computer Networks'];
    if (coreSubjects.includes(subject.name)) return 10;
    
    // Lab subjects get medium priority
    if (subject.weekly_load.split(',')[1] !== '0') return 8;
    
    return 5; // Default priority
  }

  /**
   * Get preferred times for a subject type
   */
  getPreferredTimes(subject, type) {
    if (type === 'Lab') {
      return [4, 5, 6, 7]; // Afternoon slots preferred for labs
    }
    
    if (subject.semester <= 4) {
      return [0, 1, 2, 3]; // Morning slots for lower semesters
    }
    
    return null; // No specific preference
  }

  /**
   * Get teacher sessions on a specific day
   */
  getTeacherSessionsOnDay(timetable, teacherId, day) {
    const sessions = [];
    
    Object.keys(timetable).forEach(batchKey => {
      Object.keys(timetable[batchKey][day]).forEach((time, timeIndex) => {
        const slot = timetable[batchKey][day][time];
        if (slot.teacher === teacherId) {
          sessions.push({ time, timeIndex, batch: batchKey });
        }
      });
    });
    
    return sessions;
  }

  /**
   * Get batch sessions on a specific day
   */
  getBatchSessionsOnDay(timetable, batchKey, day) {
    const sessions = [];
    
    Object.keys(timetable[batchKey][day]).forEach((time, timeIndex) => {
      const slot = timetable[batchKey][day][time];
      if (slot.subject) {
        sessions.push({ time, timeIndex, subject: slot.subject });
      }
    });
    
    return sessions;
  }

  /**
   * Generate suggestions for failed placements
   */
  generateSuggestions(session, timetable, teacherAvailability) {
    const suggestions = [];
    
    // Check teacher conflicts
    const teacherConflicts = this.findTeacherConflicts(session.teacher, teacherAvailability);
    if (teacherConflicts.length > 0) {
      suggestions.push(`Teacher ${session.teacher} has conflicts during: ${teacherConflicts.join(', ')}`);
    }
    
    // Check room conflicts
    suggestions.push('Consider using alternative rooms or adjusting session timing');
    
    // Suggest load balancing
    suggestions.push('Consider redistributing teacher workload');
    
    return suggestions;
  }

  /**
   * Find teacher conflicts
   */
  findTeacherConflicts(teacherId, teacherAvailability) {
    const conflicts = [];
    
    this.days.forEach(day => {
      this.timeSlots.forEach(slot => {
        if (!teacherAvailability[teacherId][day.name][slot.time]) {
          conflicts.push(`${day.name} ${slot.time}`);
        }
      });
    });
    
    return conflicts;
  }

  /**
   * Generate timetable statistics
   */
  generateStatistics(timetable, teachers, subjects, rooms) {
    const stats = {
      totalSessions: 0,
      theoryHours: 0,
      labHours: 0,
      teacherUtilization: {},
      roomUtilization: {},
      batchLoad: {},
      conflicts: 0,
      efficiency: 0
    };
    
    // Calculate teacher utilization
    teachers.forEach(teacher => {
      stats.teacherUtilization[teacher.mis_id] = {
        name: teacher.name,
        assigned: 0,
        maximum: teacher.max_hours,
        utilization: 0
      };
    });
    
    // Calculate room utilization
    rooms.forEach(room => {
      stats.roomUtilization[room.room_no] = {
        name: room.room_no,
        type: room.room_type,
        capacity: room.capacity,
        usage: 0,
        utilization: 0
      };
    });
    
    // Analyze timetable
    Object.keys(timetable).forEach(batchKey => {
      let batchHours = 0;
      
      this.days.forEach(day => {
        Object.keys(timetable[batchKey][day.name]).forEach(time => {
          const slot = timetable[batchKey][day.name][time];
          
          if (slot.subject && slot.type !== 'Break' && slot.type !== 'Free') {
            stats.totalSessions++;
            batchHours++;
            
            if (slot.type === 'Lab') {
              stats.labHours++;
            } else {
              stats.theoryHours++;
            }
            
            // Update teacher utilization
            if (stats.teacherUtilization[slot.teacher]) {
              stats.teacherUtilization[slot.teacher].assigned++;
            }
            
            // Update room utilization
            if (stats.roomUtilization[slot.room]) {
              stats.roomUtilization[slot.room].usage++;
            }
          }
        });
      });
      
      stats.batchLoad[batchKey] = batchHours;
    });
    
    // Calculate utilization percentages
    Object.keys(stats.teacherUtilization).forEach(teacherId => {
      const teacher = stats.teacherUtilization[teacherId];
      teacher.utilization = Math.round((teacher.assigned / teacher.maximum) * 100);
    });
    
    Object.keys(stats.roomUtilization).forEach(roomId => {
      const room = stats.roomUtilization[roomId];
      const maxPossibleUsage = this.days.length * (this.timeSlots.length - this.breakPeriods.length);
      room.utilization = Math.round((room.usage / maxPossibleUsage) * 100);
    });
    
    // Calculate overall efficiency
    const totalTeacherUtilization = Object.values(stats.teacherUtilization)
      .reduce((sum, teacher) => sum + teacher.utilization, 0) / teachers.length;
    
    stats.efficiency = Math.round(totalTeacherUtilization);
    
    return stats;
  }

  /**
   * Validate timetable for conflicts
   */
  validateTimetable(timetable) {
    const conflicts = [];
    
    // Check for teacher double-booking
    const teacherSchedule = {};
    
    Object.keys(timetable).forEach(batchKey => {
      this.days.forEach(day => {
        Object.keys(timetable[batchKey][day.name]).forEach(time => {
          const slot = timetable[batchKey][day.name][time];
          
          if (slot.teacher && slot.subject) {
            const key = `${slot.teacher}-${day.name}-${time}`;
            
            if (teacherSchedule[key]) {
              conflicts.push({
                type: 'teacher_conflict',
                teacher: slot.teacher,
                time: `${day.name} ${time}`,
                batches: [teacherSchedule[key].batch, batchKey]
              });
            } else {
              teacherSchedule[key] = { batch: batchKey, subject: slot.subject };
            }
          }
        });
      });
    });
    
    return conflicts;
  }
}

// Export for use
export default TimetableGenerator;