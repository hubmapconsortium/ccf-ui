import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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

export interface PanelData {
  content: DocumentationContent[];
  infoTitle: string;
  videoID: string;
}

@Injectable({
  providedIn: 'root',
})
export class InfoButtonService {
  /** Subject to send the documentation data to the component when its done processing */
  panelContent: BehaviorSubject<PanelData> = new BehaviorSubject<PanelData>({
    content: [],
    infoTitle: '',
    videoID: '',
  });

  constructor(private readonly http: HttpClient) {}

  /**
   * Read the markdown file to split it by h1 tags and update the panel title and videoID.
   */
  updateData(url: string, videoID: string, infoTitle: string): void {
    this.http.get(url, { responseType: 'text' }).subscribe((data: string) => {
      const panelContent: PanelData = {
        content: this.parseMarkdown(data),
        infoTitle: infoTitle,
        videoID: videoID,
      };
      this.panelContent.next(panelContent);
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
        const newLine = split.includes('\n\n') ? '\n\n' : '\r\n\r\n';
        const headerAndContent: string[] = split.split(newLine);
        markdownContent.push({
          title: headerAndContent[0],
          content: headerAndContent.splice(1).join(newLine),
        });
      }
    }
    return markdownContent;
  }
}
