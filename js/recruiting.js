// recruiting.js — 직무 분포 도넛 차트 (Chart.js)
// 값은 지침 그대로. 해석·결론 없이 라벨+비율만 표시한다.

(function () {
  var fallback = document.getElementById('donutFallback');
  var canvas = document.getElementById('donutChart');

  // Chart.js CDN 로드 실패 시: 폴백 문구만 남기고 페이지는 정상 구동
  if (typeof Chart === 'undefined' || !canvas) {
    if (fallback) fallback.textContent = '차트를 표시할 수 없습니다 (네트워크 확인). 아래 숫자는 정상입니다.';
    return;
  }

  // 라벨·값 (정확히) — 기타 = 100−21−21−19−16 = 23
  var labels = ['인플루언서·시딩', '콘텐츠', '퍼포먼스', 'HR·채용', '기타'];
  var values = [21, 21, 19, 16, 23];
  var colors = [
    '#3ec9a7', // 민트(--point)
    '#5b7c99', // 차분한 슬레이트블루
    '#b59a8f', // 뮤트 토프
    '#8d9bb0', // 라이트 슬레이트
    '#c7c2b8'  // 웜 그레이
  ];

  new Chart(canvas.getContext('2d'), {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [{
        data: values,
        backgroundColor: colors,
        borderColor: '#ffffff',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '58%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: { boxWidth: 12, font: { size: 12 }, color: '#1c1c1c' }
        },
        tooltip: {
          callbacks: {
            label: function (ctx) { return ctx.label + ': ' + ctx.parsed + '%'; }
          }
        }
      }
    }
  });

  // 차트가 그려졌으니 폴백 문구 숨김
  if (fallback) fallback.style.display = 'none';
})();
