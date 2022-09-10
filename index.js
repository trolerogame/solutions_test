import fetch from "node-fetch";
const USERS = [
    {
      name: "Carlos",
      age: 12,
      apples: 3,
    },
    {
      name: "Lucas",
      age: 17,
      apples: 5,
    },
    {
      name: "Tomas",
      age: 32,
      apples: 1,
    },
    {
      name: "Lucia",
      age: 22,
      apples: 0,
    },
    {
      name: "Natalia",
      age: 44,
      apples: 4,
    },
]
  
  // retorna un array de los nombres de los usuarios
  const getNames = () => {
    return USERS.map(user => user.name)
  }
  
  // debe de retornar los usuarios con edad mayor o igual a 18
  const usersOfLegalAge = () => {
    return USERS.filter(user => user.age >= 18)
  };
  
  // debe de retornar la suma total de manzanas que tienen los usuarios
  const totalApples = () => {
    return USERS.reduce((acc,c) => c.apples + acc, 0)
  };
  
  // tiene que retornar el array de usuarios ordenados por nombre segun el parametro order el cual puede ser igual a 'ASC' o 'DESC'
  const orderUsersByName = (order) => {
    const usersOrd = USERS.map(user => user.name).sort()
    return order == 'ASC' ? usersOrd : usersOrd.reverse()
  };




  




const USERS2 = ["Carlos", "Lucas", "Tomas", "Lucia", "Natalia"];
const ACTIONS = ["🪓", "😢", "😒", "😍", "😘", "😉", "😛", "🔫"];

/* La idea es simple, la funcion debe de aleatoriamente retornar una string 
 `${user} ${action} ${user}`
	Por ejemplo si yo ejecuto la funcion teniendo como parametro las constantes de arriba,
	aleatoriamente se generaria esta string
	Carlos 🔫 Lucas
  
  Es importante que el nombre del usuario no se repita, es decir, no puede un usuario ejecutar 	 una accion sobre si mismo
  
*/

// devuelve un valor dentro del limite que se le pase como parametro
const rnd = (lm) => Math.floor(Math.random() * (lm - 1))

const sortea2 = (users, actions) => {
  const userOne = users[rnd(users.length)]
  users = users.filter(user => user !== userOne)
  const userTwo = users[rnd(users.length)]
  const action = actions[rnd(actions.length)]
  return `${userOne} ${action} ${userTwo}`
};


















/* retornar las mascotas con el llamado a la api
GET 'https://apimocha.com/lightcode-test/pets'
{
	id: number,
  name: string,
  type: string,
  ownerId: number
}[]
en caso de error al llamado a la api la funcion debera retornar un array vacio
*/

const getPets = async () => {
  try{
    const res = await fetch('https://apimocha.com/lightcode-test/pets')
    const data =  await res.json()
    return data
  }catch{
    return []
  }
};

/*retornar los amos con el llamado a la api
GET 'https://apimocha.com/lightcode-test/owners'
 {
 	id: number,
  name: string,
  age: number,
 }[]

 en caso de error al llamado a la api la funcion debera retornar un array vacio
*/

const getOwners = async () => {
  try{
    const res = await fetch('https://apimocha.com/lightcode-test/owners')
    const data =  await res.json()
    return data
  }catch{
    return []
  }
};

/*
	dado un id de tipo numerico retornar un array con las mascotas cuyo ownerId sea igual al id
  en caso de no existir un usuario con ese id se debera de tirar el error 'user not found'
  en caso de que el usuario exista pero no tengas mascotas se debera de retornar un array vacio
*/
const getPetsOfOwner = async (id) => {
   try{
    let users = await(await fetch('https://apimocha.com/lightcode-test/owners')).json()
    users = users.map(user => user.id)
    if(!users.includes(id)) throw new Error('user not found')

    const resPets = await fetch('https://apimocha.com/lightcode-test/pets')
    const pets =  await resPets.json()
    return pets.filter(pet => pet.ownerId == id)
  }catch(error){
    console.log(error.message)
    return error.message
  }
};

/*
segun ownerId obtener sus mascotas.
en caso de que el owner no tenga mascotas la funcion retornara `${owner.name} salio a pasear solo`
en caso de que el owner tenga mascotas, obtener una mascota random del owner y retornar `${owner.name} saco a pasear a ${randomPet.name}`
en caso de que el owner no exista tirar el error 'user not found'
*/

const walkingThePet = async (ownerId) => {
  try{
    let users = await(await fetch('https://apimocha.com/lightcode-test/owners')).json()
    let listUsers = users.map(user => user.id)
    if(!listUsers.includes(ownerId)) throw new Error('user not found')
    let ownerName = ''
    for(let owner of users)
      if(owner.id == ownerId) {
        ownerName = owner.name
        break
      }
    const resPets = await fetch('https://apimocha.com/lightcode-test/pets')
    let pets =  await resPets.json()
    pets = pets.filter(pet => pet.ownerId == ownerId)
    if(pets.length == 0) return 'pasea solo'
    return  `${ownerName} saca a pasear a ${pets[rnd(pets.length)].name}`
  }catch(e){
    return e.message
  }
};

const logRes = res => console.log(res)

// console.log(getNames(USERS))
// console.log(usersOfLegalAge())
// console.log(totalApples())
// console.log(orderUsersByName('DESC'))

// console.log(sortea2(USERS2,ACTIONS))

// getPets()
//   .then(logRes)

// getOwners()
//   .then(logRes)

// getPetsOfOwner(1)
//   .then(logRes)


// walkingThePet(1)
//   .then(logRes)



export {
	getNames,
	usersOfLegalAge,
	totalApples,
	orderUsersByName,
	sortea2,
	rnd,
	getPets,
	getOwners,
	getPetsOfOwner,
	walkingThePet,
	USERS
}