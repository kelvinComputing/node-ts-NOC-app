import fs from 'fs';
import path from 'path';
import { FileSystemDataSource } from './file-system.datasource';
import { LogEntity, LogSeveritylevel } from '../../domain/entities/log.entity';
import { log } from 'console';

describe('file-system.datasource.ts', () => { 

    const logPath = path.join(__dirname, '../../../logs')

    beforeEach(() =>{
        fs.rmSync(logPath, {recursive: true, force: true})
    })

    test('should create log files if they do not exits', () => { 

        new FileSystemDataSource();
        const files = fs.readdirSync(logPath);
        expect(files).toEqual([ 'logs-all.log', 'logs-high.log', 'logs-medium.log' ]);
     })


     test('should save a log in logs-all.log', () => { 

        const logDatasource = new FileSystemDataSource();
        const log = new LogEntity({
            message: 'test',
            level: LogSeveritylevel.low,
            origin: 'file-system.datasource.test.ts'
        });

        logDatasource.saveLog(log);
        const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');
        expect(allLogs).toContain( JSON.stringify(log));
      })

      test('should save a log in logs-all.logand and logs-medium.log', () => { 

        const logDatasource = new FileSystemDataSource();
        const log = new LogEntity({
            message: 'test',
            level: LogSeveritylevel.medium,
            origin: 'file-system.datasource.test.ts'
        });

        logDatasource.saveLog(log);
        const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');
        const mediumLogs = fs.readFileSync(`${logPath}/logs-medium.log`, 'utf-8');

        expect(allLogs).toContain( JSON.stringify(log));
        expect(mediumLogs).toContain( JSON.stringify(log));

      })

      test('should save a log in logs-all.logand and logs-high.log', () => { 

        const logDatasource = new FileSystemDataSource();
        const log = new LogEntity({
            message: 'test',
            level: LogSeveritylevel.high,
            origin: 'file-system.datasource.test.ts'
        });

        logDatasource.saveLog(log);
        const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');
        const highLogs = fs.readFileSync(`${logPath}/logs-high.log`, 'utf-8');

        expect(allLogs).toContain( JSON.stringify(log));
        expect(highLogs).toContain( JSON.stringify(log));
      })

      test('should return all logs', async() => {  

        const logDatasource = new FileSystemDataSource();
        const logLow = new LogEntity({
            message: 'log-low',
            level: LogSeveritylevel.low,
            origin:'low',
        })
        const logMedium = new LogEntity({
            message: 'log-medium',
            level: LogSeveritylevel.medium,
            origin:'medium',
        })
        const logHigh = new LogEntity({
            message: 'log-high',
            level: LogSeveritylevel.high,
            origin:'high',
        });

        await logDatasource.saveLog(logLow);
        await logDatasource.saveLog(logMedium);
        await logDatasource.saveLog(logHigh);

        const logsLow = await logDatasource.getLogs(LogSeveritylevel.low);
        const logsMedium = await logDatasource.getLogs(LogSeveritylevel.medium);
        const logsHigh = await logDatasource.getLogs(LogSeveritylevel.high);

        expect( logsLow ).toEqual(expect.arrayContaining([ logLow, logMedium, logHigh]))
        expect( logsMedium ).toEqual(expect.arrayContaining([ logMedium ]))
        expect( logsHigh ).toEqual(expect.arrayContaining([ logHigh]))
      })

      test('should not throw an error if path exits', async () => {  

        new FileSystemDataSource();
        new FileSystemDataSource();

        expect(true).toBeTruthy();
      })

      test('should throw an error if severity level is not defined', async() => { 

        const logDatasource = new FileSystemDataSource();
        const customSeverityLevel = 'Super-LOg' as LogSeveritylevel;

        try {
            await logDatasource.getLogs(customSeverityLevel);
            expect(true).toBeFalsy();
        } catch (error) {
            const errorString = `${error}`;
            
            expect(errorString).toContain(`${customSeverityLevel} not implemented`)
        }
       })
 })