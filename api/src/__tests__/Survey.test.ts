import request from "supertest";
import { app } from "../app";
import  createConnection from '../database';

describe("Surveys", async () => {
    beforeAll(async () => {
        const connection = await createConnection(); //para rodar todas migrations
        await connection.runMigrations();   
    });

    it("should be able to create a new survey", async () => {
        const response = await request(app).post("/Surveys")
        .send({
           title: "Title Example",
           description: "Description Example"
        });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
    });

    it("should be able to get all surveys", async () => {
        await request(app).post("/Surveys")
        .send({
           title: "Title Example",
           description: "Description Example",
        });
        const response = await request(app).get("/surveys");

        expect(response.body.length).toBe(2);
    });
 
});