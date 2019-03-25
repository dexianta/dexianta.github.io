var initial_content = [
    
    "<p><strike>barebone terminal (v0.0.1)</strike><p>" + 
    `<p>${(new Date()).toString()}</p>` +  
    "<p>hello, stranger<p><br>", 
    
    "<p>Dexian Tang (唐 德先) is currently a data engineer @ <a target='_blank' href='https://www.yokozunadata.com'>Yokozuna Data</a></p>" + 
    "<p>where he spending most of his time crunching numbers with spark</p>" + 
    "<p>before that, he worked briefly on a marketing platform at a marketing company</p><br>",

    "<p>he spent three years @ <a target='_blank' href='http://www.ssc.pe.titech.ac.jp/'>Tokyo Tech</a> building circuits</p>" + 
    "<p>he later dropped out from school to pursue software with a master degree in Electronic Engineering</p><br>"
]

var commands_cache = []

var help =
    "<div class='text'>" +
    "<p>cv ............. Download CV</p>" + 
    "<p>interest ....... His interests</p>" + 
    "<p>contacts ....... contact info</p>" + 
    "<p>instagram ...... Instagram account</p>" + 
    "<p>code ........... Coding related interests</p>" + 
    "<p>music .......... Some great bands or musicians</p>" + 
    "<p>youtube ........ Some great channels you should check out</p>" + 
    "<br>" +
    "<p>demos .......... Small list of (often fun) demos</p>" + 
    "<p>clear .......... clear screen</p>" + 
    "</div>"

var music = 
    "<p>Hilary Hahn (violin</p>" + 
    "<p>Polyphia (pop/metal?</p>" + 
    "<p>Billie Eilish (pop</p>" + 
    "<p>Yvette Young (math rock</p>" + 
    "<p>Buckethead (metal</p>" + 
    "<p>Hiromi Uehara (jazz</p>" + 
    "<p>Summer Lei (taiwan folk</p>" + 
    "<p>Suneohair (japan folk/pop?</p>" + 
    "<p>...</p>"

var youtube = 
    "<p>exurb1a</p>" + 
    "<p>Kurzgesagt – In a Nutshell</p>" + 
    "<p>Jon Gjengset</p>" + 
    "<p>...</p>"

var demos = 
    "<p><a target='_blank' href='https://mandel-rust.herokuapp.com'> mandelbrot set </a> inspired by an expample from (Programming Rust)</p>"

var contacts = 
    "<p> out_tang_look@gmail.com(when I'm in China) / maniacalmm@gmail.com</p>" + 
    "<p> github: maniacalmm </p>"

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
            return "<p>photograph, PlayStation(especially quantic dream's work), music, guitar, also code, apparently</p>"
        case "code": 
            return "<p>strong interest in big data, system programming, JVM eco-system</p>" + 
                    "<p>he spent quite a lot of time recently playing with scala and rust</p>"
        case "music":
            return music

        case "youtube":
            return youtube

        case "demos":
            return demos;

        case "clear":
            $("#history").empty()
            return "";

        default:
            return `<p>command ${cmd} is not found, or not yet supported`
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
    $("#inital-loading").append("<p>for all available command: type \"help\" </p>")
    $("#rotating").text("done")
}

initial_loading()
