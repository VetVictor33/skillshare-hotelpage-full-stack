const form = document.querySelectorAll('.userForm');

const updateBtn = document.querySelector(`#updateUserBtn`);
const deleteBtn = document.querySelector('#deleteUserBtn');
const submitBtns = document.querySelectorAll('.submitBtn')

const modal = document.querySelector('.delete-user');
const confirmBtnModal = document.querySelector('#confirmModal');
const cancelBtnModal = document.querySelector('#cancelModal');

for (let i = 0; i < submitBtns.length; i++) {
    submitBtns[i].addEventListener('click', (e) => {
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