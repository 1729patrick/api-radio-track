import mongoose from "mongoose";

class Database {
  constructor(){
    this.init()
  }

  init(){
    mongoose.connect(process.env.MONGO_URL, {
			useNewUrlParser: true,
			useFindAndModify: true,
		});
  }
}

export default new  Database()