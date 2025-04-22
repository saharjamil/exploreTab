export class TicketViewModel {
  ID: number;
  SectionTitle: string;
  StatusTypeTitle: string;
  PriorityTypeTitle: string;
  TicketTypeTitle: string;
  Subject: string;
  TrackingCode: string;
  CreatorFullName: string;
  CreationDateTime: string;
  constructor(
    id?: number,
    sectionTitle?: string,
    statusTypeTitle?: string,
    priorityTypeTitle?: string,
    ticketTypeTitle?: string,
    subject?: string,
    trackingCode?: string,
    creatorFullName?: string,
    creationDateTime?: string,
  ) {
    this.ID = id || 0;
    this.SectionTitle = sectionTitle || '';
    this.StatusTypeTitle = statusTypeTitle || '';
    this.PriorityTypeTitle = priorityTypeTitle || '';
    this.TicketTypeTitle = ticketTypeTitle || '';
    this.Subject = subject || '';
    this.TrackingCode = trackingCode || '';
    this.CreatorFullName = creatorFullName || '';

    this.CreationDateTime = creationDateTime || '';
  }
}
