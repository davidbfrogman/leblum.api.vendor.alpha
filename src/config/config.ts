import convict = require('convict');
import { ConfigurationSchema } from './configuration.schema';

export class Config{
  public static active = ConfigurationSchema.convictSchema;
  public static Config(){
    // Load environment dependent configuration 
    var env = ConfigurationSchema.convictSchema.get('env');
    ConfigurationSchema.convictSchema.loadFile('../environments/' + env + '.json');
    
    // Perform validation 
    ConfigurationSchema.convictSchema.validate({allowed: 'strict'});
  }
}
