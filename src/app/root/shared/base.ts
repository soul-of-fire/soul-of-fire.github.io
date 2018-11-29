import { Subject, Observable } from "rxjs";

export class Base {
  private destroySubject: Subject<boolean> = new Subject<boolean>();
  public destroy$: Observable<boolean> = this.destroySubject.asObservable();

  ngOnDestroy() {
    this.destroySubject.next(true);
    this.destroySubject.unsubscribe();
  }
}