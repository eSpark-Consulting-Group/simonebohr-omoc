import { appInstance } from './src/app';
import { defaultInserts } from './src/services';
import { connectSocket } from './src/socket';
import { logger } from './src/utils';

// Initialize Server
appInstance.startServer().then(async () => {
  try {
    await defaultInserts.insertCategories();
    const socket = connectSocket(appInstance.server);
    appInstance.app.set('io', socket);
  } catch (err) {
    logger.error(`Error in inserting default Items : ${(err as Error)?.message}`);
  }
});
