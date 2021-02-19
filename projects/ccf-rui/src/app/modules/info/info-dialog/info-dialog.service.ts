import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DocumentationContent } from '../../../core/models/documentation';
import { HttpClient } from '@angular/common/http';

const documentationURL = './../../../../assets/documentation.md';

@Injectable({
  providedIn: 'root'
})
export class InfoDialogService {

  /** Subject to send the documentation data to the component when its done processing */
  markdownContent: BehaviorSubject<DocumentationContent[]> = new BehaviorSubject<DocumentationContent[]>([]);

  constructor(private http: HttpClient) {
    this.readMarkdown();
  }

  /**
   * Read the markdown file to split it by h1 tags.
   */
  readMarkdown(): void {
    this.http.get(documentationURL, {responseType: 'text'}).subscribe((data: string) => {
      const markdownContent: DocumentationContent[] = [];
      const splitByHeaderTag: string[] = data.split('# ');
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
    });

  }
}
