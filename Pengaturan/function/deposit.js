const fs = require('fs');

const addSaldo = (userId, amount, _dir) => {
let position = null
Object.keys(_dir).forEach((x) => {
if (_dir[x].id === userId) {
position = x
}
})
if (position !== null) {
_dir[position].money += amount
fs.writeFileSync('./Pengaturan/database/uang.json', JSON.stringify(_dir, null, 3))
} else {
var object_add = ({
id: userId,
saldo: amount
})
_dir.push(object_add)
fs.writeFileSync('./Pengaturan/database/uang.json', JSON.stringify(_dir, null, 3))
}
}

const minSaldo = (userId, amount, _dir) => {
let position = null
Object.keys(_dir).forEach((x) => {
if (_dir[x].id === userId) {
position = x
}
})
if (position !== null) {
_dir[position].money -= amount
fs.writeFileSync('./Pengaturan/database/uang.json', JSON.stringify(_dir, null, 3))
}}

const cekSaldo = (userId, _dir) => {
let position = null
Object.keys(_dir).forEach((x) => {
if (_dir[x].id === userId) {
position = x
}
})
if (position !== null) {
return _dir[position].money
} else {
return 0
}}

module.exports = { addSaldo, minSaldo, cekSaldo }