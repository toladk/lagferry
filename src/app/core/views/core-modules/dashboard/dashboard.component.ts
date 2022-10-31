import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { EditProfileComponent } from 'src/app/core/main/layout/edit-profile/edit-profile.component';
import { Users } from 'src/app/shared/models';
import { AuthenticationService } from 'src/app/shared/services/auth/authentication.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { UsersService } from 'src/app/shared/services/users/users.service';

import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  constructor(
    private auth: AuthenticationService,
    private notify: NotificationService,
    private userService: UsersService,
    private dialog: MatDialog,
    public authService : AuthenticationService,
  ) {}
  vesselSub!: Subscription;

  userInfo!: Users;

  ngOnInit(): void {
    this.getProfileInfo();
    this.getLineChart();
    this.getPieChart();

    // this.vesselSub = this.auth.getVessel().subscribe({
    //   next: (data) => {
    //     console.log(data);
    //   },
    //   error: (err) => {
    //     console.log(err);
    //     this.notify.showError(err.msg);
    //   },
    // });
  }

  getLineChart() {
    let root = am5.Root.new('linechartdiv');
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: 'panX',
        wheelY: 'zoomX',
        maxTooltipDistance: 0,
        pinchZoomX: true,
      })
    );

    let date = new Date();
    date.setHours(0, 0, 0, 0);
    let value = 100;

    function generateData() {
      value = Math.round(Math.random() * 10 - 4.2 + value);
      am5.time.add(date, 'day', 1);
      return {
        date: date.getTime(),
        value: value,
      };
    }

    function generateDatas(count: number) {
      let data = [];
      for (var i = 0; i < count; ++i) {
        data.push(generateData());
      }
      return data;
    }

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    let xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        maxDeviation: 0.2,
        baseInterval: {
          timeUnit: 'day',
          count: 1,
        },
        renderer: am5xy.AxisRendererX.new(root, {}),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    for (var i = 0; i < 10; i++) {
      let series = chart.series.push(
        am5xy.LineSeries.new(root, {
          name: 'Series ' + i,
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: 'value',
          valueXField: 'date',
          legendValueText: '{valueY}',
          tooltip: am5.Tooltip.new(root, {
            pointerOrientation: 'horizontal',
            labelText: '{valueY}',
          }),
        })
      );

      date = new Date();
      date.setHours(0, 0, 0, 0);
      value = 0;

      let data = generateDatas(100);
      series.data.setAll(data);

      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/
      series.appear();
    }

    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    let cursor = chart.set(
      'cursor',
      am5xy.XYCursor.new(root, {
        behavior: 'none',
      })
    );
    cursor.lineY.set('visible', false);

    // Add scrollbar
    // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
    chart.set(
      'scrollbarX',
      am5.Scrollbar.new(root, {
        orientation: 'horizontal',
      })
    );

    chart.set(
      'scrollbarY',
      am5.Scrollbar.new(root, {
        orientation: 'vertical',
      })
    );

    // Add legend
    // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
    let legend = chart.rightAxesContainer.children.push(
      am5.Legend.new(root, {
        width: 200,
        paddingLeft: 15,
        height: am5.percent(100),
      })
    );

    // When legend item container is hovered, dim all the series except the hovered one
    // legend.itemContainers.template.events.on('pointerover', function (e) {
    //   let itemContainer = e.target;

    //   // As series list is data of a legend, dataContext is series
    //   let series = itemContainer.dataItem.dataContext;

    //   chart.series.each(function (chartSeries) {
    //     if (chartSeries != series) {
    //       chartSeries.strokes.template.setAll({
    //         strokeOpacity: 0.15,
    //         stroke: am5.color(0x000000),
    //       });
    //     } else {
    //       chartSeries.strokes.template.setAll({
    //         strokeWidth: 3,
    //       });
    //     }
    //   });
    // });

    // When legend item container is unhovered, make all series as they are
    // legend.itemContainers.template.events.on('pointerout', function (e) {
    //   let itemContainer = e.target;
    //   let series = itemContainer.dataItem.dataContext;

    //   chart.series.each(function (chartSeries) {
    //     chartSeries.strokes.template.setAll({
    //       strokeOpacity: 1,
    //       strokeWidth: 1,
    //       stroke: chartSeries.get('fill'),
    //     });
    //   });
    // });

    legend.itemContainers.template.set('width', am5.p100);
    legend.valueLabels.template.setAll({
      width: am5.p100,
      textAlign: 'right',
    });

    // It's is important to set legend data after all the events are set on template, otherwise events won't be copied
    legend.data.setAll(chart.series.values);

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    chart.appear(1000, 100);
  }

  getPieChart() {
    /* Chart code */
    // Define data for each year
    let chartData: any = {
      '1995': [
        { sector: 'Agriculture', size: 6.6 },
        { sector: 'Mining and Quarrying', size: 0.6 },
        { sector: 'Manufacturing', size: 23.2 },

      ],
      '1996': [
        { sector: 'Agriculture', size: 6.4 },
        { sector: 'Mining and Quarrying', size: 0.5 },
        { sector: 'Manufacturing', size: 22.4 },

      ],
      '1997': [
        { sector: 'Agriculture', size: 6.1 },
        { sector: 'Mining and Quarrying', size: 0.2 },
        { sector: 'Manufacturing', size: 20.9 },
      ]
    };

    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    let root = am5.Root.new('piechartdiv');

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
    let chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        innerRadius: 70,
        layout: root.verticalLayout,
      })
    );

    // Create series
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
    let series = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: 'size',
        categoryField: 'sector',
      })
    );

    // Set data
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
    series.data.setAll([
      { sector: 'Agriculture', size: 6.6 },
      { sector: 'Mining and Quarrying', size: 0.6 },
      { sector: 'Manufacturing', size: 23.2 },
    ]);


    // Disabling labels and ticks
    series.labels.template.set('visible', false);
    series.ticks.template.set('visible', false);

    // Play initial series animation
    // https://www.amcharts.com/docs/v5/concepts/animations/#Animation_of_series
    series.appear(1000, 100);

    // Add label
    let label = root.tooltipContainer.children.push(
      am5.Label.new(root, {
        x: am5.p50,
        y: am5.p50,
        centerX: am5.p50,
        centerY: am5.p50,
        fill: am5.color(0x000000),
        fontSize: 50,
      })
    );

    // Animate chart data
    let currentYear = 1995;
    function getCurrentData() {
      let data = chartData[currentYear];
      currentYear++;
      if (currentYear > 2014) currentYear = 1995;
      return data;
    }

    function loop() {
      label.set('text', currentYear.toString());
      let data = getCurrentData();
      for (var i = 0; i < data.length; i++) {
        series.data.setIndex(i, data[i]);
      }
      chart.setTimeout(loop, 4000);
    }

    loop();
  }

  getProfileInfo() {
    this.userService.getProfileInfo().subscribe({
      next: (res: any) => {
        this.userInfo = res;
      },
    });
  }

  openEditModal() {
    const dialogRef = this.dialog.open(EditProfileComponent, {
      width: '20rem',
      data: this.userInfo,
      position: { top: '20px', right: '20px' },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result.status === 0) {
        this.getProfileInfo();
      }
    });
  }

  ngOnDestroy(): void {
    // this.vesselSub.unsubscribe();
  }
}
