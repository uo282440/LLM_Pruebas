

class pruebaLLM {

    constructor(ciudad) {
        this.ciudad = ciudad;


    }

    inicializaPagina() {
        const section = document.createElement('section');

        const mainSection = $("main");
        mainSection.append(section);

        const titulo = document.createElement('h3');
        titulo.textContent = 'Pista:';

        section.appendChild(titulo);

        // 3 botones para las pistas
        const botones = ['Pista difícil', 'Pista media', 'Pista fácil'];

        botones.forEach((texto, index) => {

            const boton = document.createElement('button');

            boton.textContent = texto;

            boton.addEventListener('click', () => this.devuelvePista(index)); 

            section.appendChild(boton);
        }); 
         

    }


    async devuelvePista(nivel) {

        const mensajePistaFacil = 'Dame una pista muy fácil para adivinar la ciudad de Sevilla';
        const mensajePistaIntermedia = 'Dame una pista ni muy difícil ni muy fácil para adivinar la ciudad de Sevilla';
        const mensajePistaDificil = 'Dame una pista difícil para adivinar la ciudad de Sevilla';

        let mensaje = '';

        if (nivel === 0) {
            mensaje = mensajePistaDificil;
        } else if (nivel === 1) {
            mensaje = mensajePistaIntermedia;
        } else {
            mensaje = mensajePistaFacil;
        }

        const section = document.querySelector('section') || document.createElement('section');
        //obtener la respuesta de ChatGPT
        const respuesta = await this.llamarApiChatGPT(mensaje);

        //mostrar la respuesta
        const pistaRespuesta = document.createElement('p');
        pistaRespuesta.textContent = `Pista de ChatGPT: ${respuesta}`;
        section.appendChild(pistaRespuesta);
    }


    async llamarApiChatGPT(mensaje) {
        
        try {
            const respuesta = await fetch('http://localhost:3000/api/chatgpt', {  // Llamamos a nuestro backend
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mensaje })
            });
    
            if (!respuesta.ok) {
                throw new Error('Error en la solicitud a la API');
            }
    
            const datos = await respuesta.json();
            return datos.choices[0].text.trim();
        } catch (error) {
            console.error('Error al llamar al backend:', error);
            return "Lo siento, hubo un error al obtener la pista.";
        }
    }
}
    