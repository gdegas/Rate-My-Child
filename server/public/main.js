
function postStudent(student) {
  fetch('/students', {
    method: 'POST',
    body: JSON.stringify(student),
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin'
  })
  .then((response) => {
    console.log(response)
  })
}

const addStudent = document.getElementById('add-student')

addStudent.addEventListener('submit', (event) => {
  event.preventDefault()
  const $studentName = document.getElementById('student-name')
  const $parentName = document.getElementById('parent-name')
  const $parentSms = document.getElementById('parent-sms')
  const studentName = $studentName.value
  const parentName = $parentName.value
  const parentSms = $parentSms.value
  const student = { name: studentName, parent_name: parentName, parent_sms: parentSms }

  postStudent(student)
})
