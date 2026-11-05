import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { initialAttendance, initialStudents, marks as initialMarks } from '../data/seed'

export const useSchoolStore = defineStore('school', () => {
  const storedStudents = JSON.parse(localStorage.getItem('school-demo-students') || 'null')
  const students = ref(storedStudents ? storedStudents.map(student => ({
    ...student,
    email: student.email?.replace('@northstar.edu', '@mestar.edu'),
    parentEmail: student.parentEmail?.replace('@northstar.edu', '@mestar.edu'),
  })) : initialStudents)
  const attendance = ref(JSON.parse(localStorage.getItem('school-demo-attendance') || 'null') || initialAttendance)
  const marks = ref(JSON.parse(localStorage.getItem('school-demo-marks') || 'null') || initialMarks)
  const myChildren = computed(() => students.value.filter(student => student.parentEmail === 'parent@mestar.edu'))
  function persist() { localStorage.setItem('school-demo-students', JSON.stringify(students.value)); localStorage.setItem('school-demo-attendance', JSON.stringify(attendance.value)) }
  function saveStudent(student) {
    const exists = students.value.some(item => item.id === student.id)
    if (exists) students.value = students.value.map(item => item.id === student.id ? { ...item, ...student } : item)
    else students.value.unshift({ ...student, initials: student.name.split(' ').map(part => part[0]).join('').slice(0, 2).toUpperCase(), attendance: 100, average: 0, status: 'New student', color: 'mint' })
    const savedStudent = students.value.find(item => item.id === student.id)
    const attendanceRecord = attendance.value.find(item => item.id === student.id)
    if (attendanceRecord) Object.assign(attendanceRecord, savedStudent)
    else attendance.value.push({ ...savedStudent, status: 'Present' })
    persist()
  }
  function deleteStudent(id) { students.value = students.value.filter(student => student.id !== id); attendance.value = attendance.value.filter(student => student.id !== id); persist() }
  function setAttendance(id, status) { attendance.value = attendance.value.map(student => student.id === id ? { ...student, status } : student); persist() }
  function saveMarks(updatedMarks) { marks.value = updatedMarks.map(subject => ({ ...subject })); localStorage.setItem('school-demo-marks', JSON.stringify(marks.value)) }
  return { students, attendance, marks, myChildren, saveStudent, deleteStudent, setAttendance, saveMarks }
})
