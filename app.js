// API Server
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const port = 3000
let transporter = null
var urlencodedParser = bodyParser.urlencoded({
	extended: false
})

// SOLVE CROS ERROR
app.use(cors())

app.get('/', (req, res) => {
	res.send('Hello World!')
})

app.post('/sendemail', urlencodedParser, (req, res) => {
	// console.log('req :>> ', req);
	console.log('req :>> ', req.body);
	let data = req.body
	console.log(data)
	res.send('Data Received: ' + JSON.stringify(data));
	email(data)
})


// Email Server
const nodemailer = require('nodemailer')

// async..await is not allowed in global scope, must use a wrapper
async function main() {
	// Generate test SMTP service account from ethereal.email
	// Only needed if you don't have a real mail account for testing
	let testAccount = await nodemailer.createTestAccount();

	// create reusable transporter object using the default SMTP transport
	transporter = nodemailer.createTransport({
		host: "smtp.gmail.com", // hostname
		port: 587, // port for secure SMTP
		auth: {
			user: "flynncao2008@gmail.com",
			pass: "tefzhkltnwcmkhet"
		},

	});

	// Verify email
	transporter.verify().then(console.log).catch(console.error);


}

main().catch(console.error);

async function email(data) {
	console.log('received data', typeof data)
	//send mail with defined transport object
	await transporter.sendMail({
		from: '"Smart Home Assistance" <foo@example.com>', // sender address
		to: "westwoodcao@hotmail.com", // list of receivers
		subject: "Your newest home status", // Subject line
		text: "Your status of home devices:", // plain text body
		html: `<b>Humidity:${data.humidity}%</b><br><b>Temperature:${data.temperature}℃</b><br>
		<b>Rain Sensor Status:${data.rain.trim() === 'true' ? "Alarm" : "Normal"}</b><br>
		<b>Smoke Sensor Status:${data.smoke.trim() === 'true' ? "Alarm" : "Normal"}</b><br>
		<b>Alcohol Sensor Status:${data.alcohol.trim() === 'true' ? "Alarm" : "Normal"}</b><br>`, // html body
	})

}


app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})