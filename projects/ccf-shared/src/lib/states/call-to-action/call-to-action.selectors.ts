import { Selector } from '@ngxs/store';

import { CallToActionModel, CallToActionState } from './call-to-action.state';

export class CallToActionSelectors {
  @Selector([CallToActionState])
  static title(state: CallToActionModel): string {
    return state.title;
  }

  @Selector([CallToActionState])
  static message(state: CallToActionModel): string {
    return state.message;
  }

  @Selector([CallToActionState])
  static callToAction(state: CallToActionModel): string {
    return state.callToAction;
  }

  @Selector([CallToActionState])
  static imageUrl(state: CallToActionModel): string {
    return state.imageUrl;
  }

  @Selector([CallToActionState])
  static expirationDate(state: CallToActionModel): string {
    return state.expirationDate;
  }

  @Selector([CallToActionState])
  static popupShown(state: CallToActionModel): boolean {
    return state.popupShown;
  }
}
