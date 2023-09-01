import dayjs from 'dayjs';

export class searchJobPostingDTO {
  readonly url: string;
}

export class applicationDataDTO {
  link: string;
  title: string;
  platform: string;
  files: string;
  status: HistoryStatus[];
}

class HistoryStatus {
  date: string;
  status: string;
}
