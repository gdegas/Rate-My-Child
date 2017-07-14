
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
  $divStudent.classList.add('card-panel', 'waves-effect', 'waves-light', 'teal', 'lighten-2',
                            'z-depth-5', 'col', 's12')
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

const $studentList = document.querySelector('.list-students')
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
