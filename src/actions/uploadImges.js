const UploadImage = (URL, file) => {
	console.log(URL, file);
	var requestOptions = {
		method: 'PUT',
		body: file,
		headers: {
			'Content-Type': ''

		},
		redirect: 'follow'
	};

	fetch(URL, requestOptions)
		.then(response => response.text())
		.then(result => console.log(result))
		.catch(error => console.log('error', error));

};

export default UploadImage;