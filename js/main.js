let button = document.querySelector(".shortButton");
let links = [];
let link;
let res;
let data;
let shortedDiv = document.querySelector(".shorted");
if (localStorage.getItem("link") != null) {
  links = localStorage.getItem("link").split(",");
  links.forEach(function (link) {
    let url = `https://api.shrtco.de/v2/shorten?url=${link}`;
    fetchFunction(url, link);
  });
}
button.addEventListener("click", function (e) {
  e.preventDefault();
  shortedDiv.innerHTML = "";
  let input = document.querySelector("input");
  let link = input.value;
  if (link == "") {
    document.querySelector(".invalid").style.display = "block";
  } else {
    links.push(link);
    links.forEach(function (link) {
      let url = `https://api.shrtco.de/v2/shorten?url=${link}`;
      fetchFunction(url, link);
      localStorage.setItem("link", links);
    });
  }
});
async function addLink(link) {
  shortedDiv.innerHTML += `<div class="container d-flex flex-column flex-lg-row justify-content-between align-items-center">
  <div class="link">${link}</div>
  <div class="result d-flex flex-column flex-lg-row gap-4 align-items-center">
    <a target="_blank" href="https://${data.result.short_link}" class="shortedLink">${data.result.short_link}</a target="_blank" href="${data.result.short_link}">
    <div class="copying">
      <button class="copy">Copy</button>
      <button class="copied">Copied!</button>
    </div>
  </div>
</div>`;
}
async function fetchFunction(url, link) {
  res = await fetch(url);
  data = await res.json();
  addLink(link);
}
document.addEventListener("click", function (e) {
  if (e.target.className == "copy") {
    let link = e.target.parentElement.parentElement.querySelector(".shortedLink")
    console.log(link.textContent)
    navigator.clipboard.writeText(link.textContent);
    e.target.style.display = "none"
    e.target.parentElement.querySelector(".copied").style.display = "block"
  }
})