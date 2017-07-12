const student = {
  name: 'Gerard',
  parent_name: 'olga',
  parent_sms: 71717171
}


function postStudent() {
  fetch('/students', {
    method: "POST",
    body: JSON.stringify(student),
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"
  }).then(function (response) {
    response.status     //=> number 100–599
    response.statusText //=> String
    response.headers    //=> Headers
    response.url        //=> String

    return response.text()
  }, function (error) {
    error.message //=> String
  })
}
