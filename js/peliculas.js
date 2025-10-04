const getPeliculas = async () => {
    if (typeof window.db === 'undefined' || typeof window.query === 'undefined' || typeof window.where === 'undefined') {
        document.getElementById('contenido-interno').innerHTML = "<h2>Error: Firebase no se ha inicializado correctamente. Asegúrate de que firebase.html se cargue primero y que defina window.db y las funciones de Firestore.</h2>";
        return;
    }

    const tipoPelicula = (new URLSearchParams(window.location.search)).get('id');
    let estadoId;
    let titulo;
    
    if (tipoPelicula === 'cartelera') {
        estadoId = 1;
        titulo = "Cartelera";
    } else if (tipoPelicula === 'estrenos') {
        estadoId = 2;
        titulo = "Próximos Estrenos";
    } else {
        document.getElementById('contenido-interno').innerHTML = "<h2>Tipo de listado no válido.</h2>";
        return;
    }
    
    try {
        const peliculasRef = window.collection(window.db, 'peliculas');
        
        const q = window.query(peliculasRef, window.where('idEstado', '==', estadoId));
        
        const snapshot = await window.getDocs(q);

        let html = `<br/><h1>${titulo}</h1><br/>`;

        if (snapshot.empty) {
            html += `<p>No hay películas en ${titulo} en este momento.</p>`;
        } else {
            snapshot.forEach(doc => {
                const pelicula = doc.data();
                const idFirestore = doc.id; 

                html += `				
                    <div class="contenido-pelicula">
                        <div class="datos-pelicula">
                            <h2>${pelicula.Titulo}</h2><br/>
                            <p>${pelicula.Sinopsis}</p>
                            <br/>
                            <div class="boton-pelicula"> 
                                <a href="pelicula.html?id=${idFirestore}" >
                                    <img src="img/varios/btn-mas-info.jpg" width="120" height="30" alt="Ver info"/>
                                </a>
                            </div>
                            <div class="boton-pelicula"> 
                                <a href="https://www.youtube.com/v/${pelicula.Link}" target=_blank  onclick="return hs.htmlExpand(this, { objectType: 'iframe' } )" >
                                    <img src="img/varios/btn-trailer.jpg" width="120" height="30" alt="Ver trailer"/>
                                </a>
                            </div> 
                        </div>
                        <img src="img/pelicula/${idFirestore}.jpg" width="160" height="226"/><br/><br/> 
                    </div>
                `;
            });
        }
        
        document.getElementById('contenido-interno').innerHTML = html;

    } catch (error) {
        console.error("Error al obtener las películas de Firestore:", error);
        document.getElementById('contenido-interno').innerHTML = "<h2>Ocurrió un error al cargar las películas.</h2>";
    }
}
document.addEventListener('DOMContentLoaded',getPeliculas);