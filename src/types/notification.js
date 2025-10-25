export const NotificationType = {
  INFO: 'info',
  WARNING: 'warning',
  SUCCESS: 'success',
  ERROR: 'error',
  ANNOUNCEMENT: 'announcement'
};

export const NotificationStatus = {
  UNREAD: 'unread',
  READ: 'read',
  ARCHIVED: 'archived'
};

export class Notification {
  constructor({
    id,
    title,
    message,
    type = NotificationType.INFO,
    status = NotificationStatus.UNREAD,
    isImportant = false,
    targetUserId,
    relatedId,
    relatedType,
    createdAt,
    readAt,
    expiresAt
  }) {
    this.id = id;
    this.title = title;
    this.message = message;
    this.type = type;
    this.status = status;
    this.isImportant = isImportant;
    this.targetUserId = targetUserId;
    this.relatedId = relatedId;
    this.relatedType = relatedType;
    this.createdAt = createdAt;
    this.readAt = readAt;
    this.expiresAt = expiresAt;
  }

  isExpired() {
    return this.expiresAt && new Date() > new Date(this.expiresAt);
  }

  markAsRead() {
    this.status = NotificationStatus.READ;
    this.readAt = new Date();
  }

  archive() {
    this.status = NotificationStatus.ARCHIVED;
  }
}
