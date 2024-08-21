import { ConfigService } from '@nestjs/config';
import { MongooseModuleFactoryOptions } from '@nestjs/mongoose';

export const getMongoConfig = async (configService: ConfigService): Promise<MongooseModuleFactoryOptions> => {
    return {
        uri: configService.get('URI_MONGO'),
    }
};
