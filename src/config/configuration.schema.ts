import convict = require('convict');

export class ConfigurationSchema{
public static convictSchema: convict.Config = convict({
    env: {
      doc: "The applicaton environment.",
      format: ["production", "development", "test", "qa", "staging"],
      default: "development",
      env: "NODE_ENV"
    },
    port: {
      doc: "The port to bind.",
      format: "port",
      default: 8080,
      env: "PORT"
    },
    database: {
      mongoConnectionString: {
        doc: "Mongo Connection string",
        format: '*',
        default: 'mongodb://dbrown:password1@ds161162.mlab.com:61162/leblum-vendor-api',
        env: "MONGO_CONNECTION_STRING"
      },
    },
    ampq:{
      ampqConnectionString:{
        doc: "AMPQ Connection string for rabbit",
        format: "*",
        default: "amqp://wkaxkarj:NAsD1ISNCESHMmVlK9Mch6IcBjapIBYn@puma.rmq.cloudamqp.com/wkaxkarj",
        env: "AMPQ_CONNECTION_STRING"
      }
    },
    jwtSecretToken: {
      doc: "The secrect token we're signing jwt's with",
      format: String,
      default: "asdf97a9s8d7baodfbhoda8f7g9adf8asj",
      env: "JWT_SECRET_TOKEN",
    },
    returnCallStackOnError: {
      doc: "When the api encounters an error do we return a call stack",
      format: Boolean,
      default: true,
      env: "RETURN_CALL_STACK",
    },
    isConsoleLoggingActive: {
      doc: "Do we want to log output to the console?",
      format: Boolean,
      default: true,
      env: "CONSOLE_LOGGING",
    },
  });
}