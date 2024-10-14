import { LogEntity, LogSeveritylevel } from "../entities/log.entity";

export abstract class LogRepository {
    abstract saveLog(log: LogEntity): Promise<void>;
    abstract getLogs( severitylevel: LogSeveritylevel ): Promise<LogEntity[]>;
}