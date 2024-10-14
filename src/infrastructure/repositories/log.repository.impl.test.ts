import { mock } from "node:test";
import { LogEntity, LogSeveritylevel } from "../../domain/entities/log.entity";
import { LogRepositoryImpl } from "./log.repository.impl";

describe('log.repository.impl.test.ts', () => { 

    const mockLogDataSource = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }
    
    const LogRepository = new LogRepositoryImpl(mockLogDataSource);

    beforeEach(() => {
        jest.clearAllMocks();
    })


    test('saveLog should call the datasource with arguments', async() => { 
        
        const log = {level: LogSeveritylevel.high, message: 'hola'} as LogEntity;
        await LogRepository.saveLog(log);
        expect( mockLogDataSource.saveLog).toHaveBeenCalledWith(log);
     });

     test('getLogs should call the datasource with arguments', async() => { 

        const lowSeverity = LogSeveritylevel.low;
        
        await LogRepository.getLogs(lowSeverity);

        expect(mockLogDataSource.getLogs).toBeCalledWith(lowSeverity);
      })
})