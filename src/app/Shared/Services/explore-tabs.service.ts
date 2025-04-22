import { ComponentRef, Injectable, InjectionToken, Injector, ViewContainerRef } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { TabInterface } from '../Interfaces/tabInterface';
import { AppSetting } from '../../AppSetting/AppSetting';

@Injectable({
  providedIn: 'root'
})
export class ExploreTabsService {
  tabsStorage: Map<string, BehaviorSubject<TabInterface[]>> = new Map();
  openTabRequests: Map<string, Subject<TabInterface>> = new Map();
  objectContainerRefMap: Map<string, Map<number, ComponentRef<any>>> = new Map();
  tabContentRefs: Map<string, ViewContainerRef> = new Map();
  setting: AppSetting = new AppSetting();
  constructor() { }


  needToRefreshComponent(key:string, id:string) {
    const existingTab = this.getComponentRef(key, +id)
    if (existingTab) {
      existingTab.instance.needToRefreshFlag = true
    }
  }
  setTabContentRef(key: string, ref: ViewContainerRef): void {
    this.tabContentRefs.set(key, ref);
  }

  getTabContentRef(key: string): ViewContainerRef | undefined {
    return this.tabContentRefs.get(key);
  }
  
  // Retrieve tabs for a specific key
  getTabs(key: string): BehaviorSubject<TabInterface[]> {
    if (!this.tabsStorage.has(key)) {
      this.tabsStorage.set(key, new BehaviorSubject<TabInterface[]>([]));
    }
    return this.tabsStorage.get(key)!;
  }
  clearTabs(key: string){
    if (this.tabsStorage.has(key)) { 
      this.tabsStorage.get(key)?.next([]);
    }
  }
  // Open a tab request for a specific key
  openTab(key: string, tab: TabInterface): void {
    const currentTabsCount = this.getTabs(key).value.length;
    if (!this.openTabRequests.has(key)) {
      this.openTabRequests.set(key, new Subject<TabInterface>());
    }
    this.openTabRequests.get(key)!.next(tab);
  }
  // Get openTabRequests observable for a specific key
  getOpenTabRequests$(key: string) {
    if (!this.openTabRequests.has(key)) {
      this.openTabRequests.set(key, new Subject<TabInterface>());
    }
    return this.openTabRequests.get(key)!.asObservable();
  }
  clearOpenTabRequests(key: string): void {
    if (this.openTabRequests.has(key)) {
      this.openTabRequests.get(key)!.complete();
      this.openTabRequests.delete(key);
    }
  }
 
  selectTab(key: string, tab: TabInterface, viewContainerRef: ViewContainerRef) {
    const tabsSource = this.getTabs(key);
    const currentTabs = [...tabsSource.value];
    const activeTab = currentTabs.find((t) => t.active);
    // Save scroll position for the current active tab -- just ticket detail component need to save scroll position
    if (activeTab) {
      const activeComponent = this.getComponentRef(key,+activeTab.id);
      activeComponent?.instance?.saveScrollPosition?.();
    }
    //Deactive all tabs
    currentTabs.forEach((t) => (t.active = false));
    // Check if the tab already exists
    const existingTab = currentTabs.find(t => t.id === tab.id);
    //active existing tab
    if (existingTab) {
      existingTab.active = true;
    }
    else {
      tab.active = true;
      currentTabs.push(tab);
    }

    const existingComponent = this.getComponentRef(key, +tab.id);
    if (this.getTabContentRef(key)) {
      
      this.getTabContentRef(key)?.detach();
    }
    if (existingComponent && !existingComponent.hostView.destroyed) {
      // Reuse existing cached component's view if it's already created
      this.getTabContentRef(key)?.insert(existingComponent.hostView);
      //Refresh existingComponent (related to ticket detail component)
      if (typeof existingComponent.instance.needToRefresh === 'function') {
        existingComponent.instance.needToRefresh();
      }
      // Restore scroll position (related to ticket detail component)
      if (typeof existingComponent.instance.restoreScrollPosition === 'function') {
        existingComponent.instance.restoreScrollPosition();
      }
      
    } else {
      // Create a new component
      if (tab.componentRef) {
        const viewContainerRef=this.getTabContentRef(key) as ViewContainerRef
        const newComponent: ComponentRef<any> = viewContainerRef.createComponent(tab.componentRef);
        newComponent.instance.DATA = tab.data;
        // Store the new component reference
        this.storeComponentRef(key, +tab.id, newComponent);
      }
    }
    
    tabsSource.next(currentTabs);
  }
// Helper methods for component references
  private getComponentRef(key: string, id: number): ComponentRef<any> | undefined {
    const componentMap = this.getComponentMap(key);
    return componentMap.get(id);
  }
  private storeComponentRef(key: string, id: number, ref: ComponentRef<any>): void {
    const componentMap = this.getComponentMap(key);
    componentMap.set(id, ref);
  }

  private getComponentMap(key: string): Map<number, ComponentRef<any>> {
    if (!this.objectContainerRefMap.has(key)) {
      this.objectContainerRefMap.set(key, new Map());
    }
    return this.objectContainerRefMap.get(key)!;
  }
  
  closeTab(key: string, tabId: string, viewContainerRef: ViewContainerRef) {
    const tabsSource = this.getTabs(key);
    const currentTabs = [...tabsSource.value];
    const tabIndex = currentTabs.findIndex((t) => t.id === tabId);
    if (tabIndex !== -1) {
      const tab = currentTabs[tabIndex];
      const componentRef = this.getComponentRef(key, +tab.id)
      if (componentRef) {
        componentRef.destroy();
        this.getComponentMap(key).delete(+tabId);
      }
      currentTabs.splice(tabIndex, 1);
      if (tab.active) {
        const newActiveTab = currentTabs[tabIndex - 1] || currentTabs[0];
        newActiveTab.active = true;
        this.selectTab(key,newActiveTab,viewContainerRef)
      }
      tabsSource.next(currentTabs);
    }
  }

  clearAllData(): void {
    this.tabsStorage.clear(); // Clears all tabs storage data
    this.openTabRequests.clear(); // Clears all open tab requests
    this.objectContainerRefMap.forEach((refMap) => {
      refMap.forEach((componentRef) => {
        if (componentRef && componentRef.destroy) {
          componentRef.destroy(); // Destroy component references if applicable
        }
      });
    });
    this.objectContainerRefMap.clear(); // Clears the object container references map
    this.tabContentRefs.clear(); // Clears the tab content references map
  }
  ngOnDestroy() {
    this.clearAllData()
  }
}
