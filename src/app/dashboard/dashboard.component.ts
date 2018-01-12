import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TableData } from '../md/md-table/md-table.component';
import { LegendItem, ChartType } from '../md/md-chart/md-chart.component';

import * as Chartist from 'chartist';

declare const $: any;

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {

    public tableData: TableData;

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

        /* ----------==========     Active Users Chart initialization For Documentation    ==========---------- */
        const activeUsersChartData: any = {
            labels: ['Active', 'Dropped', 'Inactive', 'HalfActive'],
            series: [
                [2530, 0, 0, 236]
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


        /* ----------==========     Platform Wise Users Chart initialization    ==========---------- */

        const dataPlatformUsers = {
            labels: ['Android', 'iOS', 'Web', 'Others'],
            series: [
                [2247, 210, 3, 70]

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
}
