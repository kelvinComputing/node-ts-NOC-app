import { LogEntity, LogSeveritylevel } from "./log.entity"

describe('LodEntity.ts', () => { 

    const dataObj = new LogEntity({
        message: 'Hola mundo',
        level: LogSeveritylevel.high,
        origin:'log.entity.ts'
    });

    test('should create a LogEntity instance', () => { 

        const log = new LogEntity(dataObj);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe(dataObj.message);
        expect(log.level).toBe(dataObj.level);
        expect(log.origin).toBe(dataObj.origin);
        expect(log.createdAt).toBeInstanceOf(Date)        
    });

    test('should create a LogEntity instance from json', () => { 

        const json = `{"message":"Service http://google.com working","level":"low","createdAt":"2024-10-14T05:05:50.254Z","origin":"check-service.ts"}`
        const log = LogEntity.fromJson(json);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe("Service http://google.com working");
        expect(log.level).toBe(LogSeveritylevel.low);
        expect(log.origin).toBe("check-service.ts");
        expect(log.createdAt).toBeInstanceOf(Date) ;
    })

    test('should create a LogEntity instance fro object', () => { 

        const log = new LogEntity(dataObj);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe(dataObj.message);
        expect(log.level).toBe(dataObj.level);
        expect(log.origin).toBe(dataObj.origin);
        expect(log.createdAt).toBeInstanceOf(Date)  
     })
 })