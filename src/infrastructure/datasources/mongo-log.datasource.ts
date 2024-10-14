import { LogModel } from "../../data/mongo";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeveritylevel } from "../../domain/entities/log.entity";

export class MongoLogDatasource implements LogDataSource{

    async saveLog(log: LogEntity): Promise<void> {
        const newLog = await LogModel.create(log);
        console.log('Mongo log created', newLog.id);
        
    }

    async getLogs(severitylevel: LogSeveritylevel): Promise<LogEntity[]> {

        const logs = await LogModel.find({
            level: severitylevel
        });

        return logs.map( LogEntity.fromObject);
    }
}