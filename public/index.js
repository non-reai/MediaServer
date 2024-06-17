const $ = (query)=>{
	return document.querySelector(query)
}

$("#upload").addEventListener('click', ()=>{
	const files = $("#files").files
	for (let i = 0; i < files.length; i++) {
		const file = files[i]
		const form = new FormData

		form.append("file", file)

		console.log(form.get("file"))
		
		fetch("/upload", {
			method: "POST",
			body: form,
		})
	}
})

async function getFiles() {
	const response = await fetch("/files")
	const files = await response.json()

	const imageExtensions = ["png", "jpg", "jpeg"]

	files.forEach((file)=>{
		console.log(file)
		if (imageExtensions.includes(file.split(".").pop())) {
			const image = document.createElement("img")
			image.src = "/files/"+file
			$("#files-section").appendChild(image)
			return
		}
	})
}

getFiles()