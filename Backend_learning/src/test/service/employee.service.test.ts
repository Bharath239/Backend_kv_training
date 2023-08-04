import { DataSource } from "typeorm";
import EmployeeRepository from "../../repository/employee.repository";
import EmployeeService from "../../service/employee.service";
import Employee from "../../entity/employee.entity";
import { when } from "jest-when";
import HttpException from "../../exception/http.exception";
import { ValidationError } from "class-validator";

describe("Employee Service tests",() => {
    let employeeService: EmployeeService;
    let employeeRepository: EmployeeRepository;
    beforeAll(() => {
        const dataSource: DataSource = {
            getRepository: jest.fn()
        } as unknown as DataSource;
        employeeRepository = new EmployeeRepository(dataSource.getRepository(Employee));
        employeeService = new EmployeeService(employeeRepository);
    });

    describe("Test for getEmployeeById",() => {
        test("test employee for id 1",async () => {
            const mockFunction = jest.fn();
            when(mockFunction).calledWith(1).mockResolvedValueOnce(
                {   
                    "id": 1,
                    "name":"bharath",
                    "email":"bharat@gmail.com",
                    "age": 45,
                    "role":"UI",
                    "address": {
                        "line1":"kalady",
                        "pincode": "546848"
                    },
                    "password": "secret"
                }
            );
            employeeRepository.findEmployeeById = mockFunction;
            const employee = await employeeService.getEmployeeById(1);
            expect(employee).toEqual(
                {
                    "id": 1,
                    "name":"bharath",
                    "email":"bharat@gmail.com",
                    "age": 45,
                    "role":"UI",
                    "address": {
                        "line1":"kalady",
                        "pincode": "546848"
                    },
                    "password": "secret"
                }
            );
        });

        test("test for throw error",async () => {
            const mockFunction = jest.fn();
            when(mockFunction).calledWith(1).mockResolvedValueOnce(
                {   
                    "id": 1,
                    "name":"bharath",
                    "email":"bharat@gmail.com",
                    "age": 45,
                    "role":"UI",
                    "address": {
                        "line1":"kalady",
                        "pincode": "546848"
                    },
                    "password": "secret"
                }
            );
            employeeRepository.findEmployeeById = mockFunction;
            expect(async () => await employeeService.getEmployeeById(2)).rejects.toThrow(ValidationError);
        });
    });
})