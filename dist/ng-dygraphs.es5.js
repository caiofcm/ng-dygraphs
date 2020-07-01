import { Component, Input, NgModule, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
/**
 * Wrapper arround Dygraphs
 *
 * \@class NgDygraphsComponent
 */
var NgDygraphsComponent = (function () {
    function NgDygraphsComponent() {
    }
    /**
     * @return {?}
     */
    NgDygraphsComponent.prototype.ngOnInit = function () {
        this.noDataLabel = this.noDataLabel || 'NO DATA AVAILABLE';
        this.chartWidth = (this.options && this.options.width) || 640;
        this.chartHeight = (this.options && this.options.height) || 480;
    };
    /**
     * ngOnChanges
     * \@method ngOnChanges
     * @param {?} changes
     * @return {?}
     */
    NgDygraphsComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (!changes) {
            return;
        }
        if (!this.data || !this.data.length) {
            this.loadingInProgress = false;
            return;
        }
        this.loadingInProgress = true;
        var /** @type {?} */ options = Object.assign({}, this.options);
        if (!options.width) {
            options.width = this.chartWidth;
        }
        if (!options.height) {
            options.height = this.chartHeight;
        }
        if (!options.legend) {
            options.legend = 'always';
        }
        var /** @type {?} */ initialVisibility = [];
        if (options.labels) {
            if (this.customVisibility && options.labels.length > 1) {
                // options.labels[0] is always X axis
                this.labels = options.labels.slice(1);
            }
            options.labels.forEach(function (_) {
                initialVisibility.push(true);
            });
        }
        if (options.labels) {
            options.visibility = initialVisibility;
        }
        setTimeout(function () {
            if (_this._g) {
                _this._g.destroy();
            }
            _this._g = new Dygraph(_this.chart.nativeElement, _this.data, options);
            _this.loadingInProgress = false;
        }, 500);
    };
    /**
     * @param {?} el
     * @return {?}
     */
    NgDygraphsComponent.prototype.changeVisibility = function (el) {
        var /** @type {?} */ elem = el.currentTarget;
        this._g.setVisibility(parseInt(elem.id, 10), elem.checked);
    };
    return NgDygraphsComponent;
}());
NgDygraphsComponent.decorators = [
    { type: Component, args: [{
                selector: 'ng-dygraphs',
                template: "\n    <div class=\"ng-dygraphs\">\n        <div *ngIf=\"loadingInProgress\" class=\"loader-holder\">\n            <div class=\"loader\"></div>\n        </div>\n        <div *ngIf=\"customVisibility\" class=\"name-nodes-holder\">\n            <div class=\"checkbox\" *ngFor=\"let lineLabel of labels;let i = index;\">\n                <label id=\"status_column\">\n                    <input type=\"checkbox\" attr.id=\"{{i}}\" checked=\"true\" (change)=\"changeVisibility($event)\"/>\n                    {{lineLabel}}\n                 </label>\n            </div>\n        </div>\n        <div class=\"ng-dygraphs-chart-container\">\n            <div [ngClass]=\"{'hide': !data?.length}\" #chart [style.width.px]=\"chartWidth\" [style.height.px]=\"chartHeight\"></div>\n            <div *ngIf=\"!data?.length\" class=\"nodata\" [style.width.px]=\"chartWidth\" [style.height.px]=\"chartHeight\">\n              {{noDataLabel}}\n            </div>\n        </div>\n    </div>\n  ",
                styles: ["\n    .ng-dygraphs {\n      position: relative; }\n      .ng-dygraphs .name-nodes-holder {\n        display: -ms-flexbox;\n        display: -webkit-box;\n        display: flex;\n        -ms-flex-direction: row;\n            -webkit-box-orient: horizontal;\n            -webkit-box-direction: normal;\n                flex-direction: row;\n        padding-right: 30px;\n        padding-left: 30px; }\n        .ng-dygraphs .name-nodes-holder .checkbox {\n          display: -ms-flexbox;\n          display: -webkit-box;\n          display: flex;\n          -ms-flex-positive: 1;\n              -webkit-box-flex: 1;\n                  flex-grow: 1; }\n      .ng-dygraphs .ng-dygraphs-chart-container {\n        background-color: #fff;\n        padding: 24px; }\n        .ng-dygraphs .ng-dygraphs-chart-container .nodata {\n          display: -ms-flexbox;\n          display: -webkit-box;\n          display: flex;\n          -webkit-box-pack: center;\n             -ms-flex-pack: center;\n           justify-content: center;\n         -webkit-box-align: center;\n            -ms-flex-align: center;\n               align-items: center;\n          color: #5c5c5c;\n          font-weight: bold;\n          font-size: 24px; \n          display: flex;\n          -ms-flex-line-pack: center;\n              align-content: center; }\n        .ng-dygraphs .ng-dygraphs-chart-container .hide {\n           display: none; }\n      .ng-dygraphs .loader-holder {\n        position: absolute;\n        display: -ms-flexbox;\n        display: -webkit-box;\n        display: flex;\n        -ms-flex-align: center;\n            -webkit-box-align: center;\n                align-items: center;\n        width: 100%;\n        height: 100%;\n        background-color: #fff;\n        z-index: 55;\n        opacity: 0.9; }\n      .ng-dygraphs .loader {\n        color: #0dc5c1;\n        font-size: 20px;\n        margin: 100px auto;\n        width: 1em;\n        height: 1em;\n        border-radius: 50%;\n        position: relative;\n        text-indent: -9999em;\n        -webkit-animation: load4 1.3s infinite linear;\n        animation: load4 1.3s infinite linear;\n        -webkit-transform: translateZ(0);\n        transform: translateZ(0); }\n\n    @-webkit-keyframes load4 {\n      0%,\n      100% {\n        -webkit-box-shadow: 0 -3em 0 0.2em, 2em -2em 0 0em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 0;\n                box-shadow: 0 -3em 0 0.2em, 2em -2em 0 0em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 0; }\n      12.5% {\n        -webkit-box-shadow: 0 -3em 0 0, 2em -2em 0 0.2em, 3em 0 0 0, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;\n                box-shadow: 0 -3em 0 0, 2em -2em 0 0.2em, 3em 0 0 0, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em; }\n      25% {\n        -webkit-box-shadow: 0 -3em 0 -0.5em, 2em -2em 0 0, 3em 0 0 0.2em, 2em 2em 0 0, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;\n                box-shadow: 0 -3em 0 -0.5em, 2em -2em 0 0, 3em 0 0 0.2em, 2em 2em 0 0, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em; }\n      37.5% {\n        -webkit-box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 0, 2em 2em 0 0.2em, 0 3em 0 0em, -2em 2em 0 -1em, -3em 0em 0 -1em, -2em -2em 0 -1em;\n                box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 0, 2em 2em 0 0.2em, 0 3em 0 0em, -2em 2em 0 -1em, -3em 0em 0 -1em, -2em -2em 0 -1em; }\n      50% {\n        -webkit-box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 0em, 0 3em 0 0.2em, -2em 2em 0 0, -3em 0em 0 -1em, -2em -2em 0 -1em;\n                box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 0em, 0 3em 0 0.2em, -2em 2em 0 0, -3em 0em 0 -1em, -2em -2em 0 -1em; }\n      62.5% {\n        -webkit-box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 0, -2em 2em 0 0.2em, -3em 0 0 0, -2em -2em 0 -1em;\n                box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 0, -2em 2em 0 0.2em, -3em 0 0 0, -2em -2em 0 -1em; }\n      75% {\n        -webkit-box-shadow: 0em -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0.2em, -2em -2em 0 0;\n                box-shadow: 0em -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0.2em, -2em -2em 0 0; }\n      87.5% {\n        -webkit-box-shadow: 0em -3em 0 0, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0, -2em -2em 0 0.2em;\n                box-shadow: 0em -3em 0 0, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0, -2em -2em 0 0.2em; } }\n\n    @keyframes load4 {\n      0%,\n      100% {\n        -webkit-box-shadow: 0 -3em 0 0.2em, 2em -2em 0 0em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 0;\n                box-shadow: 0 -3em 0 0.2em, 2em -2em 0 0em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 0; }\n      12.5% {\n        -webkit-box-shadow: 0 -3em 0 0, 2em -2em 0 0.2em, 3em 0 0 0, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;\n                box-shadow: 0 -3em 0 0, 2em -2em 0 0.2em, 3em 0 0 0, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em; }\n      25% {\n        -webkit-box-shadow: 0 -3em 0 -0.5em, 2em -2em 0 0, 3em 0 0 0.2em, 2em 2em 0 0, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;\n                box-shadow: 0 -3em 0 -0.5em, 2em -2em 0 0, 3em 0 0 0.2em, 2em 2em 0 0, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em; }\n      37.5% {\n        -webkit-box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 0, 2em 2em 0 0.2em, 0 3em 0 0em, -2em 2em 0 -1em, -3em 0em 0 -1em, -2em -2em 0 -1em;\n                box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 0, 2em 2em 0 0.2em, 0 3em 0 0em, -2em 2em 0 -1em, -3em 0em 0 -1em, -2em -2em 0 -1em; }\n      50% {\n        -webkit-box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 0em, 0 3em 0 0.2em, -2em 2em 0 0, -3em 0em 0 -1em, -2em -2em 0 -1em;\n                box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 0em, 0 3em 0 0.2em, -2em 2em 0 0, -3em 0em 0 -1em, -2em -2em 0 -1em; }\n      62.5% {\n        -webkit-box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 0, -2em 2em 0 0.2em, -3em 0 0 0, -2em -2em 0 -1em;\n                box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 0, -2em 2em 0 0.2em, -3em 0 0 0, -2em -2em 0 -1em; }\n      75% {\n        -webkit-box-shadow: 0em -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0.2em, -2em -2em 0 0;\n                box-shadow: 0em -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0.2em, -2em -2em 0 0; }\n      87.5% {\n        -webkit-box-shadow: 0em -3em 0 0, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0, -2em -2em 0 0.2em;\n                box-shadow: 0em -3em 0 0, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0, -2em -2em 0 0.2em; } }\n  "]
            },] },
];
/**
 * @nocollapse
 */
NgDygraphsComponent.ctorParameters = function () { return []; };
NgDygraphsComponent.propDecorators = {
    'options': [{ type: Input },],
    'data': [{ type: Input },],
    'customVisibility': [{ type: Input },],
    'noDataLabel': [{ type: Input },],
    'chart': [{ type: ViewChild, args: ['chart',] },],
};
var NgDygraphsModule = (function () {
    function NgDygraphsModule() {
    }
    /**
     * @return {?}
     */
    NgDygraphsModule.forRoot = function () {
        return {
            ngModule: NgDygraphsModule
        };
    };
    return NgDygraphsModule;
}());
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
NgDygraphsModule.ctorParameters = function () { return []; };
/**
 * Generated bundle index. Do not edit.
 */
export { NgDygraphsModule, NgDygraphsComponent as ɵa };
//# sourceMappingURL=ng-dygraphs.es5.js.map
