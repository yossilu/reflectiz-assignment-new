import cron from 'node-cron';
import { Domain } from '../models/domainModel';
import { analyzeDomain } from './domainService';
import { config } from '../config';

export const startScheduler = () => {
  cron.schedule(config.scanInterval, async () => {
    const domains = await Domain.find({ status: 'pending' });
    for (const domain of domains) {
      await analyzeDomain(domain);
    }
  });
};
