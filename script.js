const API = "https://script.google.com/macros/s/AKfycby0RMZJJK3BCiRVvAx48gcIQppC4dZZxzt6MfJWQiiPn1ct0VKa1yNR93OwyvGh_aQl/exec"


async function searchTicket(){

const query = document.getElementById("search").value

const res = await fetch(`${API}?query=${encodeURIComponent(query)}`)

const data = await res.json()

if(data.status === "not_found"){

document.getElementById("result").innerHTML = "No ticket found"
return

}

document.getElementById("result").innerHTML = `

<h3>Ticket: ${data[0]}</h3>

<p><b>Name:</b> ${data[1]}</p>
<p><b>Phone:</b> ${data[2]}</p>
<p><b>Email:</b> ${data[3]}</p>
<p><b>Status:</b> ${data[11]}</p>

<img src="${data[8]}" width="120">
<img src="${data[9]}" width="120">
<img src="${data[10]}" width="120">

<br><br>

<button onclick="closeTicket('${data[0]}','${data[3]}','${data[1]}')">
Mark Closed
</button>

`

}

async function closeTicket(ticket,email,name){

await fetch(API,{
method:"POST",
mode:"no-cors",
body:new URLSearchParams({
action:"close",
ticket_id:ticket
})
})

await emailjs.send(
"service_chf6h93",
"template_f3dz9ox",
{
ticket_id:ticket,
name:name,
to_email:email
})

alert("Ticket closed and email sent.")

}

