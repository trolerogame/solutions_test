//! Instalar la version 18 en adelante de node para poder usar las funciones de testing integradas por node

import test from 'node:test'
import assert from 'node:assert'
import { totalApples,getNames, rnd, USERS,usersOfLegalAge,orderUsersByName } from './index.js'


test('count total apples in users', t => {
    assert.equal(totalApples(),13)
})

test('includes a random name of the USERS array', t => { 
    const names = getNames()
    assert.equal(names.includes(USERS[rnd(USERS.length)].name),true)
})


test('includes only name >= 18 of the USERS array', t => { 
    let users = usersOfLegalAge()
    users = users.map(user => user.age).filter(age => age >= 18)
    assert.equal(users.length > 0,true)
})

test('array names ASC', t => {
    assert.equal(orderUsersByName('ASC')[0],'Carlos')
})

test('array names DESC', t => {
    assert.equal(orderUsersByName('DESC')[0],'Tomas')
})