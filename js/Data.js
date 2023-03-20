

async function getData(){
  try{
  const respuesta = await fetch("https://mindhub-xj03.onrender.com/api/amazing");
  if (!respuesta.ok){
    throw new Error(`No hay respuesta de la red`)
  }
  const json = await respuesta.json();
  
  localStorage.setItem("data",JSON.stringify(json));
}
catch(error){
  console.error(error);
}
}
getData()

  function createcard (event){
    return `<div class="card" style="width: 18rem;">
    <img src="${event.image}" class="card-img-top" alt="...">
    <div class="card-body">
       <h5 class="card-title">${event.name}</h5>
        <p class="card-text">${event.description}.</p>
        <p>$${event.price}</p>
        <a href="./Event.html?id=${event._id}" class="btn btn-primary">Ver más...</a>
    </div>
    </div>`
    

  }


  