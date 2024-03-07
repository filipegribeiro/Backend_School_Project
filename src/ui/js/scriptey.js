//    *** MENU HAMBURGER - Check ***

document.addEventListener('DOMContentLoaded', () => {
	const webappCover = document.getElementById('webapp_cover');
	const navbar = document.querySelector('.navbar');
	const menuCheckbox = document.getElementById('menu_checkbox');

	webappCover.addEventListener('click', () => {
		menuCheckbox.checked = !menuCheckbox.checked;
		navbar.classList.toggle('active', menuCheckbox.checked);
	});
});

//    *** SIGNUP PROCESS ***

/* function validateSignupForm() {
	// criar isto no backend?
	let values = [
		{
			name: '',
			mail: '',
			password: '',
		},
	];
	const name = document.getElementById('name');
	const mail = document.getElementById('mail');
	const password = document.getElementById('password');
	const confirmPassword = document.getElementById('confirmPassword');
	if (name == '' && mail == '' && password == '' && confirmPassword == '') {
		return true;
	}
	return false;
}

validateSignupForm(); */

//    *** SIGNIN PROCESS ***

/* const fetch = require('node-fetch'); */

/* const signin = async () => {
	try {
		const response = await fetch('http://localhost:3009/user/signin', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify({
				name: '',
				mail: '',
				password: '',
				confirmPassword: '',
			}),
		});

		// Name validate

		let nameInput = document.querySelector('.name');
		nameInput.addEventListener('input', () => {
			if (nameInput.value.length < 3) {
				nameInput.classList.add('is-invalid');
			} else {
				nameInput.classList.remove('is-invalid');
			}
		});

		// Mail validate

		let mailInput = document.querySelector('.email');
		mailInput.addEventListener('input', () => {
			if (!validateMail(mailInput.value)) {
				mailInput.classList.add('is-invalid');
			} else {
				mailInput.classList.remove('is-invalid');
			}
		});

		function validateMail(mail) {
			// const mail = document.querySelector('.email');
			const validation = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return validation.test(String(mail).toLowerCase());
		}

		// Password validate

		let passwordInput = document.querySelector('.password');
		passwordInput.addEventListener('input', () => {
			if (passwordInput.value.length < 8) {
				passwordInput.classList.add('is-invalid');
			} else {
				passwordInput.classList.remove('is-invalid');
			}
		});

		if (!response.ok) {
			throw new Error('Error: Something got wrong');
		}

		const data = await response.json();
		console.log(data);
	} catch (err) {
		console.log(err);
	}
};

addEventListener('submit', signin); */

/* function validateSignupForm() {
	const username = document.getElementById('username').value;
	const password = document.getElementById('password').value;
	if (username === 'admin' && password === 'admin') {
		return true;
	}
	return false;
}

validateSignupForm(); */

// Form Validation

/* function validateForm() {
	const username = document.getElementById('username').value;
	const password = document.getElementById('password').value;
	if (username === 'admin' && password === 'admin') {
		return true;
	}
	return false;
}

validateForm(); */

// const { data, erros } = await response.json();

// Aqui são os dados que vão entrar na tabela ainda a realizar! Terá que ter os dados que queiras trabalhar | Ver o exemplo da tabela do mongoDB | Isto é um exemplo do array JSON | Crias uma variável e colocas lá os dados (id, name, etc.) |

/* [
	{
		_id: '65ddd2b7c00d62bf59f61ba6',
		id: '1',
		name: 'Company Filipe',
		nif: '912345678',
		address: 'Rua do Código Maluco n.º 1234',
		mail: 'Filipe@gmail.com',
		phone: '931234567',
		registrationDate: '2024-02-27T12:16:54.413Z',
	},
	{
		_id: '65ddd2bbc00d62bf59f61ba7',
		id: '1',
		name: 'Company Filipe',
		nif: '912345678',
		address: 'Rua do Código Maluco n.º 1234',
		mail: 'Filipe@gmail.com',
		phone: '931234567',
		registrationDate: '2024-02-27T12:16:58.903Z',
	},
]; */

//    *** Table Data Process's ***

document.addEventListener('DOMContentLoaded', () => {
	// Agarrar todos os botões com o id "trash"
	const trashBtns = document.querySelectorAll('#table_data #trash');

	// Iterando sobre todos os botões "trash"
	trashBtns.forEach(btn => {
		// Adicionando um clique de evento a cada botão "trash"
		btn.addEventListener('click', function () {
			// Agarrar o elemento pai (tr) do botão "trash" clicado
			const row = this.closest('tr');

			// Verificando se o elemento pai (tr) foi encontrado e se sim removê-lo
			if (row) {
				row.remove();
				console.log('Item removido!');
			}
		});
	});
});

//***Alguns exemplos*****
// Selecionar elementos

/* const addUser = getElementById('add_new');
const addEventListener = (event, callback) => {
	addUser.addEventListener(event, callback);
	addEventListener('click', () => showFields());
}; */

/* const tableData = document.querySelector('table_data'); */

/* function fillTable(data) {
	let html = '';
	data.forEach(user => {
		html += `
			<tr>
				<td>${user.id}</td>
				<td>${user.name}</td>
				<td>${user.nif}</td>
				<td>${user.address}</td>
				<td>${user.mail}</td>
				<td>${user.phone}</td>
				<td>${user.registrationDate}</td>
				<td>
					<button class="btn btn-danger btn-sm delete" data-id="${user.id}">Delete</button>
					<button class="btn btn-primary btn-sm edit" data-id="${user.id}">Edit</button>
}
			</tr>
		`;
	});
	tableData.innerHTML = html;
}

fillTable(data);
 */

// Functions

/* function showFields() {
	getElementById('add_new').style.display = 'block';
	getElementById('table_data').style.display = 'none';
} */

/* function hideFields() {
	getElementById('add_new').style.display = 'none';
	getElementById('table_data').style.display = 'block';
} */
// Event Listeners

/* getElementById('add_new').addEventListener('click', () => showFields());
getElementById('cancel').addEventListener('click', () => hideFields());
getElementById('save').addEventListener('click', () => hideFields());
let users = [];
getElementById('addUser').addEventListener('submit', e => {
	e.preventDefault();
	let id = getElementById('id').value;
	let name = getElementById('name').value;
	let nif = getElementById('nif').value;
	let address = getElementById('address').value;
	let mail = getElementById('mail').value;
	let phone = getElementById('phone').value;
	let registrationDate = getElementById('registrationDate').value;
	users.push({
		id,
		name,
		nif,
		address,
		mail,
		phone,
		registrationDate,
	});
	fillTable(users);
}); */
