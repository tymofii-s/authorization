document.querySelector("input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        findUser()
    }
})

document.querySelector("button").addEventListener("click", findUser)

function findUser() {
    if (document.querySelector("input").value === "") {
        infoOut("Введіть ім'я!!!")
        return
    }

    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            const name = document.querySelector("input").value
            for (let i = 0; i < data.length; i++) {
                if (data[i].name.toLowerCase() === name.toLowerCase()) {
                    return data[i]
                }
            }
        })
        .then(person => {
            const personInfo = `
                <p>Ім'я: ${person.name}</p>
                <p>Вік: ${person.age}</p>
                <p>Стать: ${person.gender}</p>
            `
            
            infoOut(personInfo)
        })
        .catch(error => {
            infoOut("Ім'я не знайдено")
        })
}

function infoOut(item) {
    if (document.querySelector("div")) {
        document.querySelector("div").remove()
    }

    let outputDiv = document.createElement("div")
    outputDiv.innerHTML = item
    outputDiv.classList.add("output")
    document.body.appendChild(outputDiv)
}

