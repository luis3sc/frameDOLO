const modalBtns = document.querySelectorAll('[id^="modalBtn"]');
const modals = document.querySelectorAll('.modal');
const closeModalBtns = document.querySelectorAll('.closeModalBtn, #entendido');

function mostrarModal(nombreModal) {
    // Oculta todos los modales antes de mostrar el modal específico
    modals.forEach(modal => {
        modal.classList.remove('show-modal');
    });

    const modal = document.getElementById(nombreModal);
    modal.classList.add('show-modal');
}

function cerrarModal(nombreModal) {
    const modal = document.getElementById(nombreModal);
    modal.classList.remove('show-modal');
}

modalBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        mostrarModal(`myModal${index + 1}`);
    });
});

closeModalBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        cerrarModal(`myModal${index + 1}`);
    });
});
