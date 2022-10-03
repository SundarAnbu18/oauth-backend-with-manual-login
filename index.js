const cookieSession = require('cookie-session')
const express=require('express')
const passport = require('passport')
const app=express()
const passportd=require('./passport')
const cors=require('cors')
const salt=10
const bcrypt=require('bcrypt')
const router=require('express').Router();
const jwt=require('jsonwebtoken')
const authroot=require('./routes/auth')
const mongoose=require('./model/name')
const db=require('mongoose')
app.use(cookieSession({
    name:"session",
    keys:["ken42"],
    maxAge:24*60*60*100
})) 

app.use(passport.initialize())
app.use(passport.session())
app.use(express.json())

app.use(cors({
    origin:"http://localhost:3000",
    methods:"GET,POST,PUT,DELETE",
    credentials:true
}))

app.use('/auth',authroot)

db.connect('mongodb://localhost:27017',(err)=>{
    if(!err){
        console.log('connected successfully')
    }
    else{
        console.log('I have not connected with DB')
    }
})


app.post('/register', async (req, res) => {
	console.log('daata',req.body)
	try {
		const newPassword = await bcrypt.hash(req.body.password, 10)
		await mongoose.create({
			name: req.body.name,
			email: req.body.email,
			password: newPassword,
		})
		res.json({ status: 'ok' })
	} catch (err) {
        console.log(err)
		res.json({ status: 'error', error: 'Duplicate email' })
	}
})

app.post('/login', async (req, res) => {
	const user = await mongoose.findOne({
		email: req.body.email,
	})
	console.log('test user',user)
	if (!user) {
		return { status: 'error', error: 'Invalid login' }
	}

	const isPasswordValid = await bcrypt.compare(
		req.body.password,
		user.password
	)

	if (isPasswordValid) {
		const token = jwt.sign(
			{
				name: user.name,
				email: user.email,
			},
			'secret123'
		)

		return res.json({ status: 'ok', user: token })
	} else {
		return res.json({ status: 'error', user: false })
	}
})

app.listen(4000,()=>console.log('Server is running'))





