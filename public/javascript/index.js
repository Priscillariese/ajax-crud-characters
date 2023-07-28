const charactersAPI = new APIHandler('http://localhost:8000');

window.addEventListener('load', () => {
  document.getElementById('fetch-all').addEventListener('click', async function (event) {
    const container = document.querySelector(".characters-info")
    try {
      const allChar = await charactersAPI.getFullList()
      if (allChar.length === 0) {
        container.innerHTML += "<p>No characters found.</p>"
      }

      container.innerHTML = allChar.map(oneChar => {
        `<div>
          <h2>Name:${oneChar.name}</h2>
          <p>Occupation: ${oneChar.occupation}</p>
          <p>Weapon: ${oneChar.weapon}</p>
          <p>Cartoon: ${oneChar.cartoon ? "Cartoon" : "Not Cartoon"}</p>
        </div>`
      }).join("")
    } catch (err) {
      console.log(err)
    }

  });

  document.getElementById('fetch-one').addEventListener('click', async function (event) {
    const idInput = document.querySelector(".fetchOneCharacter")
    const charInfo = document.querySelector(".characters-info")
    const id = +idInput.value

    try {
      const character = await charactersAPI.getOneRegister(id)
      if(!character) {
        charInfo.innerHTML = '<p>Character not found.</p>'
      }
      charInfo.innerHTML = `
      <div>
      <h2>Name: ${character.name}</h2>
      <p>Occupation: ${character.occupation}</p>
      <p>Weapon: ${character.weapon}</p>
      <p>Cartoon: ${character.cartoon ? "Cartoon" : "Not Cartoon"}</p>
      </div>
      `;
    } catch (error) {
      console.log(error)
    }
  });

  document.getElementById('delete-one').addEventListener('click', async function (event) {
    const deleteId = document.querySelector(".deleteCharInput")
    const button = document.querySelector(".deleteButton")
    const id = +deleteId.value
    
    try {
      const result = await charactersAPI.deleteOneRegister(id)
      if (result) {
        button.style.backgroundColor = "Green"
      }
    } catch (error) {
      console.log(error)
    }
  });

  document.getElementById('edit-character-form').addEventListener('submit', async function (event) {
    const editId = document.querySelector(".edit-id")
    const name = document.querySelector(".edit-name").value.trim()
    const occupation = document.querySelector(".edit-occupation").value.trim()
    const weapon = document.querySelector(".edit-weapon").value.trim()
    const checkbox = document.querySelector(".edit-checkbox").checked
    const id = +editId.value
    try {
      await charactersAPI.updateOneRegister(id, {name, occupation, weapon, checkbox})
      document.querySelector(".editBtn").style.backgroundColor = "green"
    } catch (error) {
      console.log(error)
      document.querySelector(".editBtn").style.backgroundColor = "red"
    }
  });

  document.getElementById('new-character-form').addEventListener('submit', async function (event) {
    const name = document.querySelector(".newName").value.trim()
    const occupation = document.querySelector(".newOccupation").value.trim()
    const weapon = document.querySelector(".newWeapon").value.trim()
    const checkbox = document.querySelector(".newCartoon").checked

    try {
      await charactersAPI.createOneRegister({name, occupation, weapon, checkbox})
      document.querySelector(".newCharBtn").style.backgroundColor = "green"
    } catch (error) {
      console.log(error)
      document.querySelector(".newCharBtn").style.backgroundColor = "red"
    }
  });
});