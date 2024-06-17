import express from 'express'
import fs from 'fs'
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

app.use('/files', express.static('files'))

app.use(express.static('public'))

app.listen(7080)