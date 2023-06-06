export const namePatterns = () => ({
	value: /^[а-яА-Яa-zA-ZёЁ]\w+/,
	message: 'Недопустимое значение имени!',
})

export const emailPattern = () => ({
	value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
	message: 'Введите пожалуйста валидную почту',
})

export const phonePattern = () => ({
	value: /^\d*[1-9]\d*$/,
	message: 'Недопустимое значение',
})

function validEmail(str: string) {
	const filter =
		/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/
	return String(str).search(filter) != -1
}

// function checkEmail() {
// 	var email = document.getElementById('txtEmail');
// 	var filter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// 	if (!filter.test(email.value)) {
// 			alert('Please provide a valid email address');
// 			email.focus;
// 			return false;
// 	}
// }
