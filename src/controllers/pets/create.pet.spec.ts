import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import request from 'supertest';
import { server as app } from '@/app';
import { prisma } from "@/lib/prisma";
import bcrypt from 'bcrypt';

describe('Create Pet (E2E)', () => {
    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    beforeEach(async () => {
        await prisma.pet.deleteMany();
        await prisma.org.deleteMany();
    });

    it('Should create a new pet when org is authenticated', async () => {
        // cria ORG no banco
        const hashedPassword = await bcrypt.hash('123456', 10);

        await prisma.org.create({
            data: {
                id: 'org-01', // ID fixo para facilitar o rastreio
                name: 'ORG Example',
                email: 'org@example.com',
                password: hashedPassword,
                whatsapp: '11999999999',
                address: 'Rua Teste',
                city: 'São Paulo',
                role: 'ORG',
            }
        });

        // Login para pegar token JWT
        const authResponse = await request(app.server)
            .post('/sessions')
            .send({
                email: 'org@example.com',
                password: '123456',
            });

        const token = authResponse.body.token;

        // Cria pet usando token (sem orgId no body)
        const response = await request(app.server)
            .post('/pets')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'Bolt',
                age: 3,
                size: 'Pequeno',
                description: 'Energia total',
            });

        expect(response.statusCode).toBe(201);
        expect(response.body.pet).toEqual(
            expect.objectContaining({
                name: 'Bolt',
                age: 3,
                orgId: 'org-01',
            })
        );
    });
});