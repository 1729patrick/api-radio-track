import Continent from '../schemas/Continent';
import Country from '../schemas/Country';
import Region from '../schemas/Region';
import City from '../schemas/City';

import api from '../../libs/api';

class ImportController {
  async index(req, res) {
    const continents = await Continent.find();

    let count = 0;
    for (let index = 0; index < continents.length; index++) {
      const continent = continents[index];

      const countries = await Country.find({ continent: continent.slug });

      for (let x = 0; x < countries.length; x++) {
        const country = countries[x];

        const regions = await Region.find({ country: country.slug });

        for (let i = 0; i < regions.length; i++) {
          const region = regions[i];

          const endpoint = `api/by-location/${continent.slug}/${country.slug}/${region.slug}`;
          const response = await api.get(endpoint);

          try {
            const xxx = response.data.cities.map((city) => {
              const xx = {
                id: city.id,
                name: city.name,
                slug: city.slug,
                region: region.slug,
                country: country.slug,
              };

              return xx;
            });

            await City.create(xxx);

            count += xxx.length;
            console.log({ endpoint, countL: xxx.length, count });
          } catch (e) {
            console.log('error', { endpoint }, e);
          }
        }
      }
    }

    console.log({ count });

    return res.json({ success: true });
  }
}

export default new ImportController();
