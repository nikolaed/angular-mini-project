import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { switchMap, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoadingHandlerService {
  private loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public loading$: Observable<boolean> = this.loadingSubject.asObservable();

  constructor() { }

  setLoadingWithDelay(delayTime: number): Observable<void> {
    // Show loading indicator
    this.loadingSubject.next(true);

    // Timer to wait for 2 seconds
    return timer(delayTime).pipe(
        switchMap(() => this.loading$), // Switch to the loading observable
        finalize(() => this.loadingSubject.next(false)) // Hide loading indicator on completion
    ) as unknown as Observable<void>; // Cast the Observable<boolean> to Observable<void>
  }

  setLoading(loading: boolean): void {
    this.loadingSubject.next(loading);
  }
}
