import Station from '../schemas/Station';
import axios from 'axios';
const urlExist = require('url-exist');
const fs = require('fs');
const got = require('got');
const isReachable = require('is-reachable');

class UtilController {
  async index(req, res) {
    return res.json({ x: false });
    const check = async (list) => {
      return new Promise(async (resolve, reject) => {
        for (let i = 0; i < list.length; i++) {
          const reachable = await isReachable(list[i].url);

          if (reachable) {
            console.log('success: ', list[i].url);
            return resolve();
          }

          console.log('error: ', list[i].url);
          return reject(list[i]);
        }
      });
    };

    const list = await Station.find({ countryCode: 'br' }).select([
      'streams',
      'id',
    ]);

    // const x = await isReachable('http://audio01.viaflux.com:5511/live');

    // return res.json(x);

    const range = 300;
    const lists = [];

    const listFormatted = list.map(({ id, streams }) => ({
      id,
      url: streams[0]?.url,
    }));

    const max = +(listFormatted.length / range).toFixed(0);
    for (let i = 0; i <= max; i++) {
      const l = listFormatted.slice(
        i * range,
        Math.min((i + 1) * range, listFormatted.length)
      );
      lists.push(l);
    }

    const promises = await Promise.all(lists.map((list) => check(list)));
    // const valid = errs.filter((v) => v);

    // console.log(valid.length);
    return res.json(promises);
  }
}

export default new UtilController();

// [
//   {
//     "id": "mdg1eic6",
//     "url": "http://200.144.185.21:8007/radiousp-rp-128.mp3"
//   },
//   {
//     "id": "uf1ast5h",
//     "url": "http://8a3c.live.upx.net.br:8036/stream.aac"
//   },
//   {
//     "id": "ml2jta6n",
//     "url": "http://200.189.113.201/stream/educativafm.mp3"
//   }, {
//     "id": "e74ec5mt",
//     "url": "http://6d9a.webradio.upx.net.br:9972/stream"
//   },
//   {
//     "id": "q6irqj00",
//     "url": "http://server01.algar.mobradio.com.br:8006/live.mp3"
//   },
//   {
//     "id": "21n7srnn",
//     "url": "http://cast62.sitehosting.com.br:8071/live"
//   },
//   {
//     "id": "o9mot0f6",
//     "url": "http://cast61.sitehosting.com.br:8446/live"
//   },
//   {
//     "id": "06i90c50",
//     "url": "http://cast61.sitehosting.com.br:8560/live"
//   },
//   {
//     "id": "rvhi9r0t",
//     "url": "http://cast61.sitehosting.com.br:8295/live"
//   },
//   {
//     "id": "a7mcme22",
//     "url": "http://live.hitsrecife.com.br:8516/live"
//   },
//   {
//     "id": "u0r805me",
//     "url": "http://199.233.234.34:25216/live"
//   },
//   {
//     "id": "kttehh4b",
//     "url": "http://200.144.185.21:8007/radiousp-128.mp3"
//   },
//   {
//     "id": "d6aecca5",
//     "url": "http://199.233.234.34:25214/live"
//   },
//   {
//     "id": "akaom0sq",
//     "url": "http://144.217.192.196:8155/stream"
//   },
//   {
//     "id": "86jh0cih",
//     "url": "http://192.99.18.13:8290/stream"
//   },
//   {
//     "id": "2q7r8mgr",
//     "url": "http://144.217.192.196:8801/live"
//   },
//   {
//     "id": "56p97cjj",
//     "url": "http://192.99.4.205:8046/stream"
//   },
//   {
//     "id": "vgbmp1sa",
//     "url": "http://192.99.78.141:8000/stream"
//   },
//   {
//     "id": "hkhif7h7",
//     "url": "http://142.44.230.74:9033/stream"
//   },
//   {
//     "id": "c014djrk",
//     "url": "http://144.217.192.196:8573/live"
//   },
//   {
//     "id": "6jc3v0ln",
//     "url": "http://142.44.217.210:9904/stream"
//   },
//   {
//     "id": "i0dk3909",
//     "url": "http://66.70.177.195:8594/live"
//   },
//   {
//     "id": "ll7ae0je",
//     "url": "http://144.217.192.196:8680/live"
//   },
//   {
//     "id": "dmkod49f",
//     "url": "http://200.145.152.130:8060/unespfm.mp3"
//   },
//   {
//     "id": "rih4ok9e",
//     "url": "http://192.99.18.13:8804/stream"
//   },
//   {
//     "id": "33k5flbc",
//     "url": "http://radioaovivo.ufrgs.br:8000/stream.mp3"
//   },
//   {
//     "id": "1pnvo0v0",
//     "url": "http://167.114.33.135:8102/live"
//   },
//   {
//     "id": "mhr9336l",
//     "url": "http://177.87.37.225:8000/stream"
//   },
//   {
//     "id": "jh9t3ufv",
//     "url": "http://192.99.21.72:8132/stream"
//   },
//   {
//     "id": "m5jmdg67",
//     "url": "http://200.189.113.201/stream/educativaam.mp3"
//   },
//   {
//     "id": "7b2u41m8",
//     "url": "http://150.164.63.210:8000/aovivo.mp3"
//   },
//   {
//     "id": "4cn7mv1v",
//     "url": "http://cast4.audiostream.com.br:8649/mp3"
//   },
//   {
//     "id": "fgnscv2n",
//     "url": "http://r16.ciclano.io:9039/site"
//   },
//   {
//     "id": "22im925s",
//     "url": "http://node-17.zeno.fm/g69brm53t8quv"
//   },
//   {
//     "id": "0otpnfj7",
//     "url": "http://cast4.audiostream.com.br:8007/site"
//   },
//   {
//     "id": "ehr9917a",
//     "url": "http://r6.ciclano.io:10009/stream"
//   },
//   {
//     "id": "j9s52vp8",
//     "url": "http://r13.ciclano.io:8903/stream"
//   },
//   {
//     "id": "cdu4e47m",
//     "url": "http://aac.97fm.com.br/energia"
//   },
//   {
//     "id": "9jlbtdq8",
//     "url": "http://cast4.audiostream.com.br:8650/mp3"
//   },
//   {
//     "id": "jpdeu5bh",
//     "url": "http://paineldj6.com.br:8049/stream"
//   },
//   {
//     "id": "gv569kag",
//     "url": "http://cast4.audiostream.com.br:8653/aac"
//   },
//   {
//     "id": "ugi6tqqe",
//     "url": "http://audio.cabobranco.tv.br:8000/cbfm"
//   },
//   {
//     "id": "i6vcoj51",
//     "url": "http://audio.cabobranco.tv.br:8000/cbn"
//   },
//   {
//     "id": "19n1gbra",
//     "url": "http://r13.ciclano.io:8609/stream"
//   },
//   {
//     "id": "l4a7v6oj",
//     "url": "http://r15.ciclano.io:4351/stream"
//   },
//   {
//     "id": "v8l1b2bt",
//     "url": "http://audio8.cmaudioevideo.com:8859/stream"
//   },
//   {
//     "id": "foo2v35v",
//     "url": "http://mix80.mesmoip.com.br:8000/live"
//   },
// ]
