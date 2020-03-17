import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-log-view',
  templateUrl: './log-view.component.html',
  styleUrls: ['./log-view.component.scss']
})
export class LogViewComponent implements OnInit {

  public logId: string;
  public name: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.logId = this.route.snapshot.params.id;
    if (this.route.snapshot.queryParamMap.has('name')) {
      this.name = this.route.snapshot.queryParams.name;
    } else {
      this.name = 'Anonymous';
    }
  }
}
