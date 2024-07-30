import { Domain } from '../models/domainModel';
import { fetchVirusTotalInfo, fetchWhoisInfo, fetchGeoIpInfo } from '../utils/apiUtils';

export const getDomainInfo = async (name: string) => {
  return await Domain.findOne({ name });
};

export const addDomainForAnalysis = async (name: string) => {
  const domain = new Domain({ name, status: 'pending' });
  await domain.save();
  await analyzeDomain(domain);
};

export const analyzeDomain = async (domain: any) => {
  const [virusTotalInfo, whoisInfo, geoIpInfo] = await Promise.all([
    fetchVirusTotalInfo(domain.name),
    fetchWhoisInfo(domain.name),
    fetchGeoIpInfo(domain.name)
  ]);

  domain.info = { virusTotalInfo, whoisInfo, geoIpInfo };
  domain.status = 'scanned';
  domain.lastChecked = new Date();
  await domain.save();
};
