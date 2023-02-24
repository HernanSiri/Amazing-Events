let indexEvents = "";
for (let event of data.events)
{indexEvents += createcard(event)
}
document.getElementById("cards").innerHTML = indexEvents



