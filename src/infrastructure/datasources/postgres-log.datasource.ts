import { PrismaClient, Severitylevel } from "@prisma/client";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeveritylevel } from "../../domain/entities/log.entity";

const prismaClient = new PrismaClient();

const severityEnum = {
    low: Severitylevel.LOW,
    medium: Severitylevel.MEDIUM,
    high: Severitylevel.HIGH,
}

export class PostgresLogDatasource implements LogDataSource{

    async saveLog(log: LogEntity): Promise<void> {

        const level = severityEnum[log.level];

        const newLog = await prismaClient.logModel.create({
            data: {
                ...log,
                level: level,
            }
        })

        console.log('savedd pos');
                
    }

    async getLogs(severitylevel: LogSeveritylevel): Promise<LogEntity[]> {
        const level = severityEnum[severitylevel];

        const dbLogs = await prismaClient.logModel.findMany({
            where: { level }
        })

        return dbLogs.map( LogEntity.fromObject )
    }
}