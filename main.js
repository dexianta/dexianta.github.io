var inputContent
var still_loading = true

var initial_content = [
    "<p>welcome, stranger<p><br>",
    
    "<p>dexian is currently a data engineer @ <a target='_blank' href='https://www.yokozunadata.com'>Yokozuna Data</a></p>" + 
    "<p>where he spending most of his time crunching numbers with spark</p>" + 
    "<p>before that, he worked briefly on a marketing platform at a marketing company</p><br>",

    "<p>he spent three years at Tokyo Tech building IC chips, only to find out software is more of his thing</p>" + 
    "<p>he dropped out from grad school</p><br>"
]

$('#inputform').submit(function(e) {
    e.preventDefault()
    inputContent = $("#input-content").val()
    $("#input-content").val("")
    $("#history").append("<p> ~/dexian $: " + inputContent + "</p>")
})

function processCmd(cmd) {
    switch(cmd) {
        case "cv":
            return 
    }
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function rotating_bar(circling_total) {
    let idx = 0;
    while(idx <= circling_total) {
        console.log("in while ", idx)
        let s = idx % 3
        let bar;
        if (s == 0) bar = "/"
        else if (s == 1) bar = "--"
        else bar = "\\"
        $("#rotating").text(bar)
        await sleep(300)
        idx = idx + 1
    }
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
// function cv() {
//     return "<p>Dexian Tang holds a B.E. from University of Electronic Science and Technology of China.</p>" +

// }
