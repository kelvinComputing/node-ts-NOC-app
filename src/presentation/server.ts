import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

const fsLogRepository = new LogRepositoryImpl(
    new FileSystemDataSource()
)
const mongoLogRepository = new LogRepositoryImpl(
    new MongoLogDatasource(),
)
const postgresLogRepository = new LogRepositoryImpl(
    new PostgresLogDatasource(),
)

const emailService = new EmailService();

export class Server {
    public static async start() {
        console.log('Server started...');

        // Mamdar email
        // new SendEmailLogs(
        //     emailService,
        //     fileSystemLogRepository,
        // ).execute(
        //     ['kelvincontrera1@gmail.com'],
        // );

        // const logs = await logRepository.getLogs(LogSeveritylevel.low);
        // console.log(logs);
    
        CronService.createJob(
            '*/5 * * * * *',
            () => {
                const url = 'http://google.com';
                new CheckServiceMultiple(
                    [fsLogRepository, mongoLogRepository, postgresLogRepository],
                    () => console.log(` ${url} is ok`),
                    (error) => console.log(error),
                ).execute( url );
                // new CheckService() .execute('http://localhost:3000');
            }
        );
    }
}