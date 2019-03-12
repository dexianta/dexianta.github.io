var initial_content = [
    "<p>welcome, stranger<p><br>",
    
    "<p>dexian is currently a data engineer @ <a target='_blank' href='https://www.yokozunadata.com'>Yokozuna Data</a></p>" + 
    "<p>where he spending most of his time crunching numbers with spark</p>" + 
    "<p>before that, he worked briefly on a marketing platform at a marketing company</p><br>",

    "<p>he spent three years at Tokyo Tech building IC chips, only to find out software is more of his thing</p>" + 
    "<p>he dropped out from grad school</p><br>"
]

var commands_cache = []

var help =
    "<div class='text'>" +
    "<p>cv ............. Download CV</p>" + 
    "<p>interest ....... Dexian's interest</p>" + 
    "<p>email .......... Email address of dexian tang</p>" + 
    "<p>instagram ...... Dexian's instagram account</p>" + 
    "</div>"

$('#inputform').submit(function(e) {
    e.preventDefault()
    let inputContent = $("#input-content").val()
    $("#input-content").val("")
    $("#history").append("<p> ~/dexian $: " + inputContent + "</p>")
    $("#history").append(processCmd(inputContent))
})

function processCmd(cmd) {
    switch(cmd) {
        case "help":
            return help
        default:
            return `<p>command${cmd} is not found, or not supported yet`
    }
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function rotating_bar(circling_total) {
    let idx = 0;
    let total = 40;
    while(idx <= circling_total) {
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
    console.log("inital loading!!");
    for (let pp of initial_content) {
        await rotating_bar(Math.random() * 5 + 5);
        console.log(pp)
        $("#inital-loading").append(pp)
    }
    $("#inital-loading").append("<p>for all available command, try help :) </p>")
    $("#rotating").text("done")
}

initial_loading()
