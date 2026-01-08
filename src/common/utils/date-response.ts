export class DateResponse {
  timestamp: number;
  stringDate: string;
  date: string;

  constructor(value: Date) {
    const date = new Date(value);

    this.timestamp = Math.floor(date.getTime() / 1000);
    this.stringDate = date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
    this.date = `${date.getFullYear()}/${this.toTen(date.getMonth() + 1)}/${this.toTen(date.getDate())}`;
  }
  toTen = (number: number) => (number < 10 ? `0${number}` : number);

  // optional: static helper
  static from(value: Date) {
    return new DateResponse(value);
  }
}
