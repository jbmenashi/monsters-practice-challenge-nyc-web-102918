document.addEventListener("DOMContentLoaded", () => {

  let monsterPage = 1
  const monsterContainer = document.getElementById('monster-container')
  const newMonsterForm = document.querySelector(".new-monster-form")
  const forwardButton = document.getElementById('forward')
  const backButton = document.getElementById('back')

  const fetchMonsters = () => {
    fetch('http://localhost:3000/monsters/?_limit=50&_page=' + monsterPage)
    .then( response => response.json() )
    .then( data => {
      allMonsters = data
      showMonsters(allMonsters)
    })
  }

  const showMonsters = (allMonsters) => {
    allMonsters.forEach((monster) => {
      monsterContainer.innerHTML += `<h2>${monster.name}</h2>
                                    <h4>Age: ${monster.age}</h4>
                                    <p>Bio: ${monster.description}</p>`
    })
  }

  newMonsterForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const name = event.target.querySelector('#name-input').value
    const age = event.target.querySelector('#age-input').value
    const bio = event.target.querySelector('#bio-input').value

    fetch('http://localhost:3000/monsters', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
        'Accept' : 'application/json'
      },
      body: JSON.stringify({
        name: name,
        age: age,
        description: bio
      })
    })
    .then(response => response.json())
    .then(data => {
      allMonsters.push(data)
      monsterContainer.innerHTML += `<h2>${name}</h2>
                                    <h4>Age: ${age}</h4>
                                    <p>Bio: ${bio}</p>`

    })

    console.log(allMonsters.length);

  })

  forwardButton.addEventListener('click', (event) => {
    monsterPage += 1
    monsterContainer.innerHTML = ''
    fetchMonsters()
  })

  backButton.addEventListener('click', (event) => {
    if (monsterPage > 1) {
      monsterPage -= 1
      monsterContainer.innerHTML = ''
      fetchMonsters()
    }
    else {
      monsterPage = 1;
    }

  })




  fetchMonsters()
})
