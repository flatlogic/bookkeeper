export const data = {
  series: [{
    name: 'Website Blog',
    type: 'column',
    data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 130, 220, 300, 870]
  }, {
    name: 'Social Media',
    type: 'line',
    data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16, 18],
  }],
  options: {
    legend: {
        offsetY: -40,
        position: 'top',
    },
    chart: {
      width: '100%',
      type: 'line',
      toolbar: {
        show: false,
      }
    },
    responsive: [
      {
        breakpoint: 1000,
        options: {
          plotOptions: {
            bar: {
              horizontal: false
            }
          },
          legend: {
            position: "bottom",
            offsetY: 7,
          }
        }
      },
      {
        breakpoint: 425,
        options: {
          chart: {
            width: 300
          },
        }
      },
    ],
    colors: ['rgb(193,222,254)', 'rgb(255,77,58)'],
    stroke: {
      width: [0, 2]
    },
    title: {
      text: 'Statistics',
      style: {
        fontSize:  '20px',
        fontWeight:  'normal',
        fontFamily:  'Roboto',
        color:  '#4A4A4A',
        lineHeight: '25px',
      },
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [1],
      formatter: function (val, opts) {
          return `${val}`
      },
      textAnchor: 'middle',
      offsetX: 0,
      offsetY: 0,
      style: {
          fontSize: '14px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 'bold',
          colors: undefined
      },
      background: {
        foreColor: '#fff',
        padding: 4,
        borderRadius: 2,
        borderWidth: 0,
        borderColor: '#fff',
        opacity: 1,
        boxShadow: 'none',
        border: 'none',
        dropShadow: {
          enabled: false,
          top: 1,
          left: 1,
          blur: 1,
          color: '#000',
          opacity: 0.45
        }
      },
      dropShadow: {
          enabled: false,
          top: 1,
          left: 1,
          blur: 1,
          color: '#000',
          opacity: 0.45
      }
    },
    labels: ['01 Jan 2001', '02 Jan 2001', '03 Jan 2001', '04 Jan 2001', '05 Jan 2001', '06 Jan 2001', '07 Jan 2001', '08 Jan 2001', '09 Jan 2001', '10 Jan 2001', '11 Jan 2001', '12 Jan 2001', '13 Jan 2001'],
    xaxis: {
      type: 'datetime',
    },
    yaxis: [{
      forceNiceScale: true,
      title: {
        text: 'Website Blog',
        style: {
          fontSize:  '14px',
          fontWeight:  'normal',
          fontFamily:  'Roboto',
          color:  'rgba(74,74,74,.7)',
          opacity: 0.7,
          lineHeight: '14px',
        },
      },
    }, {
      opposite: true,
      forceNiceScale: true,
      title: {
        text: 'Social Media',
        style: {
          fontSize:  '14px',
          fontWeight:  'normal',
          fontFamily:  'Roboto',
          color:  'rgba(74,74,74,.7)',
          opacity: 0.7,
          lineHeight: '14px',
        },
      }
    }]
  },
};

export const dataTwo = {
  series: [{
    name: 'TEAM B',
    type: 'area',
    data: [44, 55, 50, 57, 42, 36, 30, 34, 42, 37, 43]
  }, {
    name: 'TEAM C',
    type: 'line',
    data: [30, 27, 33, 31, 36, 30, 40, 44, 50, 42, 39]
  }],
  options: {
    legend: {
        offsetY: 0,
        position: 'top',
    },
    responsive: [
      {
        breakpoint: 425,
        options: {
          chart: {
            width: 300
          },
        }
      },
    ],
    colors: ['rgba(75, 159, 254, .3)', 'rgba(255, 77, 58)'],
    chart: {
      height: 350,
      type: 'line',
      stacked: false,
      toolbar: {
          show: false,
      }
    },
    stroke: {
      width: [0, 2, 5],
      curve: 'smooth'
    },
    plotOptions: {
      bar: {
        columnWidth: '50%'
      }
    },
    
    fill: {
      opacity: [0.85, 0.25, 1],
      gradient: {
        inverseColors: false,
        shade: 'light',
        type: "vertical",
        opacityFrom: 0.85,
        opacityTo: 0.55,
        stops: [0, 100, 100, 100]
      }
    },
    labels: ['01/01/2003', '02/01/2003', '03/01/2003', '04/01/2003', '05/01/2003', '06/01/2003', '07/01/2003',
      '08/01/2003', '09/01/2003', '10/01/2003', '11/01/2003'
    ],
    markers: {
      size: 0
    },
    xaxis: {
      type: 'datetime'
    },
    yaxis: {
      show: false,
      title: {
        text: 'Points',
      },
      min: 0
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (y) {
          if (typeof y !== "undefined") {
            return y.toFixed(0) + " points";
          }
          return y;
    
        }
      }
    },
    grid: {
      show: true,
      borderColor: '#90A4AE',
      strokeDashArray: 0,
      position: 'back',
      xaxis: {
          lines: {
              show: false
          }
      },   
      yaxis: {
          lines: {
              show: false
          }
      },  
      row: {
          colors: undefined,
          opacity: 0.5
      },  
      column: {
          colors: undefined,
          opacity: 0.5
      },  
      padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
      },  
    }    
  },
};

