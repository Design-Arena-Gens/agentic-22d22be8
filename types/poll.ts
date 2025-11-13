export type PollOption = {
  id: string;
  label: string;
  votes: number;
};

export type Poll = {
  id: string;
  question: string;
  description?: string;
  options: PollOption[];
  createdAt: string;
  updatedAt: string;
  allowMultiple: boolean;
};

export type VotePayload = {
  pollId: string;
  optionIds: string[];
};
