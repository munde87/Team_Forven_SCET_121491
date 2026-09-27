export const PRIMARY_ORGANIZATION = {
  id: "CIL",
  name: "Coal India Limited",
  shortName: "CIL",
  description: "Apex Sovereign Energy & Coal Mining Enterprise",
  headquarters: "Kolkata, West Bengal",
  isApex: true
};

export const SUBSIDIARIES = [
  {
    id: "ECL",
    name: "Eastern Coalfields Limited",
    shortName: "ECL",
    state: "West Bengal & Jharkhand",
    mines: ["Rajmahal Opencast", "Sonalpur Underground", "Kenda Area", "Pandaveswar Pit"]
  },
  {
    id: "BCCL",
    name: "Bharat Coking Coal Limited",
    shortName: "BCCL",
    state: "Jharkhand (Dhanbad)",
    mines: ["Jharia Coking Block", "Block II Opencast", "Katras Area", "Moonidih Underground"]
  },
  {
    id: "CCL",
    name: "Central Coalfields Limited",
    shortName: "CCL",
    state: "Jharkhand (Ranchi)",
    mines: ["Amrapali Opencast", "Magadh Project", "Piparwar Area", "Kathara Washery"]
  },
  {
    id: "NCL",
    name: "Northern Coalfields Limited",
    shortName: "NCL",
    state: "Madhya Pradesh & UP",
    mines: ["Jayant Opencast", "Nigahi Project", "Dudhichhua Mine", "Bina Mega Project"]
  },
  {
    id: "SECL",
    name: "South Eastern Coalfields Limited",
    shortName: "SECL",
    state: "Chhattisgarh & MP",
    mines: ["Gevra Mega Opencast", "Dipka Project", "Kusmunda Mine", "Baikunthpur Underground"]
  },
  {
    id: "WCL",
    name: "Western Coalfields Limited",
    shortName: "WCL",
    state: "Maharashtra & MP",
    mines: ["Chandrapur Deep", "Nagpur Area", "Pench Underground", "Umrer Opencast"]
  },
  {
    id: "MCL",
    name: "Mahanadi Coalfields Limited",
    shortName: "MCL",
    state: "Odisha",
    mines: ["Talcher Coalfields", "Ib Valley Opencast", "Bhanj Pali Project", "Lakhanpur Mine"]
  },
  {
    id: "CMPDI",
    name: "Central Mine Planning & Design Institute Limited",
    shortName: "CMPDI",
    state: "Ranchi (Apex R&D)",
    mines: ["Ranchi Exploration HQ", "RI-I Asansol", "RI-II Dhanbad", "RI-V Bilaspur"]
  },
  {
    id: "NEC",
    name: "North Eastern Coalfields",
    shortName: "NEC",
    state: "Assam & Meghalaya",
    mines: ["Margherita Opencast", "Tikak Mine", "Ledokollia Pit"]
  }
];

export const ALL_ORGANIZATIONS = [PRIMARY_ORGANIZATION, ...SUBSIDIARIES];
