import mongoose, { Document, Schema } from 'mongoose';

interface IVirusTotalInfo {
}

interface IWhoisInfo {
  //complex, didnt know to what level to provide the model. there's an example model in models folder.
}

/* interface example by mongoose schema subdoc.
  interface IDomainInfo {
    virusTotalInfo: mongoose.Types.Subdocument;
    whoisInfo: mongoose.Types.Subdocument;
    geoIpInfo: mongoose.Types.Subdocument;
  }
*/


interface IGeoIpInfo {
  range: [number, number];
  country: string;
  region: string;
  city: string;
  ll: [number, number];
  metro: number;
  area: number;
}

interface IDomainInfo {
  virusTotalInfo: IVirusTotalInfo | null;
  whoisInfo: IWhoisInfo | null;
  geoIpInfo: IGeoIpInfo | null;
}

interface IDomain extends Document {
  name: string;
  info: IDomainInfo | null;
  lastChecked: Date | null;
  status: 'pending' | 'scanned';
}

const domainSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  info: {
    virusTotalInfo: { type: Schema.Types.Mixed, default: null },
    whoisInfo: { type: Schema.Types.Mixed, default: null },
    geoIpInfo: { type: Schema.Types.Mixed, default: null },
  },
  lastChecked: { type: Date, default: null },
  status: { type: String, enum: ['pending', 'scanned'], default: 'pending' }
});

export const Domain = mongoose.model<IDomain>('Domain', domainSchema);
