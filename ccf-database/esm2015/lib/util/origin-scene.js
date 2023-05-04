import { Matrix4, toRadians } from '@math.gl/core';
const gray = [204, 204, 204, 255];
const red = [213, 0, 0, 255];
const green = [29, 204, 101, 255];
const blue = [41, 121, 255, 255];
/**
 * Create a set of scene nodes for the body-ui to show the origin and lines extending to it's dimensions.
 * @param node the Spatial Entity (usually a reference organ) that the origin is defined by
 * @param includeLetters whether to show the keyboard letters associated with the origin points
 * @returns a set of scene nodes for the body-ui
 */
export function getOriginScene(node, includeLetters = false) {
    const sceneWidth = node.x_dimension / 1000;
    const sceneHeight = node.y_dimension / 1000;
    const sceneDepth = node.z_dimension / 1000;
    const originRadius = Math.max(sceneWidth, sceneHeight, sceneDepth) * 0.05;
    const lineRadius = originRadius * 0.1;
    return [
        // Origin Sphere
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#OriginSphere',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'sphere',
            transformMatrix: new Matrix4(Matrix4.IDENTITY).scale(originRadius),
            color: gray
        },
        // Origin X Axis
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#OriginX',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'cylinder',
            transformMatrix: new Matrix4(Matrix4.IDENTITY)
                .translate([sceneWidth / 2, 0, 0])
                .rotateZ(toRadians(-90))
                .scale([lineRadius, sceneWidth, lineRadius]),
            color: red
        },
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#OriginXCone',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'cone',
            transformMatrix: new Matrix4(Matrix4.IDENTITY)
                .translate([sceneWidth, 0, 0])
                .rotateZ(toRadians(-90))
                .scale([originRadius, originRadius * 3, originRadius]),
            color: red
        },
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#OriginXALabel',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'text',
            text: 'A',
            transformMatrix: new Matrix4(Matrix4.IDENTITY).translate([-originRadius * 2, 0, 0]).scale(originRadius),
            color: red
        },
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#OriginXDLabel',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'text',
            text: 'D',
            transformMatrix: new Matrix4(Matrix4.IDENTITY).translate([sceneWidth + originRadius * 2, 0, 0]).scale(originRadius),
            color: red
        },
        // Origin Y Axis
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#OriginY',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'cylinder',
            transformMatrix: new Matrix4(Matrix4.IDENTITY)
                .translate([0, sceneHeight / 2, 0])
                .scale([lineRadius, sceneHeight, lineRadius]),
            color: green
        },
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#OriginYCone',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'cone',
            transformMatrix: new Matrix4(Matrix4.IDENTITY)
                .translate([0, sceneHeight, 0])
                .scale([originRadius, originRadius * 3, originRadius]),
            color: green
        },
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#OriginYSLabel',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'text',
            text: 'S',
            transformMatrix: new Matrix4(Matrix4.IDENTITY).translate([originRadius * 1.5, originRadius * 1.5, 0]).scale(originRadius),
            color: green
        },
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#OriginYWLabel',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'text',
            text: 'W',
            transformMatrix: new Matrix4(Matrix4.IDENTITY).translate([0, sceneHeight + originRadius * 2, 0]).scale(originRadius),
            color: green
        },
        // Origin Z Axis
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#OriginZ',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'cylinder',
            transformMatrix: new Matrix4(Matrix4.IDENTITY)
                .translate([0, 0, sceneDepth / 2])
                .rotateX(toRadians(90))
                .scale([lineRadius, sceneDepth, lineRadius]),
            color: blue
        },
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#OriginZCone',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'cone',
            transformMatrix: new Matrix4(Matrix4.IDENTITY)
                .translate([0, 0, sceneDepth])
                .rotateX(toRadians(90))
                .scale([originRadius, originRadius * 3, originRadius]),
            color: blue
        },
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#OriginZQLabel',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'text',
            text: 'Q',
            transformMatrix: new Matrix4(Matrix4.IDENTITY).translate([originRadius * 1.5, -originRadius * 1.5, 0]).scale(originRadius),
            color: blue
        },
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#OriginZELabel',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'text',
            text: 'E',
            transformMatrix: new Matrix4(Matrix4.IDENTITY).translate([0, 0, sceneDepth + originRadius * 2]).scale(originRadius),
            color: blue
        }
    ].filter(n => (includeLetters && n.geometry === 'text' && n.text) || !n.text);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JpZ2luLXNjZW5lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NmLWRhdGFiYXNlL3NyYy9saWIvdXRpbC9vcmlnaW4tc2NlbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFNbkQsTUFBTSxJQUFJLEdBQVUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUN6QyxNQUFNLEdBQUcsR0FBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQ3BDLE1BQU0sS0FBSyxHQUFVLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDekMsTUFBTSxJQUFJLEdBQVUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUV4Qzs7Ozs7R0FLRztBQUNILE1BQU0sVUFBVSxjQUFjLENBQUMsSUFBbUIsRUFBRSxjQUFjLEdBQUcsS0FBSztJQUN4RSxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztJQUMzQyxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztJQUM1QyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztJQUMzQyxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsSUFBSSxDQUFDO0lBQzFFLE1BQU0sVUFBVSxHQUFHLFlBQVksR0FBRyxHQUFHLENBQUM7SUFFdEMsT0FBTztRQUNMLGdCQUFnQjtRQUNoQjtZQUNFLEtBQUssRUFBRSxpREFBaUQ7WUFDeEQsT0FBTyxF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RDtZQUN6RCxPQUFPLEVBQUUsa0JBQWtCO1lBQzNCLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLFFBQVEsRUFBRSxNQUFNO1lBQ2hCLElBQUksRUFBRSxHQUFHO1lBQ1QsZUFBZSxFQUFFLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLFVBQVUsR0FBRyxZQUFZLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDO1lBQ25ILEtBQUssRUFBRSxJQUFJO1NBQ1o7S0FDRixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsY0FBYyxJQUFJLENBQUMsQ0FBQyxRQUFRLEtBQUssTUFBTSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQXVCLENBQUM7QUFDdEcsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1hdHJpeDQsIHRvUmFkaWFucyB9IGZyb20gJ0BtYXRoLmdsL2NvcmUnO1xuaW1wb3J0IHsgU3BhdGlhbFNjZW5lTm9kZSB9IGZyb20gJy4uL2NjZi1zcGF0aWFsLXNjZW5lJztcbmltcG9ydCB7IFNwYXRpYWxFbnRpdHkgfSBmcm9tICcuLi9zcGF0aWFsLXR5cGVzJztcblxuXG50eXBlIENvbG9yID0gW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl07XG5jb25zdCBncmF5OiBDb2xvciA9IFsyMDQsIDIwNCwgMjA0LCAyNTVdO1xuY29uc3QgcmVkOiBDb2xvciA9IFsyMTMsIDAsIDAsIDI1NV07XG5jb25zdCBncmVlbjogQ29sb3IgPSBbMjksIDIwNCwgMTAxLCAyNTVdO1xuY29uc3QgYmx1ZTogQ29sb3IgPSBbNDEsIDEyMSwgMjU1LCAyNTVdO1xuXG4vKipcbiAqIENyZWF0ZSBhIHNldCBvZiBzY2VuZSBub2RlcyBmb3IgdGhlIGJvZHktdWkgdG8gc2hvdyB0aGUgb3JpZ2luIGFuZCBsaW5lcyBleHRlbmRpbmcgdG8gaXQncyBkaW1lbnNpb25zLlxuICogQHBhcmFtIG5vZGUgdGhlIFNwYXRpYWwgRW50aXR5ICh1c3VhbGx5IGEgcmVmZXJlbmNlIG9yZ2FuKSB0aGF0IHRoZSBvcmlnaW4gaXMgZGVmaW5lZCBieVxuICogQHBhcmFtIGluY2x1ZGVMZXR0ZXJzIHdoZXRoZXIgdG8gc2hvdyB0aGUga2V5Ym9hcmQgbGV0dGVycyBhc3NvY2lhdGVkIHdpdGggdGhlIG9yaWdpbiBwb2ludHNcbiAqIEByZXR1cm5zIGEgc2V0IG9mIHNjZW5lIG5vZGVzIGZvciB0aGUgYm9keS11aVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0T3JpZ2luU2NlbmUobm9kZTogU3BhdGlhbEVudGl0eSwgaW5jbHVkZUxldHRlcnMgPSBmYWxzZSk6IFNwYXRpYWxTY2VuZU5vZGVbXSB7XG4gIGNvbnN0IHNjZW5lV2lkdGggPSBub2RlLnhfZGltZW5zaW9uIC8gMTAwMDtcbiAgY29uc3Qgc2NlbmVIZWlnaHQgPSBub2RlLnlfZGltZW5zaW9uIC8gMTAwMDtcbiAgY29uc3Qgc2NlbmVEZXB0aCA9IG5vZGUuel9kaW1lbnNpb24gLyAxMDAwO1xuICBjb25zdCBvcmlnaW5SYWRpdXMgPSBNYXRoLm1heChzY2VuZVdpZHRoLCBzY2VuZUhlaWdodCwgc2NlbmVEZXB0aCkgKiAwLjA1O1xuICBjb25zdCBsaW5lUmFkaXVzID0gb3JpZ2luUmFkaXVzICogMC4xO1xuXG4gIHJldHVybiBbXG4gICAgLy8gT3JpZ2luIFNwaGVyZVxuICAgIHtcbiAgICAgICdAaWQnOiAnaHR0cDovL3B1cmwub3JnL2NjZi9sYXRlc3QvY2NmLm93bCNPcmlnaW5TcGhlcmUnLFxuICAgICAgJ0B0eXBlJzogJ1NwYXRpYWxTY2VuZU5vZGUnLFxuICAgICAgdW5waWNrYWJsZTogdHJ1ZSxcbiAgICAgIGdlb21ldHJ5OiAnc3BoZXJlJyxcbiAgICAgIHRyYW5zZm9ybU1hdHJpeDogbmV3IE1hdHJpeDQoTWF0cml4NC5JREVOVElUWSkuc2NhbGUob3JpZ2luUmFkaXVzKSxcbiAgICAgIGNvbG9yOiBncmF5XG4gICAgfSxcbiAgICAvLyBPcmlnaW4gWCBBeGlzXG4gICAge1xuICAgICAgJ0BpZCc6ICdodHRwOi8vcHVybC5vcmcvY2NmL2xhdGVzdC9jY2Yub3dsI09yaWdpblgnLFxuICAgICAgJ0B0eXBlJzogJ1NwYXRpYWxTY2VuZU5vZGUnLFxuICAgICAgdW5waWNrYWJsZTogdHJ1ZSxcbiAgICAgIGdlb21ldHJ5OiAnY3lsaW5kZXInLFxuICAgICAgdHJhbnNmb3JtTWF0cml4OiBuZXcgTWF0cml4NChNYXRyaXg0LklERU5USVRZKVxuICAgICAgICAudHJhbnNsYXRlKFtzY2VuZVdpZHRoIC8gMiwgMCwgMF0pXG4gICAgICAgIC5yb3RhdGVaKHRvUmFkaWFucygtOTApKVxuICAgICAgICAuc2NhbGUoW2xpbmVSYWRpdXMsIHNjZW5lV2lkdGgsIGxpbmVSYWRpdXNdKSxcbiAgICAgIGNvbG9yOiByZWRcbiAgICB9LFxuICAgIHtcbiAgICAgICdAaWQnOiAnaHR0cDovL3B1cmwub3JnL2NjZi9sYXRlc3QvY2NmLm93bCNPcmlnaW5YQ29uZScsXG4gICAgICAnQHR5cGUnOiAnU3BhdGlhbFNjZW5lTm9kZScsXG4gICAgICB1bnBpY2thYmxlOiB0cnVlLFxuICAgICAgZ2VvbWV0cnk6ICdjb25lJyxcbiAgICAgIHRyYW5zZm9ybU1hdHJpeDogbmV3IE1hdHJpeDQoTWF0cml4NC5JREVOVElUWSlcbiAgICAgICAgLnRyYW5zbGF0ZShbc2NlbmVXaWR0aCwgMCwgMF0pXG4gICAgICAgIC5yb3RhdGVaKHRvUmFkaWFucygtOTApKVxuICAgICAgICAuc2NhbGUoWyBvcmlnaW5SYWRpdXMsIG9yaWdpblJhZGl1cyAqIDMsIG9yaWdpblJhZGl1cyBdKSxcbiAgICAgIGNvbG9yOiByZWRcbiAgICB9LFxuICAgIHtcbiAgICAgICdAaWQnOiAnaHR0cDovL3B1cmwub3JnL2NjZi9sYXRlc3QvY2NmLm93bCNPcmlnaW5YQUxhYmVsJyxcbiAgICAgICdAdHlwZSc6ICdTcGF0aWFsU2NlbmVOb2RlJyxcbiAgICAgIHVucGlja2FibGU6IHRydWUsXG4gICAgICBnZW9tZXRyeTogJ3RleHQnLFxuICAgICAgdGV4dDogJ0EnLFxuICAgICAgdHJhbnNmb3JtTWF0cml4OiBuZXcgTWF0cml4NChNYXRyaXg0LklERU5USVRZKS50cmFuc2xhdGUoWy1vcmlnaW5SYWRpdXMgKiAyLCAwLCAwXSkuc2NhbGUob3JpZ2luUmFkaXVzKSxcbiAgICAgIGNvbG9yOiByZWRcbiAgICB9LFxuICAgIHtcbiAgICAgICdAaWQnOiAnaHR0cDovL3B1cmwub3JnL2NjZi9sYXRlc3QvY2NmLm93bCNPcmlnaW5YRExhYmVsJyxcbiAgICAgICdAdHlwZSc6ICdTcGF0aWFsU2NlbmVOb2RlJyxcbiAgICAgIHVucGlja2FibGU6IHRydWUsXG4gICAgICBnZW9tZXRyeTogJ3RleHQnLFxuICAgICAgdGV4dDogJ0QnLFxuICAgICAgdHJhbnNmb3JtTWF0cml4OiBuZXcgTWF0cml4NChNYXRyaXg0LklERU5USVRZKS50cmFuc2xhdGUoW3NjZW5lV2lkdGggKyBvcmlnaW5SYWRpdXMgKiAyLCAwLCAwXSkuc2NhbGUob3JpZ2luUmFkaXVzKSxcbiAgICAgIGNvbG9yOiByZWRcbiAgICB9LFxuICAgIC8vIE9yaWdpbiBZIEF4aXNcbiAgICB7XG4gICAgICAnQGlkJzogJ2h0dHA6Ly9wdXJsLm9yZy9jY2YvbGF0ZXN0L2NjZi5vd2wjT3JpZ2luWScsXG4gICAgICAnQHR5cGUnOiAnU3BhdGlhbFNjZW5lTm9kZScsXG4gICAgICB1bnBpY2thYmxlOiB0cnVlLFxuICAgICAgZ2VvbWV0cnk6ICdjeWxpbmRlcicsXG4gICAgICB0cmFuc2Zvcm1NYXRyaXg6IG5ldyBNYXRyaXg0KE1hdHJpeDQuSURFTlRJVFkpXG4gICAgICAgIC50cmFuc2xhdGUoWzAsIHNjZW5lSGVpZ2h0IC8gMiwgMF0pXG4gICAgICAgIC5zY2FsZShbbGluZVJhZGl1cywgc2NlbmVIZWlnaHQsIGxpbmVSYWRpdXNdKSxcbiAgICAgIGNvbG9yOiBncmVlblxuICAgIH0sXG4gICAge1xuICAgICAgJ0BpZCc6ICdodHRwOi8vcHVybC5vcmcvY2NmL2xhdGVzdC9jY2Yub3dsI09yaWdpbllDb25lJyxcbiAgICAgICdAdHlwZSc6ICdTcGF0aWFsU2NlbmVOb2RlJyxcbiAgICAgIHVucGlja2FibGU6IHRydWUsXG4gICAgICBnZW9tZXRyeTogJ2NvbmUnLFxuICAgICAgdHJhbnNmb3JtTWF0cml4OiBuZXcgTWF0cml4NChNYXRyaXg0LklERU5USVRZKVxuICAgICAgICAudHJhbnNsYXRlKFswLCBzY2VuZUhlaWdodCwgMF0pXG4gICAgICAgIC5zY2FsZShbIG9yaWdpblJhZGl1cywgb3JpZ2luUmFkaXVzICogMywgb3JpZ2luUmFkaXVzIF0pLFxuICAgICAgY29sb3I6IGdyZWVuXG4gICAgfSxcbiAgICB7XG4gICAgICAnQGlkJzogJ2h0dHA6Ly9wdXJsLm9yZy9jY2YvbGF0ZXN0L2NjZi5vd2wjT3JpZ2luWVNMYWJlbCcsXG4gICAgICAnQHR5cGUnOiAnU3BhdGlhbFNjZW5lTm9kZScsXG4gICAgICB1bnBpY2thYmxlOiB0cnVlLFxuICAgICAgZ2VvbWV0cnk6ICd0ZXh0JyxcbiAgICAgIHRleHQ6ICdTJyxcbiAgICAgIHRyYW5zZm9ybU1hdHJpeDogbmV3IE1hdHJpeDQoTWF0cml4NC5JREVOVElUWSkudHJhbnNsYXRlKFtvcmlnaW5SYWRpdXMgKiAxLjUsIG9yaWdpblJhZGl1cyAqIDEuNSwgMF0pLnNjYWxlKG9yaWdpblJhZGl1cyksXG4gICAgICBjb2xvcjogZ3JlZW5cbiAgICB9LFxuICAgIHtcbiAgICAgICdAaWQnOiAnaHR0cDovL3B1cmwub3JnL2NjZi9sYXRlc3QvY2NmLm93bCNPcmlnaW5ZV0xhYmVsJyxcbiAgICAgICdAdHlwZSc6ICdTcGF0aWFsU2NlbmVOb2RlJyxcbiAgICAgIHVucGlja2FibGU6IHRydWUsXG4gICAgICBnZW9tZXRyeTogJ3RleHQnLFxuICAgICAgdGV4dDogJ1cnLFxuICAgICAgdHJhbnNmb3JtTWF0cml4OiBuZXcgTWF0cml4NChNYXRyaXg0LklERU5USVRZKS50cmFuc2xhdGUoWzAsIHNjZW5lSGVpZ2h0ICsgb3JpZ2luUmFkaXVzICogMiwgMF0pLnNjYWxlKG9yaWdpblJhZGl1cyksXG4gICAgICBjb2xvcjogZ3JlZW5cbiAgICB9LFxuICAgIC8vIE9yaWdpbiBaIEF4aXNcbiAgICB7XG4gICAgICAnQGlkJzogJ2h0dHA6Ly9wdXJsLm9yZy9jY2YvbGF0ZXN0L2NjZi5vd2wjT3JpZ2luWicsXG4gICAgICAnQHR5cGUnOiAnU3BhdGlhbFNjZW5lTm9kZScsXG4gICAgICB1bnBpY2thYmxlOiB0cnVlLFxuICAgICAgZ2VvbWV0cnk6ICdjeWxpbmRlcicsXG4gICAgICB0cmFuc2Zvcm1NYXRyaXg6IG5ldyBNYXRyaXg0KE1hdHJpeDQuSURFTlRJVFkpXG4gICAgICAgIC50cmFuc2xhdGUoWzAsIDAsIHNjZW5lRGVwdGggLyAyXSlcbiAgICAgICAgLnJvdGF0ZVgodG9SYWRpYW5zKDkwKSlcbiAgICAgICAgLnNjYWxlKFtsaW5lUmFkaXVzLCBzY2VuZURlcHRoLCBsaW5lUmFkaXVzXSksXG4gICAgICBjb2xvcjogYmx1ZVxuICAgIH0sXG4gICAge1xuICAgICAgJ0BpZCc6ICdodHRwOi8vcHVybC5vcmcvY2NmL2xhdGVzdC9jY2Yub3dsI09yaWdpblpDb25lJyxcbiAgICAgICdAdHlwZSc6ICdTcGF0aWFsU2NlbmVOb2RlJyxcbiAgICAgIHVucGlja2FibGU6IHRydWUsXG4gICAgICBnZW9tZXRyeTogJ2NvbmUnLFxuICAgICAgdHJhbnNmb3JtTWF0cml4OiBuZXcgTWF0cml4NChNYXRyaXg0LklERU5USVRZKVxuICAgICAgICAudHJhbnNsYXRlKFswLCAwLCBzY2VuZURlcHRoXSlcbiAgICAgICAgLnJvdGF0ZVgodG9SYWRpYW5zKDkwKSlcbiAgICAgICAgLnNjYWxlKFsgb3JpZ2luUmFkaXVzLCBvcmlnaW5SYWRpdXMgKiAzLCBvcmlnaW5SYWRpdXMgXSksXG4gICAgICBjb2xvcjogYmx1ZVxuICAgIH0sXG4gICAge1xuICAgICAgJ0BpZCc6ICdodHRwOi8vcHVybC5vcmcvY2NmL2xhdGVzdC9jY2Yub3dsI09yaWdpblpRTGFiZWwnLFxuICAgICAgJ0B0eXBlJzogJ1NwYXRpYWxTY2VuZU5vZGUnLFxuICAgICAgdW5waWNrYWJsZTogdHJ1ZSxcbiAgICAgIGdlb21ldHJ5OiAndGV4dCcsXG4gICAgICB0ZXh0OiAnUScsXG4gICAgICB0cmFuc2Zvcm1NYXRyaXg6IG5ldyBNYXRyaXg0KE1hdHJpeDQuSURFTlRJVFkpLnRyYW5zbGF0ZShbb3JpZ2luUmFkaXVzICogMS41LCAtIG9yaWdpblJhZGl1cyAqIDEuNSwgMF0pLnNjYWxlKG9yaWdpblJhZGl1cyksXG4gICAgICBjb2xvcjogYmx1ZVxuICAgIH0sXG4gICAge1xuICAgICAgJ0BpZCc6ICdodHRwOi8vcHVybC5vcmcvY2NmL2xhdGVzdC9jY2Yub3dsI09yaWdpblpFTGFiZWwnLFxuICAgICAgJ0B0eXBlJzogJ1NwYXRpYWxTY2VuZU5vZGUnLFxuICAgICAgdW5waWNrYWJsZTogdHJ1ZSxcbiAgICAgIGdlb21ldHJ5OiAndGV4dCcsXG4gICAgICB0ZXh0OiAnRScsXG4gICAgICB0cmFuc2Zvcm1NYXRyaXg6IG5ldyBNYXRyaXg0KE1hdHJpeDQuSURFTlRJVFkpLnRyYW5zbGF0ZShbMCwgMCwgc2NlbmVEZXB0aCArIG9yaWdpblJhZGl1cyAqIDJdKS5zY2FsZShvcmlnaW5SYWRpdXMpLFxuICAgICAgY29sb3I6IGJsdWVcbiAgICB9XG4gIF0uZmlsdGVyKG4gPT4gKGluY2x1ZGVMZXR0ZXJzICYmIG4uZ2VvbWV0cnkgPT09ICd0ZXh0JyAmJiBuLnRleHQpIHx8ICFuLnRleHQpIGFzIFNwYXRpYWxTY2VuZU5vZGVbXTtcbn1cbiJdfQ==