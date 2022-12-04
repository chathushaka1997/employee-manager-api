import request from 'supertest'
import { app } from '../server'

describe("GET /api/employee",()=>{
    test("should respond with a 200 status code",async()=>{
        const res = await request(app).get('/api/employee')
        expect(res.statusCode).toBe(200)
    })
    test("should specify json in the content type header",async()=>{
        const res = await request(app).get('/api/employee')
        expect(res.headers["content-type"]).toEqual(expect.stringContaining("json"))
    })
    test("Employee data should return when data avaialble",async()=>{
        const res = await request(app).get('/api/employee')
        console.log(res.body);
        expect(res.body.success).toBe(true)
        expect(res.body.data.length).toBeGreaterThan(0)
    })
})

describe("POST /api/employee",()=>{
    test("should respond with a 200 status code",async()=>{
        const res = await request(app).get('/api/employee')
        expect(res.statusCode).toBe(200)
    })
    test("should specify json in the content type header",async()=>{
        const res = await request(app).get('/api/employee')
        expect(res.headers["content-type"]).toEqual(expect.stringContaining("json"))
    })
    test("Employee data should return when data avaialble",async()=>{
        const res = await request(app).get('/api/employee')
        console.log(res.body);
        expect(res.body.success).toBe(true)
        expect(res.body.data.length).toBeGreaterThan(0)
    })
})

describe("DELETE /api/employee/:empId",()=>{
    test("send no empId",async()=>{
        const res = await request(app).delete('/api/employee')
        expect(res.text).toBe("Invalid Route")
    })
    test("send wrong empId",async()=>{
        const res = await request(app).delete('/api/employee/sdfsdf')
        expect(res.body.success).toBe(false)
    })
   
})
