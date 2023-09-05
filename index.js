let baseUrl = "https://reqres.in/api/";

const getUsers = async () => {
    let innerHtml = '';
    await fetch(`${baseUrl}users`)
        .then(response => response.json())
        .then(json => {
            innerHtml = json.data.map((user) => {
                return `<div class="col-12 col-lg-3">
                            <div class="card text-center">
                                <img src="${user.avatar}" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">${user.first_name} ${user.last_name}</h5>
                                    <p class="card-text">Email: ${user.email}</p>
                                    <button class="btn btn-primary" onclick="getUser(${user.id})">Get User</button>
                                    <button class="btn btn-warning" onclick="openUpdateModal(${user.id})">Update User</button>
                                    <button class="btn btn-danger" onclick="deleteUser(${user.id})">Delete User</button>
                                </div>
                            </div>
                        </div>`
            }).join('');
            document.getElementById('users').innerHTML = innerHtml;
        })
}

const getUser = async (id) => {
    let showModal = new bootstrap.Modal(document.getElementById('showUser'), {
        keyboard: false
    });

    await fetch(`${baseUrl}users/${id}`)
        .then(response => response.json())
        .then(json => {
            let userP = document.getElementById('showNameUser');
            let emailP = document.getElementById('showEmailUser');
            let imgUser = document.getElementById('showImgUser');
            imgUser.src = json.data.avatar;
            userP.innerHTML = "Nombre: " + json.data.first_name + ' ' + json.data.last_name;
            emailP.innerHTML = "Email: " + json.data.email;
            showModal.show();
        })
}

const createUser = async () => {
    let btnClose = document.getElementById('closeCreate');

    let name = document.getElementById('name').value;
    let job = document.getElementById('job').value;

    if(!name || !job) return Swal.fire({
        icon: 'error',
        title: 'Se produjo un error',
        text: 'Debe completar todos los campos'
    })


    let user = {
        name, job
    }

    await fetch(`${baseUrl}users`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(json => {
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: `El usuario ${name} fue registrado con éxito`
            })
            btnClose.click();
        })
        .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Se produjo un error',
                text: error.message
            })
        })
}

const openUpdateModal = async (id) => {
    await fetch(`${baseUrl}users/${id}`)
        .then(response => response.json())
        .then(json => {
            let name = document.getElementById('nameUpdate');
            let id = document.getElementById('idUser');

            name.value = json.data.first_name + ' ' + json.data.last_name;
            id.value = json.data.id;
            let updateUser = new bootstrap.Modal(document.getElementById('updateUser'), {
                keyboard: false
            });
            updateUser.show();
        })
}

const updateUser = async () => {
    let btnClose = document.getElementById('closeUpdate');

    let name = document.getElementById('nameUpdate').value;
    let job = document.getElementById('jobUpdate').value;
    let id = document.getElementById('idUser').value;

    if(!name || !job) return Swal.fire({
        icon: 'error',
        title: 'Se produjo un error',
        text: 'Debe completar todos los campos'
    })

    let user = {
        name, job
    }

    await fetch(`${baseUrl}users/${id}`, {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(json => {
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: `El usuario ${name} fue actualizado con éxito`
            })
            btnClose.click();
        })
        .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Se produjo un error',
                text: error.message
            })
        })
}

const deleteUser = async (id) => {
    await fetch(`${baseUrl}users/${id}`, {
        method: 'DELETE'
    })
        .then(() => {
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: `El usuario fue eliminado con éxito`
            })
        })
        .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Se produjo un error',
                text: error.message
            })
        })
}