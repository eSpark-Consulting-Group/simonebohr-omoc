import { connect, ConnectOptions } from 'mongoose';
import { configs } from './../config';

export const connectToDatabase = async () => {
  const options: ConnectOptions = {};
  return connect(configs.DB_URI, options);
};
