export interface Trip {
  id: String;
  name: String;
  initDate: string;
  endDate: string;
  plannerId: String;
  tripOnUser: object[];
  description: String;
  image?: String;
  price: Number;
}
