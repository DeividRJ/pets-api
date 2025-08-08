import { prisma } from '../../../src/server/server'
import { faker } from '@faker-js/faker'
import type { Pet } from '@prisma/client'
import { makeOrg } from './make-org'

export async function makePet(
  overrides: Partial<Pet> & { orgId?: string } = {}
) {
  const { orgId, ...rest } = overrides

  let finalOrgId = orgId
  if (!finalOrgId) {
    const org = await makeOrg()
    finalOrgId = org.id
  }

  return prisma.pet.create({
    data: {
      name: rest.name ?? faker.person.firstName(),
      description: rest.description ?? faker.lorem.sentence(),
      age: rest.age ?? faker.number.int({ min: 1, max: 15 }),
      size: rest.size ?? faker.helpers.arrayElement(['small', 'medium', 'large']),
      adopted: rest.adopted ?? false,
      orgId: finalOrgId,
      ...rest,
    },
  })
}