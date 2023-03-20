var data = localStorage.getItem('data');


data = JSON.parse(data);


function displayAllEvents(data) {
  let indexEvents = ""; 
  for (let event of data.events) {
    indexEvents += createcard(event); 
  }

  document.getElementById("cards").innerHTML = indexEvents;
}


function filterEvents(events, categories, search) {
  return events.filter(event => {
    
    if (categories.length > 0 && !categories.includes(event.category)) {
      return false;
    }
    
    if (search && !(event.name.toLowerCase().includes(search.trim().toLowerCase()) || event.description.toLowerCase().includes(search.trim().toLowerCase())) ) {
      return false;
    }
    return true;
  });
}


function updateEventsDisplay() {
  
  const categories = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(checkbox => checkbox.value);

 
  const searchInput = document.getElementById("search");
  const search = searchInput.value.trim().toLowerCase();

  
  const filteredEvents = filterEvents(data.events, categories, search);

  
  if (filteredEvents.length > 0) {
    displayAllEvents({ events: filteredEvents });
  } else {
    document.getElementById("cards").innerHTML = "<h6>No se encontraron resultados, Por favor, intente modificando su filtro de busqueda.</h>";
  }
}


function crearCheckbox() {
  const todasLasCategorias = data.events.map(evento => evento.category); 
  const categoriasUnicas = [...new Set(todasLasCategorias)]; 
  const inputCheckbox = categoriasUnicas.map(category => {
    
    return `<div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" id="${category}" value="${category}">
              <label class="form-check-label" for="${category}">${category}</label>
            </div>`;
  }).join('');

  document.getElementById("checkboxes").innerHTML = inputCheckbox;

  
  categoriasUnicas.forEach(category => {
    document.getElementById(category).addEventListener("change", updateEventsDisplay);
  });

 
  const searchInput = document.getElementById("search");
  searchInput.addEventListener("keyup", updateEventsDisplay);
}


crearCheckbox();


displayAllEvents(data);
  