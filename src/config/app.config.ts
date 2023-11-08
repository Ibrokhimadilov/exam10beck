interface appConfig {
    port: number
}

export const appConfig: appConfig = {
    port: process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 9090
}