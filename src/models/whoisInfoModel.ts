import { Schema } from 'mongoose';

const contactSchema = new Schema({
  name: { type: String },
  organization: { type: String },
  street1: { type: String },
  city: { type: String },
  state: { type: String },
  postalCode: { type: String },
  country: { type: String },
  telephone: { type: String },
  telephoneExt: { type: String },
  fax: { type: String },
  faxExt: { type: String },
  rawText: { type: String }
}, { _id: false });

const auditSchema = new Schema({
  createdDate: { type: String },
  updatedDate: { type: String }
}, { _id: false });

const nameServerSchema = new Schema({
  rawText: { type: String },
  hostNames: [String],
  ips: [String]
}, { _id: false });

export const whoisInfoSchema: Schema = new Schema({
  WhoisRecord: {
    domainName: { type: String },
    parseCode: { type: Number },
    audit: auditSchema,
    registrarName: { type: String },
    registrarIANAID: { type: String },
    dataError: { type: String },
    registryData: {
      createdDate: { type: String },
      updatedDate: { type: String },
      expiresDate: { type: String },
      registrant: contactSchema,
      administrativeContact: contactSchema,
      technicalContact: contactSchema,
      domainName: { type: String },
      nameServers: nameServerSchema,
      status: { type: String },
      rawText: { type: String },
      footer: { type: String },
      header: { type: String },
      parseCode: { type: Number },
      registrarName: { type: String },
      registrarIANAID: { type: String },
      createdDateNormalized: { type: String },
      updatedDateNormalized: { type: String },
      expiresDateNormalized: { type: String },
      whoisServer: { type: String }
    },
    contactEmail: { type: String },
    domainNameExt: { type: String },
    estimatedDomainAge: { type: Number }
  }
}, { _id: false });
