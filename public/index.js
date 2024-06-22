const $ = (query)=>{
	return document.querySelector(query)
}

$("#upload").addEventListener('click', async ()=>{
	const files = $("#files").files
	for (let i = 0; i < files.length; i++) {
		const file = files[i]
		const form = new FormData

		form.append("file", file)
		
		await fetch("/upload", {
			method: "POST",
			body: form,
		})

		alert("Uploaded "+file.name+" ("+(i+1)+"/"+files.length+")")
	}
	getFiles()
})

async function getFiles() {
	while ($("#files-section").firstChild) {
		$("#files-section").firstChild.remove()
	}
	
	const response = await fetch("/files")
	const files = await response.json()

	const imageExtensions = ["png", "jpg", "jpeg", "gif"]
	
	files.forEach((file)=>{
		console.log(file)
		if (imageExtensions.includes(file.split(".").pop())) {
			const image = document.createElement("img")
			image.src = "/files/"+file+"?compress=true"
			$("#files-section").appendChild(image)
			return
		}
	})
}

getFiles()