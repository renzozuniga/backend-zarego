import request from "supertest";
import app from "../src/app";

describe("Endpoints", () => {
  const page = 1;
  const rows = 5;
  const total = 62;
  const list = "1,2,3,4,5";

  describe("Success response", () => {
    it("should respond with a 200 status code", async () => {
      const res = await request(app).get(
        `/api/countries?page=${page}&rows=${rows}`
      );

      expect(res.statusCode).toEqual(200);
    });

    it("should respond an specific structure", async () => {
      const res = await request(app).get(
        `/api/countries?page=${page}&rows=${rows}`
      );

      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.metadata).toBeInstanceOf(Object);
      expect(res.body.data).toBeInstanceOf(Array);
    });

    it("should respond with a metadata and data", async () => {
      const res = await request(app).get(
        `/api/countries?page=${page}&rows=${rows}`
      );

      const metadata_response = {
        page: page,
        rows: rows,
        total_registers: total,
      };

      expect(res.body.metadata).toEqual(metadata_response);
      expect(res.body.data.length).toEqual(rows);
    });

    it("should retrieve countries only by list of ids", async () => {
      const res = await request(app).get(
        `/api/countries?page=${page}&rows=${rows}&list=${list}`
      );

      const metadata_response = {
        page: page,
        rows: rows,
        total_registers: 5,
      };

      expect(res.statusCode).toEqual(200);
      expect(res.body.metadata).toEqual(metadata_response);
      expect(res.body.data.length).toEqual(rows);
    });

    it("should respond with a 200 status code for all", async () => {
      const res = await request(app).get(
        `/api/countries/all?list=${list}`
      );

      expect(res.statusCode).toEqual(200);
    });

    it("should respond with a 200 status code for options", async () => {
      const res = await request(app).get(
        `/api/countries/options`
      );

      expect(res.statusCode).toEqual(200);
    });

  });

  describe("Error response", () => {
    it("when endpoint name is not correct", async () => {
      const res = await request(app).get(
        `/api/countrieswrong?page=${page}&rows=${rows}`
      );
      expect(res.statusCode).toEqual(404);
    });
  });
});
