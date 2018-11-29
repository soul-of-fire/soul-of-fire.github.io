export class Modify {
  data: any;
  constructor(data: any, private redirect?: any) {
    this.data = JSON.stringify({ "data": data });
  }
}