export enum CONSTANT_TYPES {
  REGION = 'region',
  ESTIMATED_TIME = 'estimated-time',
}

export const ESTIMATED_TIME = {
  '1-3': {
    minShippingTime: 1,
    maxShippingTime: 3,
  },
  '1-5': {
    minShippingTime: 1,
    maxShippingTime: 5,
  },
  '1-7': {
    minShippingTime: 1,
    maxShippingTime: 7,
  },
  '1-9': {
    minShippingTime: 1,
    maxShippingTime: 9,
  },
};

export const DEFAULT_SHIPPING_TIMES = {
  minShippingTime: 1,
  maxShippingTime: 7,
};

export const GERMANY_REGIONS = [
  'Baden-Württemberg',
  'Bavaria (Bayern)',
  'Berlin',
  'Brandenburg',
  'Bremen',
  'Hamburg',
  'Hesse (Hessen)',
  'Lower Saxony (Niedersachsen)',
  'Mecklenburg-Vorpommern',
  'North Rhine-Westphalia (Nordrhein-Westfalen)',
  'Rhineland-Palatinate (Rheinland-Pfalz)',
  'Saarland',
  'Saxony (Sachsen)',
  'Saxony-Anhalt (Sachsen-Anhalt)',
  'Schleswig-Holstein',
  'Thuringia (Thüringen)',
];
