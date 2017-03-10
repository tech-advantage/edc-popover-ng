import { Component, OnInit, Input } from '@angular/core';
import { HelpService } from './help.service';
import { Helper, Link } from 'edc-web-publishing-js';

@Component({
  selector: 'edc-help',
  templateUrl: './help.component.html',
  styleUrls: ['help.less']
})

export class HelpComponent implements OnInit {

  helper: Helper;

  @Input() key: string;
  @Input() subKey: string;
  @Input() placement: string;

  constructor(
    private helpService: HelpService
  ) {}

  ngOnInit(): void {
    if (this.key, this.subKey) {
      this.helpService.getHelp(this.key, this.subKey).then((helper: Helper) => this.helper = helper);
    }
  }

  goToArticle(index: number) {
    const url = `/help/context/${this.key}/${this.subKey}/en/${index}`;
    this.open(url);
  }

  goToLink(link: Link) {
    const url = `/help/doc/${link.id}`;
    this.open(url);
  }

  private open(url: string) {
    window.open(url, 'help', 'height=800,width=1200');
  }
}
