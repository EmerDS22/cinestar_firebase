const getCines = async () => {
    if (typeof window.db === 'undefined' || typeof window.getDocs === 'undefined') {
        document.getElementById('contenido-interno').innerHTML = "<h2>Error: Firebase no se ha inicializado correctamente. Asegúrate de que firebase.html se cargue primero y que defina window.db y las funciones de Firestore.</h2>";
        return;
    }
    
    try {
        const snapshot = await window.getDocs(window.collection(window.db, 'cines'));
        
        let html = `<br/><h1>Nuestros Cines</h1><br/>`;

        snapshot.forEach(doc => {
            const cine = doc.data();
            const idFirestore = doc.id; 
            
            const direccionCompleta = cine.Direccion; 

            html += `				
				<div class="contenido-cine">
	        	    <img src="img/cine/${idFirestore}.1.jpg" width="227" height="170"/>
            	   	<div class="datos-cine">
       	   			   	<h4>${cine.RazonSocial}</h4><br/>
                	   	<span>${direccionCompleta}<br/><br/>Teléfono: ${cine.Telefonos}</span>
                	</div>
                	<br/>
                	<a href="cine.html?id=${idFirestore}">
                		<img src="img/varios/ico-info2.png" width="150" height="40"/>
                	</a>
				</div>
            `;
        });
        
        document.getElementById('contenido-interno').innerHTML = html;

    } catch (error) {
        console.error("Error al obtener los cines de Firestore:", error);
        document.getElementById('contenido-interno').innerHTML = "<h2>Ocurrió un error al cargar los cines.</h2>";
    }
}
getCines()