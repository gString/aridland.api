import { MongoClient } from "mongoDB";
import { MongoMemoryServer } from "mongodb-memory-server";

// Extend the default timeout so MongoDB binaries can download
jest.setTimeout(60000);

// List of collections names
const COLLECTIONS = [ countries ];

class DBManger {
	constructor() {
		this.db = null;
		this.server = new MongoMemoryServer();
		this.connection = null;
	}
	
	async start() {
		const url = await this.server.getConnectionString();
		this.connection = await MongoClient.connect(url, { useNewUrlParser: true });
		this.db = this.connection.db( await this.server.getDbName() );
	}
	
	stop() {
		this.connection.close();
		return this.server.stop();
	}
	
	cleanup() {
		return Promise.all( COLLECTIONS.map( c => this.db.collection(c).remove({}) ) );
	}
}

export default DBManger;
