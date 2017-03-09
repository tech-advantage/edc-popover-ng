import { Component, OnInit, Input } from '@angular/core';
import { HelpService } from './help.service';

@Component({
  selector: 'edc-help',
  templateUrl: './help.component.html',
  styleUrls: ['help.less']
})
export class HelpComponent implements OnInit {
  localHelp: any;
  @Input() key: string;
  @Input() subKey: string;
  @Input() placement: string;

  constructor(private helpService: HelpService) {}

  ngOnInit(): void {
    this.localHelp = this.helpService.getHelp();
  }

}
