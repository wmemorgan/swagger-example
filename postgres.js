import PgAsync from 'pg-async'

export function postgresMiddleware() {
  const pg = new PgAsync({connectionString: 'postgres://postgres@localhost:5432/users'})
  return async (req, res, next) => {
    req._postgres = pg
    return await next()
  }
}

export function postgres(req) {
  return req._postgres
}