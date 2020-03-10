import { Component } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { scan, startWith, tap } from 'rxjs/operators';
import { ReactiveComponent } from './reactive/reactive.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends ReactiveComponent {
  title = 'Change Detection without zone.js';
  numbersList: number[] = [1, 2, 3];

  values$ = new Subject<number>();
  vals$: BehaviorSubject<Array<number>> = new BehaviorSubject<Array<number>>([...this.numbersList]);
  state = this.connect({
    count: this.values$.pipe(
      startWith(0),
      scan((count, next) => count + next, 5)
    )
  });

  newState = this.connect({
    numbers: this.vals$.pipe(
      tap(num => num)
    ),
  });

  get arrayValue() {
    return this.vals$.value;
  }

  pushValue() {
    const randomNumber = Math.floor(Math.random() * Math.floor(10));
    this.vals$.next([...this.arrayValue, randomNumber]);
  }
}
