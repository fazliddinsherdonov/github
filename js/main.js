let usernameInput = document.getElementById("username")
let searchBtn = document.getElementById("searchBtn")
let title = document.getElementById("title")
let img = document.getElementById("img")
let resulT = document.getElementById("result")
let err = document.getElementById("error")

let apiUrl = "https://api.github.com/users/username"

resulT.style.display = "none"

searchBtn.addEventListener("click", function (e) {
    e.preventDefault()
    let username = usernameInput.value.split(" ").join("")

    if (username == "") return

    fetch(apiUrl.split("username").join(username))
        .then(response => {
            if (response.ok == false) {
                err.style.display = "block"
                err.textContent = "Foydalanuvchi topilmadi"
                resulT.style.display = "none"
                usernameInput.value = ""
                return
            }
            return response.json()
        })
        .then(result => {
            if (result == undefined) return

            err.textContent = ""
            err.style.display = "none"
            resulT.style.display = "block"
            img.src = result.avatar_url

            title.innerHTML = `
                <h2>${result.name || result.login}</h2>
                <a href="${result.html_url}" target="_blank">@${result.login}</a>
                <div class="stats">
                    <span>Repos: <b>${result.public_repos}</b></span>
                    <span>Followers: <b>${result.followers}</b></span>
                    <span>Following: <b>${result.following}</b></span>
                </div>
                <p>Bio: ${result.bio || "Mavjud emas"}</p>
                <p>Location: ${result.location || "Noma'lum"}</p>
            `
            usernameInput.value = ""
        })
})