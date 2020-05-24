import "../node_modules/es6-promise/dist/es6-promise";
import { Browser, isNullOrUndefined, Ajax, select } from "@syncfusion/ej2-base";
import { Toolbar, ItemModel } from "@syncfusion/ej2-navigations";

import { DashboardLayout, PanelModel } from '@syncfusion/ej2-layouts';

import { ChipList } from '@syncfusion/ej2-buttons';

let chipsData: any = [{
  "text": "Available",
  "cssClass": "e-success"
},
{
  "text": "Contact supplier",
  "cssClass": "e-info"
}
];
new ChipList({ chips: chipsData }, '#chip-default');

let dashboard: DashboardLayout = new DashboardLayout({
        cellSpacing: [10, 10],
        allowResizing: false,
        cellAspectRatio: 100/90,
        columns: 5,
});
dashboard.appendTo('#defaultLayout');

let toolbarItemCollection: ItemModel[] = [
  {
    template: `   <a class="tab-link" href="./index.html#platform" aria-controls="typescript" role="tab"
        data-toggle="tab">
        HOME
    </a>`,
    align: "Center"
  },
  {
    template: `<a class="tab-link" href="./profile.html#platform" aria-controls="angular" role="tab"
        data-toggle="tab">
        PROFILE
    </a>`,
    align: "Center"
  },
  {
    template: `<a class="tab-link" href="./products.html#platform" aria-controls="vue" role="tab" data-toggle="tab">
        PRODUCTS
    </a>`,
    align: "Center"
  },
  {
    template: `  <a class="tab-link" href="./contact.html#platform" aria-controls="aspnetmvc" role="tab"
        data-toggle="tab">
        CONTACT US
    </a>`,
    align: "Center"
  }
];

let id: number = (window as any).activeId;

if (!isNullOrUndefined(id)) {
  toolbarItemCollection[id].cssClass = "active";
}

let toolbar = new Toolbar({
  height: "72px",
  items: toolbarItemCollection
});
toolbar.appendTo("#platform");

let pannels = document.getElementsByClassName('e-panel');

if(pannels.length !== 0) {
  // pannels[0].addEventListener('click', this.onPanelClick.bind(this));
}