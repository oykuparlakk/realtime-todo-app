import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Test, TestService } from './services/test.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';

  valuFromBackend$ : Observable<Test> = this.testService.getUserById(6);

  constructor(private testService: TestService){}
}
