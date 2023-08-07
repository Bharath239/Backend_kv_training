import { DataSource } from "typeorm";
import DepartmentRepository from "../../repository/department.repository";
import DepartmentService from "../../service/department.service";
import EmployeeRepository from "../../repository/employee.repository";
import Department from "../../entity/department.entity";
import HttpException from "../../exception/http.exception";
import CreateDepartmentDto from "../../dto/department.dto";
import { plainToInstance } from "class-transformer";

describe("Department Service test",()=>{
    let departmentService: DepartmentService;
    let departmentRepository: DepartmentRepository;
    beforeAll(()=>{
        const dataSource: DataSource = {
            getRepository: jest.fn(),
        } as unknown as DataSource;
        departmentRepository = new DepartmentRepository(
            dataSource.getRepository(Department)
        );
        departmentService = new DepartmentService(departmentRepository);
    });

    describe("Test for getAllDepartments", () => {
        test("success test", async () => {
          const mockFunction = jest.fn();
          mockFunction.mockResolvedValueOnce({
            name: "hr",
          });
          departmentRepository.findAllDepartments = mockFunction;
          const departments = await departmentService.getAllDepartments();
          expect(departments).toEqual({
            name: "hr",
          });
        });
        test("empty case", async () => {
          const mockFunction = jest.fn();
          mockFunction.mockResolvedValue([]);
          departmentRepository.findAllDepartments = mockFunction;
          expect(
            async () => await departmentService.getAllDepartments()
          ).rejects.toThrow(HttpException);
        });
      });

    describe("Test for get dept by id",()=>{
        test("success test",async()=>{
            const mockdepartment = jest.fn();
            mockdepartment.mockResolvedValueOnce({
                name: "hr",
              });
            departmentRepository.findDepartmentById = mockdepartment;
            const department = await departmentService.getDepartmentById(1);
            expect(department).toEqual({
                name: "hr",
              });
        });

        test("failure test",async()=>{
            const mockdepartment = jest.fn();
            mockdepartment.mockResolvedValueOnce(null);
            departmentRepository.findDepartmentById = mockdepartment;
            expect(async()=>await departmentService.getDepartmentById(1)).rejects.toThrow(); 
        });
    });

    describe("Create dept",()=>{
        test("success test",async()=>{
            const mockdeptname = jest.fn();
            mockdeptname.mockResolvedValueOnce(null);
            departmentRepository.findDepartmentByName = mockdeptname;
            const createDeptDto = plainToInstance(CreateDepartmentDto, {name: "hr"});
            const mockdept = jest.fn();
            mockdept.mockResolvedValueOnce({name:"hr"});
            departmentRepository.createDepartment = mockdept;
            const dept = await departmentService.createDepartment(createDeptDto);
            expect(dept).toEqual({name: "hr"});
        });

        test("failure test",async()=>{
            const mockdeptname = jest.fn();
            mockdeptname.mockResolvedValueOnce("hr");
            departmentRepository.findDepartmentByName = mockdeptname;
            const createDeptDto = plainToInstance(CreateDepartmentDto, {name: "hr"});
            const mockdept = jest.fn();
            mockdept.mockResolvedValueOnce({name:"hr"});
            departmentRepository.createDepartment = mockdept;
            expect(async()=>await departmentService.createDepartment(createDeptDto)).rejects.toThrow()
        })
    })

    describe("delete dept",()=>{
        test("success test",async()=>{
            const mockdept = jest.fn();
            mockdept.mockResolvedValueOnce({name:"hr"});
            departmentRepository.findDepartmentById = mockdept;
            departmentRepository.deleteDepartmentById = mockdept;
            expect(async()=>await departmentService.deleteDepartmentById(1)).not.toThrow()
        });
        
    });

    describe("update dept",()=>{
        test("success test",async()=>{
            const mockid = jest.fn();
            mockid.mockResolvedValueOnce({name:"hr"});
            departmentRepository.findDepartmentById = mockid;
            const mockdeptname = jest.fn();
            mockdeptname.mockResolvedValueOnce(null);
            departmentRepository.findDepartmentByName = mockdeptname;
            const createDeptDto = plainToInstance(CreateDepartmentDto, {name: "hr"});
            const mockdept = jest.fn();
            mockdept.mockResolvedValueOnce({name:"hr"});
            departmentRepository.updateDepartment = mockdept;
            const dept = await departmentService.updateDepartment(createDeptDto,1);
            expect(dept).toEqual({name:"hr"});
        });

        test("failure test",async()=>{
            const mockid = jest.fn();
            mockid.mockResolvedValueOnce({name:"hr"});
            departmentRepository.findDepartmentById = mockid;
            const mockdeptname = jest.fn();
            mockdeptname.mockResolvedValueOnce("hr");
            departmentRepository.findDepartmentByName = mockdeptname;
            const createDeptDto = plainToInstance(CreateDepartmentDto, {name: "hr"});
            const mockdept = jest.fn();
            mockdept.mockResolvedValueOnce({name:"hr"});
            departmentRepository.updateDepartment = mockdept;
            expect(async()=>await departmentService.updateDepartment(createDeptDto,1)).rejects.toThrow();
        })
    })
})