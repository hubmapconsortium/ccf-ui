import { readQuads, DataFactory } from 'triple-store-utils';
import { getAnatomicalStructureTreeModel } from '../queries/ontology-tree-n3';
import { ccf, entity } from './prefixes';
/**
 * Function to add additional ccf_annotations to rui locations based on the
 * reference organ it was placed relative to.
 *
 * @param store the triple store holding the CCF.OWL data
 */
export function enrichRuiLocations(store) {
    var _a, _b, _c;
    const tree = getAnatomicalStructureTreeModel(store);
    const refOrganMap = new Map();
    // Build a map from reference organ to ccf annotations via representation_of and the AS partonomy
    for (const { subject: organ, object: term } of readQuads(store, null, ccf.spatialEntity.representation_of, null, null)) {
        const annotations = new Set([term.id]);
        let parent = (_a = tree.nodes[term.id]) === null || _a === void 0 ? void 0 : _a.parent;
        while (parent) {
            if (annotations.has(parent)) {
                break;
            }
            else {
                annotations.add(parent);
                parent = (_b = tree.nodes[parent]) === null || _b === void 0 ? void 0 : _b.parent;
            }
        }
        refOrganMap.set(organ.id, [...annotations].map(s => DataFactory.namedNode(s)));
    }
    // Add AS terms for rui locations based on the reference organs they are placed relative to
    for (const { object: ruiLocation } of readQuads(store, null, entity.spatialEntity, null, null)) {
        for (const { subject: placement } of readQuads(store, null, ccf.spatialPlacement.source, ruiLocation, null)) {
            for (const { object: organ } of readQuads(store, placement, ccf.spatialPlacement.target, null, null)) {
                for (const term of (_c = refOrganMap.get(organ.id)) !== null && _c !== void 0 ? _c : []) {
                    store.addQuad(DataFactory.namedNode(ruiLocation.id), ccf.spatialEntity.ccf_annotations, term);
                }
            }
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5yaWNoLXJ1aS1sb2NhdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2YtZGF0YWJhc2Uvc3JjL2xpYi91dGlsL2VucmljaC1ydWktbG9jYXRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBUyxTQUFTLEVBQUUsV0FBVyxFQUFhLE1BQU0sb0JBQW9CLENBQUM7QUFDOUUsT0FBTyxFQUFFLCtCQUErQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDOUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFHekM7Ozs7O0dBS0c7QUFDSCxNQUFNLFVBQVUsa0JBQWtCLENBQUMsS0FBWTs7SUFDN0MsTUFBTSxJQUFJLEdBQUcsK0JBQStCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDcEQsTUFBTSxXQUFXLEdBQTZCLElBQUksR0FBRyxFQUFFLENBQUM7SUFFeEQsaUdBQWlHO0lBQ2pHLEtBQUssTUFBTSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLFNBQVMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxhQUFhLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1FBQ3RILE1BQU0sV0FBVyxHQUFHLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdkMsSUFBSSxNQUFNLEdBQUcsTUFBQSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsMENBQUUsTUFBTSxDQUFDO1FBQ3pDLE9BQU8sTUFBTSxFQUFFO1lBQ2IsSUFBSSxXQUFXLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUMzQixNQUFNO2FBQ1A7aUJBQU07Z0JBQ0wsV0FBVyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDeEIsTUFBTSxHQUFHLE1BQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsMENBQUUsTUFBTSxDQUFDO2FBQ3JDO1NBQ0Y7UUFDRCxXQUFXLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBRSxHQUFHLFdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ2pGO0lBRUQsMkZBQTJGO0lBQzNGLEtBQUssTUFBTSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsSUFBSSxTQUFTLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsYUFBYSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtRQUM5RixLQUFLLE1BQU0sRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLElBQUksU0FBUyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDM0csS0FBSyxNQUFNLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLFNBQVMsQ0FBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO2dCQUNwRyxLQUFLLE1BQU0sSUFBSSxJQUFJLE1BQUEsV0FBVyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLG1DQUFJLEVBQUUsRUFBRTtvQkFDbEQsS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsYUFBYSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsQ0FBQztpQkFDL0Y7YUFDRjtTQUNGO0tBQ0Y7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3RvcmUsIHJlYWRRdWFkcywgRGF0YUZhY3RvcnksIE5hbWVkTm9kZSB9IGZyb20gJ3RyaXBsZS1zdG9yZS11dGlscyc7XG5pbXBvcnQgeyBnZXRBbmF0b21pY2FsU3RydWN0dXJlVHJlZU1vZGVsIH0gZnJvbSAnLi4vcXVlcmllcy9vbnRvbG9neS10cmVlLW4zJztcbmltcG9ydCB7IGNjZiwgZW50aXR5IH0gZnJvbSAnLi9wcmVmaXhlcyc7XG5cblxuLyoqXG4gKiBGdW5jdGlvbiB0byBhZGQgYWRkaXRpb25hbCBjY2ZfYW5ub3RhdGlvbnMgdG8gcnVpIGxvY2F0aW9ucyBiYXNlZCBvbiB0aGVcbiAqIHJlZmVyZW5jZSBvcmdhbiBpdCB3YXMgcGxhY2VkIHJlbGF0aXZlIHRvLlxuICpcbiAqIEBwYXJhbSBzdG9yZSB0aGUgdHJpcGxlIHN0b3JlIGhvbGRpbmcgdGhlIENDRi5PV0wgZGF0YVxuICovXG5leHBvcnQgZnVuY3Rpb24gZW5yaWNoUnVpTG9jYXRpb25zKHN0b3JlOiBTdG9yZSk6IHZvaWQge1xuICBjb25zdCB0cmVlID0gZ2V0QW5hdG9taWNhbFN0cnVjdHVyZVRyZWVNb2RlbChzdG9yZSk7XG4gIGNvbnN0IHJlZk9yZ2FuTWFwOiBNYXA8c3RyaW5nLCBOYW1lZE5vZGVbXT4gPSBuZXcgTWFwKCk7XG5cbiAgLy8gQnVpbGQgYSBtYXAgZnJvbSByZWZlcmVuY2Ugb3JnYW4gdG8gY2NmIGFubm90YXRpb25zIHZpYSByZXByZXNlbnRhdGlvbl9vZiBhbmQgdGhlIEFTIHBhcnRvbm9teVxuICBmb3IgKGNvbnN0IHsgc3ViamVjdDogb3JnYW4sIG9iamVjdDogdGVybSB9IG9mIHJlYWRRdWFkcyhzdG9yZSwgbnVsbCwgY2NmLnNwYXRpYWxFbnRpdHkucmVwcmVzZW50YXRpb25fb2YsIG51bGwsIG51bGwpKSB7XG4gICAgY29uc3QgYW5ub3RhdGlvbnMgPSBuZXcgU2V0KFt0ZXJtLmlkXSk7XG4gICAgbGV0IHBhcmVudCA9IHRyZWUubm9kZXNbdGVybS5pZF0/LnBhcmVudDtcbiAgICB3aGlsZSAocGFyZW50KSB7XG4gICAgICBpZiAoYW5ub3RhdGlvbnMuaGFzKHBhcmVudCkpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhbm5vdGF0aW9ucy5hZGQocGFyZW50KTtcbiAgICAgICAgcGFyZW50ID0gdHJlZS5ub2Rlc1twYXJlbnRdPy5wYXJlbnQ7XG4gICAgICB9XG4gICAgfVxuICAgIHJlZk9yZ2FuTWFwLnNldChvcmdhbi5pZCwgWyAuLi5hbm5vdGF0aW9uc10ubWFwKHMgPT4gRGF0YUZhY3RvcnkubmFtZWROb2RlKHMpKSk7XG4gIH1cblxuICAvLyBBZGQgQVMgdGVybXMgZm9yIHJ1aSBsb2NhdGlvbnMgYmFzZWQgb24gdGhlIHJlZmVyZW5jZSBvcmdhbnMgdGhleSBhcmUgcGxhY2VkIHJlbGF0aXZlIHRvXG4gIGZvciAoY29uc3QgeyBvYmplY3Q6IHJ1aUxvY2F0aW9uIH0gb2YgcmVhZFF1YWRzKHN0b3JlLCBudWxsLCBlbnRpdHkuc3BhdGlhbEVudGl0eSwgbnVsbCwgbnVsbCkpIHtcbiAgICBmb3IgKGNvbnN0IHsgc3ViamVjdDogcGxhY2VtZW50IH0gb2YgcmVhZFF1YWRzKHN0b3JlLCBudWxsLCBjY2Yuc3BhdGlhbFBsYWNlbWVudC5zb3VyY2UsIHJ1aUxvY2F0aW9uLCBudWxsKSkge1xuICAgICAgZm9yIChjb25zdCB7IG9iamVjdDogb3JnYW4gfSBvZiByZWFkUXVhZHMoc3RvcmUsIHBsYWNlbWVudCwgY2NmLnNwYXRpYWxQbGFjZW1lbnQudGFyZ2V0LCBudWxsLCBudWxsKSkge1xuICAgICAgICBmb3IgKGNvbnN0IHRlcm0gb2YgcmVmT3JnYW5NYXAuZ2V0KG9yZ2FuLmlkKSA/PyBbXSkge1xuICAgICAgICAgIHN0b3JlLmFkZFF1YWQoRGF0YUZhY3RvcnkubmFtZWROb2RlKHJ1aUxvY2F0aW9uLmlkKSwgY2NmLnNwYXRpYWxFbnRpdHkuY2NmX2Fubm90YXRpb25zLCB0ZXJtKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19