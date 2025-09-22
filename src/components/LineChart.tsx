'use client';

import { useEffect, useRef } from 'react';

interface DataPoint {
  label: string;
  value: number;
}

interface LineChartProps {
  data: DataPoint[];
  color?: string;
  height?: number;
}

export default function LineChart({
  data,
  color = '#3B82F6',
  height = 200
}: LineChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || data.length === 0) return;

    const svg = svgRef.current;
    const width = svg.clientWidth;
    const chartHeight = height;

    // Clear previous content
    svg.innerHTML = '';

    // Calculate scales
    const maxValue = Math.max(...data.map(d => d.value));
    const minValue = Math.min(...data.map(d => d.value));
    const valueRange = maxValue - minValue || 1;

    const padding = 40;
    const chartWidth = width - (padding * 2);
    const chartAreaHeight = chartHeight - (padding * 2);

    // Create path
    const points = data.map((point, index) => {
      const x = padding + (index * chartWidth) / (data.length - 1);
      const y = padding + ((maxValue - point.value) * chartAreaHeight) / valueRange;
      return `${x},${y}`;
    }).join(' ');

    // Create gradient
    const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const linearGradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    linearGradient.setAttribute('id', 'chartGradient');
    linearGradient.setAttribute('x1', '0%');
    linearGradient.setAttribute('y1', '0%');
    linearGradient.setAttribute('x2', '0%');
    linearGradient.setAttribute('y2', '100%');

    const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop1.setAttribute('offset', '0%');
    stop1.setAttribute('style', `stop-color:${color};stop-opacity:0.3`);

    const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop2.setAttribute('offset', '100%');
    stop2.setAttribute('style', `stop-color:${color};stop-opacity:0`);

    linearGradient.appendChild(stop1);
    linearGradient.appendChild(stop2);
    gradient.appendChild(linearGradient);
    svg.appendChild(gradient);

    // Create area path
    const areaPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const areaPoints = points + ` ${padding + chartWidth},${padding + chartAreaHeight} ${padding},${padding + chartAreaHeight}`;
    areaPath.setAttribute('d', `M${areaPoints} Z`);
    areaPath.setAttribute('fill', 'url(#chartGradient)');
    svg.appendChild(areaPath);

    // Create line path
    const linePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    linePath.setAttribute('d', `M${points}`);
    linePath.setAttribute('stroke', color);
    linePath.setAttribute('stroke-width', '2');
    linePath.setAttribute('fill', 'none');
    linePath.setAttribute('stroke-linecap', 'round');
    linePath.setAttribute('stroke-linejoin', 'round');
    svg.appendChild(linePath);

    // Create dots
    data.forEach((point, index) => {
      const x = padding + (index * chartWidth) / (data.length - 1);
      const y = padding + ((maxValue - point.value) * chartAreaHeight) / valueRange;

      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', x.toString());
      circle.setAttribute('cy', y.toString());
      circle.setAttribute('r', '4');
      circle.setAttribute('fill', color);
      svg.appendChild(circle);

      // Add hover effect circle
      const hoverCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      hoverCircle.setAttribute('cx', x.toString());
      hoverCircle.setAttribute('cy', y.toString());
      hoverCircle.setAttribute('r', '8');
      hoverCircle.setAttribute('fill', color);
      hoverCircle.setAttribute('opacity', '0');
      hoverCircle.classList.add('hover:opacity-20', 'transition-opacity', 'duration-200');
      svg.appendChild(hoverCircle);
    });

  }, [data, color, height]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height={height}
      className="w-full h-full"
      viewBox={`0 0 ${svgRef.current?.clientWidth || 400} ${height}`}
    />
  );
}
