import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

interface LinkCard {
  body: string;
  buttonTitle: string;
  buttonUrl: string;
}

@Component({
  selector: 'ccf-link-cards',
  templateUrl: './link-cards.component.html',
  styleUrls: ['./link-cards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinkCardsComponent implements OnInit {
  @Input() ruiUrl: string;
  @Input() euiUrl: string;
  @Input() asctbUrl: string;
  @Input() hraPortalUrl: string;
  @Input() onlineCourseUrl: string;
  @Input() paperUrl: string;

  linkCards: LinkCard[] = [
    {
      body: 'Add tissue blocks using the HRA Registration User Interface (RUI).',
      buttonTitle: 'Register Tissue',
      buttonUrl: 'https://hubmapconsortium.github.io/ccf-ui/rui/'
    },
    {
      body: 'Explore tissue sections in tissue blocks with the HRA Exploration User Interface (EUI).',
      buttonTitle: 'Explore Tissue',
      buttonUrl: 'https://portal.hubmapconsortium.org/ccf-eui'
    },
    {
      body: 'View linkages between anatomical structures, cell types, and common biomarkers (ASCT+B).',
      buttonTitle: 'ASCT+B Reporter',
      buttonUrl: 'https://hubmapconsortium.github.io/ccf-asct-reporter/'
    }
  ];

  deepDives: LinkCard[] = [
    {
      body: '',
      buttonTitle: 'HRA Portal',
      buttonUrl: 'https://humanatlas.io'
    },
    {
      body: '',
      buttonTitle: 'Online Course',
      buttonUrl: 'https://expand.iu.edu/browse/sice/cns/courses/hubmap-visible-human-mooc'
    },
    {
      body: '',
      buttonTitle: 'Paper',
      buttonUrl: 'https://www.nature.com/articles/s41556-021-00788-6'
    }
  ];

  ngOnInit() {
    const linkUrls = [this.ruiUrl, this.euiUrl, this.asctbUrl];
    const deepDivesUrls = [this.hraPortalUrl, this.onlineCourseUrl, this.paperUrl];
    this.linkCards = this.linkCards.map((card, index) => ({ ...card, buttonUrl: linkUrls[index] ?? card.buttonUrl }));
    this.deepDives = this.deepDives.map((card, index) => ({ ...card, buttonUrl: deepDivesUrls[index] ?? card.buttonUrl }));
  }

  goToURL(url: string): void {
    window.open(url, '_blank');
  }
}
