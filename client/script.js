const login = ()=>{
	fetch('http://localhost:5000/api/auth/login',{
	method:'POST',
	body:`{
"password":"admin",
"email":"g@mail.ru"
}`,
headers:{
	'Content-Type':'application/json'
}
}).then(resp=>{
		return resp.json()
})
.then(json=>{
	console.log(json)
})
}

const findByIds = () =>{
	fetch('http://localhost:5000/api/products/findbyids',{
		method:'POST',
		body:['609db2ecce1b100ff8cfde3b', '609db33b5f533609b06b9e42'],
		headers:{
			'Content-Type':'application/json'
		}
	})
		.then(j=>j.json())
		.then(r=>console.log(r))
}


const getSession = async ()=>{
	fetch('http://localhost:5000/api/auth/test').then(r=>r.json()).then(j=>console.log('Session test', j))
}

const logout = async ()=>{
	const r = await fetch('http://localhost:5000/api/auth/logout')
	const j = await r.json()

	console.log(j)
}

const getAll = async () => {
	try{	document.querySelector('.loader').style.display='block'

			const connect = await fetch('http://localhost:5000/api/products/getall')
			const response = await connect.json()
			
			document.querySelector('.loader').style.display='none'
		

			document.querySelector('ul').innerHTML = response.map(p=>`<li>${p.name}</li>`).join('')
	}
	catch(err){
		console.log('Something wrong: '+ err)
	}

}


	
