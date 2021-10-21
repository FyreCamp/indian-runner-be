import Global from "../models/global.model";

export const MEMBERSHIP_TIER = [
  { id: 10, name: "Yellow" },
  { id: 9, name: "Orange" },
  { id: 8, name: "Green" },
  { id: 7, name: "Red" },
  { id: 6, name: "Blue" },
  { id: 5, name: "Purple" },
  { id: 4, name: "Black" },
  { id: 3, name: "Silver" },
  { id: 2, name: "Gold" },
  { id: 1, name: "Platinum" },
];

export const CLUB = [
  { id: 1, name: "Red" },
  { id: 2, name: "Blue" },
  { id: 3, name: "Yellow" },
  { id: 4, name: "Green" },
];

export async function getFPNo() {
  let fpNo = await Global.findOne({ key: "FP_TRACK" });
  if (!fpNo) {
    fpNo = new Global({
      key: "FP_TRACK",
      name: "Last FP Number",
      value: "000000",
    });
    fpNo.save();
  }
  const newFpNo = new Date().getFullYear() + fpNo.value;

  Global.findOneAndUpdate(
    { key: "FP_TRACK" },
    { $set: { value: `${Number(newFpNo) + 1}`.substring(4) } },
    { new: true }
  ).exec();
  return newFpNo;
}
