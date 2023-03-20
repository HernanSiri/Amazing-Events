let data = localStorage.getItem("data")
data = JSON.parse(data)

function displayPastEvents(data) {
    let pastEvents = ""; 
    for (let event of data.events) { 
      let currentDate = new Date(data.currentDate); 
      let eventDate = new Date(event.date); 
      if (eventDate > currentDate) { 
        pastEvents += createcard(event);
      }
    }
    document.getElementById("cards").innerHTML = pastEvents; 
  }
  
  
  function displayFilteredEvents(data, checkedBoxes, searchValue) {
    let filteredEvents = data.events.filter(event => { 
      
      if (checkedBoxes.length > 0 && !checkedBoxes.includes(event.category)) { 
        return false;
      }
      
      if (searchValue.length > 0 && !(event.name.toLowerCase().includes(searchValue) || event.description.toLowerCase().includes(searchValue))) { 
        return false;
      }
      
      let currentDate = new Date(data.currentDate); 
      let eventDate = new Date(event.date); 
      if (eventDate < currentDate) { 
        return false;
      }
      return true; 
    });
  
    if (filteredEvents.length === 0) {
      document.getElementById("cards").innerHTML = "<h6>No se encontraron resultados, Por favor, intente modificando su filtro de busqueda.</h>";
      return;
    }
  
    document.getElementById("cards").innerHTML = filteredEvents.map(event => createcard(event)).join('');
  }
  
  function createCheckbox() {
    
    const todasLasCategorias = data.events.map(evento => evento.category);
    
    const categoriasUnicas = [...new Set(todasLasCategorias)];
    
    const inputCheckbox = categoriasUnicas.map(category => {
      return `<div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="${category}" value="${category}">
                <label class="form-check-label" for="${category}">${category}</label>
              </div>`;
    }).join('');
    
    document.querySelector("div.checks").innerHTML = inputCheckbox;
  
    
    const checkedBoxes = [];
    
    categoriasUnicas.forEach(category => {
      document.getElementById(category).addEventListener("change", () => {
        
        checkedBoxes.length = 0;
        
        categoriasUnicas.forEach(category => {
          if (document.getElementById(category).checked) {
            checkedBoxes.push(category);
          }
        });
        
        displayFilteredEvents(data, checkedBoxes, document.getElementById("search").value.trim().toLowerCase());
      });
    });
  
    
    const searchInput = document.getElementById("search");
    searchInput.addEventListener("keyup", () => {
      
      displayFilteredEvents(data, checkedBoxes, searchInput.value.trim().toLowerCase());
    });
  }
  
  
  displayPastEvents(data);
  
  createCheckbox();