import { Schema } from 'mongoose';

const popularityRankSchema = new Schema({
  timestamp: { type: Number },
  rank: { type: Number }
}, { _id: false });

const categorySchema = new Schema({
  engine_name: { type: String },
  category: { type: String }
}, { _id: false });

const analysisResultSchema = new Schema({
  method: { type: String },
  engine_name: { type: String },
  category: { type: String },
  result: { type: String }
}, { _id: false });

const dnsRecordSchema = new Schema({
  type: { type: String },
  ttl: { type: Number },
  value: { type: String },
  priority: { type: Number, default: null },
  rname: { type: String, default: null },
  serial: { type: Number, default: null },
  refresh: { type: Number, default: null },
  retry: { type: Number, default: null },
  expire: { type: Number, default: null },
  minimum: { type: Number, default: null }
}, { _id: false });

export const virusTotalInfoSchema: Schema = new Schema({
  data: {
    id: { type: String },
    type: { type: String },
    links: {
      self: { type: String }
    },
    attributes: {
      total_votes: {
        harmless: { type: Number },
        malicious: { type: Number }
      },
      reputation: { type: Number },
      popularity_ranks: {
        type: Map,
        of: popularityRankSchema
      },
      categories: {
        type: Map,
        of: String
      },
      last_analysis_stats: {
        malicious: { type: Number },
        suspicious: { type: Number },
        undetected: { type: Number },
        harmless: { type: Number },
        timeout: { type: Number }
      },
      whois_date: { type: Number },
      tld: { type: String },
      last_dns_records: [dnsRecordSchema],
      last_analysis_results: {
        type: Map,
        of: analysisResultSchema
      },
      whois: { type: String },
      tags: [String],
      last_modification_date: { type: Number },
      last_dns_records_date: { type: Number },
      last_analysis_date: { type: Number },
      last_update_date: { type: Number },
      registrar: { type: String },
      creation_date: { type: Number }
    }
  }
}, { _id: false });
