import { MatDialogRef } from '@angular/material/dialog';
import { OrganInfo } from 'ccf-shared';
import { Shallow } from 'shallow-render';
import { SpatialSearchConfigBehaviorComponent } from './spatial-search-config-behavior.component';
import { SpatialSearchConfigBehaviorModule } from './spatial-search-config-behavior.module';

function wait(duration: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, duration);
  });
}

describe('SpatialSearchConfigBehaviorComponent', () => {
  const testOrgan: OrganInfo = {
    src: 'app:brain',
    organ: 'Brain',
    name: 'Brain',
    hasSex: true,
    id: 'http://purl.obolibrary.org/obo/UBERON_0000955'
  };
  const testOrganF: OrganInfo = {
    src: 'app:fallopian-tube-left',
    organ: 'Fallopian Tube',
    name: 'Fallopian Tube, L',
    side: 'left',
    hasSex: false,
    sex: 'female',
    id: 'http://purl.obolibrary.org/obo/UBERON_0001303'
  };
  const testOrganM: OrganInfo = {
    src: 'app:prostate',
    organ: 'Prostate',
    name: 'Prostate',
    hasSex: false,
    sex: 'male',
    id: 'http://purl.obolibrary.org/obo/UBERON_0002367',
    disabled: true
  };

  let shallow: Shallow<SpatialSearchConfigBehaviorComponent>;

  beforeEach(() => {
    shallow = new Shallow(SpatialSearchConfigBehaviorComponent, SpatialSearchConfigBehaviorModule)
      .mock(MatDialogRef, { close(): void { /* Empty */ } });
  });

  it('should update selectedOrgan and emit organChange when the organ is updated', async () => {
    const { instance, outputs } = await shallow.render({ bind: { organs: [testOrgan, testOrganM, testOrganF], selectedOrgan: testOrgan } });
    instance.updateOrgan(testOrganF);
    expect(outputs.organChange.emit).toHaveBeenCalledWith(testOrganF);
  });

  it('should emit itemSelected when the continue button is clicked', async () => {
    const { instance, outputs } = await shallow.render({ bind: { organs: [testOrgan, testOrganM, testOrganF], selectedOrgan: testOrgan } });
    instance.buttonClicked();
    expect(outputs.itemSelected.emit).toHaveBeenCalled();
  });

  it('should close the dialog when the close() method is called', async () => {
    const { instance, get } = await shallow.render();
    const ref = get(MatDialogRef);
    instance.close();
    await wait(250);
    expect(ref.close).toHaveBeenCalled();
  });

  it('should filter organs by sex', async () => {
    const { instance } = await shallow.render({ bind: { organs: [testOrgan, testOrganM, testOrganF] } });
    instance.sex = 'female';
    instance.filterOrgans();
    expect(instance.filteredOrgans).toEqual([testOrgan, testOrganF]);
  });
});
