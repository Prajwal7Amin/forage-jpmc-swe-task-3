import { ServerRespond } from './DataStreamer';

export interface Row {
  price_abc: number,
  price_def: number,
  ratio: number,
  timestamp: Date,
  upper_bound: number,
  lower_bound: number,
  trigger_alert: number | undefined,
}





export class DataManipulator {
  static generateRow(serverRespond: ServerRespond[]): Row {
    // Assuming you have serverRespond and historicalData arrays
    //const row = DataManipulator.generateRow(serverRespond, historicalData);

    const priceABC = (serverRespond[0].top_ask.price + serverRespond[0].top_bid.price) / 2;
    const priceDEF = (serverRespond[1].top_ask.price + serverRespond[1].top_bid.price) / 2;
    const ratio = priceABC / priceDEF;

    // Calculate the 12-month historical average ratio
    //const historicalRatioSum = historicalData.reduce((sum, data) => sum + (data.price_abc / data.price_def), 0);
    //const historicalAverageRatio = historicalRatioSum / historicalData.length;

    // Calculate the upper and lower bounds
    //const upperBound = historicalAverageRatio * 1.1;
    //const lowerBound = historicalAverageRatio * 0.9;
    const upperBound = 1 + 0.05;
    const lowerBound = 1 - 0.05;
    return {
      price_abc: priceABC,
      price_def: priceDEF,
      ratio,
      timestamp: serverRespond[0].timestamp > serverRespond[1].timestamp ?
        serverRespond[0].timestamp : serverRespond[1].timestamp,
      upper_bound: upperBound,
      lower_bound: lowerBound,
      trigger_alert: (ratio > upperBound || ratio < lowerBound) ? ratio : undefined,
    };
  }
}
