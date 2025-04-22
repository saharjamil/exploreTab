import { Component, ElementRef, HostListener, Input, QueryList, ViewChild, ViewChildren, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { TabInterface } from '../../../Shared/Interfaces/tabInterface';
import { ExploreTabsService } from '../../../Shared/Services/explore-tabs.service';

@Component({
  selector: 'app-explore-tab',
  templateUrl: './explore-tab.component.html',
  styleUrls: ['./explore-tab.component.scss'],
  
})
export class ExploreTabComponent {
  @Input() key: string = ''; // Unique key for this instance
  @Input() defaultTab!: TabInterface[];
  @Input() closeAllTabsOnNavigation?: boolean = false;
  @Input() newTab!: TabInterface;
  @Input() activeFirstTab?: boolean;
  openTabRequestsSubscription: Subscription = new Subscription();
  @ViewChild('tabContentRef', { read: ViewContainerRef }) tabContentViewContainerRef!: ViewContainerRef;
  @ViewChild('triggerButton', { static: false }) triggerButton!: ElementRef;
  @ViewChildren('tabElement') tabElements!: QueryList<ElementRef>;
  isMobile:boolean = false;
  constructor(public tabsService: ExploreTabsService) {}

  public tabsListPanelPosition: { top?: number; left?: number; right?: number; bottom?:number } = { top: 0, left: 0 };
  public showTabsListFlag: boolean = false;
  checkDevice(){
    this.isMobile = window.matchMedia('max-width:991px') ? true : false;
  }
  @HostListener('window:resize',['$event'])
  onResize(){
    this.checkDevice();
  }
  
  ngOnInit(): void {  
    this.checkDevice();
    if (!this.key) {
      console.error('ExploreTabsComponent: "key" input is required for proper functionality.');
      return;
    }
    const currentTabs = this.tabsService.getTabs(this.key).value;
    const currentTabsID = currentTabs?.map((tab) => tab.id);
    const tabsToAdd = this.defaultTab.filter(tab => !currentTabsID.includes(tab.id));
    const firstTab = this.defaultTab.find(tab => !tab.closable) as TabInterface;
    
    if (currentTabs.length > 0) {
      if (tabsToAdd.length > 0) {
        tabsToAdd.forEach(tab => {
          currentTabs.push(tab)
        })
      }
      setTimeout(() => {
        currentTabs.forEach(tab => {
          this.addTab(tab);
        })
        if (this.activeFirstTab) {
          
          this.addTab(firstTab);
        }
      },100)
    }
    else {
      setTimeout(() => {
        this.defaultTab.forEach(tab => {
          this.addTab(tab);
        })
      },100)
    }
    if (this.openTabRequestsSubscription) {
      this.openTabRequestsSubscription.unsubscribe();
    }
    this.openTabRequestsSubscription = this.tabsService.getOpenTabRequests$(this.key).subscribe((tab) => {
      this.addTab(tab);
    });
  }
  ngAfterViewInit() {
    this.tabsService.setTabContentRef(this.key, this.tabContentViewContainerRef);
    
  }

  onSelectTab(tab: TabInterface) {
    this.showTabsListFlag = false;
    this.tabsService.selectTab(this.key, tab, this.tabContentViewContainerRef);
    setTimeout(() => {
      this.scrollTabIntoView(tab)
    }, 100); // Timeout ensures DOM updates
  }
  addTab(tab: TabInterface) {
    this.tabsService.selectTab(this.key, tab, this.tabContentViewContainerRef);
     // Wait a tick for DOM to render the tab
  setTimeout(() => {
    this.scrollTabIntoView(tab)
  }, 100);
  }
  showTabsListPanel(event: MouseEvent) {
    
    const element = event.target as HTMLElement;
    const elementRect = element.getBoundingClientRect()
    this.tabsListPanelPosition = {
      left: elementRect.left,
      top: elementRect.top + elementRect.height + 5
    }
    this.showTabsListFlag = true;
  }
  closePanel() {
    this.showTabsListFlag = false
  }
  cleanUp() {
    this.openTabRequestsSubscription.unsubscribe(); //this is important to unsubscribe
    this.tabsService.clearOpenTabRequests(this.key);
    if (this.closeAllTabsOnNavigation) {
      this.tabsService.clearTabs(this.key)
    }
  }

  scrollTabIntoView(tab:TabInterface) {
    const tabs = this.tabsService.getTabs(this.key).value;
    const index = tabs.findIndex(t => t.id === tab.id);
    const tabEl = this.tabElements?.toArray()[index];
    tabEl?.nativeElement?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }

  
  
}
