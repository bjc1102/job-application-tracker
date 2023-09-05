import dayjs from 'dayjs';

export class searchJobPostingDTO {
  readonly url: string;
}

export class applicationDataDTO {
  link: string;
  title: string;
  platform: string;
  note: string;
  status: HistoryStatus[];
}

class HistoryStatus {
  date: string;
  status: string;
}
