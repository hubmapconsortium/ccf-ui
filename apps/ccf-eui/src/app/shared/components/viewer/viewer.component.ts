import {
  ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, OnChanges, Output, SimpleChanges,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


/**
 * Viewer for tissue samples
 */
@Component({
  selector: 'ccf-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewerComponent implements OnChanges {
  @HostBinding('class') className = 'ccf-viewer';

  @Input() url = '';

  @Output() readonly closed = new EventEmitter<void>();

  loading = true;

  /**
   * Sanitized url
   * NOTE: Never use a getter for this property! It will cause the iframe to reload constantly.
   */
  safeUrl: SafeResourceUrl | null = null;

  constructor(private readonly sanitizer: DomSanitizer) { }

  ngOnChanges(changes: SimpleChanges): void {
    if ('url' in changes) {
      this.updateUrl();
    }
  }

  private updateUrl(): void {
    const { sanitizer, url } = this;
    this.safeUrl = null;
    if (url) {
      this.safeUrl = sanitizer.bypassSecurityTrustResourceUrl(url);
      this.loading = true;
    }
  }
}
