import minimist from "minimist";

export default (script) => {
  //zergpool format
  //-a verus -o stratum+tcp://verushash.asia.mine.zergpool.com:3300 -u wallet -p c=DOGE,mc=VRSC,ID=namaworker
  //luckpool
  //ccminer -a verus -o stratum+tcp://ap.luckpool.net:3956#xnsub -u RNZDrcf97tBDwWtCURFpBbexPaCR5evyuu.workername -p hybrid -d 0 -t 4
  //hellminer.exe -c stratum+tcp://ap.luckpool.net:3956#xnsub -u RNZDrcf97tBDwWtCURFpBbexPaCR5evyuu.cpu -p hybrid --cpu 18
  try {
    const args = minimist(script.split(' '))
    const result = {
      workerName: '',
      threads: args.t,
      algo: args.a,
      server: args.o,
      wallet: args.u,
      password: args.p
    }
    const isZergpool = args.o.indexOf('zergpool.com') >= 0
    if (isZergpool) {
      const worker = args.p.split(',').find((text) => text?.indexOf('ID=') >= 0)
      if (worker) {
        result.workerName = worker.replace('ID=', '')
      }
    } else {
      const worker = args.u.split('.')[1]
      if (args.o.indexOf('luckpool') >= 0) {
        if (args.p === 'hybrid') {
          result.workerName = `${worker}-hybrid`
        } else {
          result.workerName = worker
        }
      }
    }
    return result
  } catch (e) {
  }
  return {
    workerName: '-',
    threads: '-',
    algo: '-',
    server: '-',
    wallet: '-',
    password: '-'
  }
}
