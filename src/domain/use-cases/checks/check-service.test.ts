import { mock } from "node:test";
import { CheckService } from "./check-service"
import { LogEntity } from "../../entities/log.entity";

describe('CheckService UseCase', () => { 

    const mockRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn(), 
    }

    const succesCallback = jest.fn();
    const errorCallback = jest.fn();

    const checkService = new CheckService(
        mockRepository,
        succesCallback,
        errorCallback,
    );

    beforeEach(() =>{
        jest.clearAllMocks();
    })



    test('should call successCallback when fetch returns true', async() => { 

        const wasOK = await checkService.execute('https://google.com');

        expect(wasOK).toBe(true);
        expect( succesCallback ).toHaveBeenCalled();
        expect( errorCallback ).not.toHaveBeenCalled();
        
        expect(mockRepository.saveLog).toBeCalledWith(expect.any(LogEntity));
    })

    test('should call errorCallback when fetch returns false', async() => { 

        const wasOK = await checkService.execute('https://sdasffasdgoogle.com');

        expect(wasOK).toBe(false);
        expect( succesCallback ).not.toHaveBeenCalled();
        expect( errorCallback ).toHaveBeenCalled();
        
        expect(mockRepository.saveLog).toBeCalledWith(expect.any(LogEntity));
    })
 })