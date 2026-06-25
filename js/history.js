// history.js — 시간 궤적 차트 (Chart.js 누적영역)
// 데이터는 비율(%)만. raw 일정·매장·메뉴명은 일절 사용하지 않는다.

(function () {
  var fallback = document.getElementById('chartFallback');
  var canvas = document.getElementById('trajectoryChart');

  // Chart.js CDN 로드 실패 시: 폴백 문구만 남기고 페이지는 정상 구동
  if (typeof Chart === 'undefined' || !canvas) {
    if (fallback) fallback.textContent = '차트를 표시할 수 없습니다 (네트워크 확인). 아래 기록은 정상입니다.';
    return;
  }

  // x축 5구간
  var labels = ['입사초기', '초·중기', '중기', '중·후기', '후기'];

  // 영역별 시기 비중(%) — 지침 숫자 그대로
  var series = [
    { label: '시딩·콘텐츠',  data: [81, 68, 32, 20, 42], color: '#3ec9a7' }, // 민트(--point)
    { label: '데이터·분석',  data: [8, 19, 21, 37, 27],  color: '#5b7c99' }, // 차분한 슬레이트블루
    { label: '채용·HR',      data: [4, 8, 37, 14, 9],    color: '#b59a8f' }, // 뮤트 토프
    { label: '채널·SEO·웹',  data: [6, 4, 3, 17, 11],    color: '#8d9bb0' }, // 라이트 슬레이트
    { label: '운영·외부',    data: [1, 2, 7, 13, 10],    color: '#c7c2b8' }  // 웜 그레이
  ];

  function hexToRgba(hex, a) {
    var n = parseInt(hex.slice(1), 16);
    return 'rgba(' + ((n >> 16) & 255) + ',' + ((n >> 8) & 255) + ',' + (n & 255) + ',' + a + ')';
  }

  var datasets = series.map(function (s) {
    return {
      label: s.label,
      data: s.data,
      backgroundColor: hexToRgba(s.color, 0.55),
      borderColor: s.color,
      borderWidth: 1.5,
      fill: true,
      tension: 0.3,
      pointRadius: 2,
      pointBackgroundColor: s.color
    };
  });

  new Chart(canvas.getContext('2d'), {
    type: 'line',
    data: { labels: labels, datasets: datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: {
          position: 'bottom',
          labels: { boxWidth: 12, font: { size: 12 }, color: '#1c1c1c' }
        },
        tooltip: {
          callbacks: {
            label: function (ctx) { return ctx.dataset.label + ': ' + ctx.parsed.y + '%'; }
          }
        }
      },
      scales: {
        x: {
          stacked: true,
          grid: { display: false },
          ticks: { color: '#6b6b6b', font: { size: 12 } }
        },
        y: {
          stacked: true,
          beginAtZero: true,
          ticks: {
            color: '#6b6b6b',
            font: { size: 11 },
            callback: function (v) { return v + '%'; }
          },
          grid: { color: '#eeeeee' }
        }
      }
    }
  });

  // 차트가 그려졌으니 폴백 문구 숨김
  if (fallback) fallback.style.display = 'none';
})();
