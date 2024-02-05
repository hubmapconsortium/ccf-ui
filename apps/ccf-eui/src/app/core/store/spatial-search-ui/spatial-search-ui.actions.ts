import { SpatialSceneNode } from 'ccf-body-ui';

export class StartSpatialSearchFlow {
  static readonly type = '[SpatialSearchUi] Start the Spatial Search flow';
}

export class SetSex {
  static readonly type = '[SpatialSearchUi] Set sex';

  constructor(readonly sex: 'male' | 'female') { }
}

export class SetOrgan {
  static readonly type = '[SpatialSearchUi] Set organ';

  constructor(readonly organId: string | undefined) { }
}

export class SetPosition {
  static readonly type = '[SpatialSearchUi] Set position';

  constructor(readonly position: { x: number; y: number; z: number }) { }
}

export class MoveToNode {
  static readonly type = '[SpatialSearchUi] Start moving the position to a scene node';

  constructor(readonly node: SpatialSceneNode) { }
}

export class ResetPosition {
  static readonly type = '[SpatialSearchUi] Reset position';
}

export class SetRadius {
  static readonly type = '[SpatialSearchUi] Set radius';

  constructor(readonly radius: number) { }
}

export class ResetRadius {
  static readonly type = '[SpatialSearchUi] Reset radius';
}

export class UpdateSpatialSearch {
  static readonly type = '[SpatialSearchUi] Update spatial search data';
}

export class GenerateSpatialSearch {
  static readonly type = '[SpatialSearchUi] Generate and add a spatial search';
}

export class SetExecuteSearchOnGenerate {
  static readonly type = '[SpatialSearchUi] Set execute search on generate';

  constructor(readonly execute = true) { }
}
