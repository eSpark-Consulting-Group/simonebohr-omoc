import { BusinessInfos } from '../models';

class BusinessHelper {
  async createRandomShop(userId: string) {
    const names = ['Fitness', 'Shop', 'BuyOne', 'House', 'New Star'];
    await BusinessInfos.create({
      userId,
      name: names[Math.floor(Math.random() * names.length)],
      country: 'Germany',
    });
  }
}
export const businessHelper = new BusinessHelper();
