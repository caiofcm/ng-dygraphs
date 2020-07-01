import { Component, Input, NgModule, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Wrapper arround Dygraphs
 *
 * \@class NgDygraphsComponent
 */
class NgDygraphsComponent {
    /**
     * @return {?}
     */
    ngOnInit() {
        this.noDataLabel = this.noDataLabel || 'NO DATA AVAILABLE';
        this.chartWidth = (this.options && this.options.width) || 640;
        this.chartHeight = (this.options && this.options.height) || 480;
    }
    /**
     * ngOnChanges
     * \@method ngOnChanges
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (!changes) {
            return;
        }
        if (!this.data || !this.data.length) {
            this.loadingInProgress = false;
            return;
        }
        this.loadingInProgress = true;
        const /** @type {?} */ options = Object.assign({}, this.options);
        if (!options.width) {
            options.width = this.chartWidth;
        }
        if (!options.height) {
            options.height = this.chartHeight;
        }
        if (!options.legend) {
            options.legend = 'always';
        }
        const /** @type {?} */ initialVisibility = [];
        if (options.labels) {
            if (this.customVisibility && options.labels.length > 1) {
                // options.labels[0] is always X axis
                this.labels = options.labels.slice(1);
            }
            options.labels.forEach((_) => {
                initialVisibility.push(true);
            });
        }
        if (options.labels) {
            options.visibility = initialVisibility;
        }
        setTimeout(() => {
            if (this._g) {
                this._g.destroy();
            }
            this._g = new Dygraph(this.chart.nativeElement, this.data, options);
            this.loadingInProgress = false;
        }, 500);
    }
    /**
     * @param {?} el
     * @return {?}
     */
    changeVisibility(el) {
        const /** @type {?} */ elem = el.currentTarget;
        this._g.setVisibility(parseInt(elem.id, 10), elem.checked);
    }
}
NgDygraphsComponent.decorators = [
    { type: Component, args: [{
                selector: 'ng-dygraphs',
                template: `
    <div class="ng-dygraphs">
        <div *ngIf="loadingInProgress" class="loader-holder">
            <div class="loader"></div>
        </div>
        <div *ngIf="customVisibility" class="name-nodes-holder">
            <div class="checkbox" *ngFor="let lineLabel of labels;let i = index;">
                <label id="status_column">
                    <input type="checkbox" attr.id="{{i}}" checked="true" (change)="changeVisibility($event)"/>
                    {{lineLabel}}
                 </label>
            </div>
        </div>
        <div class="ng-dygraphs-chart-container">
            <div [ngClass]="{'hide': !data?.length}" #chart [style.width.px]="chartWidth" [style.height.px]="chartHeight"></div>
            <div *ngIf="!data?.length" class="nodata" [style.width.px]="chartWidth" [style.height.px]="chartHeight">
              {{noDataLabel}}
            </div>
        </div>
    </div>
  `,
                styles: [`
    .ng-dygraphs {
      position: relative; }
      .ng-dygraphs .name-nodes-holder {
        display: -ms-flexbox;
        display: -webkit-box;
        display: flex;
        -ms-flex-direction: row;
            -webkit-box-orient: horizontal;
            -webkit-box-direction: normal;
                flex-direction: row;
        padding-right: 30px;
        padding-left: 30px; }
        .ng-dygraphs .name-nodes-holder .checkbox {
          display: -ms-flexbox;
          display: -webkit-box;
          display: flex;
          -ms-flex-positive: 1;
              -webkit-box-flex: 1;
                  flex-grow: 1; }
      .ng-dygraphs .ng-dygraphs-chart-container {
        background-color: #fff;
        padding: 24px; }
        .ng-dygraphs .ng-dygraphs-chart-container .nodata {
          display: -ms-flexbox;
          display: -webkit-box;
          display: flex;
          -webkit-box-pack: center;
             -ms-flex-pack: center;
           justify-content: center;
         -webkit-box-align: center;
            -ms-flex-align: center;
               align-items: center;
          color: #5c5c5c;
          font-weight: bold;
          font-size: 24px; 
          display: flex;
          -ms-flex-line-pack: center;
              align-content: center; }
        .ng-dygraphs .ng-dygraphs-chart-container .hide {
           display: none; }
      .ng-dygraphs .loader-holder {
        position: absolute;
        display: -ms-flexbox;
        display: -webkit-box;
        display: flex;
        -ms-flex-align: center;
            -webkit-box-align: center;
                align-items: center;
        width: 100%;
        height: 100%;
        background-color: #fff;
        z-index: 55;
        opacity: 0.9; }
      .ng-dygraphs .loader {
        color: #0dc5c1;
        font-size: 20px;
        margin: 100px auto;
        width: 1em;
        height: 1em;
        border-radius: 50%;
        position: relative;
        text-indent: -9999em;
        -webkit-animation: load4 1.3s infinite linear;
        animation: load4 1.3s infinite linear;
        -webkit-transform: translateZ(0);
        transform: translateZ(0); }

    @-webkit-keyframes load4 {
      0%,
      100% {
        -webkit-box-shadow: 0 -3em 0 0.2em, 2em -2em 0 0em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 0;
                box-shadow: 0 -3em 0 0.2em, 2em -2em 0 0em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 0; }
      12.5% {
        -webkit-box-shadow: 0 -3em 0 0, 2em -2em 0 0.2em, 3em 0 0 0, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
                box-shadow: 0 -3em 0 0, 2em -2em 0 0.2em, 3em 0 0 0, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em; }
      25% {
        -webkit-box-shadow: 0 -3em 0 -0.5em, 2em -2em 0 0, 3em 0 0 0.2em, 2em 2em 0 0, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
                box-shadow: 0 -3em 0 -0.5em, 2em -2em 0 0, 3em 0 0 0.2em, 2em 2em 0 0, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em; }
      37.5% {
        -webkit-box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 0, 2em 2em 0 0.2em, 0 3em 0 0em, -2em 2em 0 -1em, -3em 0em 0 -1em, -2em -2em 0 -1em;
                box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 0, 2em 2em 0 0.2em, 0 3em 0 0em, -2em 2em 0 -1em, -3em 0em 0 -1em, -2em -2em 0 -1em; }
      50% {
        -webkit-box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 0em, 0 3em 0 0.2em, -2em 2em 0 0, -3em 0em 0 -1em, -2em -2em 0 -1em;
                box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 0em, 0 3em 0 0.2em, -2em 2em 0 0, -3em 0em 0 -1em, -2em -2em 0 -1em; }
      62.5% {
        -webkit-box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 0, -2em 2em 0 0.2em, -3em 0 0 0, -2em -2em 0 -1em;
                box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 0, -2em 2em 0 0.2em, -3em 0 0 0, -2em -2em 0 -1em; }
      75% {
        -webkit-box-shadow: 0em -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0.2em, -2em -2em 0 0;
                box-shadow: 0em -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0.2em, -2em -2em 0 0; }
      87.5% {
        -webkit-box-shadow: 0em -3em 0 0, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0, -2em -2em 0 0.2em;
                box-shadow: 0em -3em 0 0, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0, -2em -2em 0 0.2em; } }

    @keyframes load4 {
      0%,
      100% {
        -webkit-box-shadow: 0 -3em 0 0.2em, 2em -2em 0 0em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 0;
                box-shadow: 0 -3em 0 0.2em, 2em -2em 0 0em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 0; }
      12.5% {
        -webkit-box-shadow: 0 -3em 0 0, 2em -2em 0 0.2em, 3em 0 0 0, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
                box-shadow: 0 -3em 0 0, 2em -2em 0 0.2em, 3em 0 0 0, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em; }
      25% {
        -webkit-box-shadow: 0 -3em 0 -0.5em, 2em -2em 0 0, 3em 0 0 0.2em, 2em 2em 0 0, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
                box-shadow: 0 -3em 0 -0.5em, 2em -2em 0 0, 3em 0 0 0.2em, 2em 2em 0 0, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em; }
      37.5% {
        -webkit-box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 0, 2em 2em 0 0.2em, 0 3em 0 0em, -2em 2em 0 -1em, -3em 0em 0 -1em, -2em -2em 0 -1em;
                box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 0, 2em 2em 0 0.2em, 0 3em 0 0em, -2em 2em 0 -1em, -3em 0em 0 -1em, -2em -2em 0 -1em; }
      50% {
        -webkit-box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 0em, 0 3em 0 0.2em, -2em 2em 0 0, -3em 0em 0 -1em, -2em -2em 0 -1em;
                box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 0em, 0 3em 0 0.2em, -2em 2em 0 0, -3em 0em 0 -1em, -2em -2em 0 -1em; }
      62.5% {
        -webkit-box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 0, -2em 2em 0 0.2em, -3em 0 0 0, -2em -2em 0 -1em;
                box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 0, -2em 2em 0 0.2em, -3em 0 0 0, -2em -2em 0 -1em; }
      75% {
        -webkit-box-shadow: 0em -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0.2em, -2em -2em 0 0;
                box-shadow: 0em -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0.2em, -2em -2em 0 0; }
      87.5% {
        -webkit-box-shadow: 0em -3em 0 0, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0, -2em -2em 0 0.2em;
                box-shadow: 0em -3em 0 0, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0, -2em -2em 0 0.2em; } }
  `]
            },] },
];
/**
 * @nocollapse
 */
NgDygraphsComponent.ctorParameters = () => [];
NgDygraphsComponent.propDecorators = {
    'options': [{ type: Input },],
    'data': [{ type: Input },],
    'customVisibility': [{ type: Input },],
    'noDataLabel': [{ type: Input },],
    'chart': [{ type: ViewChild, args: ['chart',] },],
};

class NgDygraphsModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: NgDygraphsModule
        };
    }
}
NgDygraphsModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [
                    NgDygraphsComponent
                ],
                exports: [
                    NgDygraphsComponent
                ]
            },] },
];
/**
 * @nocollapse
 */
NgDygraphsModule.ctorParameters = () => [];

/**
 * Generated bundle index. Do not edit.
 */

export { NgDygraphsModule, NgDygraphsComponent as ɵa };
//# sourceMappingURL=ng-dygraphs.js.map
