export async function insert(pg, name, address, password) {
  return pg.rows(
    `INSERT INTO users(name, address, password) VALUES($1, $2, $3) RETURNING id, name, address`,
    name, address, password
  )
}

export async function retrieve(pg, id) {
  return pg.rows(
    `SELECT id, name, address, password FROM users WHERE id = $1`,
    id
  )
}

export async function retrieveAll(pg) {
  return pg.rows(
    `SELECT id, name, address, password FROM users`
  )
}

export async function update(pg, name, address, password, id) {
  return pg.rows(
    `UPDATE users SET name=$1, address=$2, password=$3 WHERE id=$4 RETURNING id, name, address`,
    name, address, password, id
  )
}

// export async function deleteId(pg, id) {
//   return pg.rows(
//     `DELETE FROM users WHERE id=$1`
//   )
// }