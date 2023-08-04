import MathUtil from "../utils/math.util";
import { when } from "jest-when";

describe("test average function",()=>{
    describe("test average success case",()=>{

        test("4+4",() => {
            MathUtil.sum = jest.fn().mockReturnValueOnce(8);
            expect(MathUtil.average(4,4)).toBe(4);
        });

        test("test average 4+4",() => {
            const mockedFunction = jest.fn();
            MathUtil.sum = mockedFunction;
            when(mockedFunction).calledWith(4,4).mockReturnValueOnce(8);
            expect(MathUtil.average(4,4)).toBe(4);
        })
    })
   
    
    describe("test average failure case",() => {
        test("4+4",() => {
            expect(MathUtil.average(3,4)).not.toBe(4);
        })  
    });
})
