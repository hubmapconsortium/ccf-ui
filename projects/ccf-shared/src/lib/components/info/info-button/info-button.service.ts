import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const documentationURL = 'assets/docs/README.md';

/**
 * The structure to define how each documentation panel
 * should look like in the info dialog
 */

export interface DocumentationContent {
  /** Title of the panel */
  title: string;

  /** Content inside the panel */
  content: string;
}


@Injectable({
  providedIn: 'root'
})
export class InfoButtonService {

  /** Subject to send the documentation data to the component when its done processing */
  markdownContent: BehaviorSubject<DocumentationContent[]> = new BehaviorSubject<DocumentationContent[]>([]);

  constructor(private readonly http: HttpClient) { }

  /**
   * Read the markdown file to split it by h1 tags.
   */
  readMarkdown(): void {
    this.http.get(documentationURL, {responseType: 'text'}).subscribe((data: string) => {
      const markdownContent: DocumentationContent[] = this.parseMarkdown(data);
      this.markdownContent.next(markdownContent);
    });
  }

  /**
   * Function to parse the markdown file and convert to
   * documentation content used by the info-dialog panels
   *
   * @param data Markdown file sent as a string after reading it
   * @returns array of DocumentationContent
   */
  parseMarkdown(data: string): DocumentationContent[] {
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
    return markdownContent;
  }
}
