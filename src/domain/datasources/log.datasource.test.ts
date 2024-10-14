import { LogEntity, LogSeveritylevel } from "../entities/log.entity";
import { LogDataSource } from "./log.datasource";

describe('log.datasource.ts', () => { 

    const newLog = new LogEntity({
        origin: 'log.datasource.test.ts',
        message: 'test-message',
        level: LogSeveritylevel.low
    })

    class MockLogDatasource implements LogDataSource {
        async saveLog(log: LogEntity): Promise<void> {
            return;
        }

        async getLogs(severitylevel: LogSeveritylevel): Promise<LogEntity[]> {
            return [newLog]
        }
    }

    test('should test the abstract class', async() => { 
        
        const mockLogDatasource = new MockLogDatasource();

        expect(mockLogDatasource).toBeInstanceOf(MockLogDatasource);
        expect(typeof mockLogDatasource.saveLog).toBe('function');
        expect(typeof mockLogDatasource.getLogs).toBe('function');

        await mockLogDatasource.saveLog(newLog);
        const logs = await mockLogDatasource.getLogs(LogSeveritylevel.high);
        expect(logs).toHaveLength(1);
        expect(logs[0]).toBeInstanceOf(LogEntity);
     })
 })