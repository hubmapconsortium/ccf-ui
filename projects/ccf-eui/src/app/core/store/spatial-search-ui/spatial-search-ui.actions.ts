export class SetSex {
  static readonly type = '[SpatialSearchUi] Set sex';

  constructor(readonly sex: 'male' | 'female') {}
}

export class SetOrgan {
  static readonly type = '[SpatialSearchUi] Set organ';

  constructor(readonly organId: string | undefined) {}
}
