let usernameInput = document.getElementById("username")
let searchBtn = document.getElementById("searchBtn")
let title = document.getElementById("title")
let img = document.getElementById("img")
let resulT = document.getElementById("result")
let err = document.getElementById("error")

resulT.style.display = "none"

searchBtn.addEventListener("click", function (e) {
    e.preventDefault()
    let username = usernameInput.value.trim()

    if (username === "") return

    fetch(`https://api.github.com/users/${username}`)
        .then(response => {
            if (response.ok === false) throw new Error("404")
            return response.json()
        })
        .then(result => {
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
        .catch(() => {
            resulT.style.display = "none"
            img.src = ""
            err.textContent = ("Foydalanuvchi topilmadi")
            usernameInput.value = ""
        })
})