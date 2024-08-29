import { BOT_SHOP_ID } from "../config";
import { DEFAULT_CATEGORIES, DEFAULT_CATEGORY_LINKS } from "../constants";
import { Categories } from "../models";
import { logger } from "../utils";

 class DefaultInserts {

  public async insertCategories():Promise<void>{
    const categoriesArray = Object.values(DEFAULT_CATEGORIES);
    const findCategories = await Categories.find({
        shopId: BOT_SHOP_ID,
    });
    if(findCategories?.length){
      return ;
    }
    const categoriesData = categoriesArray?.map((category)=>({
      shopId: BOT_SHOP_ID,
      image: DEFAULT_CATEGORY_LINKS[category] ?? '',
      thumbnail:DEFAULT_CATEGORY_LINKS[category] ?? '',
      productIds: [],
      title: category
    }));
    await Categories.insertMany(categoriesData);
    logger.info(`Categories has been inserted for default shop with id ${BOT_SHOP_ID}`)
  }
}

export const defaultInserts = new DefaultInserts();