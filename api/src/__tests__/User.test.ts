import request from "supertest";
import { app } from "../app";
import  createConnection from '../database';

describe("User", async () => {
    beforeAll(async () => {
        const connection = await createConnection(); //para rodar todas migrations
        await connection.runMigrations();   
    });
    
    it("should be able to create a new user", async () => {
        const response = await request(app).post("/users")
        .send({
            email: "ussser@example.com",
            name: "Ussser example"
        });
        expect(response.status).toBe(201);
    });

    it("should not be able to create a new user with exists email", async () => {
        const response = await request(app).post("/users")
        .send({
            email: "ussser@example.com",
            name: "Ussser example"
        });
        expect(response.status).toBe(400);
    });
 
});