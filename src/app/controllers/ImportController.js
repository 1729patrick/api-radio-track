import StationData from '../schemas/StationData';
import Station from '../schemas/Station';
import Stations from '../schemas/Stations';
import api from '../../libs/api';
import Axios from 'axios';

class ImportController {
	async indexStation(req, res) {
		let query = '/api/list/all?skip=59140';

		while (query) {
			const results = await api.get(query);
			const { next, items } = results.data;

			query = next;
			await Station.create(items);
			console.log(query);
		}

		return res.json({ success: true });
	}

	async indexStationData(req, res) {
		const stations = await Station.find();

		let isToInsert = false;
		const lastId = 'nb93b90j';
		// eslint-disable-next-line no-unreachable-loop
		for (let i = 0; i < stations.length; i++) {
			const id = stations[i].id;

			if (isToInsert) {
				const results = await api.get(`api/station/${id}`);

				const response = results.data;

				await StationData.create({
					continent: JSON.stringify(response.continent),
					country: JSON.stringify(response.country),
					frequencies: JSON.stringify(response.frequencies),
					genres: JSON.stringify(response.genres),
					language: JSON.stringify(response.language),
					station: JSON.stringify(response.station),
				});
				console.log({ id });
			} else {
				isToInsert = id === lastId;
				console.log({ isToInsert, id });
			}
		}

		return res.json({ success: true });
	}

	async indexStationImages(req, res) {
		const download_image = (url, image_path) =>
			Axios({
				url,
				responseType: 'stream',
			}).then(
				(response) =>
					new Promise((resolve, reject) => {
						response.data
							.pipe(fs.createWriteStream(image_path))
							.on('finish', () => resolve())
							.on('error', (e) => reject(e));
					})
			);

		const stations = await Station.find();

		let isToInsert = false;
		const lastId = 'nb93b90j';
		for (let i = 0; i < stations.length; i++) {
			const id = stations[i].id;
			const img = stations[i].img;

			if (isToInsert) {
				try {
					await download_image(
						`https://openradio.app/img/500/${img}.jpg`,
						`images/${img}.jpg`
					);

					console.log({ id });
				} catch (e) {
					console.log({ id, img });
				}
			} else {
				isToInsert = id === lastId;
				console.log({ isToInsert, id });
			}
		}

		return res.json({ success: true });
	}

	async formatStation(req, res) {
		const resuls = await StationData.find();

		const formatted = resuls.map((result) => {
			const { station } = JSON.parse(JSON.stringify(result));

			return JSON.parse(station);
		});

		for (let i = 0; i < formatted.length; i++) {
			await Stations.create(formatted[1]);
		}

		return res.json({ success: true });
	}
}

export default new ImportController();
