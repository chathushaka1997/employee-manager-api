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
        expect(res.body.success).toBe(true)
        expect(res.body.data.length).toBeGreaterThan(0)
    })
})

describe("POST /api/employee",()=>{
    test("should respond with a 200 status code",async()=>{
        const res = await request(app).post('/api/employee')
        expect(res.statusCode).toBe(200)
    })
    test("should specify json in the content type header",async()=>{
        const res = await request(app).post('/api/employee')
        expect(res.headers["content-type"]).toEqual(expect.stringContaining("json"))
    })
    test("Testing with correct empId invalid firstname",async()=>{
        const res = await request(app).post('/api/employee').send({firstName:"alex"})
        expect(res.body.error).toBe('First name must be at least 6 characters long & not more than 10 characters')
        expect(res.body.success).toBe(false)
    })
    test("Testing with correct empId invalid lastname",async()=>{
        const res = await request(app).post('/api/employee').send({firstName:"alexss",lastName:"alex"})
        expect(res.body.error).toBe('Last name must be at least 6 characters long & not more than 10 characters')
        expect(res.body.success).toBe(false)
    })
    test("Testing with correct empId invalid email",async()=>{
        const res = await request(app).post('/api/employee').send({firstName:"alexss",lastName:"alexxa",email:"asd"})
        expect(res.body.error).toBe('Invalid email address')
        expect(res.body.success).toBe(false)
    })
    test("Testing with correct empId invalid phonenumber",async()=>{
        const res = await request(app).post('/api/employee').send({firstName:"alexss",lastName:"alexxa",email:"asd@mail.com",phoneNumber:"asd"})
        expect(res.body.error).toBe('Please enter valid LK phone number')
        expect(res.body.success).toBe(false)
    })
   
})

describe("PUT /api/employee/:empId",()=>{
    test("send wrong empId",async()=>{
        const res = await request(app).put('/api/employee/sdfsdf')
        expect(res.body.success).toBe(false)
    })
    test("should specify json in the content type header",async()=>{
        const res = await request(app).put('/api/employee/sdfsdf')
        expect(res.headers["content-type"]).toEqual(expect.stringContaining("json"))
    })
    test("Testing with correct empId ",async()=>{
        const res = await request(app).put('/api/employee/638c21d2e32575a381a12d89')
        expect(res.body.success).toBe(true)
    })
    test("Testing with correct empId invalid firstname",async()=>{
        const res = await request(app).put('/api/employee/638c21d2e32575a381a12d89').send({firstName:"alex"})
        expect(res.body.error).toBe('First name must be at least 6 characters long & not more than 10 characters')
        expect(res.body.success).toBe(false)
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
