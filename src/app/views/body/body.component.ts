import { Component, OnDestroy, OnInit } from '@angular/core';
import { capitalize } from 'lodash';
import { Observable, Subscription } from 'rxjs';

import { BodyDataService } from '../../shared/services/body-data/body-data.service';
import { NavigationService } from '../../shared/services/navigation/navigation.service';

@Component({
  selector: 'ccf-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})

export class BodyComponent implements OnInit, OnDestroy {
  /**
   * Observable for path of body images, like male, female etc.
   */
  bodyImagePath$: Observable<string>;

  /**
   * Keeps the name of the organ that is hovered over by the user on the body.
   */
  hoverOrganName: string;

  /**
   * Metadata for the organ overlay on the body.
   */
  metadata: { [label: string]: string };

  /**
   * Obervable for the overlays of body.
   */
  bodyOverlays$: Observable<{id: string, path: string}[]>;

  /**
   * Metadata subscription which gets the data for particular organ overlay over body.
   */
  metadataSubscription: Subscription;

  /**
   * Creates an instance of body component.
   * @param bodyService Service to interact with the localdatabase for body component
   * @param navigator Navigation service
   */
  constructor(private readonly bodyService: BodyDataService, readonly navigator: NavigationService) {
  }

  /**
   * Initialization function called when component is initilized.
   */
  ngOnInit(): void {
    this.bodyImagePath$ = this.bodyService.getBodySourcePath();
    this.bodyOverlays$ = this.bodyService.getBodyOverlays();
  }

  /**
   * Angular's lifecycle hook, Unsubscribing all observable subscriptiotns.
   */
  ngOnDestroy(): void {
    this.metadataSubscription.unsubscribe();
  }

  /**
   * Event called when user hovers over the organs on the body {mouseenter}.
   * @param organ Name of the organ that is hovered over.
   */
  organHover(organ: string): void {
    this.hoverOrganName = organ;
    this.metadataSubscription =  this.bodyService.getMetadata(organ).subscribe((metadata: { [label: string]: string }) => {
      this.metadata = metadata;
    });
  }

  /**
   * Event called when user's mouse moves out of the organ after {mouseleave}.
   */
  clearOrganHover(): void {
    this.metadata = undefined;
    this.hoverOrganName = undefined;
    this.metadataSubscription.unsubscribe();
  }

  /**
   * Capitalizes the value passed.
   * @param value The string that need to be capitalizze.
   * @returns capitalized string.
   */
  capitalize(value: string): string {
    return capitalize(value);
  }
}
