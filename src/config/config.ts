export const allconfigs = {
    dev: {
        mongoConnectionString: process.env.MONGO_CONNECTION_STRING || "mongodb://dbrown:password1@ds161162.mlab.com:61162/leblum-vendor-api",
        AMPQConnectionString: process.env.AMPQ_CONNECTION_STRING || "amqp://wkaxkarj:NAsD1ISNCESHMmVlK9Mch6IcBjapIBYn@puma.rmq.cloudamqp.com/wkaxkarj",
        jwtSecretToken: 'asdf97a9s8d7baodfbhoda8f7g9adf8asj',
        production: false,
        port: process.env.PORT || 8080,
        isConsoleLoggingActive:true,
        FileUploadPath: './uploads/',
        IsAuthenticationActive: false,
        mongoUserName: "dbrown",
        mongoPassword: "password1"
    },
    unitTesting: {
        mongoConnectionString: process.env.MONGO_CONNECTION_STRING || "mongodb://dbrown:password1@ds161162.mlab.com:61162/leblum-vendor-api",
        AMPQConnectionString: process.env.AMPQ_CONNECTION_STRING || "amqp://znouqrtk:jCralEP_MzNfoTutsVTM514WiPsoxXqA@wasp.rmq.cloudamqp.com/znouqrtk",
        jwtSecretToken: 'asdf97a9s8d7baodfbhoda8f7g9adf8asj',
        production: false,
        port: process.env.PORT || 8080,
        isConsoleLoggingActive:true,
        IsAuthenticationActive: false,
        mongoUserName: "dbrown",
        mongoPassword: "password1"
    },
    prod: {
        mongoConnectionString: process.env.MONGO_CONNECTION_STRING ||  "mongodb://dbrown:password1@ds161162.mlab.com:61162/leblum-vendor-api",
        AMPQConnectionString: process.env.AMPQ_CONNECTION_STRING || "amqp://znouqrtk:jCralEP_MzNfoTutsVTM514WiPsoxXqA@wasp.rmq.cloudamqp.com/znouqrtk",
        jwtSecretToken: 'asdf97a9s8d7baodfbhoda8f7g9adf8asj',
        production: true,   
        port: process.env.PORT || 8080,
        isConsoleLoggingActive:true,
        IsAuthenticationActive: true,
        mongoUserName: "dbrown",
        mongoPassword: "password1"
    },
}

export class Config {
    public static activeConfig(): IConfigType{
        if(process.env.NODE_ENV === 'production'){
            return allconfigs.prod;
        }
        if(process.env.NODE_ENV === 'unitTest')
        {
            return allconfigs.unitTesting;
        }
        else{
            return allconfigs.dev;
        }
    }
}

export interface IConfigType{
    mongoConnectionString: string;
    AMPQConnectionString: string;
    jwtSecretToken: string;
    production: boolean;
    port: number | string;
    isConsoleLoggingActive: boolean;
    IsAuthenticationActive: boolean;
    mongoUserName: string;
    mongoPassword: string;
}