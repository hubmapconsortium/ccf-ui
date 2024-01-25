import { ChangeDetectionStrategy, Component } from '@angular/core';

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
export class LinkCardsComponent {
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

  goToURL(url: string): void {
    window.open(url, '_blank');
  }
}
