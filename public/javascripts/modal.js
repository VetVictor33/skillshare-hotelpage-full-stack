const form = document.querySelectorAll('.deleteForm');
const submitBtn = document.querySelectorAll(`.submitBtn`);

const modal = document.querySelector('.modal');
const confirmBtnModal = document.querySelector('#confirmModal');
const cancelBtnModal = document.querySelector('#cancelModal');

for (let i = 0; i < submitBtn.length; i++) {
    submitBtn[i].addEventListener('click', (e) => {
        e.preventDefault();
        modal.style.display = 'flex'

        confirmBtnModal.addEventListener('click', () => {
            form[i].submit();
        })

        cancelBtnModal.addEventListener('click', (e) => {
            e.preventDefault()
            modal.style.display = 'none'
        })

    })
}

console.log('oi')