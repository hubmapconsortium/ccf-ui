export class SetSex {
  static readonly type = '[SpatialSearchUi] Set sex';

  constructor(readonly sex: 'male' | 'female') {}
}

export class SetOrgan {
  static readonly type = '[SpatialSearchUi] Set organ';

  constructor(readonly organId: string | undefined) {}
}

export class SetPosition {
  static readonly type = '[SpatialSearchUi] Set position';

  constructor(readonly position: { x: number; y: number; z: number }) {}
}

export class SetRadius {
  static readonly type = '[SpatialSearchUi] Set radius';

  constructor(readonly radius: number) {}
}

export class UpdateSpatialSearch {
  static readonly type = '[SpatialSearchUi] Update spatial search data';
}
