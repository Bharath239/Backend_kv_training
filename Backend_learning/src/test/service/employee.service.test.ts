import { DataSource } from "typeorm";
import EmployeeRepository from "../../repository/employee.repository";
import EmployeeService from "../../service/employee.service";
import Employee from "../../entity/employee.entity";
import { when } from "jest-when";
import HttpException from "../../exception/http.exception";
import { ValidationError } from "class-validator";
import CreateEmployeeDto from "../../dto/create.employee.dto";

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

    describe("Test for getAllEmployees",() =>{
        test("success test",async() => {
            const mockFunction = jest.fn();
            mockFunction.mockResolvedValueOnce({
                "name":"cisha",
                "role":"HR",
            });
            employeeRepository.findAllEmployees = mockFunction;
            const employees = await employeeService.getAllEmployees();
            expect(employees).toEqual({
                "name":"cisha",
                "role":"HR",
            });
        })
        test("empty case", async () => {
            const mockFunction = jest.fn();
            mockFunction.mockResolvedValue([]);
            employeeRepository.findAllEmployees = mockFunction;
            expect(async()=>await employeeService.getAllEmployees()).rejects.toThrow(HttpException);
        })
    });

    describe("Test for getEmployeeById",() => {
        test("test employee for id 1",async () => {
            const mockFunction = jest.fn();
            when(mockFunction).calledWith(1).mockResolvedValueOnce(
                {
                    "name":"cisha",
                    "role":"HR",
                }
            );
            employeeRepository.findEmployeeById = mockFunction;
            const employee = await employeeService.getEmployeeById(1);
            expect(employee).toEqual(
                {
                    "name":"cisha",
                    "role":"HR",
                    })
                }
            );
        });

        test("test for httpException error",async () => {
            const mockFunction = jest.fn();
            when(mockFunction).calledWith(1).mockResolvedValueOnce(
                {
                    "name":"cisha",
                    "role":"HR",
                    }
            );
            employeeRepository.findEmployeeById = mockFunction;
            expect(async () => await employeeService.getEmployeeById(2)).rejects.toThrow(HttpException);
        });

    describe("test for createEmployees",()=>{
        test("success test",async()=>{
            const mockFunction = jest.fn();
            when(mockFunction).calledWith(Employee)

        })
    })
        
        
});
