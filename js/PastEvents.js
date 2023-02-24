let pastEvents = "";
for (let event of data.events)
{
    let currentDate = new Date(data.currentDate);
    let eventDate = new Date(event.date);
    if (eventDate < currentDate)
    {pastEvents += createcard(event)
    }
}
document.getElementById("cards").innerHTML = pastEvents