export const dataThree = {
  series: [{
    name: 'TEAM B',
    type: 'area',
    data: [44, 55, 50, 57, 42, 36, 30, 34, 42, 37, 43]
  }, {
    name: 'TEAM C',
    type: 'line',
    data: [30, 27, 33, 31, 36, 30, 40, 44, 50, 42, 39]
  }],
  options: {
    legend: {
        offsetY: 0,
        position: 'top',
    },
    responsive: [
      {
        breakpoint: 425,
        options: {
          chart: {
            width: 300
          },
        }
      },
    ],
    colors: ['rgb(247, 250, 255)', 'rgba(75, 159, 254)'],
    chart: {
      height: 350,
      type: 'line',
      stacked: false,
      toolbar: {
          show: false,
      }
    },
    stroke: {
      width: [0, 2, 5],
      curve: 'smooth'
    },
    plotOptions: {
      bar: {
        columnWidth: '50%'
      }
    },
    
    fill: {
      opacity: [0.85, 0.25, 1],
      gradient: {
        inverseColors: false,
        shade: 'light',
        type: "vertical",
        opacityFrom: 0.85,
        opacityTo: 0.55,
        stops: [0, 100, 100, 100]
      }
    },
    labels: ['01/01/2003', '02/01/2003', '03/01/2003', '04/01/2003', '05/01/2003', '06/01/2003', '07/01/2003',
      '08/01/2003', '09/01/2003', '10/01/2003', '11/01/2003'
    ],
    markers: {
      size: 0
    },
    xaxis: {
      type: 'datetime'
    },
    yaxis: {
      show: true,
      title: {
        text: 'Points',
        style: {
          fontSize:  '14px',
          fontWeight:  'normal',
          fontFamily:  'Roboto',
          color:  'rgba(74,74,74,.7)',
          opacity: 0.7,
          lineHeight: '14px',
        },
      },
      labels: {
        offsetX: -8,
      },
      min: 0
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (y) {
          if (typeof y !== "undefined") {
            return y.toFixed(0) + " points";
          }
          return y;
    
        }
      }
    },
    grid: {
      show: true,
      borderColor: '#90A4AE',
      strokeDashArray: 0,
      position: 'back',
      xaxis: {
          lines: {
              show: false
          }
      },   
      yaxis: {
          lines: {
              show: false
          }
      },  
      row: {
          colors: undefined,
          opacity: 0.5
      },  
      column: {
          colors: undefined,
          opacity: 0.5
      },  
      padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
      },  
    },
  },
};

export const dataFour = {
  series: [{
    name: 'Series 1',
    data: [80, 50, 30, 40, 100, 20],
  }],
  options: {
    responsive: [
      {
        breakpoint: 425,
        options: {
          chart: {
            width: 300
          },
        }
      },
    ],
    chart: {
      height: 350,
      type: 'radar',
      toolbar: {
        show: false,
      },
    },
    title: {
      text: ''
    },
    colors: ['#4B9FFE'],
    markers: {
      size: 4,
      colors: ['#4B9FFE'],
      strokeColor: '#FF4560',
      strokeWidth: 0,
    },
    xaxis: {
      categories: ['January', 'February', 'March', 'April', 'May', 'June']
    },
    plotOptions: {
      radar: {
        size: 140,
        polygons: {
          strokeColors: '#e9e9e9',
          fill: {
            colors: ['#E9F3FE', '#fff']
          }
        }
      }
    },
  },
};