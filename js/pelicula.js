const getPelicula = async () => {
    if (typeof window.db === 'undefined') {
        document.getElementById('contenido-interno').innerHTML = "<h2>Error: Firebase no se ha inicializado correctamente. Asegúrate de que firebase.html se cargue primero y que defina window.db.</h2>";
        return;
    }
    
    const id = (new URLSearchParams(window.location.search)).get('id')
    
    if (!id) {
        document.getElementById('contenido-interno').innerHTML = "<h2>ID de película no proporcionado.</h2>";
        return;
    }

    try {
        const docRef = window.doc(window.db, 'peliculas', id);
        const docSnap = await window.getDoc(docRef);
        
        if (!docSnap.exists()) {
            document.getElementById('contenido-interno').innerHTML = "<h2>Película no encontrada en Firestore.</h2>";
            return;
        }

        const pelicula = docSnap.data();
        const idFirestore = docSnap.id; 

        let html = `				
            <div class="contenido-pelicula">
                <div class="datos-pelicula">
                    <h2>${pelicula.Titulo}</h2>
                    <p>${pelicula.Sinopsis}</p>
                    <br/>
                    <div class="tabla">
                        <div class="fila">
                            <div class="celda-titulo">Título Original :</div>
                            <div class="celda">${pelicula.Titulo}</div>
                        </div>
                        <div class="fila">
                            <div class="celda-titulo">Estreno :</div>
                            <div class="celda">${pelicula.FechaEstrenoss}</div>
                        </div>
                        <div class="fila">
                            <div class="celda-titulo">Género :</div>
                            <div class="celda">${pelicula.Geneross}</div>
                        </div>
                        <div class="fila">
                            <div class="celda-titulo">Director :</div>
                            <div class="celda">${pelicula.Director}</div>
                        </div>
                        <div class="fila">
                            <div class="celda-titulo">Reparto :</div>
                            <div class="celda">${pelicula.Reparto}</div>
                        </div>
                    </div>
                </div>
                <img src="img/pelicula/${idFirestore}.jpg" width="160" height="226"><br/><br/> 
            </div>
            <div class="pelicula-video">
                <embed src="https://www.youtube.com/v/${pelicula.Link}" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="580" height="400">
            </div>
        `;
        
        document.getElementById('contenido-interno').innerHTML = html;
        
    } catch (error) {
        console.error("Error al obtener la película de Firestore:", error);
        document.getElementById('contenido-interno').innerHTML = "<h2>Ocurrió un error al cargar la película.</h2>";
    }
}
getPelicula()