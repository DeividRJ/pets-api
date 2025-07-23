import * as bcrypt from 'bcrypt'

// Cria hash da senha
export async function hash(password: string) {
    return bcrypt.hash(password, 6)
}

// Compara senha e hash
export async function compare(password: string, hash: string) {
    return bcrypt.compare(password, hash)
}