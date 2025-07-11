var initial_content = [
  "<p><strike>Dexian's Page</strike><p>" +
  `<p id="time" class="text">${(new Date()).toString()}</p>` +
  "<p>I'm a software engineer with wide range of interests. I'm currently working on Data/ML system.</p>"
]

var commands_cache = []

var help =
  "<div class='text'>" +
  "<p>contacts ....... contact info</p>" +
  "<br>" +
  "<p>misc     ....... misc projects </p>" +
  "<p>clear    ....... clear screen</p>" +
  "</div>"

var demos =
  "<p><a target='_blank' href='rock_paper.html'>Rock Paper Scissors</p>"

var contacts =
  "<p> dxe.tang@gmail.com</p>" +
  "<p> github: dexianta </p>"

$('#inputform').submit(function(e) {
  e.preventDefault()
  let inputContent = $("#input-content").val()
  $("#input-content").val("")
  $("#history").append("<span style='color:red'> ~/dexian $: </span>" + "<span>" + inputContent + "</span>")
  $("#history").append(processCmd(inputContent))
  window.scrollTo(0, document.body.scrollHeight)
})

function processCmd(cmd) {
  switch (cmd) {
    case "help":
      return help
    case "contacts":
      return contacts
    case "bio":
      return

    case "fun":
      return demos;

    case "clear":
      $("#history").empty()
      return "";

    default:
      return `<p>command '${cmd}' is not found, or not yet supported`
  }
}


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function rotating_bar(circling_total) {
  let idx = 0;
  let total = 37;
  while (idx <= circling_total) {
    let s = idx % 3
    let bar;
    if (s == 0) bar = "/"
    else if (s == 1) bar = "--"
    else bar = "\\"

    let progress = Math.floor((idx * 1.0 / circling_total) * total)
    $("#rotating").text(getProgressBar(progress, total, bar))
    await sleep(300)
    idx = idx + 1
  }
}

function getProgressBar(progress, total, end) {
  let content = [">"]
  for (let i = 0; i < total; i++) {
    if (i < progress)
      content.unshift("=")
    else
      content.push(".")
  }
  content.push(end)
  return content.join("")
}

async function initial_loading() {
  for (let pp of initial_content) {
    $("#inital-loading").append(pp)
  }
  $("#inital-loading").append("<p>for all available command: \"help\" </p>")
  $("#rotating").text("done")
}

setInterval(() => {
  $("#time").html((new Date()).toString())
}, 1000)

initial_loading()
