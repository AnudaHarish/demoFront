import { LeaveItem } from "./leave-item.model";

export class UpdateRequest {

  id: number;
  index: number;
  updateDetails: LeaveItem;
}
