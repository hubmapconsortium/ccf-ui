import { ChangeDetectionStrategy, Component, Input } from '@angular/core';


@Component({
  selector: 'ccf-data-carousel',
  templateUrl: './thumbnail-carousel.component.html',
  styleUrls: ['./thumbnail-carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThumbnailCarouselComponent {
  @Input() data: { thumbnail: string; label: string }[];
}
