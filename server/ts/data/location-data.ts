export type LocationData = {
  name: { ko: string; en: string; };
  weatherLocation: string;
}

const locationData = [
  {
    name: {
      ko: '병점',
      en: 'byeongjum'
    },
    weatherLocation: 'hwaseong'
  },
  {
    name: {
      ko: '수원',
      en: 'suwon'
    },
    weatherLocation: 'suwon'
  },
  {
    name: {
      ko: '인천',
      en: 'incheon'
    },
    weatherLocation: 'incheon'
  }
];

export default locationData;