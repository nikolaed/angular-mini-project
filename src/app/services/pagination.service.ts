import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })

export class PaginationService {

    pageSize: number = 5
    private totalItemsSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    totalItems$: Observable<number> = this.totalItemsSubject.asObservable();

    constructor() {}

    setTotalItems(totalItems: number): void {
        this.totalItemsSubject.next(totalItems);
    }
}