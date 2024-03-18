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
