import dayjs from 'dayjs';

export class searchJobPostingDTO {
  readonly url: string;
}

export class applicationDataDTO {
  link: string;
  title: string;
  platform: string;
  fileInfo: string;
  status: HistoryStatus[];
}

class HistoryStatus {
  date: dayjs.Dayjs;
  status: string;
}
