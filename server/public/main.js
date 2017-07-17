/* eslint-disable no-unused-vars */

function postStudent(student) {
  return fetch('/students', {
    method: 'POST',
    body: JSON.stringify(student),
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin'
  })
  .then(res => res.json())
  .then(newStudent => {

    console.log(newStudent)
  })
}

function renderStudent(student) {

  const $divStudent = document.createElement('div')
  $divStudent.setAttribute('data-id', student.id)
  $divStudent.classList.add('card-panel', 'waves-effect', 'waves-light', 'teal', 'lighten-2',
                            'z-depth-5', 'col', 's12', 'hoverable')
  const $studentName = document.createElement('h3')
  $studentName.textContent = student.name
  $studentName.classList.add('white-text', 'center-align')
  $divStudent.appendChild($studentName)
  return $divStudent
}

function listStudents() {
  return fetch('/students')
    .then(res => res.json())
    .then(students => {
      console.log(students)
      students.map(renderStudent)
        .forEach($divStudent => {
          $studentList.appendChild($divStudent)
        })
    })
}

function postReport(report) {
  return fetch('/reports', {
    method: 'POST',
    body: JSON.stringify(report),
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin'
  })
  .then(res => res.json())
  .then(newReport => {
    console.log(newReport)
  })
}

function radioColor() {
  const $radioSelected = document.querySelector('input[name="colors"]:checked')
  if ($radioSelected) {
    return $radioSelected.value
  }
}
// in my event listener to click student use both of those

function resetRatingForm(id) {
  const $studentName = document.getElementyById('name-report')
  const $studentIdInput = document.getElementById('student-id')
  findStudent(id)
    .then(student => {
      $studentName.textContent = student.name
      $studentIdInput.value = student.id
    })
}

function findStudent(id) {
  return fetch('/students/' + id)
  .then(res => res.json())
}

const $studentList = document.querySelector('.list-students')
const addStudent = document.getElementById('add-student')
const addReport = document.getElementById('add-report')
const $reportContainer = document.getElementById('add-report-view')

// $reportContainer.addEventListener('click', (event) => {
//
// })

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

addReport.addEventListener('submit', (event) => {
  event.preventDefault()
  const $comment = document.getElementById('report-comment')
  const comment = $comment.value

  const report = { color: radioColor(), log_comment: comment }
  console.log(report)
})

// $container.addEventListener('click', function (event) {
//   var id = event.target.getAttribute('data-id')
//   if (id === null) {
//     return
//   }
//   var surfboard = findBoard(id, $surfboards)
//   var $details = renderDescription(surfboard)
//   $surfboardList.classList.add('hide')
//   $surfboardDescription.appendChild($details)
//   $surfboardDescription.classList.remove('hide')
// })

class HashRouter {
  constructor($views) {
    this.$views = Array.from($views)
    this.isListening = false
  }
  match(hash) {
    const viewId = hash.replace('#', '')
    this.$views.forEach($view => {
      if ($view.id === viewId) {
        $view.classList.remove('hidden')
      }
      else {
        $view.classList.add('hidden')
      }
    })
  }
  listen() {
    if (this.isListening) return
    window.addEventListener('hashchange', () => {
      this.match(window.location.hash)
    })
    this.isListening = true
  }
}

const $views = document.querySelectorAll('.view')
const router = new HashRouter($views)

router.listen()

listStudents()
