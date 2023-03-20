
var data = localStorage.getItem('data');

data = JSON.parse(data);

let eventosPasados = pasados(data.events, data.currentDate);

let eventosFuturos = futuros(data.events, data.currentDate);

datosTabla(data.events);

printStats(datosTabla(eventosFuturos), "upcoming");

printStats(datosTabla(eventosPasados), "past");

imprimirTablaArriba(objetoTabla(attendance(eventosPasados), attendance(eventosPasados).reverse(), capacity(eventosPasados)), "statistics");

function futuros(data, currentDate) {
  return data.filter(event => event.date > currentDate)
}

function pasados(data, currentDate) {
  return data.filter(event => event.date < currentDate)
}

function datosTabla(data) {
 
  const allCategories = data.map(event => event.category);
  
  let filtradas = new Set(allCategories);
  filtradas = [...filtradas];
  
  const eventosCategoria = filtradas.map(category => {
    return data.filter(event => event.category === category);
  });
  
  const resultados = eventosCategoria.map(categoriaEvento => {
    let revenues = 0;
    let porcentage = 0;
    let category = categoriaEvento[0].category;

    for (let i = 0; i < categoriaEvento.length; i++) {
      let evento = categoriaEvento[i];
      revenues += ((evento.estimate || evento.assistance) * evento.price);
      porcentage += ((evento.estimate || evento.assistance) * 100) / evento.capacity;
    }
    porcentage = porcentage / categoriaEvento.length;
    return {
      category,
      revenues,
      porcentage,
    };
  });
  return resultados;
}

function printStats(categoriesArray, container) {

  const tabla = document.getElementById(container);
 
  categoriesArray.map((category) => {
    
    tabla.innerHTML += `
      <tr>
      
        <td scope="col">${category.category}</td>
        <td scope="col">$ ${category.revenues}</td>
        <td scope="col">${category.porcentage.toFixed(2)} %</td>
      </tr>
      
    `;
  });
}
function attendance(eventsPast) {
  
  const arrayAttendance = eventsPast.map(event => {
    return {
      attendance: event.assistance * 100 / event.capacity, 
      nameEvent: event.name 
    }
  })
  
  arrayAttendance.sort((a, b) => a.attendance - b.attendance).reverse() 
  return arrayAttendance
}

  function capacity(eventsPast) {
    
    const arrayCapacity = eventsPast.map(event => {
      return {
        capacity: event.capacity, 
        nameEvent: event.name 
      }
    })
  
  arrayCapacity.sort((a, b) => a.capacity - b.capacity).reverse() 
  return arrayCapacity
}
function objetoTabla(porcentageMayor, porcentageMenor, mayorCapacidad) {
 
  let objetoTabla = {
    porcentageMayor: porcentageMayor[0].nameEvent,
    porcentageMenor: porcentageMenor[0].nameEvent,
    mayorCapacidad: mayorCapacidad[0].nameEvent
  }
  return objetoTabla
}
function imprimirTablaArriba(objetoStats, container) {
  const tabla = document.getElementById ( container)
  
  tabla.innerHTML += `
      <tr>
          <td>${objetoStats.porcentageMayor}</td>
          <td>${objetoStats.porcentageMenor}</td>
          <td>${objetoStats.mayorCapacidad}</td>
      </tr>
      `
}
console.log();
