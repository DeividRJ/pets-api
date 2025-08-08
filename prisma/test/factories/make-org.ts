import { prisma } from '../../../src/server/server' // Usa o prisma já conectado ao DB de teste
import { faker } from '@faker-js/faker'
import { hash } from 'bcrypt'
import type { Org } from '@prisma/client'

export async function makeOrg(
    overrides: Partial<Org> & { password?: string } = {}
) {
    const { password, ...rest } = overrides
    const passwordPlain = password ?? '123456'
    const passwordHash = await hash(passwordPlain, 6)

    return prisma.org.create({
        data: {
            name: rest.name ?? faker.company.name(),
            email: rest.email ?? faker.internet.email().toLowerCase(),
            whatsapp: rest.whatsapp ?? faker.phone.number(),
            address: rest.address ?? faker.location.streetAddress(),
            city: rest.city ?? faker.location.city(),
            role: rest.role ?? 'ORG',
            ...rest,
            password: passwordHash,
        },
    })
}