import { Injectable } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import { Db } from 'mongodb';
import axios from 'axios';
@Injectable()
export class AppService {
  private db: Db;

  constructor(private readonly mongoClient: MongoClient) {
    this.db = this.mongoClient.db();
  }

  getHello(): string {
    return 'Hello World!';
  }

  async callGoBot(query: object): Promise<object[]> {
    const response = await axios.post('http://localhost:5002/search', query);

    const results: object[] = response.data;
    return results;
  }

  async saveSearchResults(results: object[], keywords: string): Promise<void> {
    console.log('results', results);
    const collection = this.db.collection('SearchResults');
    await collection.insertOne({ results, keywords });
  }

  async getAllSearches(): Promise<object[]> {
    const collection = this.db.collection('SearchResults');
    const searches = await collection.find({}).toArray();
    return searches;
  }
}
