import { DataSource } from "typeorm";
import EmployeeRepository from "../../repository/employee.repository";
import EmployeeService from "../../service/employee.service";
import Employee from "../../entity/employee.entity";
import { when } from "jest-when";
import HttpException from "../../exception/http.exception";
import CreateEmployeeDto from "../../dto/create.employee.dto";
import { plainToInstance } from "class-transformer";
import LoginCredentialsDto from "../../dto/login.credential.dto";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import PatchEmployeeDto from "../../dto/patch.employee.dto";

describe("Employee Service tests", () => {
  let employeeService: EmployeeService;
  let employeeRepository: EmployeeRepository;
  beforeAll(() => {
    const dataSource: DataSource = {
      getRepository: jest.fn(),
    } as unknown as DataSource;
    employeeRepository = new EmployeeRepository(
      dataSource.getRepository(Employee)
    );
    employeeService = new EmployeeService(employeeRepository);
  });

  describe("Test for getAllEmployees", () => {
    test("success test", async () => {
      const mockFunction = jest.fn();
      mockFunction.mockResolvedValueOnce({
        name: "cisha",
        role: "HR",
      });
      employeeRepository.findAllEmployees = mockFunction;
      const employees = await employeeService.getAllEmployees();
      expect(employees).toEqual({
        name: "cisha",
        role: "HR",
      });
    });
    test("empty case", async () => {
      const mockFunction = jest.fn();
      mockFunction.mockResolvedValue([]);
      employeeRepository.findAllEmployees = mockFunction;
      expect(
        async () => await employeeService.getAllEmployees()
      ).rejects.toThrow(HttpException);
    });
  });

  describe("Test for getEmployeeById", () => {
    test("test employee for id 1", async () => {
      const mockFunction = jest.fn();
      when(mockFunction).calledWith(1).mockResolvedValueOnce({
        name: "cisha",
        role: "HR",
      });
      employeeRepository.findEmployeeById = mockFunction;
      const employee = await employeeService.getEmployeeById(1);
      expect(employee).toEqual({
        name: "cisha",
        role: "HR",
      });
    });
  });

  test("test for httpException error", async () => {
    const mockFunction = jest.fn();
    when(mockFunction).calledWith(1).mockResolvedValueOnce({
      name: "cisha",
      role: "HR",
    });
    employeeRepository.findEmployeeById = mockFunction;
    expect(
      async () => await employeeService.getEmployeeById(2)
    ).rejects.toThrow(HttpException);
  });

  describe("test for createEmployees", () => {
    test("success test", async () => {
      const mockFunction = jest.fn();
      mockFunction.mockResolvedValueOnce({
        id: 1,
        username: "bharath",
      });
      const mockFunctionUsername = jest.fn();
      mockFunctionUsername.mockResolvedValueOnce(null);
      const createEmployeeDto = plainToInstance(CreateEmployeeDto, {
        name: "san",
        username: "san",
        password: "secret",
        address: {
          address_line_1: "KALAMpoor",
        },
      });
      employeeRepository.createEmployee = mockFunction;
      employeeRepository.findEmployeeByUsername = mockFunctionUsername;
      const result = await employeeService.createEmployee(createEmployeeDto);
      expect(result).toEqual({
        id: 1,
        username: "bharath",
      });
    });

    test("failure test(UsernameTaken)", async () => {
      const mockFunction = jest.fn();
      mockFunction.mockResolvedValueOnce({
        id: 1,
        username: "bharath",
      });
      const mockFunctionUsername = jest.fn();
      mockFunctionUsername.mockResolvedValueOnce("san");
      const createEmployeeDto = plainToInstance(CreateEmployeeDto, {
        name: "san",
        username: "san",
        password: "secret",
        address: {
          address_line_1: "KALAMpoor",
        },
      });
      employeeRepository.createEmployee = mockFunction;
      employeeRepository.findEmployeeByUsername = mockFunctionUsername;
      expect(
        async () => await employeeService.createEmployee(createEmployeeDto)
      ).rejects.toThrow();
    });
  });

  describe("test for deleteEmployees", () => {
    test("success test", async () => {
      const mockFunctionid = jest.fn();
      when(mockFunctionid).calledWith(1).mockResolvedValueOnce({
        name: "cisha",
        role: "HR",
      });
      employeeRepository.findEmployeeById = mockFunctionid;
      employeeRepository.deleteEmployeeById = mockFunctionid;
      expect(
        async () => await employeeService.deleteEmployeeById(1)
      ).not.toThrow();
    });
  });

  describe("test for loginEmployees", () => {
    test("success test", async () => {
      const mockFunctionid = jest.fn();
      mockFunctionid.mockResolvedValueOnce({
        username: "jithin",
        password: "secret",
      });
      const loginCredentialsDto = plainToInstance(LoginCredentialsDto, {
        username: "jithin",
        password: "secret",
      });
      const mockEmploypsw = jest.fn();
      mockEmploypsw.mockResolvedValueOnce(true);
      bcrypt.compare = mockEmploypsw;
      const mocktoken = jest.fn();
      mocktoken.mockResolvedValueOnce("afsjkjkda");
      jsonwebtoken.sign = mocktoken;
      employeeRepository.findEmployeeByUsername = mockFunctionid;

      const employee = await employeeService.loginEmployee(loginCredentialsDto);
      expect(employee).toBeDefined();
    });

    test("Invalid username or password", async () => {
      const mockFunctionid = jest.fn();
      mockFunctionid.mockResolvedValueOnce({
        username: "jithin",
        password: "secret",
      });
      const loginCredentialsDto = plainToInstance(LoginCredentialsDto, {
        username: "jithin",
        password: "secret",
      });
      const mockEmploypsw = jest.fn();
      mockEmploypsw.mockResolvedValueOnce(false);
      bcrypt.compare = mockEmploypsw;
      employeeRepository.findEmployeeByUsername = mockFunctionid;
      expect(
        async () => await employeeService.loginEmployee(loginCredentialsDto)
      ).rejects.toThrow();
    });

    test("Username not found", async () => {
      const mockFunctionusername = jest.fn();
      mockFunctionusername.mockResolvedValueOnce(null);
      const loginCredentialsDto = plainToInstance(LoginCredentialsDto, {
        username: "jithin",
        password: "secret",
      });
      employeeRepository.findEmployeeByUsername = mockFunctionusername;
      expect(
        async () => await employeeService.loginEmployee(loginCredentialsDto)
      ).rejects.toThrow();
    });
  });

  describe("test for putEmployees", () => {
    test("success test", async () => {
      const mockid = jest.fn();
      mockid.mockResolvedValueOnce({
          name: "san",
          username: "san",
          password: "secret",
          address: {
              address_line_1: "KALAMpoor",
            },
        });
      employeeRepository.findEmployeeById = mockid;
      const mockFunctionUsername = jest.fn();
      mockFunctionUsername.mockResolvedValueOnce(null);
      employeeRepository.findEmployeeByUsername = mockFunctionUsername;
      const createEmployeeDto = plainToInstance(CreateEmployeeDto, {
        name: "san",
        username: "san",
        password: "secret",
        address: {
          address_line_1: "KALAMpoor",
        },
      });

      const mockFunction = jest.fn();
      mockFunction.mockResolvedValue({
        id: 1,
        username: "bharath",
      });
      employeeRepository.putEmployee = mockFunction;
      const result = await employeeService.putEmployee(createEmployeeDto, 1);
      expect(result).toEqual({
        id: 1,
        username: "bharath",
      });
    });

    test("success test", async () => {
        const mockid = jest.fn();
        mockid.mockResolvedValueOnce({
            name: "san",
            username: "san",
            password: "secret",
            address: {
                address_line_1: "KALAMpoor",
              },
          });
        employeeRepository.findEmployeeById = mockid;
        const mockFunctionUsername = jest.fn();
        mockFunctionUsername.mockResolvedValueOnce("san");
        employeeRepository.findEmployeeByUsername = mockFunctionUsername;
        const createEmployeeDto = plainToInstance(CreateEmployeeDto, {
          name: "san",
          username: "san",
          password: "secret",
          address: {
            address_line_1: "KALAMpoor",
          },
        });
  
        const mockFunction = jest.fn();
        mockFunction.mockResolvedValue({
          id: 1,
          username: "bharath",
        });
        employeeRepository.putEmployee = mockFunction;
        expect(async()=>await employeeService.putEmployee(createEmployeeDto, 1)).rejects.toThrow();
      });
  });

  describe("test for patchEmployees", () => {
    test("success test", async () => {
      const mockid = jest.fn();
      mockid.mockResolvedValueOnce({
          name: "san",
          username: "san",
          password: "secret",
          address: {
              address_line_1: "KALAMpoor",
            },
        });
      employeeRepository.findEmployeeById = mockid;
      const mockFunctionUsername = jest.fn();
      mockFunctionUsername.mockResolvedValueOnce(null);
      employeeRepository.findEmployeeByUsername = mockFunctionUsername;
      const patchEmployeeDto = plainToInstance(PatchEmployeeDto, {
        name: "san",
        username: "san",
        password: "secret",
        address: {
          address_line_1: "KALAMpoor",
        },
      });
      const mockFunction = jest.fn();
      mockFunction.mockResolvedValue({
        id: 1,
        username: "bharath",
      });
      employeeRepository.patchEmployee = mockFunction;
      const result = await employeeService.patchEmployee(patchEmployeeDto, 1);
      expect(result).toEqual({
        id: 1,
        username: "bharath",
      });
    });

    test("failure test(UsernameTaken)", async () => {
        const mockid = jest.fn();
        mockid.mockResolvedValueOnce({
            name: "san",
            username: "san",
            password: "secret",
            address: {
                address_line_1: "KALAMpoor",
              },
          });
        employeeRepository.findEmployeeById = mockid;
        const mockFunctionUsername = jest.fn();
        mockFunctionUsername.mockResolvedValueOnce("san");
        employeeRepository.findEmployeeByUsername = mockFunctionUsername;
        const patchEmployeeDto = plainToInstance(PatchEmployeeDto, {
          name: "san",
          username: "san",
          password: "secret",
          address: {
            address_line_1: "KALAMpoor",
          },
        });
        const mockFunction = jest.fn();
        mockFunction.mockResolvedValue({
          id: 1,
          username: "bharath",
        });
        employeeRepository.patchEmployee = mockFunction;
        expect(async()=>await employeeService.patchEmployee(patchEmployeeDto, 1)).rejects.toThrow();
    });
  });

});
