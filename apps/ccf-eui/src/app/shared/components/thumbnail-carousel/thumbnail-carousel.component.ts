import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { AppOptions } from 'ccf-api';
import { DatasetResult } from 'ccf-database';
import { GlobalConfigState } from 'ccf-shared';
import { SwiperOptions } from 'swiper';
import { NavigationOptions } from 'swiper/types';

// Returns a unique identifier
const nextUid = (() => {
  let counter = -1;
  return () => {
    counter += 1;
    return counter;
  };
})();


/**
 * Carousel containing sample thumbnails in expanded donor cards
 */
@Component({
  selector: 'ccf-thumbnail-carousel',
  templateUrl: './thumbnail-carousel.component.html',
  styleUrls: ['./thumbnail-carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThumbnailCarouselComponent {
  /**
   * Primary css class selector
   */
  @HostBinding('class') readonly className = 'ccf-thumbnail-carousel';

  /**
   * Items to show in the carousel
   */
  @Input() data: DatasetResult[];

  /**
   * Outputs the result whose link was clicked
   */
  @Output() readonly linkClicked = new EventEmitter<DatasetResult>();

  /**
   * Per instance unique identifier
   */
  readonly uid = nextUid();

  /**
   * HTML id for previous slide button
   */
  get prevButtonId(): string {
    return `ccf-thumbnail-carousel-prev-button-${this.uid}`;
  }

  /**
   * HTML id for next slide button
   */
  get nextButtonId(): string {
    return `ccf-thumbnail-carousel-next-button-${this.uid}`;
  }

  /**
   * Swiper configuration
   */
  readonly config: SwiperOptions = {
    allowTouchMove: false,
    slidesOffsetBefore: 4,
    slidesOffsetAfter: 4,
    slidesPerView: 'auto',
    spaceBetween: 4,
    watchOverflow: true
  };

  /**
   * Navigation configuration
   */
  readonly navigation: NavigationOptions = {
    // Normally I would have prefered referencing the elements themselves instead of using selectors
    // However in this case it does not work with angular swiper
    prevEl: '#' + this.prevButtonId,
    nextEl: '#' + this.nextButtonId
  };

  readonly baseHref$ = this.globalConfig.getOption('baseHref');

  baseHref = '';

  constructor(private readonly globalConfig: GlobalConfigState<AppOptions>) {
    this.baseHref$.subscribe((ref: string) => this.setUrl(ref));
  }

  /**
   * Extract a unique identifier for an item
   *
   * @param _index Unused
   * @param item The item
   * @returns An unique identifier
   */
  itemId(_index: number, item: DatasetResult): string {
    return item.thumbnail;
  }

  setUrl(url: string) {
    this.baseHref = url;
  }

  thumbnailUrl(item: DatasetResult): string {
    return `url(${this.baseHref + item.thumbnail})`;
  }
}
