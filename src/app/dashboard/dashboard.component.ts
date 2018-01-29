import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TableData } from '../md/md-table/md-table.component';
import { LegendItem, ChartType } from '../md/md-chart/md-chart.component';

import * as Chartist from 'chartist';
import { MowizeService } from '../services/mowize.service';
import { GraphData } from '../model/graphdata';
import { CategoryData } from 'app/model/categoryData';

declare const $: any;

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {

    public tableData: TableData;
    public graphData: GraphData;

    public insuranceData: CategoryData = new CategoryData();
    public accountsData: CategoryData = new CategoryData();
    public investmentsData: CategoryData = new CategoryData();
    public liabilitiesData: CategoryData = new CategoryData();

    public insuranceList: CategoryData[] = [];
    public investmentList: CategoryData[] = [];
    public accountList: CategoryData[] = [];
    public liabilityList: CategoryData[] = [];

    constructor(private mowizeService: MowizeService) { }

    startAnimationForLineChart(chart: any) {
        let seq: any, delays: any, durations: any;
        seq = 0;
        delays = 80;
        durations = 500;
        chart.on('draw', function (data: any) {

            if (data.type === 'line' || data.type === 'area') {
                data.element.animate({
                    d: {
                        begin: 600,
                        dur: 700,
                        from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
                        to: data.path.clone().stringify(),
                        easing: Chartist.Svg.Easing.easeOutQuint
                    }
                });
            } else if (data.type === 'point') {
                seq++;
                data.element.animate({
                    opacity: {
                        begin: seq * delays,
                        dur: durations,
                        from: 0,
                        to: 1,
                        easing: 'ease'
                    }
                });
            }
        });

        seq = 0;
    }
    startAnimationForBarChart(chart: any) {
        let seq2: any, delays2: any, durations2: any;
        seq2 = 0;
        delays2 = 80;
        durations2 = 500;
        chart.on('draw', function (data: any) {
            if (data.type === 'bar') {
                seq2++;
                data.element.animate({
                    opacity: {
                        begin: seq2 * delays2,
                        dur: durations2,
                        from: 0,
                        to: 1,
                        easing: 'ease'
                    }
                });
            }
        });

        seq2 = 0;
    }
    // constructor(private navbarTitleService: NavbarTitleService) { }
    public ngOnInit() {

        this.insuranceData.categoryName = "Insurances";
        this.insuranceData.totalCount = 0;
        this.insuranceData.totalValue = 0;

        this.investmentsData.categoryName = "Investments";
        this.investmentsData.totalCount = 0;
        this.investmentsData.totalValue = 0;

        this.accountsData.categoryName = "Accounts";
        this.accountsData.totalCount = 0;
        this.accountsData.totalValue = 0;

        this.liabilitiesData.categoryName = "Liabilities";
        this.liabilitiesData.totalCount = 0;
        this.liabilitiesData.totalValue = 0;

        this.getGraphData();
        this.getRecordsData();
        this.setUserAnalysis();
        this.setPlatformAnalysis();

    }

    ngAfterViewInit() {
        const breakCards = true;
        if (breakCards === true) {
            // We break the cards headers if there is too much stress on them :-)
            $('[data-header-animation="true"]').each(function () {
                const $fix_button = $(this);
                const $card = $(this).parent('.card');
                $card.find('.fix-broken-card').click(function () {
                    const $header = $(this).parent().parent().siblings('.card-header, .card-image');
                    $header.removeClass('hinge').addClass('fadeInDown');

                    $card.attr('data-count', 0);

                    setTimeout(function () {
                        $header.removeClass('fadeInDown animate');
                    }, 480);
                });

                $card.mouseenter(function () {
                    const $this = $(this);
                    const hover_count = parseInt($this.attr('data-count'), 10) + 1 || 0;
                    $this.attr('data-count', hover_count);
                    if (hover_count >= 20) {
                        $(this).children('.card-header, .card-image').addClass('hinge animated');
                    }
                });
            });
        }
    }

    setUserAnalysis() {
        if (this.graphData) {
            /* ----------==========     Active Users Chart initialization For Documentation    ==========---------- */
            const activeUsersChartData: any = {
                labels: ['Active', 'Dropped', 'Inactive', 'HalfActive'],
                series: [
                    [this.graphData.activeUser, this.graphData.dropUser, this.graphData.inactiveUser, this.graphData.halfActiveUser]
                ]
            };
            const optionsActiveUsersChart: any = {
                axisY: {
                    showGrid: true
                },
                axisX: {
                    showGrid: true
                },
                horizontalBars: true,
                chartPadding: { top: 10, right: 0, bottom: 0, left: 40 },
            };

            var activeUsersCharts = new Chartist.Bar('#activeUsers', activeUsersChartData, optionsActiveUsersChart);
            this.startAnimationForLineChart(activeUsersCharts);
        }
    }

    setPlatformAnalysis() {

        if (this.graphData) {
            /* ----------==========     Platform Wise Users Chart initialization    ==========---------- */
            const dataPlatformUsers = {
                labels: ['Android', 'iOS', 'Web', 'Others'],
                series: [
                    [this.graphData.androidUser, this.graphData.iosUser, this.graphData.webUser, this.graphData.nonDeviceCount]

                ]
            };
            const optionsPlatformUsers = {
                axisY: {
                    showGrid: true
                },
                axisX: {
                    showGrid: true
                },
                horizontalBars: true,
                chartPadding: { top: 10, right: 0, bottom: 0, left: 30 },
            };

            var platformSubscriptionChart = new Chartist.Bar('#platformWiseChart', dataPlatformUsers, optionsPlatformUsers);
            this.startAnimationForBarChart(platformSubscriptionChart);
        }
    }

    getGraphData(): void {
        this.mowizeService.getGraphData()
            .then(graphData => {
                console.log(graphData);
                this.graphData = graphData;
                this.setUserAnalysis();
                this.setPlatformAnalysis();
            });
    }

    getRecordsData(): void {

        this.insuranceList = [];
        this.liabilityList = [];
        this.investmentList = [];
        this.accountList = [];

        this.mowizeService.getRecordsData('', '')
            .then(categoryList => {
                categoryList.forEach(categoryData => {
                    if (categoryData.categoryId === 5
                        || categoryData.categoryId === 6
                        || categoryData.categoryId === 7
                        || categoryData.categoryId === 8
                        || categoryData.categoryId === 9
                    ) {
                        console.log(categoryData);
                        this.insuranceData.totalCount = this.insuranceData.totalCount + categoryData.totalCount;
                        this.insuranceData.totalValue = this.insuranceData.totalValue + categoryData.totalValue;
                        this.insuranceList.push(categoryData);
                    }

                    if (categoryData.categoryId === 10
                        || categoryData.categoryId === 11
                        || categoryData.categoryId === 12
                        || categoryData.categoryId === 13
                        || categoryData.categoryId === 14
                        || categoryData.categoryId === 15
                    ) {
                        this.accountsData.totalCount = this.accountsData.totalCount + categoryData.totalCount;
                        this.accountsData.totalValue = this.accountsData.totalValue + categoryData.totalValue;
                        this.accountList.push(categoryData);
                    }

                    if (categoryData.categoryId === 17
                        || categoryData.categoryId === 18
                        || categoryData.categoryId === 19
                        || categoryData.categoryId === 20
                        || categoryData.categoryId === 22
                        || categoryData.categoryId === 35
                        || categoryData.categoryId === 36
                        || categoryData.categoryId === 37
                        || categoryData.categoryId === 29
                        || categoryData.categoryId === 30
                        || categoryData.categoryId === 31
                        || categoryData.categoryId === 32
                        || categoryData.categoryId === 33
                        || categoryData.categoryId === 34
                        || categoryData.categoryId === 40
                    ) {
                        this.investmentsData.totalCount = this.investmentsData.totalCount + categoryData.totalCount;
                        this.investmentsData.totalValue = this.investmentsData.totalValue + categoryData.totalValue;
                        this.investmentList.push(categoryData);
                    }

                    if (categoryData.categoryId === 23
                        || categoryData.categoryId === 24
                        || categoryData.categoryId === 25
                        || categoryData.categoryId === 26
                        || categoryData.categoryId === 27
                        || categoryData.categoryId === 28
                        || categoryData.categoryId === 38
                        || categoryData.categoryId === 39
                    ) {
                        this.liabilitiesData.totalCount = this.liabilitiesData.totalCount + categoryData.totalCount;
                        this.liabilitiesData.totalValue = this.liabilitiesData.totalValue + categoryData.totalValue;
                        this.liabilityList.push(categoryData);
                    }

                });
                console.log(this.insuranceList);
            });
    }
}
