import Station from '../schemas/Station';
import axios from 'axios';
import { data } from '../../invalid/errs';

class UtilController {
  async index(req, res) {
    const list = await Station.find({
      countryCode: 'br',
      active: true,
    }).select(['streams', 'id']);

    const listFormatted = list.map(({ id, streams }) => ({
      id,
      url: streams[0]?.url,
    }));

    let errs = [];
    let falseErrs = [];
    for (let i = 0; i < listFormatted.length; i++) {
      console.log({ i, err: errs.length, falseErr: falseErrs.length });

      // console.log({ errs });
      // console.log({ falseErrs });
      const radio = listFormatted[i];
      let source = axios.CancelToken.source();

      const timeout = setTimeout(() => {
        falseErrs.push(radio);
        source.cancel();
      }, 7000);

      try {
        const up = await axios.get(radio?.url, { cancelToken: source.token });
        clearTimeout(timeout);

        if (up?.status !== 200) {
          errs.push({ ...radio, status: up?.status });
        }
      } catch (e) {
        clearTimeout(timeout);
        errs.push({ ...radio, errMessage: e?.message });
      }
    }

    return res.json({ errs, falseErrs });
  }

  async updateStations(_, res) {
    const errs = data.errs.filter((x) => x.errMessage);

    const list = await Station.find({
      countryCode: 'br',
      active: true,
    }).select(['streams', 'id']);

    for (let i = 0; i < list.length; i++) {
      const radio = list[i];
      await Station.findOneAndUpdate(
        { id: radio.id },
        { active: !errs.find((x) => x.id === radio.id) }
      );
    }

    const active = await Station.find({
      countryCode: 'br',
      active: true,
    }).select(['streams', 'id']);

    res.json({ active: active.length });
  }

  async count(_, res) {
    const stations = await Station.find({
      countryCode: 'br',
      active: true,
    });

    return res.json({ count: stations.length });
  }
}

export default new UtilController();
