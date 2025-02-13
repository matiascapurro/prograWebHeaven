document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form'); // Asegúrate de que esto selecciona tu formulario correctamente
    form.addEventListener('submit', function(event) {
        const email = document.querySelector('.form-control[placeholder="Ingrese su mail"]');
        const nombre = document.querySelector('.form-control[placeholder="Ingrese su nombre y apellido"]');
        const presupuesto = document.querySelector('.form-control[placeholder="Ingrese presupuesto aproximado deseado"]');
        const descripcion = document.querySelector('.form-control[aria-label="With textarea"]');
        
        let errores = [];
        
        if (!email.value || !email.value.includes('@')) {
            errores.push("Ingrese un email válido.");
        }
        if (!nombre.value) {
            errores.push("Ingrese su nombre y apellido.");
        }
        if (!presupuesto.value || isNaN(presupuesto.value)) {
            errores.push("Ingrese un presupuesto válido.");
        }
        if (!descripcion.value) {
            errores.push("Ingrese una descripción del evento.");
        }
        
        if (errores.length > 0) {
            event.preventDefault(); // Previene que el formulario se envíe
            const modalBody = document.querySelector('#errorModal .modal-body');
            modalBody.innerHTML = errores.join('<br>'); // Inserta los errores en la modal
            var errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
            errorModal.show(); // Muestra la modal con los errores
        }
    });
});


document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.fotoCarr').forEach(item => {
        item.addEventListener('click', () => {
            const modalImage = document.querySelector('#imageModal .modal-body img');
            modalImage.src = item.src; // Actualiza el src del img dentro de la modal
            const imageModal = new bootstrap.Modal(document.getElementById('imageModal'));
            imageModal.show(); // Muestra la modal
        });
    });
});

document.querySelectorAll('.instagram').forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        icon.style.transform = 'scale(1.1)';
    });
    icon.addEventListener('mouseleave', () => {
        icon.style.transform = 'scale(1)';
    });
});

let currentImageIndex = 0;
const images = document.querySelectorAll('.fotoCarr');
const changeImage = () => {
    images[currentImageIndex].classList.remove('active');
    currentImageIndex = (currentImageIndex + 1) % images.length;
    images[currentImageIndex].classList.add('active');
};
setInterval(changeImage, 3000); // Cambia imagen cada 3 segundos

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.nombreDj').forEach(item => {
        item.addEventListener('click', function() {
            let descrip = this.nextElementSibling; // Asume que la descripción sigue al nombre
            if (descrip.style.display === 'none' || descrip.style.display === '') {
                descrip.style.display = 'block';
            } else {
                descrip.style.display = 'none';
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const backToTopButton = document.createElement('button');
    backToTopButton.textContent = 'Volver arriba';
    backToTopButton.className = 'volver-arriba';
    document.body.appendChild(backToTopButton);

    window.addEventListener('scroll', function() {
        if (window.scrollY > 200) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    backToTopButton.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// Modal Pop-up
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById("myModal");
    const btn = document.getElementById("openModalBtn");
    const span = document.getElementsByClassName("close")[0];

    btn.onclick = function() {
        modal.style.display = "block";
    }

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});




document.addEventListener('DOMContentLoaded', function() {
    const calendarEl = document.getElementById('calendar');
    const modal = document.getElementById('modal');
    const modalText = document.getElementById('modal-text');
    const closeModal = document.getElementsByClassName('close')[0];
    const emailForm = document.getElementById('email-form');
    const emailInput = document.getElementById('email');
    let selectedDate = null;

    // Load reserved dates from localStorage
    let reservedDates = JSON.parse(localStorage.getItem('reservedDates')) || [];

    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        height: 'auto',
        contentHeight: 'auto',
        expandRows: true,
        selectable: true,
        validRange: {
            start: new Date().toISOString().split("T")[0]  // Disable past dates
        },
        select: function(info) {
            selectedDate = info.startStr;
            modalText.textContent = `Quieres reservar la fecha: ${selectedDate}?`;
            modal.style.display = 'block';
        },
        events: [
            {
                title: 'Unavailable',
                start: '2024-06-10',
                end: '2024-06-12',
                color: 'red'
            },
            {
                title: 'Unavailable',
                start: '2024-06-15',
                color: 'red'
            },
            ...reservedDates.map(date => ({
                title: 'Reserved',
                start: date,
                color: 'red'
            }))
        ]
    });

    calendar.render();

    closeModal.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }

    emailForm.onsubmit = function(event) {
        event.preventDefault();
        const userEmail = emailInput.value;
        if (userEmail && selectedDate) {
            alert(`You have reserved the date: ${selectedDate}`);
            modal.style.display = 'none';

            // Add the reserved date to localStorage
            reservedDates.push(selectedDate);
            localStorage.setItem('reservedDates', JSON.stringify(reservedDates));

            // Add the reserved date to the calendar
            calendar.addEvent({
                title: 'Reserved',
                start: selectedDate,
                color: 'red'
            });

            emailInput.value = '';
        }
    }
});
