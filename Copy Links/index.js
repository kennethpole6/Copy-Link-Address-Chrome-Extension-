const input = document.getElementById('input-link')
const inputBtn = document.getElementById('input-button')
const items = document.getElementById('listItems')
const deleteBtn = document.getElementById('delete-button')
const grabURL = document.getElementById('grab-url')
const linksFromLocalStorage = JSON.parse(localStorage.getItem("links"))
let links = []

inputBtn.addEventListener("click", () => {
    links.push(input.value)
    input.value = ""
    localStorage.setItem("links", JSON.stringify(links))
    renderLinks()
})

deleteBtn.addEventListener("click", () => {
    localStorage.clear()
    links = []
    renderLinks()
    items.innerHTML = ""
})

grabURL.addEventListener("click", () => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        links.push(tabs[0].url)
        localStorage.setItem("links", JSON.stringify(links))
        renderLinks()
    })
})

if (linksFromLocalStorage) {
    links = linksFromLocalStorage
    renderLinks()
}

function renderLinks() {
    let listItem = ""
    for (let i = 0; i < links.length; i++) {
        listItem += `<a target='_blank' href='${links[i]}'> ${links[i]}</a>`
        items.innerHTML = listItem
    }
}

renderLinks() 