import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

function DancingBars({ data }) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!data || data.length === 0) return undefined

    const margin = { top: 16, right: 12, bottom: 32, left: 12 }
    const height = 260
    const container = containerRef.current
    const svg = d3.select(container).append('svg')
    const g = svg.append('g')
    let bars
    let scales

    const render = () => {
      const width = container.clientWidth
      const innerWidth = width - margin.left - margin.right
      const innerHeight = height - margin.top - margin.bottom

      svg.attr('width', width).attr('height', height)
      g.attr('transform', `translate(${margin.left},${margin.top})`)

      const x = d3
        .scaleBand()
        .domain(data.map((d) => d.label))
        .range([0, innerWidth])
        .padding(0.18)

      const maxValue = d3.max(data, (d) => d.value) || 1
      const y = d3
        .scaleLinear()
        .domain([0, maxValue * 1.3])
        .range([innerHeight, 0])

      scales = { y, innerHeight, maxValue }

      g.selectAll('*').remove()
      svg.select('defs').remove()

      const defs = svg.append('defs')
      const gradient = defs
        .append('linearGradient')
        .attr('id', 'barGradient')
        .attr('x1', '0%')
        .attr('x2', '0%')
        .attr('y1', '0%')
        .attr('y2', '100%')

      gradient.append('stop').attr('offset', '0%').attr('stop-color', '#0ea5e9')
      gradient.append('stop').attr('offset', '100%').attr('stop-color', '#22c55e')

      bars = g
        .selectAll('rect')
        .data(data)
        .join('rect')
        .attr('x', (d) => x(d.label))
        .attr('width', x.bandwidth())
        .attr('rx', 8)
        .attr('ry', 8)
        .attr('y', (d) => y(d.value))
        .attr('height', (d) => innerHeight - y(d.value))
        .attr('fill', 'url(#barGradient)')

      g
        .selectAll('text')
        .data(data)
        .join('text')
        .attr('x', (d) => x(d.label) + x.bandwidth() / 2)
        .attr('y', innerHeight + 22)
        .attr('text-anchor', 'middle')
        .attr('class', 'bar-label')
        .text((d) => d.label)
    }

    const dance = () => {
      if (!bars || !scales) return
      const { y, innerHeight, maxValue } = scales
      bars
        .transition()
        .duration(1000)
        .ease(d3.easeCubicInOut)
        .attr('y', (d) => {
          const jitter = d.value * (0.5 + Math.random() * 0.6)
          const value = Math.min(jitter, maxValue * 1.3)
          return y(value)
        })
        .attr('height', (d) => {
          const jitter = d.value * (0.5 + Math.random() * 0.6)
          const value = Math.min(jitter, maxValue * 1.3)
          return innerHeight - y(value)
        })
    }

    render()
    const resizeObserver = new ResizeObserver(() => render())
    resizeObserver.observe(container)

    const interval = d3.interval(dance, 1300)

    return () => {
      resizeObserver.disconnect()
      interval.stop()
      svg.remove()
    }
  }, [data])

  return <div className="bars__wrap" ref={containerRef} />
}

export default DancingBars
