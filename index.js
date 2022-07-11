
const selectPrimary = document.getElementById('selectPrimary');
const selectSecondary = document.getElementById('selectSecondary');
const selectThird = document.getElementById('selectThird');

function cargarProvincia(){
    
    fetch('https://apis.datos.gob.ar/georef/api/provincias?')
    .then(response => response.json())
    .then(data => {
        //console.log(data);
        let opciones = `<option value="">Seleccione una provincia</option>`;
        data.provincias.forEach(provincias => opciones += `<option value="${provincias.id}">${provincias.nombre}</option>`);
        selectPrimary.innerHTML = opciones;
    })
    .catch(error => console.log(error));
}

function cargarDepartamentos(){
    $("#selectSecondary").loading({theme: 'dark', message: 'Cargando...'});
    setTimeout(() => {
        fetch('https://apis.datos.gob.ar/georef/api/departamentos?provincia=' + selectPrimary.value)
        .then(response => response.json())
    
         .then(data => {
            console.log(data);
            let opciones = `<option value="">Seleccione un departamento</option>`;
            data.departamentos.forEach(departamentos => opciones += `<option value="${departamentos.id}">${departamentos.nombre}</option>`);
            selectSecondary.innerHTML = opciones;
        })
        .catch(error => console.log(error));
        $("#selectSecondary").loading('stop')
    }, 500);


   
    
}

function cargarMunicipios(){
        $("#selectThird").loading({theme: 'dark', message: 'Cargando...'});
        fetch('https://apis.datos.gob.ar/georef/api/municipios?provincia=' + selectPrimary.value)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            $("#selectThird").loading('stop');
            let opciones = `<option value="">Seleccione un municipio</option>`;
            data.municipios.forEach(municipios => opciones += `<option value="${municipios.id}">${municipios.nombre}</option>`);
            selectThird.innerHTML = opciones;
        }).catch(error => console.log(error));
}





// Cargo cargarProvincia() al cargar la página
document.addEventListener('DOMContentLoaded', cargarProvincia());

// Invoco cargarDepartamentos() al cambiar la provincia
selectPrimary.addEventListener('change', e=> cargarDepartamentos(e.target.value))

// Invoco cargarMunicipios() al cambiar el departamento
selectSecondary.addEventListener('change', e=> cargarMunicipios(e.target.value))