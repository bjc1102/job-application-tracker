import { Injectable } from '@nestjs/common';
import ogs from 'open-graph-scraper';

@Injectable()
export class ApplicationService {
  async getJobPostingOpenGraphData(url: string) {
    const options = { url };

    try {
      const data = await ogs(options);

      return data.result;
    } catch (error) {
      throw new Error(error);
    }
  }
}
