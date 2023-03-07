//let indexEvents = "";
//for (let event of data.events)
//{indexEvents += createcard(event)
//}
//document.getElementById("cards").innerHTML = indexEvents
console.log([document]);

function displayAllEvents(data) {
    let indexEvents = ""; 
    for (let event of data.events) {
      indexEvents += createcard(event); 
    }
    document.getElementById("cards").innerHTML = indexEvents;
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
    document.querySelector("div.checks").innerHTML = inputCheckbox;
  
    
    categoriasUnicas.forEach(category => {
      document.getElementById(category).addEventListener("change", () => {
        
        const checkedBoxes = categoriasUnicas.filter(category => document.getElementById(category).checked);
        let filteredEvents = [];
        if (checkedBoxes.length === 0) {
          filteredEvents = data.events; 
        } else {
          filteredEvents = data.events.filter(event => checkedBoxes.includes(event.category));
        }
        displayAllEvents({ events: filteredEvents }); 
      });
    });
  
    
    const searchInput = document.getElementById("search");
    searchInput.addEventListener("keyup", () => {
      
      const filteredEvents = data.events.filter(event => `${event.name} ${event.description}`.toLowerCase().includes(searchInput.value.trim().toLowerCase()));
      displayAllEvents({ events: filteredEvents }); 
      if (filteredEvents.length === 0) {
        document.getElementById("cards").innerHTML = "<h6>No se encontraron resultados, Por favor, intente modificando su filtro de busqueda.</h>";
        return;
      }
    });
    
  }
  
  crearCheckbox();
  displayAllEvents(data);
  