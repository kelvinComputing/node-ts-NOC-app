import fs from 'fs';
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeveritylevel } from "../../domain/entities/log.entity";

export class FileSystemDataSource implements LogDataSource{

    private readonly logPath = 'logs/';
    private readonly allLogsPath = 'logs/logs-all.log';
    private readonly mediumLogsPath = 'logs/logs-medium.log';
    private readonly highLogsPath = 'logs/logs-high.log';

    constructor() {
        this.createLogsFiles();

    }

    private createLogsFiles = () => {
        
        if ( !fs.existsSync( this.logPath )) {
            fs.mkdirSync( this.logPath );
        }

        [
            this.allLogsPath,
            this.mediumLogsPath,
            this.highLogsPath
        ].forEach( path => {
            if ( fs.existsSync( path )) return;
            
            fs.writeFileSync( path, '');
        })
    }

    async saveLog(newLog: LogEntity): Promise<void> {

        const logAsJson = `${ JSON.stringify( newLog )}\n`;

        fs.appendFileSync( this.allLogsPath, logAsJson )

        if ( newLog.level === LogSeveritylevel.low ) return;
        
        if ( newLog.level === LogSeveritylevel.medium ) {
            fs.appendFileSync( this.mediumLogsPath, logAsJson );
        } else {
            fs.appendFileSync( this.highLogsPath, logAsJson );
        }
    }

    private getLogsFromFile = ( path: string ): LogEntity[] => {

        const content = fs.readFileSync( path, 'utf-8');
        if ( content === '' ) return [];
        const logs = content.split('\n').map( LogEntity.fromJson );

        return logs;
    }

    async getLogs(severitylevel: LogSeveritylevel): Promise<LogEntity[]> {

        switch( severitylevel ) {
            case LogSeveritylevel.low:
                return this.getLogsFromFile( this.allLogsPath );
            
            case LogSeveritylevel.medium:
                return this.getLogsFromFile( this.mediumLogsPath );

            case LogSeveritylevel.high:
                return this.getLogsFromFile( this.highLogsPath );
            
            default:
                throw new Error(`${ severitylevel } not implemented`);
        }
    }
}