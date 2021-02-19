import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DocumentationContent } from '../../../core/models/documentation';
import * as documentation from 'raw-loader!./documentation.md';

@Injectable({
  providedIn: 'root'
})
export class InfoDialogService {

  /** Subject to send the documentation data to the component when its done processing */
  markdownContent: BehaviorSubject<DocumentationContent[]> = new BehaviorSubject<DocumentationContent[]>([]);

  constructor() {
    this.readMarkdown();
  }

  /**
   * Read the markdown file to split it by h1 tags.
   */
  readMarkdown(): void {
    const markdownContent: DocumentationContent[] = [];
    const splitByHeaderTag: string[] = documentation.default.split('# ');
    for (const split of splitByHeaderTag) {
      if (split.length) {
        const headerAndContent: string[] = split.split('\n\n');
        markdownContent.push({
          title: headerAndContent[0],
          content: headerAndContent.splice(1).join('\n\n')
        });
      }
    }

    this.markdownContent.next(markdownContent);
  }
}
