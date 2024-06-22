import express from 'express'
import fs from 'fs'
import sharp from 'sharp'
import formidable from 'express-formidable'

const app = express()

app.use(formidable())

app.post('/upload', async (req, res)=>{
	const file = req.files.file
	fs.writeFileSync('files/' + file.name, fs.readFileSync(file.path))
	res.end("File uploaded")
})

app.get('/files', (req, res)=>{
	res.end(JSON.stringify(fs.readdirSync('files')))
})

app.use('/files/:fileName', async (req, res)=>{
	if (req.query.compress) {
		const image = sharp("files/"+req.params.fileName)
		const metadata = await image.metadata()
		let buffer
		
		if (metadata.width > 2000 || metadata.height > 2000) {
			buffer = await image.resize(Math.floor(metadata.width / 10), Math.floor(metadata.height / 10)).withMetadata().png().toBuffer()
		} else {
			buffer = await image.png().withMetadata().toBuffer()
		}
		
		res.set('content-type', 'image/png')
		res.end(buffer)
	} else {
		const buffer = fs.readFileSync("files/"+req.params.fileName)
		res.set('content-type', 'image/png')
		res.end(buffer)
	}
})

app.use(express.static('public'))

app.listen(7080)