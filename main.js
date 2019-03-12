console.log("yoooo")
var inputContent;
$('#inputform').submit(function(e) {
    e.preventDefault()
    inputContent = $("#input-content").val()
    $("#input-content").val("")
    $("#history").append("<p class='text'> ~/dexian $: " + inputContent + "</p>")
    
})
