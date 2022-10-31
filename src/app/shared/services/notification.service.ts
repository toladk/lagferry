import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  showError(message: string) {
    this.snackBar.open(message, 'Dismiss', {
      duration: 6000,
      panelClass: 'notification-error',
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }
  showWarning(message: string) {
    this.snackBar.open(message, 'Dismiss', {
      duration: 5000,
      panelClass: 'notification-warning',
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }
  showSuccess(message: string) {
    this.snackBar.open(message, 'Dismiss', {
      duration: 4000,
      panelClass: 'notification-success',
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }
}
