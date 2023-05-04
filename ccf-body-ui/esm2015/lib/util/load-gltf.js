import { __awaiter } from "tslib";
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { parse, registerLoaders } from '@loaders.gl/core';
import { DracoLoader, DracoWorkerLoader } from '@loaders.gl/draco';
import { GLTFLoader } from '@loaders.gl/gltf';
import { Matrix4 } from '@math.gl/core';
import { traverseScene } from './scene-traversal';
export function registerGLTFLoaders() {
    registerLoaders([DracoWorkerLoader, GLTFLoader]);
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
export function deriveScenegraph(scenegraphNodeName, gltf) {
    var _a;
    const scenegraphNode = (_a = gltf.nodes) === null || _a === void 0 ? void 0 : _a.find((n) => n.name === scenegraphNodeName);
    if (scenegraphNode) {
        let foundNodeInScene = false;
        for (const scene of gltf.scenes) {
            if (!foundNodeInScene) {
                traverseScene(scene, new Matrix4(Matrix4.IDENTITY), (child, modelMatrix) => {
                    if (child === scenegraphNode) {
                        child.matrix = modelMatrix;
                        child.translation = undefined;
                        child.rotation = undefined;
                        child.scale = undefined;
                        foundNodeInScene = true;
                        return false;
                    }
                    return true;
                });
            }
        }
        gltf.scene = {
            id: scenegraphNodeName,
            name: scenegraphNodeName,
            nodes: [scenegraphNode]
        };
        gltf.scenes = [gltf.scene];
        return { scene: gltf.scene, scenes: gltf.scenes };
    }
    else {
        return gltf;
    }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function loadGLTF(model, cache) {
    return __awaiter(this, void 0, void 0, function* () {
        const gltfUrl = model.scenegraph;
        let gltfPromise;
        if (cache) {
            gltfPromise = cache[gltfUrl] || (cache[gltfUrl] = fetch(gltfUrl).then(r => r.blob()));
        }
        else {
            gltfPromise = fetch(gltfUrl);
        }
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const gltf = yield parse(gltfPromise, GLTFLoader, { DracoLoader, gltf: { decompressMeshes: true, postProcess: true } });
        if (!gltf.nodes) {
            console.log('WARNING: Empty Scene', gltfUrl, gltf);
        }
        return deriveScenegraph(model.scenegraphNode, gltf);
    });
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function loadGLTF2(scenegraphNodeName, gltfPromise) {
    return __awaiter(this, void 0, void 0, function* () {
        return deriveScenegraph(scenegraphNodeName, yield gltfPromise);
    });
}
/* eslint-enable */
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZC1nbHRmLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NmLWJvZHktdWkvc3JjL2xpYi91dGlsL2xvYWQtZ2x0Zi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0RBQXNEO0FBQ3RELCtEQUErRDtBQUMvRCxPQUFPLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQzFELE9BQU8sRUFBRSxXQUFXLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDOUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUd4QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFHbEQsTUFBTSxVQUFVLG1CQUFtQjtJQUNqQyxlQUFlLENBQUMsQ0FBQyxpQkFBaUIsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDO0FBQ25ELENBQUM7QUFFRCxpSEFBaUg7QUFDakgsTUFBTSxVQUFVLGdCQUFnQixDQUFDLGtCQUEwQixFQUFFLElBQVM7O0lBQ3BFLE1BQU0sY0FBYyxHQUFHLE1BQUEsSUFBSSxDQUFDLEtBQUssMENBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLGtCQUFrQixDQUFDLENBQUM7SUFDOUUsSUFBSSxjQUFjLEVBQUU7UUFDbEIsSUFBSSxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7UUFDN0IsS0FBSyxNQUFNLEtBQUssSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQy9CLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtnQkFDckIsYUFBYSxDQUFDLEtBQUssRUFBRSxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsV0FBVyxFQUFFLEVBQUU7b0JBQ3pFLElBQUksS0FBSyxLQUFLLGNBQWMsRUFBRTt3QkFDNUIsS0FBSyxDQUFDLE1BQU0sR0FBRyxXQUFXLENBQUM7d0JBQzNCLEtBQUssQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDO3dCQUM5QixLQUFLLENBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQzt3QkFDM0IsS0FBSyxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7d0JBQ3hCLGdCQUFnQixHQUFHLElBQUksQ0FBQzt3QkFDeEIsT0FBTyxLQUFLLENBQUM7cUJBQ2Q7b0JBQ0QsT0FBTyxJQUFJLENBQUM7Z0JBQ2QsQ0FBQyxDQUFDLENBQUM7YUFDSjtTQUNGO1FBQ0QsSUFBSSxDQUFDLEtBQUssR0FBRztZQUNYLEVBQUUsRUFBRSxrQkFBa0I7WUFDdEIsSUFBSSxFQUFFLGtCQUFrQjtZQUN4QixLQUFLLEVBQUUsQ0FBQyxjQUFjLENBQUM7U0FDeEIsQ0FBQztRQUNGLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFM0IsT0FBTyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7S0FDbkQ7U0FBTTtRQUNMLE9BQU8sSUFBSSxDQUFDO0tBQ2I7QUFDSCxDQUFDO0FBRUQsOERBQThEO0FBQzlELE1BQU0sVUFBZ0IsUUFBUSxDQUFDLEtBQXVCLEVBQUUsS0FBd0M7O1FBQzlGLE1BQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxVQUFvQixDQUFDO1FBQzNDLElBQUksV0FBcUMsQ0FBQztRQUMxQyxJQUFJLEtBQUssRUFBRTtZQUNULFdBQVcsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDdkY7YUFBTTtZQUNMLFdBQVcsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDOUI7UUFDRCxnRUFBZ0U7UUFDaEUsTUFBTSxJQUFJLEdBQUcsTUFBTSxLQUFLLENBQUMsV0FBVyxFQUFFLFVBQVUsRUFBRSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztRQUV4SCxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3BEO1FBRUQsT0FBTyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsY0FBd0IsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNoRSxDQUFDO0NBQUE7QUFFRCw4REFBOEQ7QUFDOUQsTUFBTSxVQUFnQixTQUFTLENBQUMsa0JBQTBCLEVBQUUsV0FBeUI7O1FBQ25GLE9BQU8sZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsTUFBTSxXQUFXLENBQUMsQ0FBQztJQUNqRSxDQUFDO0NBQUE7QUFDRCxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW5zYWZlLWNhbGwgKi9cbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnNhZmUtbWVtYmVyLWFjY2VzcyAqL1xuaW1wb3J0IHsgcGFyc2UsIHJlZ2lzdGVyTG9hZGVycyB9IGZyb20gJ0Bsb2FkZXJzLmdsL2NvcmUnO1xuaW1wb3J0IHsgRHJhY29Mb2FkZXIsIERyYWNvV29ya2VyTG9hZGVyIH0gZnJvbSAnQGxvYWRlcnMuZ2wvZHJhY28nO1xuaW1wb3J0IHsgR0xURkxvYWRlciB9IGZyb20gJ0Bsb2FkZXJzLmdsL2dsdGYnO1xuaW1wb3J0IHsgTWF0cml4NCB9IGZyb20gJ0BtYXRoLmdsL2NvcmUnO1xuXG5pbXBvcnQgeyBTcGF0aWFsU2NlbmVOb2RlIH0gZnJvbSAnLi4vc2hhcmVkL3NwYXRpYWwtc2NlbmUtbm9kZSc7XG5pbXBvcnQgeyB0cmF2ZXJzZVNjZW5lIH0gZnJvbSAnLi9zY2VuZS10cmF2ZXJzYWwnO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlckdMVEZMb2FkZXJzKCk6IHZvaWQge1xuICByZWdpc3RlckxvYWRlcnMoW0RyYWNvV29ya2VyTG9hZGVyLCBHTFRGTG9hZGVyXSk7XG59XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55LCBAdHlwZXNjcmlwdC1lc2xpbnQvZXhwbGljaXQtbW9kdWxlLWJvdW5kYXJ5LXR5cGVzXG5leHBvcnQgZnVuY3Rpb24gZGVyaXZlU2NlbmVncmFwaChzY2VuZWdyYXBoTm9kZU5hbWU6IHN0cmluZywgZ2x0ZjogYW55KTogYW55IHtcbiAgY29uc3Qgc2NlbmVncmFwaE5vZGUgPSBnbHRmLm5vZGVzPy5maW5kKChuKSA9PiBuLm5hbWUgPT09IHNjZW5lZ3JhcGhOb2RlTmFtZSk7XG4gIGlmIChzY2VuZWdyYXBoTm9kZSkge1xuICAgIGxldCBmb3VuZE5vZGVJblNjZW5lID0gZmFsc2U7XG4gICAgZm9yIChjb25zdCBzY2VuZSBvZiBnbHRmLnNjZW5lcykge1xuICAgICAgaWYgKCFmb3VuZE5vZGVJblNjZW5lKSB7XG4gICAgICAgIHRyYXZlcnNlU2NlbmUoc2NlbmUsIG5ldyBNYXRyaXg0KE1hdHJpeDQuSURFTlRJVFkpLCAoY2hpbGQsIG1vZGVsTWF0cml4KSA9PiB7XG4gICAgICAgICAgaWYgKGNoaWxkID09PSBzY2VuZWdyYXBoTm9kZSkge1xuICAgICAgICAgICAgY2hpbGQubWF0cml4ID0gbW9kZWxNYXRyaXg7XG4gICAgICAgICAgICBjaGlsZC50cmFuc2xhdGlvbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGNoaWxkLnJvdGF0aW9uID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgY2hpbGQuc2NhbGUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBmb3VuZE5vZGVJblNjZW5lID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgICBnbHRmLnNjZW5lID0ge1xuICAgICAgaWQ6IHNjZW5lZ3JhcGhOb2RlTmFtZSxcbiAgICAgIG5hbWU6IHNjZW5lZ3JhcGhOb2RlTmFtZSxcbiAgICAgIG5vZGVzOiBbc2NlbmVncmFwaE5vZGVdXG4gICAgfTtcbiAgICBnbHRmLnNjZW5lcyA9IFtnbHRmLnNjZW5lXTtcblxuICAgIHJldHVybiB7IHNjZW5lOiBnbHRmLnNjZW5lLCBzY2VuZXM6IGdsdGYuc2NlbmVzIH07XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGdsdGY7XG4gIH1cbn1cblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2FkR0xURihtb2RlbDogU3BhdGlhbFNjZW5lTm9kZSwgY2FjaGU/OiB7IFt1cmw6IHN0cmluZ106IFByb21pc2U8QmxvYj4gfSk6IFByb21pc2U8YW55PiB7XG4gIGNvbnN0IGdsdGZVcmwgPSBtb2RlbC5zY2VuZWdyYXBoIGFzIHN0cmluZztcbiAgbGV0IGdsdGZQcm9taXNlOiBQcm9taXNlPEJsb2IgfCBSZXNwb25zZT47XG4gIGlmIChjYWNoZSkge1xuICAgIGdsdGZQcm9taXNlID0gY2FjaGVbZ2x0ZlVybF0gfHwgKGNhY2hlW2dsdGZVcmxdID0gZmV0Y2goZ2x0ZlVybCkudGhlbihyID0+IHIuYmxvYigpKSk7XG4gIH0gZWxzZSB7XG4gICAgZ2x0ZlByb21pc2UgPSBmZXRjaChnbHRmVXJsKTtcbiAgfVxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uXG4gIGNvbnN0IGdsdGYgPSBhd2FpdCBwYXJzZShnbHRmUHJvbWlzZSwgR0xURkxvYWRlciwgeyBEcmFjb0xvYWRlciwgZ2x0ZjogeyBkZWNvbXByZXNzTWVzaGVzOiB0cnVlLCBwb3N0UHJvY2VzczogdHJ1ZSB9IH0pO1xuXG4gIGlmICghZ2x0Zi5ub2Rlcykge1xuICAgIGNvbnNvbGUubG9nKCdXQVJOSU5HOiBFbXB0eSBTY2VuZScsIGdsdGZVcmwsIGdsdGYpO1xuICB9XG5cbiAgcmV0dXJuIGRlcml2ZVNjZW5lZ3JhcGgobW9kZWwuc2NlbmVncmFwaE5vZGUgYXMgc3RyaW5nLCBnbHRmKTtcbn1cblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2FkR0xURjIoc2NlbmVncmFwaE5vZGVOYW1lOiBzdHJpbmcsIGdsdGZQcm9taXNlOiBQcm9taXNlPGFueT4pOiBQcm9taXNlPGFueT4ge1xuICByZXR1cm4gZGVyaXZlU2NlbmVncmFwaChzY2VuZWdyYXBoTm9kZU5hbWUsIGF3YWl0IGdsdGZQcm9taXNlKTtcbn1cbi8qIGVzbGludC1lbmFibGUgKi9cbiJdfQ==