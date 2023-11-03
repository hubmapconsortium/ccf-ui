/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-underscore-dangle */
import { FlatTreeControl } from '@angular/cdk/tree';
import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges
} from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { OntologyTreeNode } from 'ccf-database';
import { filter, invoke, property } from 'lodash';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { FlatNode } from '../../../core/models/flat-node';

export const labelMap = new Map([
  ['colon', 'large intestine'],
  ['body', 'Anatomical Structures (AS)'],
  ['cell', 'Cell Types (CT)']
]);

/** Type of function for getting child nodes from a parent node. */
type GetChildrenFunc = (o: OntologyTreeNode) => OntologyTreeNode[];

/**
 * Getter function for 'level' on a flat node.
 */
const getLevel = property<FlatNode, number>('level');

/**
 * Getter function for 'expandable' on a flat node.
 */
const isExpandable = property<FlatNode, boolean>('expandable');

/**
 * Represents a expandable tree of an ontology.
 */
@Component({
  selector: 'ccf-ontology-tree',
  templateUrl: './ontology-tree.component.html',
  styleUrls: ['./ontology-tree.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OntologyTreeComponent implements OnInit, OnChanges {
  /**
   * Input of ontology filter, used for changing the ontology selections
   * from outside this component.
   */
  @Input() ontologyFilter: string[];

  /**
   * The root node IRI of the tree
   */
  @Input() rootNode: string;

  @Input() showtoggle: boolean;
  /**
   * The node like objects to display in the tree.
   */
  // eslint-disable-next-line
  @Input()
  set nodes(nodes: OntologyTreeNode[] | undefined) {
    this._nodes = nodes;
    if (this.control) {
      this.dataSource.data = this._nodes ?? [];
    }
  }

  /**
   * List of nodes in the ontology tree
   */
  get nodes(): OntologyTreeNode[] | undefined {
    return this._nodes;
  }

  /**
   * Method for fetching the children of a node.
   */
  @Input()
  set getChildren(fun: GetChildrenFunc | undefined) {
    this._getChildren = fun;
    this.dataSource.data = this.nodes ?? [];
  }

  get getChildren(): GetChildrenFunc | undefined {
    return this._getChildren;
  }

  /**
   * Occurence Data is a record of terms that are in the current filter.
   */
  // eslint-disable-next-line
  @Input()
  set occurenceData(value: Record<string, number>) {
    if (value) {
      this._occurenceData = value;
    } else {
      this._occurenceData = {};
    }
  }

  get occurenceData(): Record<string, number> {
    return this._occurenceData;
  }

  /**
   * Storage for the getter / setter
   */
  private _occurenceData: Record<string, number>;

  /**
   * Term Data is a record of terms that the app currently has data for.
   */
  @Input()
  set termData(value: Record<string, number>) {
    if (value) {
      this._termData = value;
    } else {
      this._termData = {};
    }
  }

  get termData(): Record<string, number> {
    return this._termData;
  }

  @Input() header: boolean;

  @Input() menuOptions: string[];

  @Input() tooltips: string[];

  selectedtoggleOptions: string[];

  /**
   * Storage for the getter / setter
   */
  private _termData: Record<string, number>;

  atScrollBottom = false;

  /**
   * Creates an instance of ontology tree component.
   *
   * @param cdr The change detector.
   * @param ga Analytics service
   */
  constructor(private readonly cdr: ChangeDetectorRef, private readonly ga: GoogleAnalyticsService) { }

  /**
   * Emits an event whenever a node has been selected.
   */
  @Output() readonly nodeSelected = new EventEmitter<OntologyTreeNode[]>();

  /**
   * Emits an event whenever the node's visibility or opacity has changed
   */
  @Output() readonly nodeChanged = new EventEmitter<FlatNode>();

  /**
   * Any time a button is clicked, event is emitted.
   */
  @Output() readonly selectionChange = new EventEmitter<string[]>();

  @Output() readonly selectedBiomarkerOptions = new EventEmitter<string[]>();

  /**
   * Indentation of each level in the tree.
   */
  readonly indent: number | string = '1.5rem';

  /**
   * Tree controller.
   */
  readonly control = new FlatTreeControl<FlatNode>(getLevel, isExpandable);

  /**
   * Node flattener.
   */
  readonly flattener = new MatTreeFlattener(
    FlatNode.create, getLevel, isExpandable,
    // FIXME
    invoke.bind(undefined, this, 'getChildren') as GetChildrenFunc
  );

  /**
   * Data source of flat nodes.
   */
  readonly dataSource = new MatTreeFlatDataSource(this.control, this.flattener);

  /**
   * Storage for getter/setter 'nodes'.
   */
  private _nodes?: OntologyTreeNode[] = undefined;

  /**
   * Storage for getter/setter 'getChildren'.
   */
  private _getChildren?: GetChildrenFunc;


  /**
   * Keeping track of the first selection made allows us to ensure the 'body' node
   * is unselected as expected.
   */
  anySelectionsMade = false;

  /**
   * Currently selected nodes, defaulted to the body node for when the page initially loads.
   */
  selectedNodes: FlatNode[] = [];

  highlightedNode: FlatNode | undefined;



  /**
   * Expand the body node when the component is initialized.
   */
  ngOnInit(): void {
    if (this.control.dataNodes) {
      this.control.expand(this.control.dataNodes[0]);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.ontologyFilter) {
      const ontologyFilter: string[] = changes.ontologyFilter.currentValue as string[];
      if (ontologyFilter?.length >= 0) {
        this.selectByIDs(ontologyFilter);
      }
    }
    if (changes.rootNode) {
      const rootNode = changes.rootNode.currentValue;
      this.selectByIDs([rootNode]);
    }
    if (changes.nodes) {
      this.selectByIDs([this.rootNode]);
    }
  }

  selectByIDs(ids: string[]): void {
    const dataNodes = this.control.dataNodes;
    const selectedNodes: FlatNode[] = dataNodes.filter(node => ids.indexOf(node.original.id) > -1);

    if (selectedNodes?.length > 0) {
      this.selectedNodes = selectedNodes;
      this.ga.event('nodes_selected_by_ids', 'ontology_tree', selectedNodes.map(node => node.label).join(','));
      this.control.collapseAll();
      this.selectedNodes.forEach(selectedNode => {
        this.expandAndSelect(selectedNode.original, (node) =>
          dataNodes.find(findNode => findNode.original.id === node.parent)?.original as OntologyTreeNode, true
        );
      });
    }
  }

  /**
   * Expands the tree to show a node and sets the currect selection to that node.
   *
   * @param node The node to expand to and select.
   */
  expandAndSelect(node: OntologyTreeNode, getParent: (n: OntologyTreeNode) => OntologyTreeNode, additive = false): void {
    const { cdr, control } = this;

    // Add all parents to a set
    const parents = new Set<OntologyTreeNode>();
    let current = getParent(node);

    while (current) {
      parents.add(current);
      current = getParent(current);
    }

    // Find corresponding flat nodes
    const parentFlatNodes = filter(control.dataNodes, flat => parents.has(flat.original));
    const flatNode = control.dataNodes.find(flat => flat.original === node);

    // Expand nodes
    if (!additive) {
      this.selectedNodes = [];
      control.collapseAll();
    }

    for (const flat of parentFlatNodes) {
      control.expand(flat);
    }
    if ((node.label === 'body' || node.id==='biomarkers') && control.dataNodes?.length > 0) {
      control.expand(control.dataNodes[0]);
    }

    // Select the node
    this.select(additive, flatNode, false, true);

    // Detect changes
    cdr.detectChanges();
  }

  /**
   * Determines whether a node can be expanded.
   *
   * @param node The node to test.
   * @returns True if the node has children.
   */
  isInnerNode(this: void, _index: number, node: FlatNode): boolean {
    return node.expandable;
  }

  /**
   * Gets a label for the count
   * @param node The flat node instance
   * @returns Label for the count
   */
  getCountLabel(node: FlatNode): string {
    return !node.original.parent ? 'Tissue Blocks: ' : '';
  }

  /**
   * Gets Node label
   * @param label node label
   * @returns label for node
   */
  getNodeLabel(label: string): string {
    return labelMap.get(label) ?? label;
  }
  /**
   * Determines whether a node is currently selected.
   * Only a single node can be selected at any time.
   *
   * @param node  The node to test.
   * @returns True if the node is the currently selected node.
   */
  isSelected(node: FlatNode | undefined): boolean {
    return node?.original.id === this.rootNode ||
      this.selectedNodes.filter(selectedNode => node?.original.label === selectedNode?.original.label).length > 0;
  }

  /**
   * Handles selecting / deselecting nodes via updating the selectedNodes variable
   *
   * @param node The node to select.
   * @param ctrlKey Whether or not the selection was made with a ctrl + click event.
   */
  select(ctrlKey: boolean, node: FlatNode | undefined, emit: boolean, select: boolean): void {
    // This is to ensure the 'body' node is unselected regardless of what the first
    // selection is
    if (!this.anySelectionsMade) {
      this.selectedNodes = [];
      this.anySelectionsMade = true;
    }

    if (node === undefined) {
      this.selectedNodes = [];
      this.ga.event('nodes_unselected', 'ontology_tree');
      return;
    }

    // ctrl + click allows users to select multiple organs
    if (ctrlKey) {
      if (!select) {
        this.selectedNodes.splice(this.selectedNodes.indexOf(node), 1);
      } else if (this.selectedNodes.indexOf(node) < 0) {
        this.selectedNodes.push(node);
      }
    } else {
      this.selectedNodes = [];
      if (select) {
        this.selectedNodes.push(node);
      }
    }

    this.ga.event('nodes_selected', 'ontology_tree', this.selectedNodes.map(n => n.label).join(','));

    if (emit) {
      this.nodeSelected.emit(this.selectedNodes.map(selectedNode => selectedNode?.original));
    }
  }

  /**
   * Sets the current highlighted node to the moused over node (reveals opacity slider)
   *
   * @param node
   */
  mouseOver(node: FlatNode): void {
    this.highlightedNode = node;
  }

  /**
   * Deselects the highlighted node on mouse out
   */
  mouseOut(): void {
    this.highlightedNode = undefined;
  }

  /**
   * Sets the opacity of a node
   *
   * @param node The node to be updated
   * @param value Opacity value
   */
  updateOpacity(node: FlatNode, value: number | undefined): void {
    node.opacity = value;
    this.ga.event('opacity_update', 'ontology_tree', node.label, value);
    this.nodeChanged.emit(node);
  }

  /**
   * Resets node to default opacity and visibility
   *
   * @param node The node to be reset
   */
  resetNode(node: FlatNode): void {
    node.opacity = 20;
    node.visible = true;
    this.ga.event('node_reset', 'ontology_tree', node.label);
    this.nodeChanged.emit(node);
  }

  /**
   * Toggles visibility of a node
   *
   * @param node The node to be toggled
   */
  toggleVisibility(node: FlatNode): void {
    node.visible = node.visible === true ? false : true;
    this.ga.event('visibility_update', 'ontology_tree', node.label, +node.visible);
    this.nodeChanged.emit(node);
  }

  /**
   * Used to properly set the position of the slider popup on the ontology tree
   *
   * @param level Current level of a node in the ontology tree
   * @returns left indent value
   */
  getLeftIndent(level: number): string {
    return `${level * -1.5}rem`;
  }

  /**
   * Handles the scroll event to detect when scroll is at the bottom.
   *
   * @param event The scroll event.
   */
  onScroll(event: UIEvent): void {
    if (!event.target) {
      return;
    }
    const { clientHeight, scrollHeight, scrollTop } = event.target as Element;
    const diff = scrollHeight - scrollTop - clientHeight;
    this.atScrollBottom = diff < 20;
  }

  isItemSelected(item: string) {
    return this.selectedtoggleOptions.includes(item);
  }

  toggleSelection(value: string[]) {
    this.selectedtoggleOptions = value;
    this.selectedBiomarkerOptions.emit([...this.selectedtoggleOptions]);
  }

}
