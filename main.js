var initial_content = [
    "<p><strike>barebone terminal (v0.0.1)</strike><p>" + 
    `<p id="time" class="text">${(new Date()).toString()}</p>` +  
    "<p>hello, stranger<p><br>", 
    
    "<p>I'm a software engineer who enjoys working on a wide range of things. My main passion is in system programming and low-latency data system.</p>" + 
    "<p>Currently I'm the CTO at <a target='_blank' href='https://www.benshi.ai'>benshi.ai</a> (we're hiring!)</p>" +
    "<p>I used to work at Inditex (owner of <a target='_blank' href='https://www.zara.com/'>Zara</a>) and <a target='_blank' href='https://www.yokozunadata.com'>Yokozuna Data</a>.</p><br>" + 

    "<p>I spent three years @ <a target='_blank' href='http://www.ssc.pe.titech.ac.jp/'>Tokyo Tech</a> building integrated circuits.</p>" + 
    "<p>Later, I dropped out from grad school to <b><i>CODE</i></b></p><br>"
]

var commands_cache = []

var help =
    "<div class='text'>" +
    "<p>interest ....... His interests</p>" + 
    "<p>code ........... Coding related interests</p>" + 
    "<p>contacts ....... contact info</p>" + 
    "<br>" +
    "<p>instagram ...... Instagram account</p>" + 
    "<p>music .......... Some great bands or musicians</p>" + 
    "<p>youtube ........ Some great channels you should check out</p>" + 
    "<br>" +
    "<p>code whims......... Small list of (often fun) programs</p>" + 
    "<p>clear .......... clear screen</p>" + 
    "</div>"

var music = 
    "<p>Hilary Hahn (violin</p>" + 
    "<p>Polyphia (pop/metal?</p>" + 
    "<p>Billie Eilish (pop</p>" + 
    "<p>Yvette Young (math rock</p>" + 
    "<p>Buckethead (metal</p>" + 
    "<p>Hiromi Uehara (jazz</p>" + 
    "<p>Suneohair (japan folk/pop?</p>" + 
    "<p>...</p>"

var youtube = 
    "<p>exurb1a</p>" + 
    "<p>Kurzgesagt – In a Nutshell</p>" + 
    "<p>Jon Gjengset</p>" + 
    "<p>...</p>"

var demos = 
    "<p><a target='_blank' href='https://mandel-rust.herokuapp.com'>mandelbrot set zoom-in</a> wrote during a long flight, bad mobile support, just for fun</p>" + 
    "<p><a target='_blank' href='https://biubiuzz.herokuapp.com'>a shooting game</a> (<a target='_blank' href='https://github.com/dexianta/biubiuzz'>code here</a>) wrote on a weekend during the covid19 quarantine with scala.js, it was very fun to write</p>"

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
    switch(cmd) {
        case "help":
            return help
        case "contacts":
            return contacts
        case "instagram":
            return "<p><a target='_blank' href='https://www.instagram.com/tangdxe/'>tangdxe</a></p>"
        case "interest":
            return "<p>photograph, PS4(especially quantic dream's work), music, guitar, also code, apparently</p>"
        case "code": 
            return "<p>strong interest in data system, system programming, <s>JVM eco-system</s></p>" + 
                   "<p>I spent most of my free time recently tinkering with <a target='_blank' href='https://www.rust-lang.org/'>Rust</a> and Golang</p>"
        case "music":
            return music

        case "youtube":
            return youtube

        case "code whims":
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
    for (let pp of initial_content) {
        await rotating_bar(Math.random() * 5 + 3);
        $("#inital-loading").append(pp)
    }
    $("#inital-loading").append("<p>for all available command: \"help\" </p>")
    $("#rotating").text("done")
}

setInterval(() => {
    $("#time").html((new Date()).toString())
}, 1000)

initial_loading()
