const getCine = async () => {
    if (typeof window.db === 'undefined' || typeof window.doc === 'undefined' || typeof window.getDoc === 'undefined') {
        document.getElementById('contenido-interno').innerHTML = "<h2>Error: Firebase no se ha inicializado correctamente. Asegúrate de que firebase.html se cargue primero y que defina window.db y las funciones de Firestore.</h2>";
        return;
    }

    const id = (new URLSearchParams(window.location.search)).get('id')
    
    if (!id) {
        document.getElementById('contenido-interno').innerHTML = "<h2>ID de Cine no proporcionado.</h2>";
        return;
    }

    try {
        const docRef = window.doc(window.db, 'cines', id);
        const docSnap = await window.getDoc(docRef);
        
        if (!docSnap.exists()) {
            document.getElementById('contenido-interno').innerHTML = "<h2>Cine no encontrado en Firestore.</h2>";
            return;
        }

        const cine = docSnap.data();
        const idFirestore = docSnap.id;

        let TarifasxCine = '';
        if (cine.tarifas && Array.isArray(cine.tarifas)) {
            cine.tarifas.forEach((tarifa, index) => {
                const claseFila = index % 2 === 0 ? '' : 'impar';
                TarifasxCine += `
                    <div class="fila ${claseFila}">
                            <div class="celda-titulo">${tarifa.DiasSemana}</div>
                            <div class="celda">${tarifa.Precio}</div>
                    </div>
                `;
            });
        } else {
             console.warn("No se encontraron tarifas o el formato es incorrecto.");
        }

        let PeliculasxCine = '';
        if (cine.peliculas && Array.isArray(cine.peliculas)) {
            cine.peliculas.forEach((pelicula, index) => {
                const claseFila = index % 2 === 0 ? '' : 'impar';
                PeliculasxCine += `
                    <div class="fila ${claseFila}">
                            <div class="celda-titulo">${pelicula.Titulo}</div>
                            <div class="celda">${pelicula.Horarios}</div>
                    </div>
                `;
            });
        } else {
             console.warn("No se encontraron películas para este cine o el formato es incorrecto.");
        }
        
        let html = `	
        	\t\t<h2>${cine.RazonSocial}</h2>	
				<div class="cine-info">
					<div class="cine-info datos">
						<p>${cine.Direccion}</p> 
						<p>Teléfono: ${cine.Telefonos}</p>
						<br/>
						<div class="tabla">
							${TarifasxCine}
						</div>
						<div class="aviso">
							<p>A partir del 1ro de julio de 2016, Cinestar Multicines realizará el cobro de la comisión de S/. 1.00 adicional al tarifario vigente, a los usuarios que compren sus entradas por el aplicativo de Cine Papaya para Cine Star Comas, Excelsior, Las Américas, Benavides, Breña, San Juan, UNI, Aviación, Sur, Porteño, Tumbes y Tacna.</p>
						</div>
					</div>
					<img src="img/cine/${idFirestore}.2.jpg"/>
					<br/><br/><h4>Los horarios de cada función están sujetos a cambios sin previo aviso.</h4><br/>
					<div class="cine-info peliculas">
						<div class="tabla">
							<div class="fila">
								<div class="celda-cabecera">Películas</div>
								<div class="celda-cabecera">Horarios</div>
							</div>
							${PeliculasxCine}
						</div>
					</div>
				</div>
				<div>
					<img style="float:left;" src="img/cine/${idFirestore}.3.jpg" alt="Imagen del cine"/>
					<span class="tx_gris">Precios de los juegos: desde S/1.00 en todos los Cine Star.<br/>
					Horarios de apertura de juegos: de 12:00 m hasta las 10:00 pm. 
					Los horarios de apertura y cierre están sujetos a cambios sin previo aviso.</span>
				</div>
            `;
        
        document.getElementById('contenido-interno').innerHTML = html;

    } catch (error) {
        console.error("Error al obtener el detalle del cine de Firestore:", error);
        document.getElementById('contenido-interno').innerHTML = "<h2>Ocurrió un error al cargar el detalle del cine.</h2>";
    }
}
document.addEventListener('DOMContentLoaded',getCine);