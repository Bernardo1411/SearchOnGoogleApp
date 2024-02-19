import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongoClient } from 'mongodb';
import { Provider } from '@nestjs/common';

export const MongoClientProvider: Provider = {
  provide: MongoClient,
  useFactory: async () => {
    const client = new MongoClient(
      'mongodb+srv://bernardo1411:JoI8uddCo8Q6RZiu@cluster0.usxqdaf.mongodb.net/?retryWrites=true&w=majority',
    );
    await client.connect();
    return client;
  },
};

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, MongoClientProvider],
})
export class AppModule {}
