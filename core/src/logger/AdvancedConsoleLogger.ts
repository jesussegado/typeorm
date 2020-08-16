import { assertUnreachable } from "typeorm-base";
import chalk from "chalk";
import { LoggerOptions } from "./LoggerOptions";
import { PlatformTools } from "../platform/PlatformTools";
import { QueryRunner } from "../query-runner/QueryRunner";
import { Logger } from "./Logger";

/**
 * Performs logging of the events in TypeORM.
 * This version of logger uses console to log events and use syntax highlighting.
 */
export class AdvancedConsoleLogger implements Logger {
    constructor(private options?: LoggerOptions) {}

    /**
     * Logs query and parameters used in it.
     */
    logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
        if (
            this.options === "all" ||
            this.options === true ||
            (Array.isArray(this.options) &&
                this.options.indexOf("query") !== -1)
        ) {
            const sql =
                query +
                (parameters && parameters.length
                    ? ` -- PARAMETERS: ${this.stringifyParams(parameters)}`
                    : "");
            logInfo("query:", PlatformTools.highlightSql(sql));
        }
    }

    /**
     * Logs query that is failed.
     */
    logQueryError(
        error: string,
        query: string,
        parameters?: any[],
        queryRunner?: QueryRunner
    ) {
        if (
            this.options === "all" ||
            this.options === true ||
            (Array.isArray(this.options) &&
                this.options.indexOf("error") !== -1)
        ) {
            const sql =
                query +
                (parameters && parameters.length
                    ? ` -- PARAMETERS: ${this.stringifyParams(parameters)}`
                    : "");
            logError(`query failed:`, PlatformTools.highlightSql(sql));
            logError(`error:`, error);
        }
    }

    /**
     * Logs query that is slow.
     */
    logQuerySlow(
        time: number,
        query: string,
        parameters?: any[],
        queryRunner?: QueryRunner
    ) {
        const sql =
            query +
            (parameters && parameters.length
                ? ` -- PARAMETERS: ${this.stringifyParams(parameters)}`
                : "");
        logWarn(`query is slow:`, PlatformTools.highlightSql(sql));
        logWarn(`execution time:`, time);
    }

    /**
     * Logs events from the schema build process.
     */
    logSchemaBuild(message: string, queryRunner?: QueryRunner) {
        if (
            this.options === "all" ||
            (Array.isArray(this.options) &&
                this.options.indexOf("schema") !== -1)
        ) {
            log(message);
        }
    }

    /**
     * Logs events from the migration run process.
     */
    logMigration(message: string, queryRunner?: QueryRunner) {
        log(message);
    }

    /**
     * Perform logging using given logger, or by default to the console.
     * Log has its own level and message.
     */
    log(
        level: "log" | "info" | "warn",
        message: any,
        queryRunner?: QueryRunner
    ) {
        switch (level) {
            case "log":
                if (
                    this.options === "all" ||
                    (Array.isArray(this.options) &&
                        this.options.indexOf("log") !== -1)
                )
                    log(message);
                break;
            case "info":
                if (
                    this.options === "all" ||
                    (Array.isArray(this.options) &&
                        this.options.indexOf("info") !== -1)
                )
                    logInfo("INFO:", message);
                break;
            case "warn":
                if (
                    this.options === "all" ||
                    (Array.isArray(this.options) &&
                        this.options.indexOf("warn") !== -1)
                )
                    console.warn(chalk.yellow(message));
                break;

            default:
                assertUnreachable(level);
        }
    }

    /**
     * Converts parameters to a string.
     * Sometimes parameters can have circular objects and therefor we are handle this case too.
     */
    protected stringifyParams(parameters: any[]) {
        try {
            return JSON.stringify(parameters);
        } catch (error) {
            // most probably circular objects in parameters
            return parameters;
        }
    }
}

/**
 * Logging functions needed by AdvancedConsoleLogger
 */
function logInfo(prefix: string, info: any) {
    console.log(chalk.gray.underline(prefix), info);
}

function logError(prefix: string, error: any) {
    console.log(chalk.underline.red(prefix), error);
}

function logWarn(prefix: string, warning: any) {
    console.log(chalk.underline.yellow(prefix), warning);
}

function log(message: string) {
    console.log(chalk.underline(message));
}
