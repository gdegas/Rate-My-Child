
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
  const aTag = document.createElement('a')
  aTag.setAttribute('href', '#add-report-view')
  const $divStudent = document.createElement('div')
  $divStudent.setAttribute('data-id', student.id)
  $divStudent.classList.add('card-panel', 'waves-effect', 'waves-light', 'teal', 'lighten-2',
                            'z-depth-5', 'col', 's12', 'hoverable')
  const $studentName = document.createElement('h3')
  $studentName.setAttribute('data-id', student.id)
  $studentName.textContent = student.name
  $studentName.classList.add('white-text', 'center-align')
  $divStudent.appendChild($studentName)
  aTag.appendChild($divStudent)
  return aTag
}

function listStudents() {
  return fetch('/students')
    .then(res => res.json())
    .then(students => {
      console.log(students)
      $studentList.innerHTML = ''
      students.map(renderStudent)
        .forEach($divStudent => {
          $studentList.appendChild($divStudent)
        })
    })
}

function postReport(report, send) {
  return fetch('/reports' + send, {
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

function resetReportForm(id) {
  const $studentName = document.getElementById('name-report')
  const $studentIdInput = document.getElementById('student-id')
  const $reportDate = document.getElementById('report-date')
  const utc = new Date().toJSON().slice(0, 10).replace(/-/g, '/')
  $reportDate.textContent = utc
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
const $addStudent = document.getElementById('add-student')
const $addReport = document.getElementById('add-report')
const $reportContainer = document.getElementById('add-report-view')
const $studentsView = document.getElementById('list')

$studentsView.addEventListener('click', (event) => {
  const dataId = event.target.getAttribute('data-id')
  if (dataId === null) {
    return
  }
  resetReportForm(dataId)
  $studentsView.classList.add('hidden')
  $reportContainer.classList.remove('hidden')
})

$addStudent.addEventListener('submit', (event) => {
  event.preventDefault()
  const $studentName = document.getElementById('student-name')
  const $parentName = document.getElementById('parent-name')
  const $parentSms = document.getElementById('parent-sms')
  const studentName = $studentName.value
  const parentName = $parentName.value
  const parentSms = $parentSms.value
  const student = { name: studentName, parent_name: parentName, parent_sms: parentSms }

  postStudent(student)
  alert(studentName + 'has been added!')
  router.push('list')
})

$addReport.addEventListener('submit', (event) => {
  event.preventDefault()
  const $comment = document.getElementById('report-comment')
  const comment = $comment.value
  const $studentId = document.getElementById('student-id')
  const $studentName = document.getElementById('name-report')
  const $radioSelected = document.querySelector('input[name="colors"]:checked')
  const $smsCheckbox = document.getElementById('send-sms')
  const report = { color: $radioSelected.value, log_comment: comment, student_id: $studentId.value }
  if ($smsCheckbox.checked) {
    postReport(report, '?send=true')
    alert('SMS of report has been sent to parent')
  }
  else {
    postReport(report, '')
  }
  alert('Thank you for logging ' + $studentName.textContent + '\'s report for the day!')
  router.push('list')
})

$addReport.addEventListener('click', (event) => {
  const dataId = event.target.getAttribute('data-id')
  const tooltips = document.querySelectorAll('.tooltips')
  if (dataId === null) {
    return
  }
  for (let i = 0; i < tooltips.length; i++) {
    if (tooltips[i].getAttribute('value') === dataId) {
      tooltips[i].classList.remove('hidden')
    }
    else {
      tooltips[i].classList.add('hidden')
    }
  }
})

class HashRouter {
  constructor($views) {
    this.$views = Array.from($views)
    this.handlers = {}
    this.isListening = false
  }
  match(hash) {
    const $view = this.$views.find($view => {
      return $view.id === hash
    })
    const handler = this.handlers[hash]
    if (!$view || !handler) return
    handler($view)
      .then(() => {
        this.$views.forEach($view => {
          if ($view.id === hash) {
            $view.classList.remove('hidden')
          }
          else {
            $view.classList.add('hidden')
          }
        })
      })
  }
  when(hash, handler) {
    this.handlers[hash] = handler
  }
  listen() {
    if (this.isListening) return
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.replace('#', '')
      this.match(hash)
    })
    window.dispatchEvent(new Event('hashchange'))
    this.isListening = true
  }
  push(newhash) {
    window.location.hash = newhash
  }
}

const $views = document.querySelectorAll('.view')
const router = new HashRouter($views)

router.when('list', $view => {
  return listStudents()
})

router.when('add', $view => {
  return Promise.resolve()
})

router.when('add-report-view', $view => {
  return Promise.resolve()
})

router.push('list')

router.listen()
