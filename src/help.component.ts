import { Component, OnInit, Input, ViewChild, HostListener } from '@angular/core';
import { HelpService } from './help.service';
import { Helper, Link } from 'edc-web-publishing-js';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'edc-help',
  templateUrl: './help.component.html',
  styleUrls: ['help.less']
})
export class HelpComponent implements OnInit {

  helper: Helper;
  @ViewChild('popover') popover: NgbPopover; // get the popover element by its name declared in the component template

  @Input() key: string;
  @Input() subKey: string;
  @Input() placement: string;
  @Input() dark: boolean;

  // for closing popover when focus los
  @HostListener('document:click')
  onDocumentClick() {
    this.popover.close();
  }

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
