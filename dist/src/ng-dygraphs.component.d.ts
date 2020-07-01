import { ElementRef, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { DygraphOptions } from './dygraphOptions';
export declare class NgDygraphsComponent implements OnInit, OnChanges {
    options: DygraphOptions;
    data: any;
    customVisibility: boolean;
    noDataLabel: string;
    chart: ElementRef;
    loadingInProgress: boolean;
    chartWidth: number;
    chartHeight: number;
    labels: string[];
    private _g;
    ngOnInit(): void;
    /**
     * ngOnChanges
     * @method ngOnChanges
     * @return {void}
     */
    ngOnChanges(changes: SimpleChanges): void;
    changeVisibility(el: any): void;
}
