const API = "YOUR_SCRIPT_URL"

async function searchTicket(){

const query = document.getElementById("search").value

const res = await fetch(API,{
method:"POST",
body:new URLSearchParams({
action:"search",
query:query
})
})

const data = await res.json()

document.getElementById("result").innerHTML = `

<h3>${data[0]}</h3>

<p>Name: ${data[1]}</p>
<p>Phone: ${data[2]}</p>
<p>Email: ${data[3]}</p>
<p>Status: ${data[11]}</p>

<img src="${data[8]}" width="120">
<img src="${data[9]}" width="120">
<img src="${data[10]}" width="120">

<br><br>

<button onclick="closeTicket('${data[0]}','${data[3]}')">
Mark Closed
</button>

`

}

async function closeTicket(ticket,email){

await fetch(API,{
method:"POST",
body:new URLSearchParams({
action:"close",
ticket_id:ticket
})
})

/* send completion email */

emailjs.send(
"service_chf6h93",
"template_completion",
{
ticket_id:ticket,
email:email
})

alert("Ticket Closed")

}
